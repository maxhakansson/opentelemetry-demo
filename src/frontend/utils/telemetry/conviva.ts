import {
  convivaAppTracker,
  trackPageView,
  trackCustomEvent,
  setUserId,
} from "@convivainc/conviva-js-appanalytics";
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
  convivaAppTracker({
    appId: "Open Telemetry Demo",
    // convivaCustomerKey: "4d2f03dddf417990f520f09d79b11ab014c39dab", // c3.Internal-Data-Generator
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
  });
  setUserId("replace_me_by_the_userId");

  enableLinkClickTracking(); // Tracks all link clicks on the page
  enableButtonClickTracking();
  enableErrorTracking();
}

export function trackPage(pageTitle?: string) {
  trackPageView({ title: pageTitle });
}

type ConvivaCustomEventData = {
  [key: string]: string
}
export function trackEvent(eventName: string, eventData: ConvivaCustomEventData) {
  trackCustomEvent({
    name: eventName,
    data: eventData,
  });
}
