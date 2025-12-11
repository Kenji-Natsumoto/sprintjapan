// Google Analytics event tracking utility

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
