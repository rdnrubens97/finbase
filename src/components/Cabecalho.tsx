import { useNavigate } from 'react-router-dom'

export function Cabecalho({ titulo }: { titulo: string }) {
  const navigate = useNavigate()
  return (
    <header className="cabecalho">
      <button className="voltar" onClick={() => navigate(-1)} aria-label="Voltar">
        <span aria-hidden="true">←</span>
      </button>
      <h1>{titulo}</h1>
    </header>
  )
}
