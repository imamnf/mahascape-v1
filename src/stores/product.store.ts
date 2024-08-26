/* eslint-disable unused-imports/no-unused-vars */
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type {
  AddProductPayload,
  AddProductState,
  DeleteProductPayload,
  DeleteProductState,
  ProductData,
  ProductState
} from '@type/product.types';

export const useProductStore = defineStore('product', () => {
  /**
   *  Get Products
   */

  // State
  const state = reactive<ProductState>({
    data: [],
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Methods
  const getProducts = async () => {
    state.data = [];
    state.error = false;
    state.loading = true;
    state.show = false;
    state.success = false;

    try {
      const { data }: PostgrestSingleResponse<ProductData[]> = await supabase
        .from('product')
        .select();

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
   *  Get Product
   */

  // State
  const productState = reactive<ProductState>({
    data: [],
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Methods
  const getProduct = async (payload: string) => {
    productState.data = [];
    productState.error = false;
    productState.loading = true;
    productState.show = false;
    productState.success = false;

    try {
      const { data }: PostgrestSingleResponse<ProductData[]> = await supabase
        .from('product')
        .select()
        .eq('slug', payload);

      if (data !== null && data.length > 0) {
        productState.data = data;
        productState.success = true;
      }
    } catch (error) {
      productState.error = true;
    } finally {
      productState.show = true;
      productState.loading = false;
    }
  };

  /**
   *  Add Product
   */

  // State
  const addState = reactive<AddProductState>({
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Methods
  const addProduct = async (payload: AddProductPayload) => {
    addState.error = false;
    addState.loading = true;
    addState.show = false;
    addState.success = false;

    const transformedPayload = {
      image: `${payload.name.toLowerCase().replace(/ /g, '-')}-${
        useDateFormat(useNow().value, 'YYYYMMDDHHmmss').value
      }`,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      price: payload.price
    };

    try {
      const { status } = await supabase.from('product').insert(transformedPayload);

      if (status === 201) {
        const { data } = await supabase.storage
          .from('product')
          .upload(`${transformedPayload.image}.jpg`, payload.image_file, {
            upsert: false
          });

        if (data) {
          addState.success = true;
        }
      }
    } catch (error) {
      addState.error = true;
    } finally {
      addState.show = true;
      addState.loading = false;
    }
  };

  /**
   *  Delete Product
   */

  // State
  const deleteState = reactive<DeleteProductState>({
    error: false,
    loading: false,
    show: false,
    success: false
  });

  // Methods
  const deleteProduct = async (payload: DeleteProductPayload) => {
    deleteState.error = false;
    deleteState.loading = true;
    deleteState.show = false;
    deleteState.success = false;

    try {
      const { error } = await supabase.storage.from('product').remove([`${payload.image}.jpg`]);

      if (!error) {
        const { status } = await supabase.from('product').delete().eq('slug', payload.slug);

        if (status === 204) {
          deleteState.success = true;
        }
      }
    } catch (error) {
      deleteState.error = true;
    } finally {
      deleteState.show = true;
      deleteState.loading = false;
    }
  };

  return {
    state,
    getProducts,
    productState,
    getProduct,
    addState,
    addProduct,
    deleteState,
    deleteProduct
  };
});
