import {tv} from 'tailwind-variants'
import type {ReactNode} from 'react'

const paragraphStyle = tv({
  base: 'text-gray-700 whitespace-pre-wrap',
  variants: {
    size: {
      xs: 'text-xs sm:text-sm',
      small: 'text-sm sm:text-base',
      large: 'sm:text-lg/7 sm:mx-16',
      xl: 'text-lg sm:text-xl/8 sm:mx-156',
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

export function Paragraph({
  size = 'small',
  align = 'center',
  className,
  children,
}: {
  size?: 'xs' | 'small' | 'large' | 'xl'
  align?: 'left' | 'center' | 'right'
  className?: string
  children: ReactNode
}) {
  return <p className={paragraphStyle({size, align, className})}>{children}</p>
}
