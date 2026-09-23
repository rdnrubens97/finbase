import { Link } from 'react-router-dom'
import { Cabecalho } from '../components/Cabecalho'
import { LICOES } from '../data/licoes'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function Aprender() {
  const [concluidas] = useLocalStorage<string[]>('finbase:licoes', [])

  return (
    <div>
      <Cabecalho titulo="Aprender" />
      <p style={{ color: 'var(--fg-suave)' }}>
        Progresso: {concluidas.length} de {LICOES.length} lições
      </p>

      <ol className="lista grade-menu">
        {LICOES.map((licao, i) => {
          const feita = concluidas.includes(licao.id)
          return (
            <li key={licao.id}>
              <Link
                className="item-menu"
                to={`/aprender/${licao.id}`}
                style={{ borderLeftColor: feita ? 'var(--verde)' : 'var(--azul)' }}
              >
                <span className="emoji" aria-hidden="true">{licao.emoji}</span>
                <span>
                  <strong>{i + 1}. {licao.titulo}</strong>
                  <span>{licao.resumo}</span>
                </span>
                {feita && (
                  <span style={{ marginLeft: 'auto', color: 'var(--verde)', fontWeight: 700 }}>
                    <span aria-hidden="true">✓</span>
                    <span className="sr-only">concluída</span>
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
