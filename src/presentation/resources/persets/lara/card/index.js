export default {
  root: {
    class: [
      //Shape
      'rounded-md',
      'shadow-mb',

      //Color
      'bg-surface-0 dark:bg-surface-900',
      'text-surface-700 dark:text-surface-0'
    ]
  },
  body: {
    class: ['p-2']
  },
  title: {
    class: 'text-2xl font-bold mb-2'
  },
  subtitle: {
    class: [
      //Font
      'font-normal',

      //Spacing
      'mb-2',

      //Color
      'text-surface-600 dark:text-surface-0/30'
    ]
  },
  content: {
    class: 'py-5'
  },
  footer: {
    class: 'pt-5'
  }
}
