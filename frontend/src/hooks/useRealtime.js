import { useState, useEffect } from 'react';
import { realtimeService } from '../services/realtimeService';

export function useRealtime() {
  const [status, setStatus] = useState({ connected: realtimeService.isConnected, latency: realtimeService.latency });

  useEffect(() => {
    const unsub = realtimeService.onStatusChange(setStatus);
    return unsub;
  }, []);

  return {
    isConnected: status.connected,
    latency: status.latency,
    subscribe: (event, callback) => realtimeService.on(event, callback)
  };
}

export function useLiveStock(initialStock, productId) {
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    setStock(initialStock);
  }, [initialStock]);

  useEffect(() => {
    if (!productId) return;
    const unsub = realtimeService.on('stock_update', (data) => {
      if (data.productId === productId && data.stock_quantity !== undefined) {
        setStock(data.stock_quantity);
      }
    });
    return unsub;
  }, [productId]);

  return stock;
}
