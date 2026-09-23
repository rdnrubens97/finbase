import { useState } from 'react'
import { Cabecalho } from '../components/Cabecalho'

export function Ajustes() {
  const [confirmando, setConfirmando] = useState(false)

  function apagarTudo() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('finbase:'))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* acesso bloqueado — nada a apagar */
    }
    location.href = '/'
  }

  return (
    <div>
      <Cabecalho titulo="Ajustes" />

      <div className="cartao">
        <h2>Sobre o FinBase</h2>
        <p>
          Aplicativo gratuito de educação financeira, desenvolvido como Atividade Extensionista do
          Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Centro
          Universitário Internacional UNINTER.
        </p>
        <p style={{ marginBottom: 0, fontSize: '.9rem', color: 'var(--fg-suave)' }}>
          Aplicado junto à comunidade da Igreja Nossa Senhora de Lourdes, Jardim Tamoio,
          Araraquara – SP.
        </p>
      </div>

      <div className="cartao">
        <h2>Seus dados</h2>
        <p>
          O FinBase não pede cadastro, não pede CPF e não pede senha. Tudo o que você anota fica
          guardado apenas neste aparelho e não é enviado para lugar nenhum.
        </p>
        <p style={{ marginBottom: 0 }}>
          Se limpar os dados do navegador ou desinstalar o app, as anotações somem junto.
        </p>
      </div>

      <div className="cartao">
        <h2>Apagar tudo</h2>
        <p>Remove suas anotações e o progresso das lições deste aparelho. Não dá para desfazer.</p>
        {!confirmando ? (
          <button className="btn btn--secundario" onClick={() => setConfirmando(true)}>
            Apagar meus dados
          </button>
        ) : (
          <>
            <div className="aviso aviso--alerta">Tem certeza? Isso apaga tudo e não tem volta.</div>
            <button className="btn btn--perigo" onClick={apagarTudo}>Sim, apagar tudo</button>
            <button className="btn btn--secundario" style={{ marginTop: 10 }}
              onClick={() => setConfirmando(false)}>
              Cancelar
            </button>
          </>
        )}
      </div>

      <div className="aviso aviso--alerta">
        Este aplicativo tem finalidade exclusivamente educacional e não constitui recomendação de
        investimento.
      </div>
    </div>
  )
}
