import { Link } from 'react-router-dom'
import { Cabecalho } from '../components/Cabecalho'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Lancamento, Categoria } from '../data/tipos'
import { COR_CATEGORIA } from '../data/tipos'
import { moeda, dataBR, mesAtualISO, nomeDoMes } from '../utils/formatadores'

export function Gastos() {
  const [lancamentos, setLancamentos] = useLocalStorage<Lancamento[]>('finbase:lancamentos', [])
  const mes = mesAtualISO()
  const doMes = lancamentos.filter((l) => l.data.startsWith(mes))

  const entradas = doMes.filter((l) => l.tipo === 'entrada').reduce((s, l) => s + l.valor, 0)
  const saidas = doMes.filter((l) => l.tipo === 'saida').reduce((s, l) => s + l.valor, 0)
  const saldo = entradas - saidas

  const porCategoria = doMes
    .filter((l) => l.tipo === 'saida')
    .reduce<Record<string, number>>((acc, l) => {
      acc[l.categoria] = (acc[l.categoria] ?? 0) + l.valor
      return acc
    }, {})

  const ranking = Object.entries(porCategoria).sort((a, b) => b[1] - a[1])
  const maior = ranking[0]?.[1] ?? 1

  function remover(id: string) {
    setLancamentos(lancamentos.filter((l) => l.id !== id))
  }

  return (
    <div>
      <Cabecalho titulo="Meus gastos" />
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>{nomeDoMes(mes)}</p>

      <div className="cartao">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Entrou</span><strong style={{ color: 'var(--verde)' }}>{moeda(entradas)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Saiu</span><strong style={{ color: 'var(--vermelho)' }}>{moeda(saidas)}</strong>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid var(--borda)', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
          <strong>Sobrou</strong>
          <strong style={{ color: saldo >= 0 ? 'var(--verde)' : 'var(--vermelho)' }}>{moeda(saldo)}</strong>
        </div>
      </div>

      <Link className="btn" to="/gastos/novo" style={{ textDecoration: 'none', marginBottom: 18 }}>
        + Anotar entrada ou gasto
      </Link>

      {doMes.length === 0 ? (
        <p className="vazio">
          Você ainda não anotou nada neste mês.<br />
          Comece pelo último gasto que você fez — mesmo que pequeno.
        </p>
      ) : (
        <>
          <h2>Para onde foi o dinheiro</h2>
          {ranking.map(([cat, valor]) => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.92rem' }}>
                <span>{cat}</span>
                <span>
                  <strong>{moeda(valor)}</strong>{' '}
                  <span style={{ color: 'var(--fg-suave)' }}>
                    ({saidas > 0 ? Math.round((valor / saidas) * 100) : 0}%)
                  </span>
                </span>
              </div>
              {/* Barra proporcional ao maior gasto, para comparação visual imediata */}
              <div style={{ background: 'var(--superficie)', borderRadius: 6, height: 12, marginTop: 4 }}>
                <div
                  style={{
                    width: `${(valor / maior) * 100}%`, height: '100%', borderRadius: 6,
                    background: COR_CATEGORIA[cat as Categoria] ?? 'var(--azul)',
                  }}
                />
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: 24 }}>Tudo que você anotou</h2>
          <table>
            <caption className="sr-only">Lançamentos do mês</caption>
            <thead>
              <tr><th>Data</th><th>Categoria</th><th style={{ textAlign: 'right' }}>Valor</th><th></th></tr>
            </thead>
            <tbody>
              {[...doMes].reverse().map((l) => (
                <tr key={l.id}>
                  <td>{dataBR(l.data)}</td>
                  <td>
                    {l.categoria}
                    {l.descricao && <div style={{ fontSize: '.8rem', color: 'var(--fg-suave)' }}>{l.descricao}</div>}
                  </td>
                  <td style={{ textAlign: 'right', color: l.tipo === 'entrada' ? 'var(--verde)' : 'var(--vermelho)' }}>
                    {l.tipo === 'entrada' ? '+' : '−'} {moeda(l.valor)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => remover(l.id)}
                      aria-label={`Apagar lançamento de ${moeda(l.valor)} em ${l.categoria}`}
                      style={{
                        minWidth: 36, minHeight: 36, border: 'none', background: 'none',
                        color: 'var(--fg-suave)', cursor: 'pointer', fontSize: '1.1rem',
                      }}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
