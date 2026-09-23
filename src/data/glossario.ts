export interface Termo { termo: string; definicao: string }

/** Regra: nenhuma definição pode usar outro termo técnico sem explicá-lo ali mesmo. */
export const GLOSSARIO: Termo[] = [
  { termo: 'Juros', definicao: 'O aluguel do dinheiro. Você paga quando pega emprestado e recebe quando guarda em uma aplicação.' },
  { termo: 'Juros compostos', definicao: 'Quando o juro do mês passa a fazer parte da dívida e no mês seguinte rende juro também. É juro sobre juro.' },
  { termo: 'Rotativo', definicao: 'O empréstimo automático que acontece quando você não paga a fatura inteira do cartão. É a dívida mais cara do Brasil.' },
  { termo: 'CET', definicao: 'Custo Efetivo Total. O valor real de um empréstimo, somando juros, taxas e seguros. É o único número que permite comparar ofertas.' },
  { termo: 'Inflação', definicao: 'O aumento geral dos preços. Com o mesmo dinheiro você compra menos do que comprava antes.' },
  { termo: 'Selic', definicao: 'A taxa básica de juros do Brasil, definida pelo Banco Central. Ela influencia o quanto rendem as aplicações e o quanto custam os empréstimos.' },
  { termo: 'Tesouro Selic', definicao: 'Um empréstimo que você faz ao governo brasileiro. Considerado a aplicação mais segura do país, com resgate a qualquer dia.' },
  { termo: 'CDB', definicao: 'Um empréstimo que você faz a um banco. Ele devolve com juros. Protegido pelo FGC até R$ 250 mil por banco.' },
  { termo: 'FGC', definicao: 'Fundo Garantidor de Créditos. Devolve seu dinheiro, até R$ 250 mil por banco, caso a instituição quebre.' },
  { termo: 'Liquidez', definicao: 'A rapidez com que você consegue transformar uma aplicação em dinheiro na conta.' },
  { termo: 'Reserva de emergência', definicao: 'Dinheiro guardado para imprevistos. Serve para você não precisar do cartão quando algo quebra.' },
  { termo: 'Orçamento', definicao: 'O plano do que entra e do que sai no mês. Serve para decidir antes de gastar, em vez de descobrir depois.' },
  { termo: 'Gasto fixo', definicao: 'Aquele que vem todo mês no mesmo valor, como aluguel e internet. Se resolve renegociando uma vez.' },
  { termo: 'Gasto variável', definicao: 'Aquele que muda de um mês para o outro, como comida e transporte. Exige controle no dia a dia.' },
  { termo: 'Amortizar', definicao: 'Abater parte do valor que você deve, diminuindo a dívida em si e não apenas os juros do mês.' },
]
