/**
 * Regras financeiras do FinBase.
 *
 * Todo cálculo fica isolado aqui e coberto por testes. Erro de conta em um app
 * que ensina finanças destrói a credibilidade do projeto inteiro.
 */

export interface PontoEvolucao {
  mes: number
  guardando: number
  devendo: number
  aportado: number
}

/**
 * Evolução de um aporte mensal com juros compostos, comparada ao mesmo valor
 * como dívida. Juros incidem sobre o saldo antes do aporte do mês.
 */
export function evolucaoJuros(
  aporteMensal: number,
  taxaMensal: number,
  meses: number,
  inicial = 0,
): PontoEvolucao[] {
  const i = taxaMensal / 100
  const pontos: PontoEvolucao[] = []
  let guardando = inicial
  let devendo = inicial

  for (let mes = 1; mes <= meses; mes++) {
    guardando = guardando * (1 + i) + aporteMensal
    devendo = devendo * (1 + i) + aporteMensal
    pontos.push({
      mes,
      guardando: arredonda(guardando),
      devendo: arredonda(devendo),
      aportado: arredonda(inicial + aporteMensal * mes),
    })
  }
  return pontos
}

export interface PontoRotativo {
  mes: number
  saldoDevedor: number
  jurosDoMes: number
  jurosAcumulados: number
  pagoAcumulado: number
}

/**
 * Evolução da dívida do cartão pagando apenas o percentual mínimo da fatura.
 *
 * Regra do rotativo: sobre o saldo não pago incidem juros no mês seguinte.
 * O pagamento mínimo é calculado sobre a fatura corrente.
 */
export function evolucaoRotativo(
  faturaInicial: number,
  taxaMensal: number,
  meses: number,
  percentualMinimo = 15,
): PontoRotativo[] {
  const i = taxaMensal / 100
  const min = percentualMinimo / 100
  const pontos: PontoRotativo[] = []
  let saldo = faturaInicial
  let jurosAcumulados = 0
  let pagoAcumulado = 0

  for (let mes = 1; mes <= meses; mes++) {
    const pagamento = saldo * min
    saldo -= pagamento
    pagoAcumulado += pagamento

    const juros = saldo * i
    saldo += juros
    jurosAcumulados += juros

    pontos.push({
      mes,
      saldoDevedor: arredonda(saldo),
      jurosDoMes: arredonda(juros),
      jurosAcumulados: arredonda(jurosAcumulados),
      pagoAcumulado: arredonda(pagoAcumulado),
    })
  }
  return pontos
}

/** Montante final de um aporte mensal constante com juros compostos. */
export function montanteFinal(aporteMensal: number, taxaMensal: number, meses: number): number {
  const i = taxaMensal / 100
  if (i === 0) return arredonda(aporteMensal * meses)
  return arredonda(aporteMensal * ((Math.pow(1 + i, meses) - 1) / i))
}

/**
 * Compara parcelar "sem juros" com pagar à vista aplicando o desconto e
 * rendendo o restante. Serve para mostrar que "sem juros" nem sempre é melhor.
 */
export function comparaParcelamento(
  valorTotal: number,
  parcelas: number,
  descontoAVista: number,
  taxaRendimento: number,
): { aVista: number; parcelado: number; diferenca: number; melhor: 'avista' | 'parcelado' } {
  const aVista = valorTotal * (1 - descontoAVista / 100)
  const i = taxaRendimento / 100
  const valorParcela = valorTotal / parcelas

  // Valor presente das parcelas: quanto precisaria ter hoje para pagar todas.
  let valorPresente = 0
  for (let n = 1; n <= parcelas; n++) {
    valorPresente += valorParcela / Math.pow(1 + i, n)
  }

  const diferenca = arredonda(Math.abs(valorPresente - aVista))
  return {
    aVista: arredonda(aVista),
    parcelado: arredonda(valorPresente),
    diferenca,
    melhor: aVista <= valorPresente ? 'avista' : 'parcelado',
  }
}

function arredonda(v: number): number {
  return Math.round(v * 100) / 100
}
