import { activitiesTools } from './activities/activitiesTools.js';
import { athletesTools } from './athletesTools.js';
import { clubsTools } from './clubsTools.js';
import { gearsTools } from './gearsTools.js';
import { routesTools } from './routesTools.js';
import { segmentsTools } from './segmentsTools.js';
import { segmentEffortsTools } from './segmentEffortsTools.js';
import { streamsTools } from './streamsTools.js';

/**
 * Export all MCP tools
 */
export const allTools = [
  ...activitiesTools,
  // ...athletesTools,
  // ...clubsTools,
  // ...gearsTools,
  // ...routesTools,
  // ...segmentsTools,
  // ...segmentEffortsTools,
  // ...streamsTools,
];

export { 
  activitiesTools,
  athletesTools,
  clubsTools,
  gearsTools,
  routesTools,
  segmentsTools,
  segmentEffortsTools,
  streamsTools
}; 