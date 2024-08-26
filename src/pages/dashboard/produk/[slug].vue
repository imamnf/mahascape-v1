<script setup lang="ts">
import type { ProductData } from '@type/product.types';

import { useRoute, useRouter } from 'vue-router';
import { UseImage } from '@vueuse/components';

import { useToast } from '@ui/toast/use-toast';

import { useProductStore } from '@store/product.store';
import { VisuallyHidden } from 'radix-vue';

// Store
const productStore = useProductStore();

// State
const base_uri = 'https://oxgkxpzxyzcwrkakntgd.supabase.co/storage/v1/object/public/product';
const router = useRouter();
const route = useRoute('dashboard-produk-slug');
const { formatNumber } = useNumber();
const data = ref<ProductData[]>();
const { toast } = useToast();

/**
 *  Delete Product
 */

// State
const deleteDialog = reactive({
  isOpen: false
});

function openDeleteDialog() {
  deleteDialog.isOpen = true;
}

async function deleteProduct(image: string, slug: string) {
  const payload = {
    image,
    slug
  };

  try {
    await productStore.deleteProduct(payload);
  } finally {
    if (productStore.deleteState.show && productStore.deleteState.success) {
      toast({
        title: 'Produk Berhasil Dihapus!',
        description: `Produk ${data.value?.[0]?.name} Berhasil Ditambahkan`
      });

      router.push('/dashboard/produk');
    }
  }
}

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
  <UiCard class="w-full">
    <UiCardContent>
      <div class="pt-8 pb-4 cursor-pointer group">
        <div class="flex items-center gap-x-2" @click="router.push('/dashboard/produk')">
          <UiButton size="icon" variant="outline">
            <Icon name="ChevronLeft" class="size-5" />
          </UiButton>

          <span class="text-lg group-hover:font-semibold text-slate-400">List Produk</span>
        </div>
      </div>

      <div class="px-32 pt-8 pb-12">
        <template v-if="productStore.productState.show">
          <div v-for="product in data" :key="product.id" class="grid grid-cols-12 gap-x-16">
            <div class="col-span-6">
              <UseImage
                :src="`${`${base_uri}/${product.image}`}.jpg`"
                class="object-cover object-center rounded-xl size-96"
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

                <div class="mt-16">
                  <UiButton variant="destructive" @click="openDeleteDialog">
                    <Icon name="Trash" class="mr-2 size-4" />

                    Hapus Produk
                  </UiButton>
                </div>
              </div>
            </div>

            <UiDialog v-model:open="deleteDialog.isOpen">
              <UiDialogContent class="sm:max-w-[425px]">
                <UiDialogHeader>
                  <VisuallyHidden>
                    <UiDialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </UiDialogDescription>
                  </VisuallyHidden>
                </UiDialogHeader>

                <div class="flex flex-col items-center justify-center py-8 text-center gap-y-6">
                  <h1 class="text-xl font-semibold text-rose-600">
                    Apakah anda yakin ingin menghapus produk berikut?
                  </h1>

                  <p class="text-sm text-slate-600">
                    Jika anda menghapus produk ini, anda tidak dapat mengembalikannya dan anda
                    diharuskan menambahkan produk baru lagi.
                  </p>
                </div>

                <UiDialogFooter>
                  <UiDialogClose as-child>
                    <UiButton
                      v-if="!productStore.deleteState.loading"
                      type="button"
                      variant="secondary"
                    >
                      Batal
                    </UiButton>
                  </UiDialogClose>

                  <UiButton
                    variant="destructive"
                    type="button"
                    :disabled="productStore.deleteState.loading"
                    @click="deleteProduct(product.image, product.slug)"
                  >
                    <Icon
                      v-if="productStore.deleteState.loading"
                      name="Loader2"
                      class="mr-2 size-4 animate-spin"
                    />
                    <Icon v-else name="Trash" class="mr-2 size-4" />

                    {{ productStore.deleteState.loading ? 'Menghapus...' : 'Hapus Produk' }}
                  </UiButton>
                </UiDialogFooter>
              </UiDialogContent>
            </UiDialog>
          </div>
        </template>
        <template v-if="productStore.productState.loading">
          <div class="grid grid-cols-12 gap-x-16">
            <div class="col-span-6">
              <UiSkeleton class="rounded-xl size-96" />
            </div>

            <div class="col-span-6">
              <div class="py-8">
                <UiSkeleton class="h-12 rounded-lg w-96" />

                <UiSkeleton class="w-64 h-10 mt-2 rounded-lg" />

                <div class="mt-8">
                  <UiSkeleton class="w-16 h-4 rounded-lg" />
                  <UiSkeleton class="h-6 mt-1 rounded-lg w-52" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
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
      },
      {
        "name": "Tambah Produk",
        "redirect": "/dashboard/produk/add"
      }
    ],
    "title": "Tambah Produk",
    "layout": "AppDashboardLayout"
  }
}
</route>
