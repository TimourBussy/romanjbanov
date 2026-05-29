import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {useScrollToTop} from '../hooks/useScrollToTop'
import {Block} from '../ui/Block'
import {Title} from '../ui/Title'
import {getBackgroundColorHex} from '../../../sanity/lib/tailwindColors'

export function Page({slug}: {slug: string}) {
  const page = usePage(slug)
  const {i18n} = useTranslation()
  useScrollToTop(slug)

  const lang = i18n.language
  const isFirstBlockHeroImage = page?.body?.[0]?._type === 'heroImage'

  return (
    <main className="flex-1">
      {page && (
        <>
          {isFirstBlockHeroImage && <Block block={page.body![0]} />}
          {page.displayTitle && (
            <Title level={2} className="mb-4">
              {lang === 'FR' ? page.title.FR : page.title.EN}
            </Title>
          )}
          {(isFirstBlockHeroImage ? page.body?.slice(1) : page?.body)?.map((block) => {
            const bgColor =
              'backgroundColor' in block && block.backgroundColor
                ? getBackgroundColorHex(block.backgroundColor)
                : null

            return (
              <div
                key={block._key}
                className={`py-16 ${!bgColor ? 'max-w-7xl mx-auto' : ''}`}
                style={bgColor ? {backgroundColor: bgColor} : undefined}
              >
                <div className={bgColor ? 'max-w-7xl mx-auto' : ''}>
                  <Block block={block} />
                </div>
              </div>
            )
          })}
        </>
      )}
    </main>
  )
}
