<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useRouter } from 'vue-router/auto';

import { useToast } from '@ui/toast/use-toast';
import { FormField as UiFormField } from '@ui/form';

import { useAuthStore } from '@store/auth.store';

// Store
const authStore = useAuthStore();

// State
const router = useRouter();
const { toast } = useToast();

// Schema
const schema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Email tidak boleh kosong' })
      .email({ message: 'Email tidak valid' }),
    password: z
      .string({ required_error: 'Password tidak boleh kosong' })
      .min(6, { message: 'Password minimal 6 digit' })
  })
);

// Validation
const { handleSubmit } = useForm({
  validationSchema: schema
});

// Model
const { value: EmailForm } = useField<string>('email');
const { value: PasswordForm } = useField<string>('password');

// Action
const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.signIn(values);
  } finally {
    if (authStore.signInState.show) {
      if (authStore.signInState.error) {
        toast({
          title: 'Masuk Gagal!',
          variant: 'destructive',
          description: authStore.signInState.message.error
        });
      } else if (authStore.signInState.success) {
        toast({
          title: 'Masuk Berhasil!',
          description: authStore.signInState.message.success
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        router.push('/dashboard');

        await nextTick();

        authStore.signInState = {
          error: false,
          loading: false,
          show: false,
          success: false,
          message: {
            error: '',
            success: ''
          }
        };
      }
    }
  }
});
</script>

<template>
  <UiCard class="w-full max-w-sm">
    <UiCardHeader>
      <UiCardTitle class="text-2xl"> Masuk </UiCardTitle>
      <UiCardDescription>
        Masukkan alamat email Anda di bawah untuk masuk ke akun Anda.
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <UiFormField v-slot="{ componentField }" name="email">
          <UiFormItem>
            <UiFormLabel>Email</UiFormLabel>

            <UiFormControl>
              <UiInput
                v-model="EmailForm"
                type="text"
                placeholder="email@example.com"
                v-bind="componentField"
              />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>Password</UiFormLabel>

            <UiFormControl>
              <UiInput
                v-model="PasswordForm"
                type="password"
                placeholder="•••••••••"
                v-bind="componentField"
              />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiButton
          class="w-full"
          :disabled="authStore.signInState.loading || authStore.signInState.success"
        >
          <Icon
            v-if="authStore.signInState.loading"
            name="Loader2"
            class="mr-2 size-4 animate-spin"
          />
          <Icon v-else name="LogIn" class="mr-2 size-4" />

          Masuk
        </UiButton>
      </form>
    </UiCardContent>
  </UiCard>
</template>

<route lang="json">
{
  "alias": ["/sign-in", "/login", "/masuk"],
  "meta": {
    "layout": "AppAuthLayout",
    "public": true
  }
}
</route>
