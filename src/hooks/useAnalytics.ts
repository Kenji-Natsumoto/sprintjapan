import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics event tracking utility

const GA_MEASUREMENT_ID = 'G-YH49PVVMSN';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventCategory = 
  | 'form_submission'
  | 'button_click'
  | 'navigation'
  | 'download'
  | 'external_link';

interface TrackEventParams {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ category, action, label, value }: TrackEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: path,
      page_location: window.location.href,
      page_title: title ?? document.title,
    });
  }
};

/**
 * Tracks SPA route transitions in GA4.
 * Skips the initial mount because index.html gtag('config', 'G-YH49PVVMSN')
 * automatically sends the initial page_view.
 */
export const usePageTracking = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      const path = `${location.pathname}${location.search}${location.hash}`;
      trackPageView(path, document.title);
    }, 60);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);
};

export const AnalyticsPageTracker = () => {
  usePageTracking();
  return null;
};

// Pre-defined event helpers
export const trackFormSubmission = (formName: string) => {
  trackEvent({
    category: 'form_submission',
    action: 'submit',
    label: formName,
  });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent({
    category: 'button_click',
    action: 'click',
    label: location ? `${buttonName} - ${location}` : buttonName,
  });
};

export const trackNavigation = (destination: string) => {
  trackEvent({
    category: 'navigation',
    action: 'navigate',
    label: destination,
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent({
    category: 'download',
    action: 'download',
    label: fileName,
  });
};

export const trackExternalLink = (url: string) => {
  trackEvent({
    category: 'external_link',
    action: 'click',
    label: url,
  });
};
