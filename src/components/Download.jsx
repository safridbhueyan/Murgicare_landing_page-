import React from 'react';
import { Play } from 'lucide-react';
import { getDownloadUrl } from '../services/api';

export default function Download({ isSubscribed, onDownloadClick }) {
  const downloadUrl = getDownloadUrl();
  return (
    <section id="download" className="section-padding download-section">
      <div className="container">
        <div className="download-wrapper animate-fade-in">
          <h2 className="download-title">Start Protecting Your Poultry Today</h2>
          <p className="download-desc">
            Download MurgiCare and make faster, more informed poultry health decisions with AI assistance. Keep your flock healthy and maximize agricultural yield.
          </p>

          <div className="download-buttons">
            {/* Direct APK / Android Download Button */}
            {isSubscribed ? (
              <a
                href={downloadUrl}
                download="murgicare.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
                style={{ textDecoration: 'none' }}
              >
                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3-60.7-60.7 118.7 27.4c11.1 5.6 11.1 14.4 0 20zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" />
                </svg>
                <div>
                  <div className="download-btn-subtitle">Direct APK Download</div>
                  <div className="download-btn-title">Android App</div>
                </div>
              </a>
            ) : (
              <button className="download-btn" onClick={onDownloadClick} style={{ border: 'none', cursor: 'pointer' }}>
                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3-60.7-60.7 118.7 27.4c11.1 5.6 11.1 14.4 0 20zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" />
                </svg>
                <div>
                  <div className="download-btn-subtitle">Direct APK Download</div>
                  <div className="download-btn-title">Android App</div>
                </div>
              </button>
            )}

            {/* Apple App Store Button */}
            <div className="download-btn disabled">
              {/* Custom SVG for Apple */}
              <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-77.5-19.1-38.3 0-77.1 22-97.3 56.6-40.4 70-10.4 174.4 29 230 19.4 27.2 41.7 57.2 70.9 56.2 28.2-1 38.8-18.2 71-18.2 32 0 41.7 18.2 71.2 17.6 29.5-.5 49-27.2 68.2-55.2 22.2-31.9 31.2-63 31.7-64.7-1.1-.4-60.7-22.8-61.2-92.8zM277.7 82.2c16.3-19.8 27.3-47.4 24.3-74.7-23.6 1-52.7 15.8-69.7 35.8-14.8 17.2-27.8 45.1-24.8 71.9 26.2 2 53.8-13.3 70.2-33z" />
              </svg>
              <div>
                <div className="download-btn-subtitle">Coming Soon</div>
                <div className="download-btn-title">App Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
