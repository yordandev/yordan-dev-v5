<template>
  <header class="flex flex-col gap-4 mb-32">
    <IridescentCircle />
    <div class="flex flex-col gap-0">
      <NuxtLink
        to="/"
        class="text-base font-medium text-slate-700"
        data-umami-event="Logo clicked"
        >Yordan Atanasov</NuxtLink
      >
      <p class="text-sm">Software &amp; things</p>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
