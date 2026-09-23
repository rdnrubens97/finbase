import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Cabecalho } from '../components/Cabecalho'
import { LICOES } from '../data/licoes'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function LicaoPagina() {
  const { id } = useParams()
  const navigate = useNavigate()
  const licao = LICOES.find((l) => l.id === id)
  const [emQuiz, setEmQuiz] = useState(false)
  const [respostas, setRespostas] = useState<(number | null)[]>([])
  const [concluidas, setConcluidas] = useLocalStorage<string[]>('finbase:licoes', [])

  if (!licao) {
    return (
      <div>
        <Cabecalho titulo="Lição não encontrada" />
        <button className="btn" onClick={() => navigate('/aprender')}>Voltar para as lições</button>
      </div>
    )
  }

  if (!emQuiz) {
    return (
      <div>
        <Cabecalho titulo={licao.titulo} />
        <article className="cartao">
          {licao.paragrafos.map((p, i) => <p key={i}>{p}</p>)}
        </article>
        <button
          className="btn"
          onClick={() => { setRespostas(Array(licao.quiz.length).fill(null)); setEmQuiz(true) }}
        >
          Responder o quiz ({licao.quiz.length} perguntas)
        </button>
      </div>
    )
  }

  const respondidas = respostas.filter((r) => r !== null).length
  const acertos = licao.quiz.filter((q, i) => respostas[i] === q.correta).length
  const terminou = respondidas === licao.quiz.length

  function responder(iPergunta: number, iAlternativa: number) {
    if (respostas[iPergunta] !== null) return // trava a resposta após a escolha
    const novas = [...respostas]
    novas[iPergunta] = iAlternativa
    setRespostas(novas)
  }

  function concluir() {
    if (!concluidas.includes(licao!.id)) setConcluidas([...concluidas, licao!.id])
    navigate('/aprender')
  }

  return (
    <div>
      <Cabecalho titulo="Quiz" />
      <p style={{ color: 'var(--fg-suave)' }}>{licao.titulo}</p>

      {licao.quiz.map((pergunta, i) => {
        const escolha = respostas[i]
        return (
          <fieldset key={i} className="cartao" style={{ border: '1px solid var(--borda)' }}>
            <legend style={{ fontWeight: 600, padding: '0 6px' }}>Pergunta {i + 1}</legend>
            <p>{pergunta.enunciado}</p>

            <div style={{ display: 'grid', gap: 8 }}>
              {pergunta.alternativas.map((alt, j) => {
                const escolhida = escolha === j
                const correta = j === pergunta.correta
                let fundo = 'var(--bg)'
                let borda = 'var(--borda)'
                if (escolha !== null) {
                  if (correta) { fundo = 'var(--verde-claro)'; borda = 'var(--verde)' }
                  else if (escolhida) { fundo = 'var(--vermelho-claro)'; borda = 'var(--vermelho)' }
                }
                return (
                  <button
                    key={j}
                    onClick={() => responder(i, j)}
                    disabled={escolha !== null}
                    aria-pressed={escolhida}
                    style={{
                      minHeight: 'var(--toque)', padding: '10px 14px', textAlign: 'left',
                      background: fundo, border: `2px solid ${borda}`, borderRadius: 'var(--raio)',
                      color: 'var(--fg)', font: 'inherit',
                      cursor: escolha === null ? 'pointer' : 'default',
                    }}
                  >
                    {alt}
                    {escolha !== null && correta && <strong> ✓</strong>}
                  </button>
                )
              })}
            </div>

            {escolha !== null && (
              <div
                className={escolha === pergunta.correta ? 'aviso aviso--ok' : 'aviso aviso--alerta'}
                style={{ marginTop: 12, marginBottom: 0 }}
              >
                <strong>{escolha === pergunta.correta ? 'Isso mesmo. ' : 'Ainda não. '}</strong>
                {pergunta.explicacao}
              </div>
            )}
          </fieldset>
        )
      })}

      {terminou && (
        <>
          <div className="aviso aviso--info">
            Você acertou <strong>{acertos} de {licao.quiz.length}</strong>.
            {acertos < licao.quiz.length && ' Vale reler a lição — as explicações acima ajudam.'}
          </div>
          <button className="btn" onClick={concluir}>Concluir lição</button>
          <button
            className="btn btn--secundario"
            style={{ marginTop: 10 }}
            onClick={() => setRespostas(Array(licao.quiz.length).fill(null))}
          >
            Refazer o quiz
          </button>
        </>
      )}
    </div>
  )
}
