import { useState } from 'react'
import { Cabecalho } from '../components/Cabecalho'
import { GLOSSARIO } from '../data/glossario'

export function Glossario() {
  const [busca, setBusca] = useState('')
  const termo = busca.trim().toLowerCase()
  const filtrados = termo
    ? GLOSSARIO.filter(
        (t) => t.termo.toLowerCase().includes(termo) || t.definicao.toLowerCase().includes(termo),
      )
    : GLOSSARIO

  return (
    <div>
      <Cabecalho titulo="Glossário" />
      <div className="campo">
        <label htmlFor="busca">Procurar palavra</label>
        <input
          id="busca" type="search" placeholder="Ex.: rotativo"
          value={busca} onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="vazio">Nenhuma palavra encontrada.</p>
      ) : (
        <dl>
          {filtrados.map((t) => (
            <div key={t.termo} className="cartao">
              <dt style={{ fontWeight: 700, marginBottom: 4 }}>{t.termo}</dt>
              <dd style={{ margin: 0 }}>{t.definicao}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
