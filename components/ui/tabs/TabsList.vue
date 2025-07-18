<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList, type TabsListProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(
      'bg-muted text-muted inline-flex h-9 items-center justify-center rounded-lg p-[3px] mx-auto my-10 py-6 px-1 w-3/5',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
