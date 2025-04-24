
export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Qual é o nome completo do jogador Art da FURIA?",
    options: [
      "Andrei Piovezan",
      "André Perreira",
      "Andrei Piovesan",
      "André Pinheiro"
    ],
    correctAnswer: "Andrei Piovezan",
    explanation: "Andrei 'Art' Piovezan é o capitão e AWPer da FURIA Esports."
  },
  {
    question: "Em qual ano a FURIA Esports foi fundada?",
    options: ["2015", "2016", "2017", "2018"],
    correctAnswer: "2017",
    explanation: "A FURIA Esports foi fundada em 2017 por Jaime Pádua e Chuquer."
  },
  {
    question: "Qual jogador da FURIA é conhecido pelo apelido 'O Robô'?",
    options: ["Art", "KSCERATO", "yuurih", "drop"],
    correctAnswer: "KSCERATO",
    explanation: "Kaike 'KSCERATO' Cerato é conhecido como 'O Robô' por sua consistência e frieza nas partidas."
  },
  {
    question: "Em qual Major a FURIA alcançou sua melhor colocação até 2023?",
    options: [
      "IEM Rio Major 2022",
      "PGL Stockholm Major 2021",
      "StarLadder Berlin Major 2019",
      "PGL Antwerp Major 2022"
    ],
    correctAnswer: "StarLadder Berlin Major 2019",
    explanation: "Na StarLadder Berlin Major 2019, a FURIA chegou às quartas de final (top 8)."
  },
  {
    question: "Qual é a nacionalidade de todos os jogadores do time principal da FURIA CS:GO?",
    options: ["Brasileira", "Mista (Brasil e Argentina)", "Mista (Brasil e Portugal)", "Mista (Brasil e Uruguai)"],
    correctAnswer: "Brasileira",
    explanation: "Todos os jogadores do time principal da FURIA CS:GO são brasileiros."
  }
];

// Famous quotes from FURIA players
export const famousQuotes = [
  {
    quote: "ATENÇÃO! ATENÇÃO! ATENÇÃO! ATENÇÃO!",
    player: "Art",
    audioSrc: null
  },
  {
    quote: "Eu só queria que vocês soubessem que o timing da FURIA sempre será perfeito.",
    player: "KSCERATO",
    audioSrc: null
  },
  {
    quote: "Nós não vamos parar até sermos o melhor time do mundo.",
    player: "Art",
    audioSrc: null
  },
  {
    quote: "Nossa força está na nossa união como time.",
    player: "KSCERATO",
    audioSrc: null
  }
];
