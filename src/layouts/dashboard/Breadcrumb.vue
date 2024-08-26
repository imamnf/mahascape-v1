<script setup lang="ts">
import { useRoute } from 'vue-router/auto';

// State
const route = useRoute();
const breadcrumb = ref<{ name: string; redirect: string }[]>();

watchEffect(() => {
  if (route.meta.breadcrumb) {
    breadcrumb.value = route.meta.breadcrumb as { name: string; redirect: string }[];
  }
});
</script>

<template>
  <UiBreadcrumb class="hidden md:flex">
    <UiBreadcrumbList v-if="breadcrumb">
      <UiBreadcrumbItem v-for="crumb in breadcrumb" :key="crumb.name">
        <UiBreadcrumbPage v-if="crumb.redirect === route.fullPath">
          {{ crumb.name }}
        </UiBreadcrumbPage>

        <UiBreadcrumbLink v-else as-child>
          <RouterLink :to="crumb.redirect">
            {{ crumb.name }}
          </RouterLink>
        </UiBreadcrumbLink>

        <UiBreadcrumbSeparator
          v-if="breadcrumb.length > 1 && breadcrumb.indexOf(crumb) !== breadcrumb.length - 1"
        />
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
