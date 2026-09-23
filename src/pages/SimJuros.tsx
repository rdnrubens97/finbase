import { useMemo, useState } from 'react'
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Cabecalho } from '../components/Cabecalho'
import { evolucaoJuros } from '../utils/financeiro'
import { moeda, moedaCurta } from '../utils/formatadores'

export function SimJuros() {
  const [aporte, setAporte] = useState(100)
  const [taxa, setTaxa] = useState(1)
  const [meses, setMeses] = useState(24)

  const dados = useMemo(() => evolucaoJuros(aporte, taxa, meses), [aporte, taxa, meses])
  const ultimo = dados[dados.length - 1]
  const rendimento = ultimo ? ultimo.guardando - ultimo.aportado : 0

  return (
    <div>
      <Cabecalho titulo="Juros compostos" />
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>
        Quanto você tem se guardar um valor todo mês.
      </p>

      <div className="cartao">
        <div className="campo">
          <label htmlFor="aporte">Guardo por mês: {moeda(aporte)}</label>
          <input
            id="aporte" type="range" min={10} max={1000} step={10}
            value={aporte} onChange={(e) => setAporte(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="taxa">Rende por mês: {taxa.toFixed(2).replace('.', ',')}%</label>
          <input
            id="taxa" type="range" min={0} max={2} step={0.05}
            value={taxa} onChange={(e) => setTaxa(Number(e.target.value))}
          />
          <p className="dica">A poupança costuma ficar perto de 0,5% ao mês.</p>
        </div>
        <div className="campo" style={{ marginBottom: 0 }}>
          <label htmlFor="meses">Durante: {meses} meses</label>
          <input
            id="meses" type="range" min={6} max={120} step={6}
            value={meses} onChange={(e) => setMeses(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="cartao">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Você depositou</span><strong>{moeda(ultimo?.aportado ?? 0)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Os juros renderam</span>
          <strong style={{ color: 'var(--verde)' }}>{moeda(rendimento)}</strong>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid var(--borda)', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem' }}>
          <strong>Você teria</strong>
          <strong style={{ color: 'var(--verde)' }}>{moeda(ultimo?.guardando ?? 0)}</strong>
        </div>
      </div>

      <div style={{ height: 260, marginBottom: 16 }} aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--borda)" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="var(--fg-suave)"
              label={{ value: 'meses', position: 'insideBottomRight', fontSize: 11 }} />
            <YAxis tickFormatter={moedaCurta} tick={{ fontSize: 11 }} stroke="var(--fg-suave)" width={64} />
            <Tooltip formatter={(v) => moeda(Number(v ?? 0))} labelFormatter={(m) => `Mês ${m}`} />
            <Legend />
            <Line type="monotone" dataKey="aportado" name="Só o que você depositou"
              stroke="var(--fg-suave)" strokeDasharray="5 5" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="guardando" name="Com os juros"
              stroke="var(--verde)" dot={false} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="sr-only">
        Depositando {moeda(aporte)} por mês a {taxa}% ao mês durante {meses} meses, o total depositado é
        de {moeda(ultimo?.aportado ?? 0)} e o valor final com juros é de {moeda(ultimo?.guardando ?? 0)}.
      </p>

      <div className="aviso aviso--info">
        A linha pontilhada é só o dinheiro que saiu do seu bolso. A distância entre as duas linhas são os
        juros trabalhando a seu favor — e ela aumenta com o tempo.
      </div>
    </div>
  )
}
