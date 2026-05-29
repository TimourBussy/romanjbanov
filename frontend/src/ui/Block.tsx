import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {Card} from './Card'
import {SocialLinks} from './SocialLinks'
import {Group, PADDING_CLASSES} from './Group'
import type {
  ITitle,
  IParagraph,
  ICard,
  IEnsembles,
  IImg,
  ISchedule,
  IButton,
  IGallery,
  IContactForm,
  IHeroImage,
  IRow,
  ISocialLinks,
  IGroup,
} from '../hooks/usePages'
import {Ensembles} from './Ensembles'
import {Image} from './Image'
import {Schedule} from './Schedule'
import {Button} from './Button'
import {Gallery} from './Gallery'
import {ContactForm} from './ContactForm'
import {HeroImage} from './HeroImage'
import {Row} from './Row'
import {getBackgroundColorHex} from '../../../sanity/lib/tailwindColors'

export type TBlock =
  | IGroup
  | IRow
  | IHeroImage
  | ITitle
  | IParagraph
  | IImg
  | IButton
  | ICard
  | ISocialLinks
  | IEnsembles
  | ISchedule
  | IGallery
  | IContactForm

export function Block({block}: {block: TBlock}) {
  const {i18n} = useTranslation()

  const paddingClasses = [
    'paddingTop' in block && block.paddingTop && PADDING_CLASSES.pt[block.paddingTop],
    'paddingBottom' in block && block.paddingBottom && PADDING_CLASSES.pb[block.paddingBottom],
    'paddingLeft' in block && block.paddingLeft && PADDING_CLASSES.pl[block.paddingLeft],
    'paddingRight' in block && block.paddingRight && PADDING_CLASSES.pr[block.paddingRight],
  ]
    .filter(Boolean)
    .join(' ')

  const combinedClasses = paddingClasses

  const lang = i18n.language

  if (block._type === 'group')
    return <Group key={block._key} blocks={block.blocks} className={combinedClasses} />
  else if (block._type === 'row') {
    return <Row key={block._key} blocks={block.blocks} gap={block.gap} className={paddingClasses} />
  } else if (block._type === 'heroImage')
    return (
      <HeroImage
        key={block._key}
        src={block.src.asset.url}
        alt={
          lang === 'FR'
            ? block.alt?.FR || ''
            : lang === 'RU'
              ? block.alt?.RU || ''
              : block.alt?.EN || ''
        }
        title={lang === 'FR' ? block.title?.FR : lang === 'RU' ? block.title?.RU : block.title?.EN}
        subtitle={
          lang === 'FR'
            ? block.subtitle?.FR
            : lang === 'RU'
              ? block.subtitle?.RU
              : block.subtitle?.EN
        }
        description={
          lang === 'FR'
            ? block.description?.FR
            : lang === 'RU'
              ? block.description?.RU
              : block.description?.EN
        }
      />
    )
  else if (block._type === 'title')
    return (
      <Title
        key={block._key}
        level={block.level}
        colored={block.colored}
        className={combinedClasses}
      >
        {lang === 'FR' ? block.content.FR : lang === 'RU' ? block.content.RU : block.content.EN}
      </Title>
    )
  else if (block._type === 'paragraph')
    return (
      <Paragraph key={block._key} size={block.size} className={combinedClasses}>
        {lang === 'FR' ? block.content.FR : lang === 'RU' ? block.content.RU : block.content.EN}
      </Paragraph>
    )
  else if (block._type === 'img')
    return (
      <Image
        key={block._key}
        src={block.src.asset.url}
        alt={
          lang === 'FR'
            ? block.alt?.FR || ''
            : lang === 'RU'
              ? block.alt?.RU || ''
              : block.alt?.EN || ''
        }
        width={block.dimensionType === 'width' ? block.dimension : undefined}
        height={block.dimensionType === 'height' ? block.dimension : undefined}
        className={combinedClasses}
      />
    )
  else if (block._type === 'button')
    return (
      <Button key={block._key} text={block.text} link={block.link} className={combinedClasses} />
    )
  else if (block._type === 'card') {
    const bgHex = block.backgroundColor ? getBackgroundColorHex(block.backgroundColor) : null
    const cardTitle =
      lang === 'FR' ? block.title.FR : lang === 'RU' ? block.title.RU : block.title.EN
    const cardParagraph =
      lang === 'FR'
        ? block.description.FR
        : lang === 'RU'
          ? block.description.RU
          : block.description.EN
    return bgHex ? (
      <div key={block._key} style={{backgroundColor: bgHex}} className="w-full">
        <div className={`max-w-4xl mx-auto ${paddingClasses}`}>
          <Card icon={block.icon} title={cardTitle} paragraph={cardParagraph} />
        </div>
      </div>
    ) : (
      <div key={block._key} className={`max-w-4xl mx-auto ${paddingClasses}`}>
        <Card icon={block.icon} title={cardTitle} paragraph={cardParagraph} />
      </div>
    )
  } else if (block._type === 'socialLinks')
    return (
      <SocialLinks
        key={block._key}
        size={block.size}
        colored={block.colored}
        className={combinedClasses}
      />
    )
  else if (block._type === 'ensembles')
    return <Ensembles key={block._key} className={combinedClasses} />
  else if (block._type === 'schedule')
    return <Schedule key={block._key} className={combinedClasses} />
  else if (block._type === 'gallery')
    return <Gallery key={block._key} className={combinedClasses} />
  else if (block._type === 'contactForm')
    return <ContactForm key={block._key} className={combinedClasses} />

  return null
}
