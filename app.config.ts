export default defineAppConfig({
   ui: {
      primary: 'customPrimary',
      gray: 'customGray',

      card: {
         base: '',
         background: 'bg-grey dark:bg-gray-900',
         divide: 'divide-y divide-gray-200 dark:divide-gray-800',
         ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
         rounded: 'rounded-lg',
         shadow: 'shadow',
         body: {
            base: '',
            background: '',
            padding: 'px-4 py-5 sm:p-6',
         },
         header: {
            base: '',
            background: '',
            padding: 'px-4 py-5 sm:px-6',
         },
         footer: {
            base: '',
            background: '',
            padding: 'px-4 py-4 sm:px-6',
         },
      },

      table: {
         thead: 'relative divide-yellow-200 dark:divide-yellow-800',
         tbody: 'divide-y divide-yellow-200 dark:divide-yellow-800',
         tr: {
            base: '',
            selected: 'bg-red-50 dark:bg-gray-800/50',
            active: 'hover:bg-red-50 dark:hover:bg-gray-800/50 cursor-pointer',
         },
         th: {
            base: 'text-left rtl:text-right',
            padding: 'px-4 py-3.5',
            color: 'text-red-900 dark:text-white',
            font: 'font-semibold',
            size: 'text-sm',
         },
         td: {
            base: 'whitespace-nowrap',
            padding: 'px-4 py-4',
            color: 'text-red-500 dark:text-gray-400',
            font: '',
            size: 'text-sm',
         },

         sortAscIcon: 'octicon:sort-asc',
         sortDescIcon: 'octicon:sort-desc',
         sortButton: {
            icon: 'octicon:arrow-switch'
         },
         loadingState: {
            icon: 'octicon:sync'
         },
         emptyState: {
            icon: 'octicon:database'
         }
      }
   }
})