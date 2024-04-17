export default {
  root: {
    class: [
      // Sizing and Shape
      'min-w-[12rem]',
      'rounded-md',
      // Spacing
      'py-2',
      // Colors
      'bg-surface-0 dark:bg-surface-700',
      'text-surface-700 dark:text-white/80',
      'border border-surface-200 dark:border-surface-700'
      // Before: Triangle
      // 'before:absolute before:-top-[9px] before:-ml-[9px] before:left-[calc(var(--overlayArrowLeft,0)+1.25rem)] z-0',
      // 'before:w-0 before:h-0',
      // 'before:border-transparent before:border-solid',
      // 'before:border-x-[8px] before:border-[8px]',
      // 'before:border-t-0 before:border-b-surface-300/10 dark:before:border-b-surface-700',
      // 'after:absolute after:-top-2 after:-ml-[8px] after:left-[calc(var(--overlayArrowLeft,0)+1.25rem)]',
      // 'after:w-0 after:h-0',
      // 'after:border-transparent after:border-solid',
      // 'after:border-x-[0.5rem] after:border-[0.5rem]',
      // 'after:border-t-0 after:border-b-surface-0 dark:after:border-b-surface-800'
    ]
  },
  menu: {
    class: [
      // Spacings and Shape
      'list-none',
      'm-0',
      'p-0',
      'outline-none'
    ]
  },
  content: ({ context }) => ({
    class: [
      //Shape
      'rounded-none',
      // Colors
      'text-surface-700 dark:text-white/80',
      {
        'bg-surface-200 text-surface-700 dark:bg-surface-300/10 dark:text-white': context.focused
      },
      // Transitions
      'transition-shadow',
      'duration-200',
      // States
      'hover:text-surface-700 dark:hover:text-white/80',
      'hover:bg-surface-100 dark:bg-surface-700 dark:hover:bg-surface-400/10'
    ]
  }),
  action: {
    class: [
      'relative',
      // Flexbox
      'flex',
      'items-center',
      // Spacing
      'py-3',
      'px-5',
      // Color
      'text-surface-700 dark:text-white/80',
      // Misc
      'no-underline',
      'overflow-hidden',
      'cursor-pointer',
      'select-none'
    ]
  },
  icon: {
    class: [
      // Spacing
      'mr-2',
      // Color
      'text-surface-600 dark:text-white/70'
    ]
  },
  label: {
    class: ['leading-none']
  },
  submenuheader: {
    class: [
      // Font
      'font-bold',
      // Spacing
      'm-0',
      'py-3 px-5',
      // Shape
      'rounded-tl-none',
      'rounded-tr-none',
      // Colors
      'bg-surface-0 dark:bg-surface-700',
      'text-surface-700 dark:text-white'
    ]
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass:
      'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0'
  }
}
