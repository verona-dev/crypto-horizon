<template>
  <div
    :class="
      cn(
        'grid lg:auto-rows-[14rem] grid-cols-1 xl:grid-cols-3 gap-4 max-w-7xl mx-auto ',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>
