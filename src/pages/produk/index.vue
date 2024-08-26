<script setup lang="ts">
import { UseImage } from '@vueuse/components';

import { useProductStore } from '@store/product.store';

// Store
const productStore = useProductStore();

// State
const { shortNumber } = useNumber();
const base_uri = 'https://oxgkxpzxyzcwrkakntgd.supabase.co/storage/v1/object/public/product';

// Hooks
onBeforeMount(() => {
  productStore.getProducts();
});

// State
</script>

<template>
  <HomeBanner title="Produk Kami" />

  <div class="px-16">
    <div class="grid grid-cols-4 gap-8">
      <template v-if="productStore.state.show">
        <div
          v-for="product in productStore.state.data"
          :key="product.slug"
          class="w-full h-full transition-all border cursor-pointer border-slate-100 rounded-xl hover:shadow-lg hover:shadow-slate-400/20"
        >
          <RouterLink :to="`/produk/${product.slug}`">
            <UseImage
              :src="`${`${base_uri}/${product.image}`}.jpg`"
              class="object-cover object-center h-60 rounded-t-xl"
            />

            <div class="px-4 pt-2 pb-6 space-y-1">
              <h3 class="text-lg font-bold text-slate-800">
                {{ product.name }}
              </h3>

              <p class="text-sm leading-tight text-slate-500">
                {{ product.description }}
              </p>

              <h1 class="!mt-4 text-2xl font-bold text-emerald-600">
                Rp{{ shortNumber(product.price) }}
              </h1>
            </div>
          </RouterLink>
        </div>
      </template>

      <template v-else-if="productStore.state.loading">
        <div
          v-for="index in 8"
          :key="index"
          class="w-full h-full border border-slate-100 rounded-xl"
        >
          <UiSkeleton class="w-full rounded-xl h-60" />

          <div class="px-4 pt-2 pb-6 space-y-1">
            <UiSkeleton class="w-32 h-6 rounded-lg" />

            <UiSkeleton class="w-40 h-4 mt-2 rounded-lg" />

            <UiSkeleton class="w-32 h-10 !mt-4 rounded-lg" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "public": true,
    "layout": "AppLayout"
  }
}
</route>
