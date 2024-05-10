import {
  convivaAppTracker,
  trackPageView,
  trackCustomEvent,
  setUserId,
  type TrackerConfiguration,
} from "@convivainc/conviva-js-appanalytics";
import type { PageViewEvent } from "@convivainc/browser-tracker-core";
import type { CustomEvent } from "@convivainc/tracker-core";
import { PerformanceTimingPlugin } from "@convivainc/conviva-js-appanalytics-performance-timing";
import {
  ErrorTrackingPlugin,
  enableErrorTracking,
} from "@convivainc/conviva-js-appanalytics-error-tracking";
import {
  LinkClickTrackingPlugin,
  enableLinkClickTracking,
  enableButtonClickTracking,
} from "@convivainc/conviva-js-appanalytics-click-tracking";

export function initConviva() {
  const convivaAppConfig: TrackerConfiguration = {
    appId: "Open Telemetry Demo",
    appVersion: "0.1.2",
    //convivaCustomerKey: "4d2f03dddf417990f520f09d79b11ab014c39dab", // c3.Internal-Data-Generator
    convivaCustomerKey: "9430dfc5cca804f2f306f9e257722eeb87fcd1e7", // c3.Demo-CustomerSite
    // convivaCustomerKey: "af65934b0b34dd0b9a740f85f79b4b9d9f013a65", // c3.Customer-Demo
    contexts: {
      performanceTiming: true,
    },
    plugins: [
      PerformanceTimingPlugin(),
      ErrorTrackingPlugin(),
      LinkClickTrackingPlugin(),
    ],
  }
  convivaAppTracker(convivaAppConfig);

  enableLinkClickTracking(); // Tracks all link clicks on the page
  enableButtonClickTracking();
  enableErrorTracking();
}

export function setConvivaUserId(userId: string) {
  setUserId(userId);
}

export function trackConvivaPage(pageTitle?: string) {
  const pageViewEvent: PageViewEvent = {
    title: pageTitle || null
  };
  trackPageView(pageViewEvent);
}

type ConvivaCustomEventData = {
  [key: string]: string
}
export function trackConvivaEvent(eventName: string, eventData?: ConvivaCustomEventData) {
  const customEvent: CustomEvent = {
    name: eventName,
    data: eventData,
  }
  trackCustomEvent(customEvent);
}
