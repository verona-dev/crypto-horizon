export default defineAppConfig({
   ui: {
      primary: 'pink-french',
      gray: 'customGray',

      card: {
         base: '',
         background: 'bg-transparent dark:bg-gray-900',
         // divide: 'divide-y divide-gray-200 dark:divide-gray-800',
         // ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
         // rounded: 'rounded-lg',
         // shadow: 'shadow',
         // body: {
         //    base: '',
         //    background: '',
         //    padding: 'px-4 py-5 sm:p-6',
         // },
         // header: {
         //    base: '',
         //    background: '',
         //    padding: 'px-4 py-5 sm:px-6',
         // },
         // footer: {
         //    base: '',
         //    background: '',
         //    padding: 'px-4 py-4 sm:px-6',
         // },
      },

      pagination: {
         wrapper: 'flex items-center -space-x-px',
         base: '',
         rounded: 'first:rounded-s-md last:rounded-e-md',
         default: {
            size: 'sm',
            activeButton: {
               color: 'primary',
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

      table :{
         // wrapper: 'relative overflow-x-auto',
         // base: 'min-w-full table-fixed',
         // divide: 'divide-y divide-gray-300 dark:divide-gray-700',
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
      }

      // table: {
      //    thead: 'relative divide-yellow-200 dark:divide-yellow-800',
      //    tbody: 'divide-y divide-yellow-200 dark:divide-yellow-800',
      //    tr: {
      //       base: '',
      //       selected: 'bg-red-50 dark:bg-gray-800/50',
      //       active: 'hover:bg-red-50 dark:hover:bg-gray-800/50 cursor-pointer',
      //    },
      //    th: {
      //       base: 'text-left rtl:text-right',
      //       padding: 'px-4 py-3.5',
      //       color: 'text-red-900 dark:text-white',
      //       font: 'font-semibold',
      //       size: 'text-sm',
      //    },
      //    td: {
      //       base: 'whitespace-nowrap',
      //       padding: 'px-4 py-4',
      //       color: 'text-red-500 dark:text-gray-400',
      //       font: '',
      //       size: 'text-sm',
      //    },
      //
      //    sortAscIcon: 'octicon:sort-asc',
      //    sortDescIcon: 'octicon:sort-desc',
      //    sortButton: {
      //       icon: 'octicon:arrow-switch'
      //    },
      //    loadingState: {
      //       icon: 'octicon:sync'
      //    },
      //    emptyState: {
      //       icon: 'octicon:database'
      //    }
      // }
   }
})