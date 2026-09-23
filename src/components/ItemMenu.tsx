import { Link } from 'react-router-dom'

interface Props {
  para: string
  emoji: string
  titulo: string
  descricao: string
  cor?: string
}

export function ItemMenu({ para, emoji, titulo, descricao, cor }: Props) {
  return (
    <Link className="item-menu" to={para} style={cor ? { borderLeftColor: cor } : undefined}>
      <span className="emoji" aria-hidden="true">{emoji}</span>
      <span>
        <strong>{titulo}</strong>
        <span>{descricao}</span>
      </span>
    </Link>
  )
}
