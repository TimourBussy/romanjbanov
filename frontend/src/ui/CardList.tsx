import {Card} from './Card'

export function CardList({
  cards,
  className,
}: {
  cards: {
    title: string
    paragraph: string
  }[]
  className?: string
}) {
  return (
    <article className={`grid grid-cols-1 2xl:grid-cols-3 gap-6 ${className || ''}`}>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} paragraph={card.paragraph} />
      ))}
    </article>
  )
}
