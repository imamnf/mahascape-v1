<script setup lang="ts">
import type { MenuData } from '@type/core.types';

import { useCoreStore } from '@store/core.store';

// Store
const coreStore = useCoreStore();

// State
const menus = ref<MenuData[]>();

// Methods
watchEffect(() => {
  if (coreStore.menuState.success) {
    menus.value = coreStore.menuState.data;
  }
});
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
      <RouterLink v-slot="{ isActive, href, navigate }" v-bind="$props" to="/" custom>
        <a
          v-bind="$attrs"
          class="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group size-9 shrink-0 bg-primary text-primary-foreground md:size-8 md:text-base"
          :href="href"
          :class="isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'"
          @click="navigate"
        >
          <Icon name="Flower" class="transition-all size-4 group-hover:scale-110" />
          <span class="sr-only">Putra Mahameru Landscape</span>
        </a>
      </RouterLink>

      <UiTooltipProvider v-for="menu in menus" :key="menu.slug">
        <UiTooltip>
          <UiTooltipTrigger>
            <RouterLink
              v-slot="{ isActive, href, navigate }"
              v-bind="$props"
              :key="menu.slug"
              custom
              :to="menu.redirect"
            >
              <a
                v-bind="$attrs"
                class="flex items-center justify-center transition-colors rounded-lg size-9 hover:text-foreground md:size-8"
                :class="isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'"
                :href
                @click="navigate"
              >
                <Icon :name="menu.icon" class="size-5" />
                <span class="sr-only">{{ menu.name }}</span>
              </a>
            </RouterLink>
          </UiTooltipTrigger>

          <UiTooltipContent side="right">
            {{ menu.name }}
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </nav>
  </aside>
</template>
