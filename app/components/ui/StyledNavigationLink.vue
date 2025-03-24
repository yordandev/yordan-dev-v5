<template>
  <NuxtLink
    :to
    :target
    v-bind="$attrs"
    class="inline-flex items-center underline underline-offset-4 focus:outline-2 focus:outline-offset-2"
  >
    <span class="flex items-center gap-0">
      <slot />
      <svg
        v-if="showIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

interface Props {
  to: RouteLocationRaw;
  target?: string;
  showIcon?: boolean;
}

withDefaults(defineProps<Props>(), {
  showIcon: false,
  target: undefined,
});
</script>
