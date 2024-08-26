import type { AuthState } from './index.types';

/**
 *  Sign In
 */

// Payload
interface SignInPayload {
  email: string;
  password: string;
}

// State
interface SignInState extends AuthState {}

/**
 *  Sign Out
 */

// State
interface SignOutState extends AuthState {}
