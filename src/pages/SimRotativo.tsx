import { useMemo, useState } from 'react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Cabecalho } from '../components/Cabecalho'
import { evolucaoRotativo } from '../utils/financeiro'
import { moeda, moedaCurta } from '../utils/formatadores'

export function SimRotativo() {
  const [fatura, setFatura] = useState(1000)
  const [taxa, setTaxa] = useState(14)
  const meses = 12

  const dados = useMemo(() => evolucaoRotativo(fatura, taxa, meses), [fatura, taxa])
  const fim = dados[dados.length - 1]
  const taxaAnual = (Math.pow(1 + taxa / 100, 12) - 1) * 100
  // Fator mensal = (1 - 0,15) * (1 + i). A dívida cresce quando i > 17,647%.
  const dividaCresce = (fim?.saldoDevedor ?? 0) > fatura

  return (
    <div>
      <Cabecalho titulo="Fatura do cartão" />
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>
        O que acontece se você pagar só o mínimo durante um ano.
      </p>

      <div className="cartao">
        <div className="campo">
          <label htmlFor="fatura">Minha fatura é de: {moeda(fatura)}</label>
          <input
            id="fatura" type="range" min={100} max={10000} step={100}
            value={fatura} onChange={(e) => setFatura(Number(e.target.value))}
          />
        </div>
        <div className="campo" style={{ marginBottom: 0 }}>
          <label htmlFor="taxa">Juros do cartão por mês: {taxa}%</label>
          <input
            id="taxa" type="range" min={5} max={20} step={1}
            value={taxa} onChange={(e) => setTaxa(Number(e.target.value))}
          />
          <p className="dica">
            No Brasil o rotativo costuma ficar entre 12% e 16% ao mês — o que dá
            cerca de <strong>{taxaAnual.toFixed(0)}% ao ano</strong>.
          </p>
        </div>
      </div>

      <div className="cartao" style={{ background: 'var(--vermelho-claro)', borderColor: 'var(--vermelho)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Você já pagou</span><strong>{moeda(fim?.pagoAcumulado ?? 0)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Só de juros</span>
          <strong style={{ color: 'var(--vermelho)' }}>{moeda(fim?.jurosAcumulados ?? 0)}</strong>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid var(--vermelho)', margin: '10px 0', opacity: .4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem' }}>
          <strong>E ainda deve</strong>
          <strong style={{ color: 'var(--vermelho)' }}>{moeda(fim?.saldoDevedor ?? 0)}</strong>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '.9rem' }}>
          Depois de 12 meses pagando todo mês, a dívida de {moeda(fatura)} virou{' '}
          {moeda(fim?.saldoDevedor ?? 0)} — e você ainda desembolsou {moeda(fim?.pagoAcumulado ?? 0)}.
        </p>
      </div>

      <div style={{ height: 240, marginBottom: 16 }} aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dados} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--borda)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="var(--fg-suave)" />
            <YAxis tickFormatter={moedaCurta} tick={{ fontSize: 11 }} stroke="var(--fg-suave)" width={64} />
            <Tooltip formatter={(v) => moeda(Number(v ?? 0))} labelFormatter={(m) => `Mês ${m}`} />
            <Area type="monotone" dataKey="saldoDevedor" name="Quanto você ainda deve"
              stroke="var(--vermelho)" fill="var(--vermelho)" fillOpacity={0.18} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="sr-only">
        Com fatura de {moeda(fatura)} e juros de {taxa}% ao mês, após 12 meses pagando apenas o mínimo,
        o saldo devedor é de {moeda(fim?.saldoDevedor ?? 0)}, com {moeda(fim?.jurosAcumulados ?? 0)} só de juros.
      </p>

      {dividaCresce && (
        <div className="aviso aviso--alerta">
          <strong>Repare no que aconteceu.</strong> Com juros acima de 17,6% ao mês, o pagamento mínimo
          não cobre nem os juros. A dívida cresce mesmo você pagando todo mês, sem usar o cartão de novo.
        </div>
      )}

      <div className="aviso aviso--alerta">
        <strong>Como sair do rotativo:</strong> troque essa dívida por uma mais barata. Empréstimo pessoal,
        consignado ou o parcelamento da própria fatura costumam cobrar bem menos que 14% ao mês. Trocar
        dívida cara por dívida barata não é se endividar mais — é parar de sangrar.
      </div>

      <div className="aviso aviso--info">
        <strong>Olhe sempre o CET.</strong> O Custo Efetivo Total soma juros, taxas e seguros. É o único
        número que permite comparar duas ofertas de verdade.
      </div>
    </div>
  )
}
