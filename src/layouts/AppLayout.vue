<template>
  <HomeNavbar />

  <div class="space-y-16">
    <RouterView />
  </div>

  <HomeFooter />
</template>

<route lang="json">
{
  "meta": {
    "public": true
  }
}
</route>
