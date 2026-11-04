import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_EVENTS, GaEventName, GaPlacement } from '@/lib/gaEvents';

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

// 受け取りページの合い鍵（?k=）は GA4 に送らない。URLから k だけを外す。
export const sanitizeUrlForAnalytics = (href: string): string => {
  try {
    const u = new URL(href);
    if (!u.searchParams.has('k')) return href;
    u.searchParams.delete('k');
    return u.toString();
  } catch {
    return href;
  }
};

// SPA内の直前のURL（初回は index.html の gtag('config') が送るので、最初の値は読み込み時のURL）。
// SPA遷移で document.referrer が外部（X など）のまま残り、流入元が二重に数えられるのを防ぐ。
let lastPageLocation = typeof window !== 'undefined' ? sanitizeUrlForAnalytics(window.location.href) : '';

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const pageReferrer = lastPageLocation;
    lastPageLocation = sanitizeUrlForAnalytics(window.location.href);
    window.gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: path,
      page_referrer: pageReferrer,
      // クエリ文字列（utm_source / utm_medium / utm_campaign / utm_content など）を含む完全なURLを送る。
      // 流入元の判定に使うので、ここからクエリを削らないこと。
      page_location: lastPageLocation,
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
      const search = new URLSearchParams(location.search);
      search.delete('k');
      const qs = search.toString();
      const path = `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`;
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

// GA4 カスタムイベント（名前は src/lib/gaEvents.ts が正本。パラメータはフラットに送り、GA4側でカスタムディメンション登録して集計する）
export const sendGaEvent = (name: GaEventName, params: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // 遷移直前のクリックでも取りこぼさないよう beacon で送る
    window.gtag('event', name, { send_to: GA_MEASUREMENT_ID, transport_type: 'beacon', ...params });
  }
};

/** /contact へのボタン・リンクのクリック */
export const trackContactClick = (placement: GaPlacement) => {
  sendGaEvent(GA_EVENTS.contactClick, { placement, page_path: window.location.pathname });
};

/** /ai-ops へのクリック（トップの帯、ニュース本文のリンク） */
export const trackAiOpsClick = (placement: GaPlacement) => {
  sendGaEvent(GA_EVENTS.aiOpsClick, { placement, page_path: window.location.pathname });
};

/** /ai-ops から公開済みニュースへのクリック（任意） */
export const trackAiOpsNewsClick = (placement: GaPlacement, destination: string) => {
  sendGaEvent(GA_EVENTS.aiOpsNewsClick, { placement, destination });
};

/** /ai-ops のFAQを開いた（任意。question_index は1始まり） */
export const trackAiOpsFaqOpen = (questionIndex: number) => {
  sendGaEvent(GA_EVENTS.aiOpsFaqOpen, { question_index: questionIndex });
};

/** 資料申込の送信（名前・メールアドレスは送らない） */
export const trackWpLead = (papers: string, ctaId: string | null) => {
  sendGaEvent(GA_EVENTS.wpLead, { papers, cta_id: ctaId || '(none)', page_path: window.location.pathname });
};

/** 受け取りページで資料をダウンロード */
export const trackWpFileDownload = (fileName: string, ctaId: string | null) => {
  sendGaEvent(GA_EVENTS.wpFileDownload, { file_name: fileName, cta_id: ctaId || '(none)' });
};

/** 受け取りページで限定動画の再生を始めた */
export const trackWpVideoStart = (ctaId: string | null) => {
  sendGaEvent(GA_EVENTS.wpVideoStart, { video_title: 'limited', cta_id: ctaId || '(none)' });
};
