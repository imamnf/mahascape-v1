<script setup lang="ts">
import { useRouter } from 'vue-router';
import { UseImage } from '@vueuse/components';

import { useProductStore } from '@store/product.store';

// Store
const productStore = useProductStore();

// State
const router = useRouter();
const base_uri = 'https://oxgkxpzxyzcwrkakntgd.supabase.co/storage/v1/object/public/product';

const { shortNumber } = useNumber();

onBeforeMount(() => {
  productStore.getProducts();
});
</script>

<template>
  <UiCard class="w-full">
    <UiCardHeader>
      <UiCardTitle>List Produk</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <section class="grid grid-cols-4 gap-8 my-4">
        <div
          class="w-full h-full py-24 transition-all bg-white border cursor-pointer border-slate-100 rounded-xl hover:bg-slate-100 group"
          @click="router.push('/dashboard/produk/add')"
        >
          <div class="flex flex-col items-center justify-center w-full h-full gap-y-2">
            <Icon name="Plus" class="size-12 text-slate-400 group-hover:text-slate-600" />

            <span class="text-2xl text-slate-400 group-hover:text-slate-600">Tambah</span>
          </div>
        </div>

        <template v-if="productStore.state.show">
          <div
            v-for="product in productStore.state.data"
            :key="product.id"
            class="transition-all border cursor-pointer border-slate-100 rounded-xl group hover:shadow-lg hover:shadow-slate-400/20"
            @click="router.push(`/dashboard/produk/${product.slug}`)"
          >
            <UseImage
              :src="`${`${base_uri}/${product.image}`}.jpg`"
              class="object-cover object-center h-60 rounded-t-xl"
            />

            <div class="px-4 pt-2 pb-6 space-y-1">
              <h3 class="text-lg font-bold text-slate-800 group-hover:underline">
                {{ product.name }}
              </h3>

              <p class="text-sm leading-tight text-slate-500">
                {{ product.description }}
              </p>

              <h1 class="!mt-4 text-2xl font-bold text-emerald-600">
                Rp{{ shortNumber(product.price) }}
              </h1>
            </div>
          </div>
        </template>

        <template v-else-if="productStore.state.loading">
          <div v-for="index in 7" :key="index" class="border border-slate-100 rounded-xl">
            <UiSkeleton class="w-full rounded-xl h-60" />

            <div class="px-4 pt-2 pb-6 space-y-1">
              <UiSkeleton class="w-32 h-6 rounded-lg" />

              <UiSkeleton class="w-40 h-4 mt-2 rounded-lg" />

              <UiSkeleton class="w-24 h-10 !mt-4 rounded-lg" />
            </div>
          </div>
        </template>
      </section>
    </UiCardContent>
  </UiCard>
</template>

<route lang="json">
{
  "meta": {
    "breadcrumb": [
      {
        "name": "Dashboard",
        "redirect": "/dashboard"
      },
      {
        "name": "Produk",
        "redirect": "/dashboard/produk"
      }
    ],
    "title": "Produk",
    "layout": "AppDashboardLayout"
  }
}
</route>
