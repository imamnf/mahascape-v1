<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import { useAboutStore } from '@store/about.store';

// Store
const aboutStore = useAboutStore();

onBeforeMount(() => {
  aboutStore.getAbout();
});
</script>

<template>
  <HomeBanner title="Tentang Kami" />

  <div class="pt-4 pb-12 space-y-24">
    <HomeAboutUs />

    <HomeAboutVision />

    <HomeAboutMission />
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayout"
  }
}
</route>
