<script setup lang="ts">
import { useRouter } from 'vue-router';
import { VisuallyHidden } from 'radix-vue';

import { useToast } from '@ui/toast/use-toast';

import { useAuthStore } from '@store/auth.store';

// Store
const authStore = useAuthStore();

// State
const router = useRouter();
const { toast } = useToast();
const user = ref<{ name: string; role: string }>(
  JSON.parse(localStorage.getItem('user') as string)
);

// Methods
async function signOut() {
  try {
    await authStore.signOut();
  } finally {
    if (authStore.signOutState.show) {
      if (authStore.signOutState.error) {
        toast({
          title: 'Keluar Gagal!',
          variant: 'destructive',
          description: authStore.signOutState.message.error
        });
      } else if (authStore.signOutState.success) {
        toast({
          title: 'Keluar Berhasil!',
          description: authStore.signOutState.message.success
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        router.push('/sign-in');

        await nextTick();

        authStore.signOutState = {
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
}

/**
 *  Dialog
 */

// State
const dialog = ref(false);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="secondary" size="icon" class="rounded-full">
        <Icon name="CircleUser" class="size-5" />
        <span class="sr-only">Toggle user menu</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuLabel>
        <div class="flex flex-col">
          <h5 class="text-base text-slate-700">
            {{ user.name }}
          </h5>
          <h6 class="text-sm font-normal text-slate-400">
            {{ user.role }}
          </h6>
        </div>
      </UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem
        class="cursor-pointer text-rose-500 focus:text-rose-600 focus:bg-rose-50 focus:font-semibold"
        @click="dialog = true"
      >
        <Icon name="LogOut" class="mr-1 size-4" />

        <h6>Keluar</h6>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>

  <UiDialog v-model:open="dialog">
    <UiDialogContent class="sm:max-w-md">
      <VisuallyHidden>
        <UiDialogHeader>
          <UiDialogTitle>Keluar</UiDialogTitle>
        </UiDialogHeader>
      </VisuallyHidden>

      <div class="flex justify-center py-8">
        <p class="text-center text-slate-500">
          Anda yakin ingin keluar? Anda akan dikeluarkan dari aplikasi. Anda tidak dapat membatalkan
          tindakan ini.
        </p>
      </div>

      <UiDialogFooter class="sm:justify-between">
        <UiDialogClose as-child>
          <UiButton type="button" variant="secondary" :disabled="authStore.signOutState.loading">
            Close
          </UiButton>
        </UiDialogClose>

        <UiButton
          type="button"
          variant="destructive"
          :disabled="authStore.signOutState.loading"
          @click="signOut"
        >
          <Icon
            v-if="authStore.signOutState.loading"
            name="Loader2"
            class="mr-2 size-4 animate-spin"
          />
          <Icon v-else name="LogOut" class="mr-2 size-4" />

          Keluar!
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
