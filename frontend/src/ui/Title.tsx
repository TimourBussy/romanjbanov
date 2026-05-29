import {tv} from 'tailwind-variants'
import type {JSX} from 'react'

const titleStyle = tv({
  variants: {
    level: {
      1: 'text-6xl sm:text-7xl font-semibold',
      2: 'text-xl sm:text-2xl',
      3: 'text-2xl sm:text-3xl',
      4: 'text-xl sm:text-2xl leading-none',
      5: 'text-md sm:text-lg leading-none font-semibold',
      6: 'sm:text-lg leading-none',
    },
    colored: {
      true: 'text-amber-700',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})

export function Title({
  level,
  colored = false,
  align = 'center',
  className,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6
  colored?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
  children: string
}) {
  const H = `h${level}` as keyof JSX.IntrinsicElements

  return <H className={titleStyle({level, colored, align, className})}>{children}</H>
}
