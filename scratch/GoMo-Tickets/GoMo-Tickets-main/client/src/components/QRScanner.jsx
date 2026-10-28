import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ onScanSuccess, onScanFailure }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
        rememberLastUsedCamera: true
      }, false);
      
      scannerRef.current = scanner;

      const successCallback = (decodedText, decodedResult) => {
        onScanSuccess(decodedText);
        scanner.clear();
      };

      const errorCallback = (errorMessage) => {
        if (onScanFailure) {
          onScanFailure(errorMessage);
        }
      };

      // Small timeout ensures the DOM element #reader is fully mounted
      setTimeout(() => {
        scanner.render(successCallback, errorCallback);
      }, 50);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-white shadow-inner p-4 border border-slate-200">
      <div id="reader" className="w-full"></div>
    </div>
  );
}
