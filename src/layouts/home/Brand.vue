<template>
  <RouterLink v-slot="{ href, navigate }" v-bind="$props" to="/" custom>
    <div class="flex items-center cursor-pointer gap-x-2 text-emerald-600 hover:text-emerald-800">
      <Icon name="Flower" class="transition-all size-6 group-hover:scale-110" />

      <a v-bind="$attrs" class="text-xl font-bold" :href="href" @click="navigate">
        <span>Mahameru Landscape</span>
      </a>
    </div>
  </RouterLink>
</template>
