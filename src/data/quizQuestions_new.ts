export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Qual é o nome completo do jogador Art da FURIA?",
    options: ["Andrei Piovezan", "André Perreira", "Andrei Piovesan", "André Pinheiro"],
    correctAnswer: "Andrei Piovezan",
    explanation: "Andrei 'Art' Piovezan é o capitão e AWPer da FURIA Esports."
  },
  {
    question: "Em qual ano a FURIA Esports foi fundada?",
    options: ["2015", "2016", "2017", "2018"],
    correctAnswer: "2017",
    explanation: "A FURIA Esports foi fundada em 2017 por Jaime Pádua e André Akkari."
  },
  {
    question: "Qual jogador da FURIA é conhecido pelo apelido 'O Robô'?",
    options: ["Art", "KSCERATO", "yuurih", "drop"],
    correctAnswer: "KSCERATO",
    explanation: "Kaike 'KSCERATO' Cerato é conhecido como 'O Robô' por sua consistência e frieza nas partidas."
  },
  {
    question: "Em qual Major a FURIA alcançou sua melhor colocação até 2023?",
    options: ["IEM Rio Major 2022", "PGL Stockholm Major 2021", "StarLadder Berlin Major 2019", "PGL Antwerp Major 2022"],
    correctAnswer: "StarLadder Berlin Major 2019",
    explanation: "Na StarLadder Berlin Major 2019, a FURIA chegou às quartas de final (top 8)."
  },
  {
    question: "Qual é a nacionalidade de todos os jogadores do time principal da FURIA CS:GO?",
    options: ["Brasileira", "Mista (Brasil e Argentina)", "Mista (Brasil e Portugal)", "Mista (Brasil e Uruguai)"],
    correctAnswer: "Brasileira",
    explanation: "Todos os jogadores do time principal da FURIA CS:GO são brasileiros."
  },
  {
    question: "Qual foi o primeiro título internacional da FURIA?",
    options: ["ESL Pro League Season 11", "DreamHack Masters Spring 2020", "ESL One: Road to Rio", "BLAST Premier: Spring 2020"],
    correctAnswer: "ESL One: Road to Rio",
    explanation: "A FURIA conquistou seu primeiro título internacional na ESL One: Road to Rio em 2020."
  },
  {
    question: "Qual é a cor principal do uniforme da FURIA?",
    options: ["Preto", "Azul", "Vermelho", "Verde"],
    correctAnswer: "Preto",
    explanation: "O uniforme principal da FURIA é predominantemente preto com detalhes em azul ciano."
  },
  {
    question: "Qual destes jogadores nunca jogou pela FURIA?",
    options: ["coldzera", "chelo", "saffee", "honda"],
    correctAnswer: "coldzera",
    explanation: "Coldzera nunca fez parte do roster da FURIA, enquanto todos os outros já jogaram pela equipe."
  },
  {
    question: "Qual é o nome da arena de treinamento da FURIA?",
    options: ["FURIA Arena", "FURIA House", "FURIA Training Center", "FURIA Base"],
    correctAnswer: "FURIA Arena",
    explanation: "A FURIA Arena é o centro de treinamento oficial da equipe, localizada em São Paulo."
  },
  {
    question: "Qual destes jogos a FURIA NÃO tem uma equipe competitiva?",
    options: ["Valorant", "CS:GO", "Dota 2", "Free Fire"],
    correctAnswer: "Dota 2",
    explanation: "A FURIA tem equipes em vários jogos, mas não possui uma equipe de Dota 2."
  },
  {
    question: "Qual foi o primeiro grande patrocinador da FURIA?",
    options: ["Nike", "Honda", "Red Bull", "HyperX"],
    correctAnswer: "Nike",
    explanation: "A Nike foi o primeiro grande patrocinador da FURIA, marcando história como primeira parceria desse porte no esports brasileiro."
  },
  {
    question: "Qual é o slogan da FURIA?",
    options: ["#DIADEFURIA", "#GOFURIA", "#FURIAUP", "#FURIAWIN"],
    correctAnswer: "#DIADEFURIA",
    explanation: "#DIADEFURIA é o slogan oficial da FURIA, usado em suas redes sociais e eventos."
  },
  {
    question: "Qual destes streamers faz parte da FURIA?",
    options: ["Gaules", "Alanzoka", "Casimito", "YoDa"],
    correctAnswer: "Gaules",
    explanation: "Gaules é um dos principais streamers da FURIA, sendo também um dos embaixadores da organização."
  },
  {
    question: "Em qual cidade está localizado o escritório principal da FURIA nos EUA?",
    options: ["Miami", "Los Angeles", "New York", "Las Vegas"],
    correctAnswer: "Miami",
    explanation: "A FURIA tem seu escritório principal nos Estados Unidos localizado em Miami, Flórida."
  },
  {
    question: "Qual destes torneios a FURIA já venceu?",
    options: ["ESL Pro League", "BLAST Premier", "IEM Katowice", "ESL One: Road to Rio"],
    correctAnswer: "ESL One: Road to Rio",
    explanation: "A FURIA venceu a ESL One: Road to Rio em 2020, um dos seus maiores títulos."
  }
];

// Citações famosas dos jogadores da FURIA
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
  },
  {
    quote: "Cada dia é um dia de FURIA!",
    player: "guerri",
    audioSrc: null
  }
]; 