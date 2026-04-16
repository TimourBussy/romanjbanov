import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {useScrollToTop} from '../hooks/useScrollToTop'
import {HeroImage} from '../ui/HeroImage'
import {Block} from '../ui/Block'
import {Title} from '../ui/Title'

export function Page({slug}: {slug: string}) {
  const page = usePage(slug)
  const {i18n} = useTranslation()
  useScrollToTop(slug)

  return (
    <main className="flex-1">
      {page && (
        <>
          {page.heroImage?.src?.asset?.url && (
            <HeroImage
              src={page.heroImage.src.asset.url}
              alt={(i18n.language === 'FR' ? page.heroImage.altFr : page.heroImage.altEn) || ''}
            />
          )}
          <div className="my-16">
            {page.displayTitle && (
              <Title level={2} className="mb-4">
                {i18n.language === 'FR' ? page.title.FR : page.title.EN}
              </Title>
            )}
            <div className="max-w-4xl mx-auto px-6 flex flex-col gap-16">
              {page.body?.map((block) => (
                <Block key={block._key} block={block} />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}
