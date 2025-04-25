export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

// Função para selecionar 10 perguntas aleatórias do banco de questões
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const allQuizQuestions: QuizQuestion[] = [
  {
    question: "Qual é o nome completo do jogador KZMOLODOY?",
    options: ["Kirill Mikhailov", "Konstantin Molodov", "Kirill Molodoy", "Konstantin Mikhailov"],
    correctAnswer: "Kirill Mikhailov",
    explanation: "KZMOLODOY, cujo nome completo é Kirill Mikhailov, é um dos jogadores titulares da FURIA."
  },
  {
    question: "De qual país é o jogador LVYEKINDAR?",
    options: ["Rússia", "Ucrânia", "Letônia", "Estônia"],
    correctAnswer: "Letônia",
    explanation: "LVYEKINDAR é da Letônia e é conhecido por seu estilo agressivo de jogo."
  },
  {
    question: "Qual é o nome completo do FalleN?",
    options: ["Gabriel Toledo", "Fernando Allen", "Gabriel Allen", "Fernando Toledo"],
    correctAnswer: "Gabriel Toledo",
    explanation: "Gabriel 'FalleN' Toledo é um dos jogadores mais experientes e respeitados do CS:GO brasileiro."
  },
  {
    question: "Em qual ano a FURIA Esports foi fundada?",
    options: ["2015", "2016", "2017", "2018"],
    correctAnswer: "2017",
    explanation: "A FURIA Esports foi fundada em 2017 por Jaime Pádua e André Akkari."
  },
  {
    question: "Qual jogador da FURIA é conhecido pelo apelido 'O Robô'?",
    options: ["KZMOLODOY", "KSCERATO", "yuurih", "FalleN"],
    correctAnswer: "KSCERATO",
    explanation: "Kaike 'KSCERATO' Cerato é conhecido como 'O Robô' por sua consistência e frieza nas partidas."
  },
  {
    question: "Quem são os coaches atuais da FURIA?",
    options: ["guerri e tacitus", "Hepa e sidde", "guerri e Hepa", "tacitus e sidde"],
    correctAnswer: "Hepa e sidde",
    explanation: "A FURIA conta com Hepa e sidde como seus coaches atuais."
  },
  {
    question: "Qual destes jogadores é reserva da FURIA?",
    options: ["KSCERATO", "yuurih", "skullz", "KZMOLODOY"],
    correctAnswer: "skullz",
    explanation: "skullz é um dos jogadores reservas do atual lineup da FURIA."
  },
  {
    question: "Em qual Major a FURIA alcançou sua melhor colocação até 2023?",
    options: ["IEM Rio Major 2022", "PGL Stockholm Major 2021", "StarLadder Berlin Major 2019", "PGL Antwerp Major 2022"],
    correctAnswer: "StarLadder Berlin Major 2019",
    explanation: "Na StarLadder Berlin Major 2019, a FURIA chegou às quartas de final (top 8)."
  },
  {
    question: "Qual é a nacionalidade predominante no atual lineup da FURIA?",
    options: ["Brasileira", "Mista (Brasil e Rússia)", "Mista (Brasil e Letônia)", "Mista (Brasil e Ucrânia)"],
    correctAnswer: "Mista (Brasil e Rússia)",
    explanation: "O atual lineup da FURIA é composto principalmente por jogadores brasileiros e russos."
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
  },
  {
    question: "Quem é o atual IGL (In-Game Leader) da FURIA?",
    options: ["FalleN", "KSCERATO", "KZMOLODOY", "LVYEKINDAR"],
    correctAnswer: "FalleN",
    explanation: "Gabriel 'FalleN' Toledo é o atual IGL da FURIA, trazendo sua vasta experiência para liderar a equipe."
  },
  {
    question: "Qual é o principal AWPer da FURIA atualmente?",
    options: ["FalleN", "KZMOLODOY", "KSCERATO", "yuurih"],
    correctAnswer: "FalleN",
    explanation: "FalleN é o AWPer principal da equipe, conhecido por sua precisão com a arma."
  },
  {
    question: "Em qual cidade do Brasil está localizada a FURIA Arena?",
    options: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba"],
    correctAnswer: "São Paulo",
    explanation: "A FURIA Arena está localizada em São Paulo, sendo o principal centro de treinamento da equipe."
  },
  {
    question: "Qual destes jogadores é o mais novo do atual lineup da FURIA?",
    options: ["KZMOLODOY", "yuurih", "KSCERATO", "LVYEKINDAR"],
    correctAnswer: "KZMOLODOY",
    explanation: "KZMOLODOY é o jogador mais jovem do atual lineup principal da FURIA."
  },
  {
    question: "Qual é o papel principal do jogador LVYEKINDAR na equipe?",
    options: ["Entry Fragger", "Lurker", "Support", "AWPer"],
    correctAnswer: "Entry Fragger",
    explanation: "LVYEKINDAR é conhecido por ser um excelente Entry Fragger, sendo o primeiro a entrar nos bombsites."
  },
  {
    question: "Qual destes jogadores é conhecido por suas jogadas agressivas e arriscadas?",
    options: ["LVYEKINDAR", "KSCERATO", "yuurih", "FalleN"],
    correctAnswer: "LVYEKINDAR",
    explanation: "LVYEKINDAR é famoso por seu estilo de jogo agressivo e arriscado, frequentemente surpreendendo os adversários."
  },
  {
    question: "Qual é a função do sidde na FURIA?",
    options: ["Coach Principal", "Coach Assistente", "Analista", "Preparador Físico"],
    correctAnswer: "Coach Assistente",
    explanation: "sidde atua como coach assistente da FURIA, trabalhando junto com Hepa."
  },
  {
    question: "Qual destes jogadores já foi considerado o melhor do mundo em CS:GO?",
    options: ["FalleN", "KSCERATO", "KZMOLODOY", "LVYEKINDAR"],
    correctAnswer: "FalleN",
    explanation: "FalleN já foi considerado um dos melhores jogadores do mundo durante sua carreira."
  },
  {
    question: "Qual é o mapa favorito da atual lineup da FURIA?",
    options: ["Mirage", "Inferno", "Ancient", "Nuke"],
    correctAnswer: "Mirage",
    explanation: "Mirage é historicamente um dos mapas mais fortes da FURIA."
  },
  {
    question: "Quantos Major Championships a FURIA já participou?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "A FURIA participou de 7 Major Championships até o momento."
  },
  {
    question: "Qual é o nome do CEO da FURIA?",
    options: ["Jaime Pádua", "André Akkari", "Gabriel Toledo", "Marcos Soares"],
    correctAnswer: "Jaime Pádua",
    explanation: "Jaime Pádua é o CEO e um dos fundadores da FURIA."
  },
  {
    question: "Em qual jogo a FURIA fez sua primeira contratação internacional?",
    options: ["CS:GO", "Valorant", "Free Fire", "League of Legends"],
    correctAnswer: "CS:GO",
    explanation: "A FURIA fez sua primeira contratação internacional no CS:GO."
  },
  {
    question: "Qual destes não é um valor da FURIA?",
    options: ["Paixão", "Individualidade", "Inovação", "Excelência"],
    correctAnswer: "Individualidade",
    explanation: "A FURIA valoriza o trabalho em equipe, não o individualismo."
  },
  {
    question: "Qual é o nome do mascote da FURIA?",
    options: ["Pantera", "Jaguar", "Tigre", "Leão"],
    correctAnswer: "Pantera",
    explanation: "A pantera negra é o mascote oficial da FURIA."
  },
  {
    question: "Qual destes jogadores é conhecido como 'The Professor'?",
    options: ["FalleN", "KSCERATO", "yuurih", "LVYEKINDAR"],
    correctAnswer: "FalleN",
    explanation: "FalleN é conhecido como 'The Professor' por seu conhecimento profundo do jogo."
  },
  {
    question: "Qual foi o primeiro jogo em que a FURIA competiu profissionalmente?",
    options: ["CS:GO", "League of Legends", "Dota 2", "PUBG"],
    correctAnswer: "CS:GO",
    explanation: "A FURIA começou sua jornada competitiva no CS:GO."
  },
  {
    question: "Qual é o nome do programa de desenvolvimento de talentos da FURIA?",
    options: ["FURIA Academy", "FURIA Next", "FURIA Young", "FURIA Talents"],
    correctAnswer: "FURIA Academy",
    explanation: "FURIA Academy é o programa de desenvolvimento de novos talentos da organização."
  },
  {
    question: "Qual destes é um dos valores fundamentais da FURIA?",
    options: ["Competição", "Diversão", "Excelência", "Simplicidade"],
    correctAnswer: "Excelência",
    explanation: "A excelência é um dos valores fundamentais da FURIA."
  },
  {
    question: "Qual é o nome do programa de streaming da FURIA?",
    options: ["FURIA TV", "FURIA Live", "FURIA Stream", "FURIA Channel"],
    correctAnswer: "FURIA TV",
    explanation: "FURIA TV é o programa oficial de streaming da organização."
  },
  {
    question: "Qual destes é um dos principais patrocinadores atuais da FURIA?",
    options: ["Nike", "Adidas", "Puma", "Under Armour"],
    correctAnswer: "Nike",
    explanation: "A Nike continua sendo um dos principais patrocinadores da FURIA."
  },
  {
    question: "Em qual região dos EUA a FURIA tem sua base de operações?",
    options: ["Oeste", "Leste", "Sul", "Centro"],
    correctAnswer: "Sul",
    explanation: "A FURIA tem sua base de operações no sul dos EUA, em Miami."
  },
  {
    question: "Qual é o objetivo da FURIA Academy?",
    options: ["Formar novos talentos", "Gerar lucro", "Entretenimento", "Marketing"],
    correctAnswer: "Formar novos talentos",
    explanation: "O principal objetivo da FURIA Academy é desenvolver novos talentos para o cenário competitivo."
  },
  {
    question: "Qual destes é um dos valores da marca FURIA?",
    options: ["Tradição", "Inovação", "Conservadorismo", "Simplicidade"],
    correctAnswer: "Inovação",
    explanation: "A inovação é um dos principais valores da marca FURIA."
  },
  {
    question: "Qual é o nome do programa social da FURIA?",
    options: ["FURIA Social", "FURIA Care", "FURIA Community", "FURIA Impact"],
    correctAnswer: "FURIA Social",
    explanation: "FURIA Social é o programa de responsabilidade social da organização."
  },
  {
    question: "Qual destes é um dos objetivos estratégicos da FURIA?",
    options: ["Expansão global", "Foco regional", "Redução de custos", "Simplicidade"],
    correctAnswer: "Expansão global",
    explanation: "A expansão global é um dos principais objetivos estratégicos da FURIA."
  },
  {
    question: "Qual é o principal mercado da FURIA fora do Brasil?",
    options: ["Estados Unidos", "Europa", "Ásia", "América Latina"],
    correctAnswer: "Estados Unidos",
    explanation: "Os Estados Unidos são o principal mercado internacional da FURIA."
  },
  {
    question: "Qual é o foco da FURIA em termos de conteúdo?",
    options: ["Entretenimento", "Educação", "Notícias", "Política"],
    correctAnswer: "Entretenimento",
    explanation: "A FURIA tem como foco principal a produção de conteúdo de entretenimento."
  },
  {
    question: "Qual é a missão da FURIA?",
    options: ["Ser a maior org do mundo", "Inspirar pessoas", "Ganhar campeonatos", "Fazer dinheiro"],
    correctAnswer: "Inspirar pessoas",
    explanation: "A missão da FURIA é inspirar pessoas através do esporte eletrônico."
  },
  {
    question: "Qual é o valor mais importante para a FURIA?",
    options: ["Paixão", "Dinheiro", "Fama", "Poder"],
    correctAnswer: "Paixão",
    explanation: "A paixão é considerada o valor mais importante na cultura da FURIA."
  },
  {
    question: "Qual é o objetivo da FURIA nos próximos anos?",
    options: ["Ser top 1 mundial", "Expandir para mais jogos", "Focar só no Brasil", "Reduzir operações"],
    correctAnswer: "Ser top 1 mundial",
    explanation: "O objetivo da FURIA é se tornar a melhor organização de esports do mundo."
  }
];

// Exporta 10 perguntas aleatórias por padrão
export const quizQuestions = getRandomQuestions();

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