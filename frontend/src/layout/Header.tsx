import {useTranslation} from 'react-i18next'
import {NavItem} from '../ui/NavItem'
import {LanguageSwitcher} from '../ui/LanguageSwitcher'
import {Link} from 'react-router-dom'
import {useSettings} from '../hooks/usePages'
import {useState} from 'react'
import {FiMenu, FiMusic, FiX} from 'react-icons/fi'

export function Header() {
  const {i18n} = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const settings = useSettings()

  const menuItems = settings?.navigationMenu || []

  const getSlug = (page: any) => (page.slug?.FR?.current !== '/' ? `/${page.slug.FR.current}` : '/')

  const getTitle = (page: any) => page.title[i18n.language] || page.title.FR

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm transition-all duration-500">
      <div className="flex h-16 items-center justify-between px-36">
        <Link to="/" className="cursor-pointer flex items-center gap-2">
          <FiMusic size={32} className="text-amber-700" />
          <span className="text-xl font-semibold text-gray-900">Roman Jbanov</span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex md:gap-4 text-sm text-gray-700">
          <ul className="flex justify-center gap-x-4">
            {menuItems
              .filter((item) => item.page)
              .map((item) => {
                const page = item.page
                const title = getTitle(page)

                const subItems =
                  item.children?.flatMap((child: any) => {
                    if (child._type === 'ensemblesListItem') {
                      return (settings?.ensembles || []).map((ensemble) => ({
                        to: `/ensembles/${ensemble.slug.current}`,
                        label: ensemble.name,
                      }))
                    }
                    if (child._type === 'submenuItem' && child.page) {
                      return [
                        {
                          to: getSlug(child.page),
                          label: getTitle(child.page),
                        },
                      ]
                    }
                    return []
                  }) || []

                return (
                  <NavItem
                    key={page._id}
                    to={getSlug(page)}
                    subItems={subItems.length > 0 ? subItems : undefined}
                  >
                    {title}
                  </NavItem>
                )
              })}
          </ul>
          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        {/* Hamburger */}
        <div className="sm:absolute top-0 bottom-0 right-6 flex flex-row-reverse items-center justify-center gap-2">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-30 md:hidden py-2 rounded-xl text-gray-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Hamburger dropdown menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMobileMenuOpen(false)} />
          <nav className="md:hidden relative z-20 border-t text-gray-700 border-gray-200 bg-white">
            <ul className="flex flex-col">
              {menuItems
                .filter((item) => item.page)
                .map((item) => {
                  const page = item.page
                  const slug = getSlug(page)

                  const subItems =
                    item.children?.flatMap((child: any) => {
                      if (child._type === 'ensemblesListItem') {
                        return (settings?.ensembles || []).map((ensemble) => ({
                          to: `/ensembles/${ensemble.slug.current}`,
                          label: ensemble.name,
                        }))
                      }
                      if (child._type === 'submenuItem' && child.page) {
                        return [
                          {
                            to: getSlug(child.page),
                            label: getTitle(child.page),
                          },
                        ]
                      }
                      return []
                    }) || []

                  return (
                    <NavItem
                      key={page._id}
                      to={slug}
                      onClick={() => setMobileMenuOpen(false)}
                      subItems={subItems.length > 0 ? subItems : undefined}
                    >
                      {getTitle(page)}
                    </NavItem>
                  )
                })}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}
