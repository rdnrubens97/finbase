import { ItemMenu } from '../components/ItemMenu'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LICOES } from '../data/licoes'

export function Inicio() {
  const [concluidas] = useLocalStorage<string[]>('finbase:licoes', [])
  const [viuOnboarding, setViuOnboarding] = useLocalStorage('finbase:onboarding', false)

  if (!viuOnboarding) {
    return (
      <div>
        <header className="cabecalho"><h1>Bem-vindo ao FinBase</h1></header>
        <div className="cartao">
          <p><strong>Aqui você aprende a cuidar do seu dinheiro</strong>, do começo, sem palavra difícil.</p>
          <p>São cinco lições curtas, um lugar para anotar seus gastos e simuladores que mostram o que acontece com juros.</p>
        </div>
        <div className="aviso aviso--ok">
          <strong>Seus dados são só seus.</strong> O FinBase não pede cadastro, não pede CPF e não pede senha.
          Tudo o que você anotar fica guardado apenas neste celular e não é enviado para lugar nenhum.
        </div>
        <div className="aviso aviso--info">
          <strong>Funciona sem internet.</strong> Depois de abrir a primeira vez, o app continua funcionando
          mesmo sem dados móveis.
        </div>
        <button className="btn" onClick={() => setViuOnboarding(true)}>Começar</button>
      </div>
    )
  }

  return (
    <div>
      <header className="cabecalho">
        <h1>FinBase</h1>
      </header>
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>
        Educação financeira na palma da mão
      </p>

      <nav className="grade-menu" aria-label="Menu principal">
        <ItemMenu
          para="/aprender" emoji="📚" titulo="Aprender"
          descricao={`${concluidas.length} de ${LICOES.length} lições concluídas`}
          cor="var(--azul)"
        />
        <ItemMenu
          para="/gastos" emoji="💰" titulo="Meus gastos"
          descricao="Anote o que entra e o que sai" cor="var(--verde)"
        />
        <ItemMenu
          para="/simuladores" emoji="📊" titulo="Simuladores"
          descricao="Veja o que os juros fazem com o seu dinheiro" cor="var(--laranja)"
        />
        <ItemMenu
          para="/glossario" emoji="📖" titulo="Glossário"
          descricao="O que significa cada palavra difícil" cor="var(--roxo)"
        />
        <ItemMenu
          para="/ajustes" emoji="⚙️" titulo="Ajustes"
          descricao="Sobre o projeto e seus dados" cor="var(--fg-suave)"
        />
      </nav>
    </div>
  )
}
