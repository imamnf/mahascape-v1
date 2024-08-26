<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useCoreStore } from '@store/core.store';

// Store
const coreStore = useCoreStore();

// State
const route = useRoute();

// Hooks
onBeforeMount(() => {
  coreStore.getMenus();
});
</script>

<template>
  <div class="flex flex-col w-full min-h-screen bg-muted/40">
    <DashboardSidebar />

    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <DashboardHeader />

      <main class="p-4 sm:px-6 sm:py-0 md:gap-8">
        <h1 class="text-3xl font-semibold text-slate-700">
          {{ route.meta.title }}
        </h1>

        <div class="mt-4">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "requiredAuth": true
  }
}
</route>
