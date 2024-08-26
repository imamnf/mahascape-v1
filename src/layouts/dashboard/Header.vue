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
  <header
    class="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
  >
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton size="icon" variant="outline" class="sm:hidden">
          <Icon name="PanelLeft" class="size-5" />
          <span class="sr-only">Toggle Menu</span>
        </UiButton>
      </UiSheetTrigger>

      <UiSheetContent side="left" class="sm:max-w-xs">
        <nav class="grid gap-6 text-lg font-medium">
          <a
            href="#"
            class="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
          >
            <Icon name="Package2" class="transition-all size-5 group-hover:scale-110" />
            <span class="sr-only">Acme Inc</span>
          </a>

          <RouterLink
            v-for="menu in menus"
            v-slot="{ isActive, href, navigate }"
            v-bind="$props"
            :key="menu.slug"
            custom
            :to="menu.redirect"
          >
            <a
              v-bind="$attrs"
              class="flex items-center gap-4 px-2.5"
              :href="href"
              :class="isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
              @click="navigate"
            >
              <Icon :name="menu.icon" class="size-4" />

              {{ menu.name }}
            </a>
          </RouterLink>
        </nav>
      </UiSheetContent>
    </UiSheet>

    <div class="flex justify-between w-full">
      <DashboardBreadcrumb />

      <DashboardUser />
    </div>
  </header>
</template>
