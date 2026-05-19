import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { Submenu, type SubmenuItem } from './Submenu'

const languages: { code: string; label: string[] }[] = [
  { code: 'FR', label: ['🇫🇷', 'Français'] },
  { code: 'RU', label: ['🇷🇺', 'Русский'] },
  { code: 'EN', label: ['🇬🇧', 'English'] },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)

  const menuItems: SubmenuItem[] = languages.map((lang) => ({
    label: lang.label,
    onClick: () => {
      i18n.changeLanguage(lang.code)
      setIsOpen(false)
    },
    isActive: i18n.language === lang.code,
  }))

  return (
    <div className="relative">
      {/* Desktop & Mobile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-sm font-bold flex items-center gap-2 text-gray-500 hover:text-amber-700 transition-colors"
      >
        <FiGlobe size={16} />
        <span className="font-light text-sm">
          {Array.isArray(currentLanguage?.label)
            ? currentLanguage?.label[0]
            : currentLanguage?.label}
        </span>
      </button>

      {/* Submenu Dropdown */}
      <Submenu
        isOpen={isOpen}
        items={menuItems}
        onItemClick={(item) => item.onClick?.()}
      />
    </div>
  )
}
