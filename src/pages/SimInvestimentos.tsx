import { useMemo, useState } from 'react'
import { Cabecalho } from '../components/Cabecalho'
import { montanteFinal } from '../utils/financeiro'
import { moeda } from '../utils/formatadores'

/** Taxas de referência aproximadas, apenas para efeito didático de comparação. */
const OPCOES = [
  { nome: 'Guardado em casa', taxa: 0, risco: 'Furto e inflação', liquidez: 'Imediata', minimo: 'Qualquer valor' },
  { nome: 'Poupança', taxa: 0.5, risco: 'Muito baixo', liquidez: 'Imediata', minimo: 'Qualquer valor' },
  { nome: 'Tesouro Selic', taxa: 0.9, risco: 'O mais baixo do país', liquidez: 'Em 1 dia útil', minimo: 'Cerca de R$ 30' },
  { nome: 'CDB (100% do CDI)', taxa: 0.88, risco: 'Baixo, com FGC até R$ 250 mil', liquidez: 'Varia', minimo: 'Cerca de R$ 100' },
]

export function SimInvestimentos() {
  const [aporte, setAporte] = useState(100)
  const [meses, setMeses] = useState(36)

  const linhas = useMemo(
    () => OPCOES.map((o) => ({ ...o, total: montanteFinal(aporte, o.taxa, meses) })),
    [aporte, meses],
  )
  const depositado = aporte * meses
  const melhor = linhas.reduce((a, b) => (b.total > a.total ? b : a))

  return (
    <div>
      <Cabecalho titulo="Onde guardar" />
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>
        A mesma quantia guardada em lugares diferentes.
      </p>

      <div className="cartao">
        <div className="campo">
          <label htmlFor="aporte">Guardo por mês: {moeda(aporte)}</label>
          <input id="aporte" type="range" min={10} max={1000} step={10}
            value={aporte} onChange={(e) => setAporte(Number(e.target.value))} />
        </div>
        <div className="campo" style={{ marginBottom: 0 }}>
          <label htmlFor="meses">Durante: {meses} meses</label>
          <input id="meses" type="range" min={6} max={120} step={6}
            value={meses} onChange={(e) => setMeses(Number(e.target.value))} />
        </div>
      </div>

      <p>Você teria depositado <strong>{moeda(depositado)}</strong> do seu bolso. No fim:</p>

      {linhas.map((l) => {
        const ganho = l.total - depositado
        const destaque = l.nome === melhor.nome
        return (
          <div
            key={l.nome} className="cartao"
            style={destaque ? { borderColor: 'var(--verde)', borderWidth: 2 } : undefined}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong>{l.nome}</strong>
              <strong style={{ fontSize: '1.1rem', color: destaque ? 'var(--verde)' : 'var(--fg)' }}>
                {moeda(l.total)}
              </strong>
            </div>
            <p style={{ margin: '4px 0 10px', fontSize: '.88rem', color: 'var(--fg-suave)' }}>
              {ganho > 0 ? `Rendeu ${moeda(ganho)} a mais` : 'Não rendeu nada — e os preços subiram'}
            </p>
            <table>
              <tbody>
                <tr><th scope="row">Risco</th><td>{l.risco}</td></tr>
                <tr><th scope="row">Prazo para sacar</th><td>{l.liquidez}</td></tr>
                <tr><th scope="row">Valor mínimo</th><td>{l.minimo}</td></tr>
              </tbody>
            </table>
          </div>
        )
      })}

      <div className="aviso aviso--info">
        Três perguntas resolvem qualquer escolha: <strong>quanto rende</strong>,
        <strong> qual o risco de perder</strong> e <strong>em quanto tempo o dinheiro volta</strong>.
        Se alguém promete rendimento altíssimo sem risco nenhum, não é investimento — é golpe.
      </div>

      <div className="aviso aviso--alerta">
        <strong>Aviso.</strong> Este aplicativo tem finalidade exclusivamente educacional. Os valores usados
        aqui são aproximações para comparação didática e podem mudar. O FinBase não recomenda nenhum
        investimento específico nem qualquer instituição financeira.
      </div>
    </div>
  )
}
