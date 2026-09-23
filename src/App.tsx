import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { Aprender } from './pages/Aprender'
import { LicaoPagina } from './pages/Licao'
import { Gastos } from './pages/Gastos'
import { NovoLancamento } from './pages/NovoLancamento'
import { Simuladores } from './pages/Simuladores'
import { SimJuros } from './pages/SimJuros'
import { SimRotativo } from './pages/SimRotativo'
import { SimInvestimentos } from './pages/SimInvestimentos'
import { Glossario } from './pages/Glossario'
import { Ajustes } from './pages/Ajustes'

export default function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/aprender" element={<Aprender />} />
          <Route path="/aprender/:id" element={<LicaoPagina />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/gastos/novo" element={<NovoLancamento />} />
          <Route path="/simuladores" element={<Simuladores />} />
          <Route path="/simuladores/juros" element={<SimJuros />} />
          <Route path="/simuladores/rotativo" element={<SimRotativo />} />
          <Route path="/simuladores/investimentos" element={<SimInvestimentos />} />
          <Route path="/glossario" element={<Glossario />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
