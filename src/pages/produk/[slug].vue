<script setup lang="ts">
import type { ProductData } from '@type/product.types';

import { useRoute, useRouter } from 'vue-router';
import { UseImage } from '@vueuse/components';

import { useProductStore } from '@store/product.store';

// Store
const productStore = useProductStore();

// State
const base_uri = 'https://oxgkxpzxyzcwrkakntgd.supabase.co/storage/v1/object/public/product';
const route = useRoute('produk-slug');
const router = useRouter();
const data = ref<ProductData[]>();
const { formatNumber } = useNumber();

// Hooks
onBeforeMount(() => {
  productStore.getProduct(route.params.slug);
});

watchEffect(() => {
  if (productStore.productState.data) {
    data.value = productStore.productState.data;
  }
});
</script>

<template>
  <template v-if="productStore.productState.show">
    <template v-for="product in data" :key="product.id">
      <HomeBanner :title="product.name" :image="`${`${base_uri}/${product.image}`}.jpg`" />

      <div class="px-32 cursor-pointer group">
        <div class="flex items-center gap-x-2" @click="router.push('/produk')">
          <UiButton size="icon" variant="outline">
            <Icon name="ChevronLeft" class="size-5" />
          </UiButton>

          <span class="text-lg group-hover:font-semibold text-slate-400">Produk Kami</span>
        </div>
      </div>

      <div class="grid grid-cols-12 px-32 pb-32 gap-x-12">
        <div class="col-span-6">
          <UseImage
            :src="`${`${base_uri}/${product.image}`}.jpg`"
            class="object-cover object-center w-full h-96 rounded-xl"
          />
        </div>

        <div class="col-span-6">
          <div class="py-8">
            <h1 class="text-4xl font-semibold text-slate-800">
              {{ product.name }}
            </h1>
            <h4 class="mt-2 text-3xl font-bold text-emerald-600">
              Rp{{ formatNumber(product.price) }}
            </h4>

            <div class="mt-8">
              <span class="text-sm font-semibold text-slate-400">Deksripsi</span>
              <p class="text-slate-500">
                {{ product.description }}
              </p>
            </div>

            <div class="flex flex-col mt-16 gap-y-1">
              <span class="text-sm font-semibold text-slate-600">Hubungi Kami</span>
              <span class="text-2xl font-bold text-emerald-600">0812 3456 7890</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </template>

  <template v-else-if="productStore.productState.loading">
    <UiSkeleton class="w-full h-80" />
  </template>
</template>

<route lang="json">
{
  "meta": {
    "public": true,
    "layout": "AppLayout"
  }
}
</route>
