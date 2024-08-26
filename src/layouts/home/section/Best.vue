<script setup lang="ts">
import type { ProductData } from '@type/product.types';

import { UseImage } from '@vueuse/components';

import { useProductStore } from '@store/product.store';

// Store
const productStore = useProductStore();

// State
const base_uri = 'https://oxgkxpzxyzcwrkakntgd.supabase.co/storage/v1/object/public/product';
const products = ref<ProductData[]>();

// Hooks
onBeforeMount(() => {
  productStore.getProducts();
});

watchEffect(() => {
  if (productStore.state.data) {
    products.value = productStore.state.data.slice(0, 5);
  }
});
</script>

<template>
  <div class="px-12">
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-semibold text-center text-slate-600">
        "Menjadikan Rumah Anda sebagai taman terindah di dunia"
      </h2>
      <p class="mt-2 text-slate-400 w-[36rem] text-center">
        Rumahku, Taman Terindahku. Kami menjual berbagai macam bunga segar dan berkualitas tinggi.
        Kami berkomitmen untuk memberikan Anda pengalaman terbaik dalam berbelanja bunga segar di
        sini.
      </p>
    </div>

    <div class="flex flex-col mt-12 gap-y-6">
      <h4 class="text-xl font-semibold text-center text-emerald-600">
        Produk bunga segar terlaris kami
      </h4>

      <div class="flex justify-center gap-x-4">
        <template v-if="productStore.state.show">
          <RouterLink
            v-for="product in products"
            :key="product.slug"
            :to="`/produk/${product.slug}`"
            class="text-center"
          >
            <UseImage
              :src="`${`${base_uri}/${product.image}`}.jpg`"
              class="object-cover object-center rounded-xl size-48"
            />

            <div class="mt-2">
              <span class="text-lg font-semibold text-slate-700">{{ product.name }}</span>
            </div>
          </RouterLink>
        </template>

        <template v-else-if="productStore.state.loading">
          <div v-for="index in 5" :key="index" class="text-center">
            <UiSkeleton class="rounded-xl size-48" />

            <div class="flex justify-center mt-4">
              <UiSkeleton class="w-24 h-4 rounded-lg" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
