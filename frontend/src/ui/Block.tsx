import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardList} from './CardList'
import {SocialLinks} from './SocialLinks'
import {Group, PADDING_CLASSES} from './Group'
import type {
  ITitle,
  IParagraph,
  ICardList,
  ISocialLinks,
  IGroup,
  IEnsembles,
  IImg,
  ISchedule,
  IButton,
  IGallery,
  IContactForm,
  IHeroImage,
} from '../hooks/usePages'
import {Ensembles} from './Ensembles'
import {Image} from './Image'
import {Schedule} from './Schedule'
import {Button} from './Button'
import {Gallery} from './Gallery'
import {ContactForm} from './ContactForm'
import {HeroImage} from './HeroImage'

export type TBlock =
  | IGroup
  | IHeroImage
  | ITitle
  | IParagraph
  | IImg
  | IButton
  | ICardList
  | ISocialLinks
  | IEnsembles
  | ISchedule
  | IGallery
  | IContactForm

export function Block({block}: {block: TBlock}) {
  const {i18n} = useTranslation()

  const combinedClasses = `${[
    'paddingTop' in block && block.paddingTop && PADDING_CLASSES.pt[block.paddingTop],
    'paddingBottom' in block && block.paddingBottom && PADDING_CLASSES.pb[block.paddingBottom],
    'paddingLeft' in block && block.paddingLeft && PADDING_CLASSES.pl[block.paddingLeft],
    'paddingRight' in block && block.paddingRight && PADDING_CLASSES.pr[block.paddingRight],
  ]
    .filter(Boolean)
    .join(
      ' ',
    )} ${'backgroundColor' in block && block.backgroundColor ? `bg-${block.backgroundColor}` : ''}`.trim()

  if (block._type === 'group')
    return <Group key={block._key} blocks={block.blocks} className={combinedClasses} />
  else if (block._type === 'heroImage')
    return (
      <HeroImage
        key={block._key}
        src={block.src.asset.url}
        alt={i18n.language === 'FR' ? block.alt?.FR || '' : i18n.language === 'RU' ? block.alt?.RU || '' : block.alt?.EN || ''}
        title={i18n.language === 'FR' ? block.title?.FR : i18n.language === 'RU' ? block.title?.RU : block.title?.EN}
        subtitle={i18n.language === 'FR' ? block.subtitle?.FR : i18n.language === 'RU' ? block.subtitle?.RU : block.subtitle?.EN}
        description={i18n.language === 'FR' ? block.description?.FR : i18n.language === 'RU' ? block.description?.RU : block.description?.EN}
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
        {i18n.language === 'FR' ? block.content.FR : i18n.language === 'RU' ? block.content.RU : block.content.EN}
      </Title>
    )
  else if (block._type === 'paragraph')
    return (
      <Paragraph key={block._key} size={block.size} className={combinedClasses}>
        {i18n.language === 'FR' ? block.content.FR : i18n.language === 'RU' ? block.content.RU : block.content.EN}
      </Paragraph>
    )
  else if (block._type === 'img')
    return (
      <Image
        key={block._key}
        src={block.src.asset.url}
        alt={i18n.language === 'FR' ? block.alt?.FR || '' : i18n.language === 'RU' ? block.alt?.RU || '' : block.alt?.EN || ''}
        width={block.dimensionType === 'width' ? block.dimension : undefined}
        height={block.dimensionType === 'height' ? block.dimension : undefined}
        className={combinedClasses}
      />
    )
  else if (block._type === 'button')
    return (
      <Button key={block._key} text={block.text} link={block.link} className={combinedClasses} />
    )
  else if (block._type === 'cardList')
    return (
      <CardList
        key={block._key}
        cards={block.cards.map((card) => ({
          title: i18n.language === 'FR' ? card.title.FR : i18n.language === 'RU' ? card.title.RU : card.title.EN,
          paragraph: i18n.language === 'FR' ? card.description.FR : i18n.language === 'RU' ? card.description.RU : card.description.EN,
        }))}
        className={combinedClasses}
      />
    )
  else if (block._type === 'socialLinks')
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
