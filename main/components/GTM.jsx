"use client";
import React, { useEffect, useState } from 'react';
import { genericStorageManagement } from "@utils/functions";

const GTM = ({ gtmId }) => {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = genericStorageManagement("get", "cookie_preferences");
      if (stored.result && stored.value) {
        try {
          const prefs = JSON.parse(stored.value);
          if (prefs.analytics) {
            setConsentGranted(true);
          }
        } catch {
          // If can't parse, default to loading GTM for backwards compatibility
          setConsentGranted(true);
        }
      } else {
        // No preferences saved yet — check legacy "terms" key
        const terms = genericStorageManagement("get", "terms");
        if (terms.result && terms.value === "1") {
          setConsentGranted(true);
        }
      }
    };

    checkConsent();

    // Listen for consent changes via dataLayer
    const handleConsentChange = () => {
      checkConsent();
    };
    window.addEventListener("storage", handleConsentChange);
    return () => window.removeEventListener("storage", handleConsentChange);
  }, []);

  useEffect(() => {
    if (!consentGranted) return;

    const existingScript = document.querySelector(`script[src*="googletagmanager"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [gtmId, consentGranted]);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

export default GTM;
