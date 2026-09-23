export type Categoria =
  | 'Moradia' | 'Alimentação' | 'Transporte' | 'Saúde'
  | 'Lazer' | 'Dívidas' | 'Outros'

export const CATEGORIAS: Categoria[] = [
  'Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Lazer', 'Dívidas', 'Outros',
]

export const COR_CATEGORIA: Record<Categoria, string> = {
  'Moradia': '#14507d',
  'Alimentação': '#1a6340',
  'Transporte': '#8a4200',
  'Saúde': '#5b2c6f',
  'Lazer': '#0f6674',
  'Dívidas': '#a1122b',
  'Outros': '#52585f',
}

export interface Lancamento {
  id: string
  tipo: 'entrada' | 'saida'
  valor: number
  categoria: Categoria
  data: string   // ISO yyyy-mm-dd
  descricao?: string
}

export interface Pergunta {
  enunciado: string
  alternativas: string[]
  correta: number
  explicacao: string
}

export interface Licao {
  id: string
  titulo: string
  resumo: string
  emoji: string
  paragrafos: string[]
  quiz: Pergunta[]
}
