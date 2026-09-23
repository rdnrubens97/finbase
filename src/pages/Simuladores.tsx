import { Cabecalho } from '../components/Cabecalho'
import { ItemMenu } from '../components/ItemMenu'

export function Simuladores() {
  return (
    <div>
      <Cabecalho titulo="Simuladores" />
      <p style={{ color: 'var(--fg-suave)', marginTop: '-8px' }}>
        Coloque os seus números e veja o que acontece.
      </p>
      <nav className="grade-menu">
        <ItemMenu
          para="/simuladores/juros" emoji="⏳" titulo="Juros compostos"
          descricao="Quanto rende guardar um valor todo mês" cor="var(--verde)"
        />
        <ItemMenu
          para="/simuladores/rotativo" emoji="💳" titulo="Fatura do cartão"
          descricao="O que acontece pagando só o mínimo" cor="var(--vermelho)"
        />
        <ItemMenu
          para="/simuladores/investimentos" emoji="🌱" titulo="Onde guardar"
          descricao="Comparar poupança, Tesouro Selic e CDB" cor="var(--azul)"
        />
      </nav>
    </div>
  )
}
