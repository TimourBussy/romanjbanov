import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardMenu} from './CardMenu'
import {SocialLinks} from './SocialLinks'
import {Group, PADDING_CLASSES} from './Group'
import type {
  ITitle,
  IParagraph,
  ICardMenu,
  ISocialLinks,
  IGroup,
  IEnsembles,
  IImg,
  ISchedule,
  IButton,
  IGallery,
  IContactForm,
} from '../hooks/usePages'
import {Ensembles} from './Ensembles'
import {Image} from './Image'
import {Schedule} from './Schedule'
import {Button} from './Button'
import {Gallery} from './Gallery'
import {ContactForm} from './ContactForm'

export type TBlock =
  | IGroup
  | ITitle
  | IParagraph
  | IImg
  | IButton
  | ICardMenu
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

  const bgColorClass = 'backgroundColor' in block && block.backgroundColor 
    ? `bg-${block.backgroundColor}` 
    : ''

  const combinedClasses = `${paddingClasses} ${bgColorClass}`.trim()

  if (block._type === 'group')
    return <Group key={block._key} blocks={block.blocks} className={combinedClasses} />
  else if (block._type === 'title')
    return (
      <Title
        key={block._key}
        level={block.level}
        colored={block.colored}
        className={combinedClasses}
      >
        {i18n.language === 'FR' ? block.content.FR : block.content.EN}
      </Title>
    )
  else if (block._type === 'paragraph')
    return (
      <Paragraph key={block._key} size={block.size} className={combinedClasses}>
        {i18n.language === 'FR' ? block.content.FR : block.content.EN}
      </Paragraph>
    )
  else if (block._type === 'img')
    return (
      <Image
        key={block._key}
        src={block.src.asset.url}
        alt={i18n.language === 'FR' ? block.alt?.FR || '' : block.alt?.EN || ''}
        width={block.dimensionType === 'width' ? block.dimension : undefined}
        height={block.dimensionType === 'height' ? block.dimension : undefined}
        className={combinedClasses}
      />
    )
  else if (block._type === 'button')
    return (
      <Button key={block._key} text={block.text} link={block.link} className={combinedClasses} />
    )
  else if (block._type === 'cardMenu')
    return (
      <CardMenu
        key={block._key}
        cards={block.cards.map((card) => ({
          title: i18n.language === 'FR' ? card.title.FR : card.title.EN,
          paragraph: i18n.language === 'FR' ? card.description.FR : card.description.EN,
          to: card.destinationPage?.slug.FR?.current || '#',
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
