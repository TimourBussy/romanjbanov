import {useEffect, useState} from 'react'
import sanityClient from '../sanityClient'

export interface ISocialMediaItem {
  name: string
  icon: string
  url: string
}

export interface IEnsembles {
  _type: 'ensembles'
  _key: string
}

export interface IEnsemble {
  name: string
  slug: {current: string}
  image: {asset: {url: string}}
  previewDesc?: {FR?: string; EN?: string}
  desc?: {FR?: string; EN?: string}
  socialMedias?: ISocialMediaItem[]
}

export interface ISchedule {
  _type: 'schedule'
  _key: string
}

export interface IEvent {
  title: {FR: string; EN: string}
  date: string
  time?: string
  location?: string
  link?: string
}

export interface IGallery {
  _type: 'gallery'
  _key: string
}

export interface IGalleryImage {
  _key: string
  asset: {url: string}
  title: {FR: string; EN: string}
  description?: {FR?: string; EN?: string}
}

export interface ISettings {
  _id: string
  socialMedias: ISocialMediaItem[]
  navigationMenu?: IMenuItem[]
  ensembles: IEnsemble[]
  schedule?: {events: IEvent[]}
  gallery?: IGalleryImage[]
}

export interface IPadding {
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  backgroundColor?: string
}

export interface IGroup extends IPadding {
  _type: 'group'
  _key: string
  blocks: (
    | ITitle
    | IParagraph
    | ICardList
    | ISocialLinks
    | IEnsembles
    | ISchedule
    | IGallery
    | IButton
  )[]
}

export interface ITitle extends IPadding {
  _type: 'title'
  _key: string
  content: {FR: string; EN: string}
  level: 3 | 4 | 5 | 6
  colored: boolean
}

export interface IParagraph extends IPadding {
  _type: 'paragraph'
  _key: string
  content: {FR: string; EN: string}
  size: 'small' | 'large'
}

export interface IImg extends IPadding {
  _type: 'img'
  _key: string
  src: {asset: {url: string}}
  alt?: {FR?: string; EN?: string}
  dimensionType?: 'width' | 'height'
  dimension?: number
}

export interface IButton extends IPadding {
  _type: 'button'
  _key: string
  text: {FR: string; EN: string}
  link: {
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
}

export interface ICardListItem {
  title: {FR: string; EN: string}
  description: {FR: string; EN: string}
}

export interface ICardList extends IPadding {
  _type: 'cardList'
  _key: string
  cards: ICardListItem[]
}

export interface ISocialLinks extends IPadding {
  _type: 'socialLinks'
  _key: string
  size: 'small' | 'medium' | 'large'
  colored: boolean
}

export interface IContactForm extends IPadding {
  _type: 'contactForm'
  _key: string
}

export interface Page {
  _id: string
  title: {EN: string; FR: string}
  slug: {
    FR: {current: string}
    EN: {current: string}
  }
  displayTitle?: boolean
  heroImage?: {
    src: {asset: {url: string}}
    altFr?: string
    altEn?: string
  }
  body?: (
    | IGroup
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
  )[]
}

export interface IMenuSubItem {
  _type: 'submenuItem' | 'ensemblesListItem'
  page?: {
    _id: string
    title: {EN: string; FR: string}
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
}

export interface IMenuItem {
  page: {
    _id: string
    title: {EN: string; FR: string}
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
  children?: IMenuSubItem[]
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([])
  useEffect(() => {
    sanityClient.fetch(`*[_type == "page"]{_id, title, slug { FR, EN }}`).then(setPages)
  }, [])
  return pages
}

const PADDING = 'paddingTop, paddingRight, paddingBottom, paddingLeft, backgroundColor'

const BLOCK_QUERY = `
  _type, _key,
  _type == "title" => {
    content, level, colored,
    ${PADDING}
  },
  _type == "paragraph" => {
    content, size,
    ${PADDING}
  },
  _type == "img" => {
    src{ asset->{ url } }, alt,
    dimensionType, dimension,
    ${PADDING}
  },
  _type == "button" => {
    text,
    link->{ slug { FR, EN } },
    ${PADDING}
  },
  _type == "cardList" => {
    cards[]{
      title, description,
    },
    ${PADDING}
  },
  _type == "socialLinks" => {
    size, colored,
    ${PADDING}
  },
  _type == "ensembles" => {
    _type, _key,
    ${PADDING}
  },
  _type == "schedule" => {
    _type, _key,
    ${PADDING}
  },
  _type == "gallery" => {
    _type, _key,
    ${PADDING}
  },
  _type == "contactForm" => {
    _type, _key,
    ${PADDING}
  }
`

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null)
  useEffect(() => {
    if (slug === null || slug === undefined) return

    sanityClient
      .fetch(
        `*[_type == "page" && (slug.FR.current == $slug || slug.EN.current == $slug)][0]{
          _id, title, slug { FR, EN },
          heroImage{
            src{ asset->{ url } },
            altFr,
            altEn
          },
          displayTitle,
          body[]{
            ${BLOCK_QUERY},
            _type == "group" => {
              ${PADDING},
              blocks[]{
                ${BLOCK_QUERY}
              }
            }
          }
        }`,
        {slug},
      )
      .then(setPage)
  }, [slug])
  return page
}

export function useSettings() {
  const [settings, setSettings] = useState<ISettings | null>(null)
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "settings"][0]{
          _id,
          socialMedias[]{name, icon, url},
          navigationMenu[]{
            page->{_id, title, slug},
            children[]{
              _type,
              page->{_id, title, slug}
            }
          },
          ensembles[]{
            name,
            slug,
            image{ asset->{ url } },
            previewDesc,
            desc,
            socialMedias[]{name, icon, url}
          },
          schedule{
            events[]{
              title,
              time,
              date,
              location,
              link
            }
          },
          gallery[]{
            _key,
            asset->{ url },
            title,
            description
          },
        }`,
      )
      .then(setSettings)
  }, [])
  return settings
}
