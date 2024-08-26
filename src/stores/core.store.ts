/* eslint-disable unused-imports/no-unused-vars */
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { MenuData, MenuState } from '@type/core.types';

export const useCoreStore = defineStore('core', () => {
  /**
   *  Get Menus
   */

  // State
  const menuState = reactive<MenuState>({
    data: [],
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Method
  const getMenus = async () => {
    menuState.data = [];
    menuState.error = false;
    menuState.loading = true;
    menuState.show = false;
    menuState.success = false;

    try {
      const { data }: PostgrestSingleResponse<MenuData[]> = await supabase
        .from('menu')
        .select()
        .order('id', { ascending: true });

      if (data !== null && data.length > 0) {
        menuState.data = data;
        menuState.success = true;
      }
    } catch (error) {
      menuState.error = true;
    } finally {
      menuState.show = true;
      menuState.loading = false;
    }
  };

  return {
    menuState,
    getMenus
  };
});
