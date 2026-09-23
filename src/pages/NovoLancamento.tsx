import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cabecalho } from '../components/Cabecalho'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Lancamento, Categoria } from '../data/tipos'
import { CATEGORIAS } from '../data/tipos'
import { hojeISO } from '../utils/formatadores'

export function NovoLancamento() {
  const navigate = useNavigate()
  const [lancamentos, setLancamentos] = useLocalStorage<Lancamento[]>('finbase:lancamentos', [])

  const [tipo, setTipo] = useState<'entrada' | 'saida'>('saida')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('Alimentação')
  const [data, setData] = useState(hojeISO())
  const [descricao, setDescricao] = useState('')

  // Aceita "12,50" e "12.50" — quem digita no celular usa vírgula.
  const numero = Number(valor.replace(',', '.'))
  const valido = valor !== '' && !Number.isNaN(numero) && numero > 0

  function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!valido) return
    const novo: Lancamento = {
      id: crypto.randomUUID(),
      tipo,
      valor: numero,
      categoria,
      data,
      descricao: descricao.trim() || undefined,
    }
    setLancamentos([...lancamentos, novo])
    navigate('/gastos')
  }

  return (
    <div>
      <Cabecalho titulo="Anotar" />
      <form onSubmit={salvar}>
        <div className="campo">
          <span id="rotulo-tipo" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
            O que foi?
          </span>
          <div role="group" aria-labelledby="rotulo-tipo" style={{ display: 'flex', gap: 10 }}>
            {(['saida', 'entrada'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                aria-pressed={tipo === t}
                style={{
                  flex: 1, minHeight: 'var(--toque)', borderRadius: 'var(--raio)',
                  border: `2px solid ${tipo === t ? (t === 'saida' ? 'var(--vermelho)' : 'var(--verde)') : 'var(--borda)'}`,
                  background: tipo === t ? (t === 'saida' ? 'var(--vermelho-claro)' : 'var(--verde-claro)') : 'var(--bg)',
                  color: 'var(--fg)', font: 'inherit', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {t === 'saida' ? 'Gastei' : 'Recebi'}
              </button>
            ))}
          </div>
        </div>

        <div className="campo">
          <label htmlFor="valor">Quanto?</label>
          <input
            id="valor" type="text" inputMode="decimal" placeholder="0,00"
            value={valor} onChange={(e) => setValor(e.target.value)} required autoFocus
            style={{ fontSize: '1.3rem', fontWeight: 600 }}
          />
          <p className="dica">Pode usar vírgula. Exemplo: 15,90</p>
        </div>

        <div className="campo">
          <label htmlFor="categoria">Com o quê?</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="data">Quando?</label>
          <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Observação (opcional)</label>
          <input
            id="descricao" type="text" placeholder="Ex.: feira da semana"
            value={descricao} onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <button className="btn" type="submit" disabled={!valido}>Salvar</button>
      </form>
    </div>
  )
}
