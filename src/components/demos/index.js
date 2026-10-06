import SupportCopilotDemo from "./SupportCopilotDemo";
import FleetDemo from "./FleetDemo";
import ImagingDemo from "./ImagingDemo";
import CommerceDemo from "./CommerceDemo";
import InvoiceDemo from "./InvoiceDemo";
import LearningDemo from "./LearningDemo";
import SentimentDemo from "./SentimentDemo";
import NeuralNetDemo from "./NeuralNetDemo";
import AutoScalingDemo from "./AutoScalingDemo";
import LiveAnalyticsDemo from "./LiveAnalyticsDemo";

// Keys match `demo` in projects/services and `key` in techDemos (src/data/siteContent.js).
export const demos = {
  "support-copilot": SupportCopilotDemo,
  fleet: FleetDemo,
  imaging: ImagingDemo,
  commerce: CommerceDemo,
  invoice: InvoiceDemo,
  learning: LearningDemo,
  sentiment: SentimentDemo,
  "neural-net": NeuralNetDemo,
  autoscaling: AutoScalingDemo,
  "live-analytics": LiveAnalyticsDemo,
};
