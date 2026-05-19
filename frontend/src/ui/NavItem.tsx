import {NavLink, useLocation} from 'react-router-dom'
import {useState} from 'react'
import {FiChevronDown} from 'react-icons/fi'
import {Submenu, type SubmenuItem} from './Submenu'

export function NavItem({
  to,
  children,
  subItems,
  onClick,
  className,
}: {
  to: string
  children: React.ReactNode
  subItems?: {to: string; label: string}[]
  onClick?: () => void
  className?: string
}) {
  const location = useLocation()
  const isChildActive = subItems?.some((item) => location.pathname.startsWith(item.to)) ?? false
  const [mobileOpen, setMobileOpen] = useState(false)

  const submenuItems: SubmenuItem[] = subItems?.map((item) => ({
    to: item.to,
    label: item.label,
    onClick: onClick,
  })) || []

  const handleSubmenuItemClick = (item: SubmenuItem) => {
    item.onClick?.()
    setMobileOpen(false)
  }

  return (
    <li className={className || 'group relative'}>
      {/* Desktop */}
      <NavLink
        to={to}
        onClick={onClick}
        className={({isActive}) =>
          `hidden md:flex gap-1 px-2 py-2 transition-colors duration-200 ${isActive || isChildActive ? 'font-semibold text-amber-700' : 'hover:text-amber-700'}`
        }
        end
      >
        {children}
        {subItems && (
          <FiChevronDown
            className="mt-1.25 group-hover:rotate-180 transition-transform duration-200"
            aria-hidden
          />
        )}
      </NavLink>

      {/* Mobile */}
      <div className="md:hidden">
        {subItems ? (
          <>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-full flex gap-1 items-center px-2 py-2 font-semibold transition-colors duration-200"
            >
              {children}
              <FiChevronDown
                className={`mt-0.5 ${mobileOpen ? 'rotate-180' : ''} transition-transform duration-200`}
                aria-hidden
              />
            </button>
            <Submenu
              isOpen={mobileOpen}
              items={submenuItems}
              variant="inline"
              onItemClick={handleSubmenuItemClick}
            />
          </>
        ) : (
          <NavLink
            to={to}
            onClick={onClick}
            className={({isActive}) =>
              `flex px-2 py-2 ${isActive ? 'font-semibold text-amber-700' : ''}`
            }
            end
          >
            {children}
          </NavLink>
        )}
      </div>

      {/* Desktop dropdown */}
      {subItems && (
        <ul className="absolute left-0 top-full z-50 hidden md:group-hover:flex flex-col bg-white shadow-lg rounded-md min-w-max">
          {subItems.map((item, index) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({isActive}) =>
                  `block pl-4 pr-12 text-left hover:bg-amber-50 transition-colors
                  ${index === 0 ? 'pt-4 pb-2' : index === subItems.length - 1 ? 'pt-2 pb-4' : 'py-2'}
                  ${isActive ? 'text-amber-700 bg-amber-50' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
