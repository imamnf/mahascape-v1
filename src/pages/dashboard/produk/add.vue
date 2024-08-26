<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useRouter } from 'vue-router';
import { UseImage } from '@vueuse/components';

import { FormField as UiFormField } from '@ui/form';
import { useToast } from '@ui/toast/use-toast';

import { useProductStore } from '@store/product.store';

// Store
const productStore = useProductStore();

// State
const router = useRouter();
const { toast } = useToast();

// Schema
const schema = toTypedSchema(
  z.object({
    image: z.string().optional(),
    name: z.string({ required_error: 'Nama tidak boleh kosong' }),
    description: z.string({ required_error: 'Deskripsi tidak boleh kosong' }),
    price: z.number({ required_error: 'Harga tidak boleh kosong' })
  })
);

// Validation
const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: schema
});

// Model
const previewImage = ref<{ url: string; file?: File } | null>(null);
useField<string | undefined>('image');
const { value: NameForm } = useField<string>('name');
const { value: DescriptionForm } = useField<string>('description');
const { value: PriceForm } = useField<number>('price');

// Action
function handleImageChange(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];

  setFieldValue('image', file?.name);
  previewImage.value = {
    url: file ? URL.createObjectURL(file) : '',
    file
  };
}

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    image: values.image as string,
    name: values.name,
    slug: `${values.name.toLowerCase().replace(/ /g, '-')}-${Math.floor(Math.random() * 10000)}`,
    description: values.description,
    price: values.price,
    image_file: previewImage.value?.file as File
  };

  try {
    await productStore.addProduct(payload);
  } finally {
    if (productStore.addState.show && productStore.addState.success) {
      toast({
        title: 'Produk Berhasil Ditambahkan!',
        description: `Produk ${payload.name} Berhasil Ditambahkan`
      });

      resetForm();
      await nextTick();

      router.push(`/dashboard/produk/${payload.slug}`);
    }
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

      <div class="px-32 pt-12 pb-16">
        <div class="grid grid-cols-12 gap-x-18">
          <div class="col-span-6">
            <UseImage
              v-if="previewImage"
              :src="previewImage?.url"
              class="object-cover object-center bg-white border-4 border-dashed size-96 border-slate-100 rounded-xl"
            >
              <template #loading> Loading.. </template>

              <template #error> Failed </template>
            </UseImage>

            <div v-else class="bg-white border-4 border-dashed size-96 border-slate-100 rounded-xl">
              <div class="flex flex-col items-center justify-center gap-y-2 size-full">
                <Icon name="Image" class="size-12 text-slate-200" />

                <span class="text-2xl text-slate-200"> Preview Gambar </span>
              </div>
            </div>
          </div>

          <div class="col-span-6">
            <form class="space-y-6" @submit.prevent="onSubmit">
              <UiFormField v-slot="{ componentField }" name="image">
                <UiFormItem>
                  <UiFormLabel>Unggah Gambar</UiFormLabel>

                  <UiFormControl>
                    <input
                      v-bind="componentField"
                      type="file"
                      class="w-full"
                      @change="handleImageChange"
                    />
                  </UiFormControl>

                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="name">
                <UiFormItem>
                  <UiFormLabel>Nama</UiFormLabel>

                  <UiFormControl>
                    <UiInput
                      v-model="NameForm"
                      type="text"
                      placeholder="Nama Produk"
                      v-bind="componentField"
                    />
                  </UiFormControl>

                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="description">
                <UiFormItem>
                  <UiFormLabel>Deskripsi</UiFormLabel>

                  <UiFormControl>
                    <UiTextarea
                      v-model="DescriptionForm"
                      placeholder="Deskripsi Produk"
                      v-bind="componentField"
                    />
                  </UiFormControl>

                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="price">
                <UiFormItem>
                  <UiFormLabel>Harga</UiFormLabel>

                  <UiFormControl>
                    <UiInput
                      v-model="PriceForm"
                      type="number"
                      placeholder="Harga Produk"
                      v-bind="componentField"
                    />
                  </UiFormControl>

                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiButton class="w-full" :disabled="productStore.addState.loading">
                <Icon
                  v-if="productStore.addState.loading"
                  name="Loader2"
                  class="mr-2 size-4 animate-spin"
                />
                <Icon v-else name="Plus" class="mr-2 size-4" />

                {{ productStore.addState.loading ? 'Menambahkan...' : 'Tambah Produk' }}
              </UiButton>
            </form>
          </div>
        </div>
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
