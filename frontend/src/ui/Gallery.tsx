import {useTranslation} from 'react-i18next'
import {useSettings} from '../hooks/usePages'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {useState, useMemo} from 'react'

export function Gallery({className}: {className?: string}) {
  const settings = useSettings()
  const {i18n} = useTranslation()
  const [index, setIndex] = useState(-1)

  const slides = useMemo(
    () =>
      settings?.gallery?.map((image) => ({
        src: image.asset.url,
        alt: i18n.language === 'FR' ? image.title.FR : image.title.EN,
      })) || [],
    [settings?.gallery, i18n.language],
  )

  if (!settings?.gallery?.length) return null

  return (
    <>
      <section className={`grid grid-cols-1 2xl:grid-cols-3 gap-6 -mx-46 ${className || ''}`}>
        {settings.gallery.map((image, i) => {
          const title = i18n.language === 'FR' ? image.title?.FR : image.title?.EN

          return (
            <div
              key={i}
              className="group relative aspect-4/3 overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <img
                src={image.asset.url}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute flex flex-col items-start gap-2 bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Title level={6} className="text-white/90">
                  {title}
                </Title>
                <Paragraph size="xs" className="text-white">
                  {i18n.language === 'FR' ? image.description?.FR : image.description?.EN}
                </Paragraph>
              </div>
            </div>
          )
        })}
      </section>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  )
}
