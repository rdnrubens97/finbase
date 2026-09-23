import { describe, expect, it } from 'vitest'
import {
  comparaParcelamento, evolucaoJuros, evolucaoRotativo, montanteFinal,
} from './financeiro'

describe('evolucaoJuros', () => {
  it('reproduz o exemplo da lição 2: R$ 1.000 a 10% ao mês vira ~R$ 3.138 em 12 meses', () => {
    const pontos = evolucaoJuros(0, 10, 12, 1000)
    expect(pontos).toHaveLength(12)
    expect(pontos[11].guardando).toBeCloseTo(3138.43, 1)
  })

  it('confere o primeiro e o segundo mês do exemplo da lição', () => {
    const pontos = evolucaoJuros(0, 10, 3, 1000)
    expect(pontos[0].guardando).toBeCloseTo(1100, 2)   // R$ 100 de juros
    expect(pontos[1].guardando).toBeCloseTo(1210, 2)   // R$ 110, não R$ 100
  })

  it('sem juros, o acumulado é igual ao depositado', () => {
    const pontos = evolucaoJuros(100, 0, 12)
    expect(pontos[11].guardando).toBeCloseTo(1200, 2)
    expect(pontos[11].aportado).toBeCloseTo(1200, 2)
  })

  it('com juros, o acumulado supera o depositado', () => {
    const pontos = evolucaoJuros(100, 1, 12)
    expect(pontos[11].guardando).toBeGreaterThan(pontos[11].aportado)
  })

  it('rastreia o total depositado mês a mês', () => {
    const pontos = evolucaoJuros(50, 1, 6)
    expect(pontos[5].aportado).toBeCloseTo(300, 2)
  })
})

describe('evolucaoRotativo', () => {
  it('a 14% ao mês, um ano pagando o mínimo custa mais que a própria compra', () => {
    const pontos = evolucaoRotativo(1000, 14, 12)
    const fim = pontos[11]
    // Confere os números citados na lição 3.
    expect(fim.saldoDevedor).toBeCloseTo(685.31, 1)   // ainda deve
    expect(fim.pagoAcumulado).toBeCloseTo(1522.71, 1) // já desembolsou
    expect(fim.jurosAcumulados).toBeCloseTo(1208.01, 1)
    expect(fim.jurosAcumulados).toBeGreaterThan(1000) // só de juros, mais que a compra
  })

  it('acima de 17,65% ao mês o mínimo não cobre os juros e a dívida cresce', () => {
    // Fator mensal = (1 - 0,15) * (1 + i). Passa de 1 quando i > 17,647%.
    const cresce = evolucaoRotativo(1000, 20, 12)
    expect(cresce[11].saldoDevedor).toBeGreaterThan(1000)

    const encolhe = evolucaoRotativo(1000, 14, 12)
    expect(encolhe[11].saldoDevedor).toBeLessThan(1000)
  })

  it('acumula juros e pagamentos de forma crescente', () => {
    const pontos = evolucaoRotativo(1000, 14, 12)
    expect(pontos[11].jurosAcumulados).toBeGreaterThan(pontos[0].jurosAcumulados)
    expect(pontos[11].pagoAcumulado).toBeGreaterThan(pontos[0].pagoAcumulado)
  })

  it('o primeiro mês desconta o mínimo antes de aplicar os juros', () => {
    const [primeiro] = evolucaoRotativo(1000, 10, 1, 15)
    // 1000 - 150 = 850; 850 * 1,10 = 935
    expect(primeiro.saldoDevedor).toBeCloseTo(935, 2)
    expect(primeiro.jurosDoMes).toBeCloseTo(85, 2)
    expect(primeiro.pagoAcumulado).toBeCloseTo(150, 2)
  })

  it('sem juros, a dívida apenas diminui', () => {
    const pontos = evolucaoRotativo(1000, 0, 12)
    expect(pontos[11].saldoDevedor).toBeLessThan(1000)
    expect(pontos[11].jurosAcumulados).toBeCloseTo(0, 2)
  })
})

describe('montanteFinal', () => {
  it('sem juros, é o simples produto de aporte por meses', () => {
    expect(montanteFinal(100, 0, 12)).toBeCloseTo(1200, 2)
  })

  it('confere a série de aportes a 1% ao mês por 12 meses', () => {
    // 100 * ((1,01^12 - 1) / 0,01) = 1268,25
    expect(montanteFinal(100, 1, 12)).toBeCloseTo(1268.25, 1)
  })
})

describe('comparaParcelamento', () => {
  it('com desconto alto à vista, pagar à vista compensa', () => {
    const r = comparaParcelamento(1000, 10, 15, 1)
    expect(r.melhor).toBe('avista')
  })

  it('sem desconto à vista, parcelar sem juros compensa', () => {
    const r = comparaParcelamento(1000, 10, 0, 1)
    expect(r.melhor).toBe('parcelado')
  })

  it('a diferença relatada é sempre positiva', () => {
    const r = comparaParcelamento(1000, 10, 5, 1)
    expect(r.diferenca).toBeGreaterThanOrEqual(0)
  })
})
