<script setup lang="ts">
import { useAboutStore } from '@store/about.store';

// Store
const aboutStore = useAboutStore();

// State
const data = ref<string>();

watchEffect(() => {
  if (aboutStore.state.data) {
    data.value = aboutStore.state.data[0]?.about;
  }
});
</script>

<template>
  <div class="text-center">
    <p class="text-lg leading-relaxed px-44 text-slate-600">
      {{ data }}
    </p>
  </div>
</template>
