export default defineAppConfig({
   ui: {
      primary: 'green',
      gray: 'cool',
      green: 'customGreen',
      aqua: 'aqua',

      card: {
         base: '',
         background: 'bg-transparent dark:bg-gray-900',
      },

      chip: {
         wrapper: 'relative inline-flex items-center justify-center flex-shrink-0',
         base: 'absolute rounded-full ring-1 ring-white dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium whitespace-nowrap',
         background: 'bg-{color}-500 dark:bg-{color}-400',
         position: {
            'top-right': 'top-0 right-0',
            'bottom-right': 'bottom-0 right-0',
            'top-left': 'top-0 left-0',
            'bottom-left': 'bottom-0 left-0',
         },
         translate: {
            'top-right': '-translate-y-1/2 translate-x-1/2 transform',
            'bottom-right': 'translate-y-1/2 translate-x-1/2 transform',
            'top-left': '-translate-y-1/2 -translate-x-1/2 transform',
            'bottom-left': 'translate-y-1/2 -translate-x-1/2 transform',
         },
         size: {
            '3xs': 'h-[4px] min-w-[4px] text-[4px] p-px',
            '2xs': 'h-[5px] min-w-[5px] text-[5px] p-px',
            xs: 'h-1.5 min-w-[0.375rem] text-[6px] p-px',
            sm: 'h-2 min-w-[0.5rem] text-[7px] p-0.5',
            md: 'h-2.5 min-w-[0.625rem] text-[8px] p-0.5',
            lg: 'h-3 min-w-[0.75rem] text-[10px] p-0.5',
            xl: 'h-3.5 min-w-[0.875rem] text-[11px] p-1',
            '2xl': 'h-4 min-w-[1rem] text-[12px] p-1',
            '3xl': 'h-5 min-w-[1.25rem] text-[14px] p-1',
         },
         default: {
            size: 'sm',
            color: 'primary',
            position: 'top-right',
            inset: false,
         },
      },

      notifications: {
         position: 'bottom-0 right-0'
      },

      pagination: {
         wrapper: 'flex items-center -space-x-px',
         base: '',
         rounded: 'first:rounded-s-md last:rounded-e-md',
         default: {
            size: 'sm',
            activeButton: {
               color: 'aqua',
            },
            inactiveButton: {
               color: 'white',
            },
            firstButton: {
               color: 'white',
               class: 'rtl:[&_span:first-child]:rotate-180',
               icon: 'i-heroicons-chevron-double-left-20-solid',
            },
            lastButton: {
               color: 'white',
               class: 'rtl:[&_span:last-child]:rotate-180',
               icon: 'i-heroicons-chevron-double-right-20-solid',
            },
            prevButton: {
               color: 'white',
               class: 'rtl:[&_span:first-child]:rotate-180',
               icon: 'i-heroicons-chevron-left-20-solid',
            },
            nextButton: {
               color: 'white',
               class: 'rtl:[&_span:last-child]:rotate-180',
               icon: 'i-heroicons-chevron-right-20-solid',
            },
         },
      },

      /*
      table :{
         wrapper: 'relative overflow-x-auto',
         base: 'min-w-full table-fixed',
         divide: 'divide-y divide-gray-300 dark:divide-gray-700',
         thead: 'relative',
         tbody: 'divide-y divide-gray-200 dark:divide-gray-800',
         caption: 'sr-only',
         tr: {
            base: '',
            selected: 'bg-gray-50 dark:bg-gray-800/50',
            active: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer',
         },
         th: {
            base: 'text-left rtl:text-right',
            padding: 'px-4 py-3.5',
            color: 'text-gray-900 dark:text-white',
            font: 'font-semibold',
            size: 'text-sm',
         },
         td: {
            base: 'whitespace-nowrap',
            padding: 'px-4 py-4',
            color: 'text-gray-500 dark:text-gray-400',
            font: '',
            size: 'text-sm',
         },
         checkbox: {
            padding: 'ps-4',
         },
         loadingState: {
            wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
            label: 'text-sm text-center text-gray-900 dark:text-white',
            icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin',
         },
         emptyState: {
            wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
            label: 'text-sm text-center text-gray-900 dark:text-white',
            icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4',
         },
         expand: {
            icon: 'transform transition-transform duration-200',
         },
         progress: {
            wrapper: 'absolute inset-x-0 -bottom-[0.5px] p-0',
         },
         default: {
            sortAscIcon: 'i-heroicons-bars-arrow-up-20-solid',
            sortDescIcon: 'i-heroicons-bars-arrow-down-20-solid',
            sortButton: {
               icon: 'i-heroicons-arrows-up-down-20-solid',
               trailing: true,
               square: true,
               color: 'gray',
               variant: 'ghost',
               class: '-m-1.5',
            },
            expandButton: {
               icon: 'i-heroicons-chevron-down',
               color: 'gray',
               variant: 'ghost',
               size: 'xs',
               class: '-my-1.5 align-middle',
            },
            checkbox: {
               color: 'primary',
            },
            progress: {
               color: 'primary',
               animation: 'carousel',
            },
            loadingState: {
               icon: 'i-heroicons-arrow-path-20-solid',
               label: 'Loading...',
            },
            emptyState: {
               icon: 'i-heroicons-circle-stack-20-solid',
               label: 'No items.',
            },
         },
      },
      */

      tabs: {
         wrapper: 'relative space-y-0',
         container: 'relative w-full',
         base: 'focus:outline-none',
         list: {
            base: 'relative',
            background: 'bg-gray-100 dark:bg-gray-800',
            rounded: 'rounded-lg',
            shadow: '',
            padding: 'p-1',
            height: 'h-10',
            width: 'w-full',
            marker: {
               wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
               base: 'w-full h-full',
               background: 'bg-white dark:bg-gray-900',
               rounded: 'rounded-md',
               shadow: 'shadow-sm',
            },
            tab: {
               base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
               background: '',
               active: 'text-gray-900 dark:text-white',
               inactive: 'text-gray-500 dark:text-gray-400',
               height: 'h-8',
               padding: 'px-3',
               size: 'text-sm',
               font: 'font-medium',
               rounded: 'rounded-md',
               shadow: '',
               icon: 'w-4 h-4 flex-shrink-0 mr-2',
            },
         },
      }

   }
})