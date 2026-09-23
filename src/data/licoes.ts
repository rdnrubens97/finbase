import type { Licao } from './tipos'

/**
 * Cinco lições de até 3 minutos.
 *
 * Regra de escrita: nenhum termo técnico sem explicação na mesma frase, e todo
 * exemplo com valores da realidade do público-alvo (salário mínimo, fatura de
 * cartão, conta de luz). Jargão afasta exatamente quem mais precisa.
 */
export const LICOES: Licao[] = [
  {
    id: 'para-onde-vai',
    titulo: 'Para onde vai o seu dinheiro',
    resumo: 'Por que o salário some antes do fim do mês',
    emoji: '🔎',
    paragrafos: [
      'A pergunta mais importante da educação financeira não é "quanto você ganha", é "para onde vai o que você ganha". A maioria das pessoas sabe responder a primeira e não faz ideia da segunda.',
      'Isso acontece porque gasto grande a gente lembra: aluguel, prestação, conta de luz. O que some é o gasto pequeno e repetido. Um lanche de R$ 15 cinco vezes por semana são R$ 300 por mês. Ninguém sente no momento da compra, mas some do saldo.',
      'Por isso o primeiro passo não é cortar gasto. É enxergar. Você não consegue mudar aquilo que não vê. Anotar por 30 dias, mesmo sem mudar nada, já muda o comportamento — porque anotar obriga a reparar.',
      'Comece separando seus gastos em dois tipos: os fixos, que vêm todo mês no mesmo valor (aluguel, internet), e os variáveis, que mudam (comida, transporte, lazer). Gasto fixo você renegocia uma vez. Gasto variável você controla todo dia.',
      'Nesta trilha, a ideia é simples: primeiro enxergar, depois entender os juros, e só então pensar em guardar. Nessa ordem.',
    ],
    quiz: [
      {
        enunciado: 'Qual costuma ser o tipo de gasto que mais "some" sem a pessoa perceber?',
        alternativas: ['O aluguel', 'Gastos pequenos e repetidos', 'A conta de luz', 'A prestação do celular'],
        correta: 1,
        explicacao: 'Gastos grandes a gente lembra porque doem na hora. Os pequenos e repetidos passam despercebidos justamente por serem pequenos — mas somados no mês viram um valor alto.',
      },
      {
        enunciado: 'Qual é o primeiro passo para organizar o dinheiro?',
        alternativas: ['Cortar todos os gastos com lazer', 'Pegar um empréstimo para quitar dívidas', 'Anotar e enxergar para onde o dinheiro vai', 'Abrir conta em outro banco'],
        correta: 2,
        explicacao: 'Não dá para mudar o que não se enxerga. Anotar por 30 dias, mesmo sem cortar nada, já é o passo que muda o comportamento.',
      },
      {
        enunciado: 'Um gasto fixo é aquele que:',
        alternativas: ['Vem todo mês, praticamente no mesmo valor', 'Só acontece uma vez por ano', 'Você pode deixar de pagar', 'Muda muito de um mês para o outro'],
        correta: 0,
        explicacao: 'Gasto fixo se repete no mesmo valor — aluguel, internet, mensalidade. Ele se resolve renegociando uma vez. O variável muda e precisa de controle diário.',
      },
    ],
  },
  {
    id: 'o-que-sao-juros',
    titulo: 'O que são juros',
    resumo: 'O aluguel do dinheiro — a favor ou contra você',
    emoji: '⏳',
    paragrafos: [
      'Juro é o aluguel do dinheiro. Quando você pega dinheiro emprestado, paga aluguel para quem emprestou. Quando você guarda dinheiro em uma aplicação, recebe aluguel de quem usou o seu.',
      'Existem dois tipos. No juro simples, o aluguel é sempre calculado sobre o valor original. No juro composto, o aluguel do mês passa a fazer parte da dívida e no mês seguinte rende aluguel também. É juro sobre juro.',
      'Um exemplo com número redondo: uma dívida de R$ 1.000 a 10% ao mês. No primeiro mês, R$ 100 de juros. No segundo, os 10% incidem sobre R$ 1.100, então são R$ 110. No terceiro, sobre R$ 1.210. Em doze meses a dívida não dobra — ela vira cerca de R$ 3.138.',
      'O ponto que quase ninguém percebe: juro composto não cresce em linha reta, cresce em curva. No começo parece pouco e por isso a pessoa relaxa. A partir de certo ponto ele dispara, e aí já é tarde.',
      'A mesma força funciona nos dois sentidos. Contra você, na dívida do cartão. A seu favor, no dinheiro guardado. A diferença entre as duas situações costuma ser uma decisão tomada em um único dia.',
    ],
    quiz: [
      {
        enunciado: 'O que é juro composto?',
        alternativas: ['Juro calculado sempre sobre o valor original', 'Juro que incide também sobre os juros já acumulados', 'Um tipo de imposto do governo', 'Uma taxa cobrada só por bancos'],
        correta: 1,
        explicacao: 'No juro composto, o juro do mês entra na conta do mês seguinte. É juro sobre juro — por isso a dívida cresce em curva, não em linha reta.',
      },
      {
        enunciado: 'Uma dívida de R$ 1.000 a 10% ao mês, em 12 meses, fica em aproximadamente:',
        alternativas: ['R$ 1.200', 'R$ 2.200', 'R$ 3.138', 'R$ 1.100'],
        correta: 2,
        explicacao: 'Cerca de R$ 3.138. Mais que o triplo. Se fosse juro simples seriam R$ 2.200 — a diferença de R$ 938 é o efeito do juro composto.',
      },
      {
        enunciado: 'Por que juros compostos costumam pegar as pessoas de surpresa?',
        alternativas: ['Porque começam devagar e depois disparam', 'Porque são ilegais', 'Porque só existem em bancos grandes', 'Porque mudam todo dia'],
        correta: 0,
        explicacao: 'No início o crescimento parece pequeno e a pessoa relaxa. O salto vem depois — quando a dívida já está grande.',
      },
    ],
  },
  {
    id: 'cartao-e-rotativo',
    titulo: 'Cartão de crédito e o pagamento mínimo',
    resumo: 'A dívida mais cara que existe no Brasil',
    emoji: '💳',
    paragrafos: [
      'O cartão de crédito não é vilão. Usado com a fatura paga por inteiro todo mês, ele é gratuito e até útil, porque concentra os gastos em uma data só.',
      'O problema começa quando aparece aquela opção de pagar o "mínimo". Pagar o mínimo não é uma facilidade que o banco oferece — é um empréstimo automático, e o mais caro do mercado brasileiro.',
      'Isso se chama crédito rotativo. O valor que você não pagou continua rendendo juros que costumam ficar entre 12% e 16% ao mês — o que equivale a algo entre 290% e 490% ao ano. Para comparar: um financiamento de carro fica perto de 25% ao ano.',
      'Na prática, com juros de 14% ao mês e pagando o mínimo de 15%: em doze meses você terá desembolsado cerca de R$ 1.520 e ainda deverá R$ 685. Ou seja, pagou uma vez e meia o valor da compra e a dívida caiu menos de um terço. Só de juros foram R$ 1.208 — mais do que a compra original.',
      'E existe um ponto em que a conta vira: se os juros passarem de 17,6% ao mês, o pagamento mínimo não cobre nem os juros do mês. A dívida cresce mesmo você pagando religiosamente, todo mês, sem usar o cartão de novo.',
      'Se já estiver no rotativo, a saída é trocar essa dívida por uma mais barata. Empréstimo pessoal, consignado ou até parcelamento da própria fatura costumam cobrar bem menos. Trocar dívida cara por dívida barata não é se endividar mais — é parar de sangrar.',
      'Uma regra que vale para a vida inteira: se não dá para pagar a fatura inteira, é porque a compra não cabia no orçamento.',
    ],
    quiz: [
      {
        enunciado: 'Pagar apenas o mínimo da fatura significa:',
        alternativas: ['Que a dívida foi quitada', 'Que o restante vira um empréstimo com juros altíssimos', 'Que o banco perdoou o resto', 'Que você ganha desconto'],
        correta: 1,
        explicacao: 'O que não foi pago entra no crédito rotativo, com juros de 12% a 16% ao mês. Em um ano isso equivale a algo entre 290% e 490%.',
      },
      {
        enunciado: 'Se você já está no rotativo, qual é a melhor saída?',
        alternativas: ['Continuar pagando o mínimo até melhorar', 'Trocar por uma dívida mais barata, como empréstimo pessoal', 'Fazer um novo cartão', 'Parar de pagar'],
        correta: 1,
        explicacao: 'Trocar dívida cara por barata reduz o juro que corre contra você. Não é se endividar mais — é parar de sangrar.',
      },
      {
        enunciado: 'O cartão de crédito é gratuito quando:',
        alternativas: ['Você paga a fatura inteira todo mês', 'Você paga o mínimo', 'Você parcela tudo', 'Você usa pouco'],
        correta: 0,
        explicacao: 'Fatura paga por inteiro, dentro do prazo, não gera juros. O custo aparece quando sobra saldo.',
      },
    ],
  },
  {
    id: 'comecar-a-guardar',
    titulo: 'Começar a guardar',
    resumo: 'A reserva que evita a próxima dívida',
    emoji: '🐷',
    paragrafos: [
      'Guardar dinheiro não é sobre ficar rico. É sobre não precisar do cartão quando a geladeira quebrar. Quem tem reserva não entra no rotativo, e é aí que está a maior economia.',
      'A primeira meta não é grande: junte o valor de um mês das suas despesas essenciais. Só isso já muda a sua relação com imprevisto.',
      'O erro mais comum é guardar o que sobra no fim do mês. Nunca sobra. Inverta a ordem: separe assim que o dinheiro entra, nem que sejam R$ 50, e viva com o resto. Isso se chama pagar a si mesmo primeiro.',
      'Valor pequeno e constante vence valor grande e esporádico. R$ 50 por mês durante um ano são R$ 600 guardados, mais o rendimento. Esperar "sobrar R$ 500 de uma vez" costuma significar nunca começar.',
      'A reserva precisa ficar em lugar seguro e de onde dê para tirar rápido. Rendimento alto aqui não é o objetivo — o objetivo é estar disponível no dia em que você precisar.',
    ],
    quiz: [
      {
        enunciado: 'Qual é a principal função de uma reserva de emergência?',
        alternativas: ['Ficar rico rápido', 'Evitar dívida cara quando surge um imprevisto', 'Comprar ações', 'Pagar o cartão todo mês'],
        correta: 1,
        explicacao: 'A reserva existe para você não precisar do rotativo quando algo quebra ou falta. É proteção, não investimento.',
      },
      {
        enunciado: 'Qual a melhor forma de começar a guardar?',
        alternativas: ['Guardar o que sobrar no fim do mês', 'Separar um valor assim que o dinheiro entra', 'Esperar um aumento de salário', 'Guardar só no fim do ano'],
        correta: 1,
        explicacao: 'Guardar o que sobra não funciona, porque nunca sobra. Separar na entrada — pagar a si mesmo primeiro — é o que faz a diferença.',
      },
      {
        enunciado: 'Onde a reserva de emergência deve ficar?',
        alternativas: ['Em um lugar seguro e de retirada rápida', 'Em ações de empresas', 'Emprestada para um parente', 'Em um imóvel'],
        correta: 0,
        explicacao: 'Precisa estar disponível no dia em que você precisar. Rendimento alto não é o objetivo da reserva.',
      },
    ],
  },
  {
    id: 'fazer-render',
    titulo: 'Fazer o dinheiro render',
    resumo: 'Poupança, Tesouro e CDB em linguagem simples',
    emoji: '🌱',
    paragrafos: [
      'Depois que a reserva existe, vem a pergunta: onde colocar o dinheiro para ele não perder valor. Dinheiro parado em casa perde poder de compra todo mês por causa da inflação — que é o aumento geral dos preços.',
      'A poupança é a mais conhecida e a mais simples, mas costuma render menos que as outras opções e, em vários períodos, rende menos que a inflação. Ou seja: o número cresce e o poder de compra encolhe.',
      'O Tesouro Selic é um empréstimo que você faz ao governo brasileiro. É considerado a aplicação mais segura do país, permite resgatar a qualquer dia e dá para começar com cerca de R$ 30.',
      'O CDB é o mesmo princípio, mas com banco no lugar do governo. Até R$ 250 mil por banco, é protegido pelo FGC, um fundo que devolve o dinheiro caso o banco quebre.',
      'Três perguntas resolvem qualquer escolha: quanto rende, qual o risco de perder, e em quanto tempo consigo o dinheiro de volta. Se alguém promete rendimento altíssimo sem risco nenhum, não é investimento — é golpe.',
      'Este aplicativo tem finalidade educacional e não recomenda nenhum investimento específico nem qualquer instituição financeira.',
    ],
    quiz: [
      {
        enunciado: 'Por que dinheiro parado em casa perde valor?',
        alternativas: ['Por causa da inflação, que faz os preços subirem', 'Porque o banco cobra taxa', 'Porque o governo confisca', 'Porque o dinheiro estraga'],
        correta: 0,
        explicacao: 'Inflação é o aumento geral dos preços. Com o mesmo valor você compra menos a cada ano — então dinheiro parado perde poder de compra.',
      },
      {
        enunciado: 'O Tesouro Selic é:',
        alternativas: ['Uma ação da bolsa de valores', 'Um empréstimo que você faz ao governo, com resgate a qualquer dia', 'Uma conta corrente', 'Um tipo de seguro'],
        correta: 1,
        explicacao: 'É um título público: você empresta ao governo e recebe juros. É a aplicação mais segura do país e permite resgate diário.',
      },
      {
        enunciado: 'Alguém promete rendimento altíssimo, garantido e sem risco. O que fazer?',
        alternativas: ['Investir tudo rapidamente', 'Desconfiar — não existe rendimento alto sem risco', 'Pedir empréstimo para investir', 'Chamar amigos para entrar junto'],
        correta: 1,
        explicacao: 'Rendimento e risco andam juntos. Promessa de ganho alto garantido e sem risco é o sinal mais clássico de golpe.',
      },
    ],
  },
]
