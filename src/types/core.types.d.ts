import type { DState } from './index.types';

/**
 *  Get Menu
 */

// Data
interface MenuData {
  id: number;
  name: string;
  slug: string;
  icon: string;
  redirect: string;
  addtime: Date;
  updtime: Date;
}

// State
interface MenuState extends DState<MenuData[]> {}
