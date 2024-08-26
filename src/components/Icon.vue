<script setup lang="ts">
import * as icons from 'lucide-vue-next';

const {
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  defaultClass = 'lucide-icon',
  name
} = defineProps<{
  color?: string;
  defaultClass?: string;
  name: string;
  size?: number;
  strokeWidth?: number;
}>();

const icon = computed(() => icons[name as keyof typeof icons]);
</script>

<template>
  <component :is="icon" :size :color :stroke-width :default-class />
</template>
