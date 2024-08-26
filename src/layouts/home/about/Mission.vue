<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import { UseImage } from '@vueuse/components';

import { useAboutStore } from '@store/about.store';

// Store
const aboutStore = useAboutStore();

// State
const data = ref<string>();

watchEffect(() => {
  if (aboutStore.state.data) {
    data.value = aboutStore.state.data[0]?.mission;
  }
});
</script>

<template>
  <div class="grid w-full grid-cols-12 gap-x-4">
    <div class="col-span-5">
      <UseImage src="/image/vision.jpg" />
    </div>

    <div class="col-span-7">
      <div class="py-8 pl-20 pr-28">
        <div class="space-y-4">
          <h2 class="text-4xl font-bold text-emerald-600">Misi</h2>
          <ul class="pl-8 space-y-4 list-disc text-slate-600">
            <li v-for="mission in data?.split(',')" :key="mission">
              {{ mission }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
