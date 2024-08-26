/* eslint-disable unused-imports/no-unused-vars */
import type { AboutData, AboutState, UpdatePayload, UpdateState } from '@type/about.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export const useAboutStore = defineStore('about', () => {
  /**
   *  About Us
   */

  // State
  const state = reactive<AboutState>({
    data: [],
    error: false,
    loading: false,
    show: false,
    success: false
  });

  const getAbout = async () => {
    state.data = [];
    state.error = false;
    state.loading = true;
    state.show = false;
    state.success = false;

    try {
      const { data }: PostgrestSingleResponse<AboutData[]> = await supabase.from('about').select();

      if (data !== null && data.length > 0) {
        state.data = data;
        state.success = true;
      }
    } catch (error) {
      state.error = true;
    } finally {
      state.show = true;
      state.loading = false;
    }
  };

  /**
   *  Update About Us
   */

  // State
  const updateState = reactive<UpdateState>({
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Methods
  const updateAbout = async (payload: UpdatePayload) => {
    updateState.error = false;
    updateState.loading = true;
    updateState.show = false;
    updateState.success = false;

    try {
      const { status } = await supabase.from('about').update(payload).eq('id', 1);

      if (status === 201) {
        updateState.success = true;
      }
    } catch (error) {
      updateState.error = true;
    } finally {
      updateState.show = true;
      updateState.loading = false;
    }
  };

  return {
    state,
    getAbout,
    updateState,
    updateAbout
  };
});
