const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function moeda(valor: number): string {
  return brl.format(valor)
}

/** Versão curta para eixos de gráfico, onde não cabe o valor inteiro. */
export function moedaCurta(valor: number): string {
  if (Math.abs(valor) >= 1000) return `R$ ${(valor / 1000).toFixed(1).replace('.', ',')}mil`
  return `R$ ${valor.toFixed(0)}`
}

export function dataBR(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function mesAtualISO(): string {
  return new Date().toISOString().slice(0, 7)
}

export function hojeISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function nomeDoMes(iso: string): string {
  const [ano, mes] = iso.split('-')
  const nomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ]
  return `${nomes[Number(mes) - 1]} de ${ano}`
}
