import { API_CONFIG } from '../config/api.config';
import { apiClient } from './apiClient';

const ADDRESS_STORAGE_KEY = 'gomo_user_addresses';

const loadLocalAddresses = () => {
  try {
    const raw = localStorage.getItem(ADDRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'addr_default_1',
        full_name: 'Saranyan E',
        phone: '+91 98765 43210',
        street: '123 Anna Salai, Guindy',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postal_code: '600032',
        country: 'India',
        is_default: true
      }
    ];
  } catch {
    return [];
  }
};

const saveLocalAddresses = (addresses) => {
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  } catch (err) {
    console.error('Failed to save addresses:', err);
  }
};

export const addressService = {
  /**
   * Get all saved delivery addresses for the customer
   */
  async getAddresses(userId) {
    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.ADDRESSES.LIST(userId));
        if (res.data?.success) {
          saveLocalAddresses(res.data.data);
          return res.data;
        }
      } catch (err) {
        console.warn('API getAddresses failed, using local addresses:', err.message);
      }
    }

    return {
      success: true,
      data: loadLocalAddresses()
    };
  },

  /**
   * Add a new delivery address
   */
  async addAddress(userId, address) {
    const addresses = loadLocalAddresses();
    const newAddress = {
      ...address,
      id: `addr_${Date.now()}`,
      is_default: addresses.length === 0 || address.is_default
    };

    if (newAddress.is_default) {
      addresses.forEach(a => a.is_default = false);
    }

    addresses.push(newAddress);
    saveLocalAddresses(addresses);

    if (!API_CONFIG.USE_MOCK && userId) {
      try {
        await apiClient.post(API_CONFIG.ENDPOINTS.ADDRESSES.CREATE(userId), newAddress);
      } catch (err) {
        console.warn('API addAddress failed:', err.message);
      }
    }

    return { success: true, data: newAddress, addresses };
  },

  /**
   * Update an existing address
   */
  async updateAddress(addressId, updates) {
    let addresses = loadLocalAddresses();
    if (updates.is_default) {
      addresses.forEach(a => a.is_default = false);
    }

    addresses = addresses.map(a => a.id === addressId ? { ...a, ...updates } : a);
    saveLocalAddresses(addresses);

    return { success: true, addresses };
  },

  /**
   * Delete address
   */
  async deleteAddress(addressId) {
    let addresses = loadLocalAddresses().filter(a => a.id !== addressId);
    if (addresses.length > 0 && !addresses.some(a => a.is_default)) {
      addresses[0].is_default = true;
    }
    saveLocalAddresses(addresses);
    return { success: true, addresses };
  },

  /**
   * Set address as default
   */
  async setDefaultAddress(addressId) {
    return this.updateAddress(addressId, { is_default: true });
  }
};

export const getAddresses = (userId) => addressService.getAddresses(userId);
export const addAddress = (userId, address) => addressService.addAddress(userId, address);
export const updateAddress = (id, updates) => addressService.updateAddress(id, updates);
export const deleteAddress = (id) => addressService.deleteAddress(id);
export const setDefaultAddress = (id) => addressService.setDefaultAddress(id);

export default addressService;
