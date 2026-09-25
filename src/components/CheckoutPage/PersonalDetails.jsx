import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useShop } from "../../context/ShopContext";
import { addressService } from "../../services/addressService";
import { MapPin, Plus, Edit2, Trash2, Check, Star, Phone, User, Building } from "lucide-react";

const PersonalDetails = ({ onNext, selectedAddress, onSelectAddress }) => {
  const { user } = useAuth();
  const { t } = useShop();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  
  // Modal / Form state for Add/Edit
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false
  });
  const [formError, setFormError] = useState("");

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const res = await addressService.getAddresses(user?.id);
      if (res.success && Array.isArray(res.data)) {
        setAddresses(res.data);
        if (res.data.length > 0) {
          // Select default or first
          const defaultAddr = res.data.find(a => a.is_default) || res.data[0];
          setSelectedId(defaultAddr.id);
          if (onSelectAddress) onSelectAddress(defaultAddr);
        }
      }
    } catch (err) {
      console.error("Failed to load addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [user]);

  const handleSelect = (addr) => {
    setSelectedId(addr.id);
    if (onSelectAddress) onSelectAddress(addr);
  };

  const handleOpenAdd = () => {
    setAddressForm({
      full_name: user?.name || "",
      phone: user?.phone || "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
      is_default: addresses.length === 0
    });
    setEditingId(null);
    setFormError("");
    setIsEditing(true);
  };

  const handleOpenEdit = (addr, e) => {
    e.stopPropagation();
    setAddressForm({
      full_name: addr.full_name || "",
      phone: addr.phone || "",
      street: addr.street || addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      postal_code: addr.postal_code || addr.pincode || "",
      country: addr.country || "India",
      is_default: !!addr.is_default
    });
    setEditingId(addr.id);
    setFormError("");
    setIsEditing(true);
  };

  const handleDelete = async (addrId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      const res = await addressService.deleteAddress(addrId);
      if (res.success) {
        setAddresses(res.addresses);
        if (selectedId === addrId && res.addresses.length > 0) {
          const nextAddr = res.addresses.find(a => a.is_default) || res.addresses[0];
          setSelectedId(nextAddr.id);
          if (onSelectAddress) onSelectAddress(nextAddr);
        }
      }
    }
  };

  const handleSetDefault = async (addrId, e) => {
    e.stopPropagation();
    const res = await addressService.setDefaultAddress(addrId);
    if (res.success) {
      setAddresses(res.addresses);
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (!addressForm.full_name.trim() || !addressForm.phone.trim() || !addressForm.street.trim() || !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.postal_code.trim()) {
      setFormError("Please fill in all mandatory address fields.");
      return;
    }

    if (!/^\d{6}$/.test(addressForm.postal_code.trim())) {
      setFormError("Please enter a valid 6-digit postal pincode.");
      return;
    }

    if (editingId) {
      // Update
      const res = await addressService.updateAddress(editingId, addressForm);
      if (res.success) {
        setAddresses(res.addresses);
        const updated = res.addresses.find(a => a.id === editingId);
        if (selectedId === editingId && updated && onSelectAddress) {
          onSelectAddress(updated);
        }
        setIsEditing(false);
      }
    } else {
      // Add
      const res = await addressService.addAddress(user?.id, addressForm);
      if (res.success) {
        setAddresses(res.addresses);
        setSelectedId(res.data.id);
        if (onSelectAddress) onSelectAddress(res.data);
        setIsEditing(false);
      }
    }
  };

  const handleProceed = () => {
    const active = addresses.find(a => a.id === selectedId);
    if (!active) {
      setFormError("Please select or add a delivery address to proceed.");
      return;
    }
    // Transform address shape so both legacy and modern components recognize it
    const normalized = {
      ...active,
      name: active.full_name,
      address: active.street,
      pincode: active.postal_code
    };
    onNext(normalized);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-6">
        <div>
          <h2 className="text-2xl font-serif italic text-orange-900 mb-1">{t("Delivery Address")}</h2>
          <p className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">
            {t("Select or manage your destination address")}
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-orange-950 text-white text-[10px] uppercase tracking-widest font-black px-4 py-2.5 rounded-none hover:bg-orange-850 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <Plus size={14} /> {t("Add New Address")}
          </button>
        )}
      </div>

      {/* Inline Add / Edit Form Modal */}
      {isEditing && (
        <div className="p-6 bg-orange-50/50 border border-orange-200 rounded-none animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-serif italic text-orange-950 font-bold">
              {editingId ? t("Edit Delivery Address") : t("Add New Delivery Address")}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-orange-400 hover:text-orange-900 text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              {t("Cancel")}
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("Full Name")} *
              </label>
              <input
                type="text"
                required
                value={addressForm.full_name}
                onChange={e => setAddressForm({ ...addressForm, full_name: e.target.value })}
                placeholder="Saranyan E"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("Phone Number")} *
              </label>
              <input
                type="tel"
                required
                value={addressForm.phone}
                onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("Street Address / Flat No / Area")} *
              </label>
              <input
                type="text"
                required
                value={addressForm.street}
                onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                placeholder="123 Anna Salai, Guindy"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("City")} *
              </label>
              <input
                type="text"
                required
                value={addressForm.city}
                onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                placeholder="Chennai"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("State")} *
              </label>
              <input
                type="text"
                required
                value={addressForm.state}
                onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                placeholder="Tamil Nadu"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("Postal Code (Pincode)")} *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={addressForm.postal_code}
                onChange={e => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                placeholder="600032"
                className="w-full h-11 px-4 bg-white border border-orange-200 text-sm text-orange-950 rounded-none focus:outline-none focus:border-orange-900"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] font-black text-orange-500 mb-1.5">
                {t("Country")}
              </label>
              <input
                type="text"
                disabled
                value={addressForm.country}
                className="w-full h-11 px-4 bg-orange-100/50 border border-orange-200 text-sm text-orange-950 rounded-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="defaultCheck"
                checked={addressForm.is_default}
                onChange={e => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                className="w-4 h-4 accent-orange-950 cursor-pointer"
              />
              <label htmlFor="defaultCheck" className="text-xs text-orange-900 font-medium cursor-pointer">
                {t("Set as default delivery address")}
              </label>
            </div>

            {formError && (
              <div className="md:col-span-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
                {formError}
              </div>
            )}

            <div className="md:col-span-2 flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 border border-orange-300 text-orange-800 text-[10px] uppercase tracking-widest font-black rounded-none hover:bg-orange-100/60 transition-colors"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-orange-955 text-white text-[10px] uppercase tracking-widest font-black rounded-none hover:bg-orange-700 transition-colors shadow-md"
              >
                {editingId ? t("Update Address") : t("Save Address")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-orange-400 text-xs uppercase tracking-widest font-bold">
            {t("Loading saved addresses...")}
          </div>
        ) : addresses.length === 0 ? (
          <div className="p-8 border border-dashed border-orange-200 text-center space-y-3">
            <MapPin size={28} className="mx-auto text-orange-300" strokeWidth={1.5} />
            <p className="text-sm font-serif italic text-orange-955">{t("No addresses saved yet")}</p>
            <p className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">
              {t("Please add an address to continue checkout")}
            </p>
          </div>
        ) : (
          addresses.map((addr) => {
            const isSelected = selectedId === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => handleSelect(addr)}
                className={`relative p-5 sm:p-6 border transition-all cursor-pointer rounded-none flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                  isSelected
                    ? "border-orange-955 bg-orange-50/40 shadow-sm ring-1 ring-orange-955"
                    : "border-orange-100 hover:border-orange-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="pt-0.5">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? "border-orange-955 bg-orange-955 text-white" : "border-orange-300 bg-white"
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif italic font-bold text-base text-orange-950">
                        {addr.full_name}
                      </span>
                      {addr.is_default && (
                        <span className="px-2 py-0.5 bg-orange-950 text-white text-[8px] uppercase tracking-widest font-black rounded-none">
                          {t("Default")}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-orange-800 font-light leading-relaxed">
                      {addr.street || addr.address}
                    </p>
                    <p className="text-xs text-orange-800 font-light">
                      {addr.city}, {addr.state} — {addr.postal_code || addr.pincode}
                    </p>
                    <p className="text-[11px] text-orange-600 font-mono pt-1">
                      📞 {addr.phone}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 self-end sm:self-start pt-2 sm:pt-0">
                  {!addr.is_default && (
                    <button
                      type="button"
                      onClick={(e) => handleSetDefault(addr.id, e)}
                      title="Set as Default"
                      className="px-2.5 py-1 text-[9px] uppercase tracking-wider text-orange-700 hover:text-orange-955 font-bold hover:bg-orange-100 transition-colors border border-orange-200"
                    >
                      {t("Set Default")}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(addr, e)}
                    title="Edit Address"
                    className="p-1.5 text-orange-400 hover:text-orange-955 transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(addr.id, e)}
                    title="Delete Address"
                    className="p-1.5 text-orange-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {formError && !isEditing && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
          {formError}
        </div>
      )}

      {/* Navigation Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleProceed}
          disabled={addresses.length === 0}
          className="w-full h-14 bg-orange-955 text-white text-[11px] uppercase tracking-[0.4em] font-black rounded-none hover:bg-orange-850 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-orange-950/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t("Continue to Delivery & Payment")} →
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;