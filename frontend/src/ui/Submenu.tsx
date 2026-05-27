import {NavLink} from 'react-router-dom'
import {cva, type VariantProps} from 'class-variance-authority'

export interface SubmenuItem {
  to?: string
  label: string | string[]
  onClick?: () => void
  isActive?: boolean
}

const submenuVariants = cva('', {
  variants: {
    variant: {
      default: 'absolute right-0 mt-0 min-w-40 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg',
      inline: 'flex flex-col bg-gray-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const submenuItemVariants = cva(
  'flex items-center w-full transition-colors gap-2 rounded-md',
  {
    variants: {
      variant: {
        default: 'px-4 py-2 text-sm',
        inline: 'pl-6 pr-4 py-2 text-sm',
      },
      active: {
        false: 'text-gray-700 hover:bg-amber-50',
        true: 'text-amber-700 bg-amber-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      active: false,
    },
  }
)

const renderLabel = (label: string | string[]) => {
  if (Array.isArray(label)) {
    return label.map((item, idx) => (
      <span key={idx} className={idx === label.length - 1 ? 'font-semibold' : ''}>
        {item}
      </span>
    ))
  }
  return <span className="font-semibold">{label}</span>
}

type SubmenuVariants = VariantProps<typeof submenuVariants>

export function Submenu({
  isOpen,
  items,
  variant = 'default',
  className,
  onItemClick,
}: {
  isOpen: boolean
  items: SubmenuItem[]
  variant?: SubmenuVariants['variant']
  className?: string
  onItemClick?: (item: SubmenuItem) => void
}) {
  if (!isOpen) return null

  return (
    <div className={className || submenuVariants({variant})}>
      {items.map((item, index) => {
        const isActive = item.isActive || item.to === window.location.pathname

        if (item.to)
          return (
            <NavLink
              key={index}
              to={item.to}
              onClick={() => onItemClick?.(item)}
              className={({isActive: navIsActive}) => {
                const active = navIsActive || isActive
                return submenuItemVariants({variant, active})
              }}
            >
              {renderLabel(item.label)}
            </NavLink>
          )

        return (
          <button
            key={index}
            onClick={() => onItemClick?.(item)}
            className={submenuItemVariants({variant, active: isActive})}
          >
            {renderLabel(item.label)}
          </button>
        )
      })}
    </div>
  )
}
