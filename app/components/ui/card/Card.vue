<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-border/50 hover:border-border-hover bg-card text-card-foreground shadow-2xl z-10',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
