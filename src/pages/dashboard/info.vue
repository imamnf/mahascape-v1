<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { FormField as UiFormField } from '@ui/form';
import { useToast } from '@ui/toast/use-toast';

import { useAboutStore } from '@store/about.store';

// Store
const aboutStore = useAboutStore();

// State
const { toast } = useToast();

/**
 *  Form
 */

// Schema
const schema = toTypedSchema(
  z.object({
    about: z.string({ required_error: 'Tentang Kami tidak boleh kosong' }),
    visi: z.string({ required_error: 'Visi tidak boleh kosong' }),
    misi: z.string({ required_error: 'Misi tidak boleh kosong' }),
    phone: z.string({ required_error: 'Nomor Telepon tidak boleh kosong' })
  })
);

// Validation
const { handleSubmit, setValues } = useForm({
  validationSchema: schema
});

// Model
useField<string>('about');
useField<string>('visi');
useField<string>('misi');
useField<string>('phone');

// Action
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    about: values.about,
    vision: values.visi,
    mission: values.misi,
    phone: values.phone
  };

  try {
    await aboutStore.updateAbout(payload);
  } finally {
    if (aboutStore.updateState.show && aboutStore.updateState.success) {
      toast({
        title: 'Ubah Profil Perusahaan Berhasil!',
        description: `Profil Perusahaan Berhasil Diubah`
      });
    }
  }
});

// Hooks
onBeforeMount(() => {
  aboutStore.getAbout();
});

watchEffect(() => {
  if (aboutStore.state.data) {
    setValues({
      about: aboutStore.state.data[0]?.about,
      visi: aboutStore.state.data[0]?.vision,
      misi: aboutStore.state.data[0]?.mission,
      phone: aboutStore.state.data[0]?.phone
    });
  }
});
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <UiFormField v-slot="{ componentField }" name="about">
      <UiFormItem>
        <UiFormLabel>Tentang Kami</UiFormLabel>
        <UiFormControl>
          <UiTextarea
            v-bind="componentField"
            class="resize-none"
            :placeholder="
              aboutStore.state.loading
                ? 'Mengambil data informasi...'
                : 'Tulis Tentang Profil Perusahaan'
            "
            :disabled="aboutStore.state.loading"
          />
        </UiFormControl>

        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <div class="grid grid-cols-2 gap-x-8">
      <div class="col-span-1">
        <UiFormField v-slot="{ componentField }" name="visi">
          <UiFormItem>
            <UiFormLabel>Visi</UiFormLabel>
            <UiFormControl>
              <UiTextarea
                v-bind="componentField"
                :placeholder="
                  aboutStore.state.loading ? 'Mengambil data informasi...' : 'Tulis Visi Perusahaan'
                "
                :disabled="aboutStore.state.loading"
                class="resize-none"
              />
            </UiFormControl>
            <UiFormDescription>Tambahkan koma(,) sebagai pemisah</UiFormDescription>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <div class="col-span-1">
        <UiFormField v-slot="{ componentField }" name="misi" class="w-full">
          <UiFormItem>
            <UiFormLabel>Misi</UiFormLabel>
            <UiFormControl>
              <UiTextarea
                v-bind="componentField"
                :placeholder="
                  aboutStore.state.loading ? 'Mengambil data informasi...' : 'Tulis Misi Perusahaan'
                "
                :disabled="aboutStore.state.loading"
                class="resize-none"
              />
            </UiFormControl>
            <UiFormDescription>Tambahkan koma(,) sebagai pemisah</UiFormDescription>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </div>

    <UiFormField v-slot="{ componentField }" name="phone">
      <UiFormItem>
        <UiFormLabel>Nomor Telepon</UiFormLabel>
        <UiFormControl>
          <UiInput
            v-bind="componentField"
            :placeholder="
              aboutStore.state.loading
                ? 'Mengambil data informasi...'
                : 'Tulis Nomor Telepon Perusahaan'
            "
            :disabled="aboutStore.state.loading"
            class="resize-none"
          />
        </UiFormControl>

        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <UiButton class="w-full" :disabled="aboutStore.updateState.loading">
      <Icon v-if="aboutStore.updateState.loading" name="Loader2" class="mr-2 size-4 animate-spin" />
      <Icon v-else name="Pencil" class="mr-2 size-4" />

      {{ aboutStore.updateState.loading ? 'Menyimpan...' : 'Ubah Info' }}
    </UiButton>
  </form>
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
        "name": "Info",
        "redirect": "/dashboard/info"
      }
    ],
    "title": "Info",
    "layout": "AppDashboardLayout"
  }
}
</route>
