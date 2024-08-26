<script setup lang="ts">
import { UseImage } from '@vueuse/components';

// Props
const { title = '', image = '/image/about.jpg' } = defineProps<{
  title?: string;
  image?: string;
}>();
</script>

<template>
  <div class="relative">
    <UseImage :src="image" class="object-cover object-top w-full h-80" />

    <div class="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h1 class="mb-6 text-6xl font-bold text-white">
        {{ title }}
      </h1>
    </div>
  </div>
</template>
