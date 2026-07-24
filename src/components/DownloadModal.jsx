import React from 'react';
import { Download, Sparkles, X, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { getDownloadUrl } from '../services/api';

export default function DownloadModal({ isOpen, onClose, onSubscribeClick, onDownloadDirect }) {
  if (!isOpen) return null;
  const downloadUrl = getDownloadUrl();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-pop" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon-ring">
            <Download size={28} />
          </div>
          <span className="modal-badge">
            <Sparkles size={14} /> BDApp Subscription Recommended
          </span>
          <h3 className="modal-title">Download MurgiCare Android App</h3>
          <p className="modal-subtitle">
            Subscribing via Robi or Airtel (4 BDT/day) gives you unlimited AI chicken disease diagnostics, instant symptom analysis, & expert treatment guides.
          </p>
        </div>

        <div className="modal-benefits">
          <div className="benefit-item">
            <div className="benefit-check"><Check size={14} /></div>
            <span>Only 4 BDT/Day (Cancel anytime)</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-check"><Check size={14} /></div>
            <span>Unlimited AI Droppings & Facial Lesions Scan</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-check"><Check size={14} /></div>
            <span>Step-by-step Veterinary Medicine Advice</span>
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-orange btn-block"
            onClick={() => {
              onClose();
              onSubscribeClick();
            }}
          >
            <ShieldCheck size={18} style={{ marginRight: '8px' }} />
            Subscribe First & Get App (4 BDT/Day)
          </button>

          <a
            href={downloadUrl}
            download="murgicare.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary-modal btn-block"
            onClick={onClose}
            style={{ textDecoration: 'none' }}
          >
            <Download size={16} style={{ marginRight: '6px' }} />
            Download APK Without Subscription
          </a>
        </div>

        <p className="modal-footer-note">
          Direct APK File • Android 7.0+ Supported • Size ~47.8 MB
        </p>
      </div>
    </div>
  );
}
