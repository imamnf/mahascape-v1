<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@ui/navigation-menu';

// State
const menus = [
  { title: 'Tentang Kami', to: '/tentang' },
  { title: 'Produk', to: '/produk' }
];
</script>

<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="menu in menus" :key="menu.title">
        <UiNavigationMenuLink as-child>
          <RouterLink v-slot="{ href, navigate }" v-bind="$props" :to="menu.to" custom>
            <a v-bind="$attrs" :class="navigationMenuTriggerStyle()" :href="href" @click="navigate">
              {{ menu.title }}
            </a>
          </RouterLink>
        </UiNavigationMenuLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
