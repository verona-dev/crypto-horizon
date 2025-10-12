<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
    ProgressIndicator,
    ProgressRoot,
    type ProgressRootProps,
} from 'reka-ui'
import { cn } from "@/lib/utils"

const props = withDefaults(
    defineProps<ProgressRootProps & {
        class?: HTMLAttributes['class'],
        indicatorColor?: string,
    }>(),  {
    modelValue: 0,
        indicatorColor: '',
  },
)

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        props.class,
      )
    "
  >
      <ProgressIndicator
          class="progress-indicator bg-primary h-full w-full flex-1 transition-all"
          :style="{
        background: props.indicatorColor,
        transform: `translateX(-${100 - (props.modelValue ?? 0)}%)`
    }"
      />
  </ProgressRoot>
</template>
