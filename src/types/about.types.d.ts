import type { DState, State } from './index.types';

/**
 *  Get About Us
 */

// Data
interface AboutData {
  about: string;
  vision: string;
  mission: string;
  phone: string;
}

// State
interface AboutState extends DState<AboutData[]> {}

/**
 *  Update About Us
 */

// Payload
interface UpdatePayload {
  about: string;
  vision: string;
  mission: string;
  phone: string;
}

// State
interface UpdateState extends State {}
