// ── ZODIAC SIGNS ──────────────────────────────────────────────────────────────
const SIGNOS = [
  {
    id:'aries', nome:'Áries', glifo:'♈', periodo:'21 mar – 19 abr',
    keywords:['coragem','guerreiro','força','ação','pioneiro','fogo','início','novo ciclo'],
    default:`Respiro e agradeço este momento. Sinto os Seres de Luz ao meu redor trazendo para você, Áries, a mensagem que o campo quer entregar agora.\n\nO seu fogo não é destruição — é criação. É a faísca que precede toda manifestação. Você chegou neste ciclo para iniciar o que ainda não existe, para ter a coragem que outros ainda não encontraram em si.\n\nO Arcanjo Miguel está ao seu lado, com sua espada de luz, dizendo: você não precisa esperar estar pronto. A prontidão nasce no momento em que você decide agir desde o amor. Respira. O universo já disse sim para o que você veio fazer.`
  },
  {
    id:'touro', nome:'Touro', glifo:'♉', periodo:'20 abr – 20 mai',
    keywords:['abundância','terra','segurança','beleza','prazer','estabilidade','gratidão'],
    default:`Respiro e me conecto com a frequência de Touro que pulsa em você agora.\n\nA terra sob seus pés é sagrada. A abundância que você busca já está nos detalhes do seu cotidiano — no alimento, na beleza, no corpo que respira. Os Seres de Luz dizem que você carrega uma memória profunda de escassez que não é sua. É ancestral. E chegou o momento de liberá-la.\n\nVênus te abraça neste instante e diz: você merece o melhor. Não como recompensa — mas como expressão natural da sua essência. Permita-se receber. O universo está pronto para transbordá-lo de graça.`
  },
  {
    id:'gemeos', nome:'Gêmeos', glifo:'♊', periodo:'21 mai – 20 jun',
    keywords:['comunicação','mente','palavras','ideias','dualidade','mensagem','expressão'],
    default:`Respiro e sinto a energia de Gêmeos — a dança entre dois mundos que você vive tão bem.\n\nSeus dois aspectos não são contradições: são complementos. A mente que pergunta e a intuição que sabe. A voz que fala e o silêncio que ouve. Os Seres de Luz dizem que a sua maior ferramenta é a palavra — e que você ainda não descobriu toda a sua potência.\n\nMercúrio te convida: não contenha o que quer ser dito. Cada palavra sua carrega uma frequência que transforma. O mundo precisa ouvir o que você tem a dizer — dito do coração, não da mente. Comunique. Conecte. Crie pontes de luz.`
  },
  {
    id:'cancer', nome:'Câncer', glifo:'♋', periodo:'21 jun – 22 jul',
    keywords:['família','emoção','lua','proteção','lar','sensibilidade','maternidade','feminino'],
    default:`Respiro fundo e recebo a energia da Lua que guia Câncer — a energia mais profunda do sentir.\n\nVocê não é sensível demais. Você é sensível o suficiente para sentir o que outros ainda não percebem. Essa é sua força, não sua fraqueza. Os Seres de Luz dizem que você carrega o dom de cuidar — mas que é hora de aprender também a se cuidar.\n\nA Mãe Maria vem com um abraço e diz: volte para si. O lar que você busca fora já existe dentro de você. Você é o seu próprio ponto de paz. Quando você se nutre, você nutre o mundo. Permita-se descansar no colo do universo.`
  },
  {
    id:'leao', nome:'Leão', glifo:'♌', periodo:'23 jul – 22 ago',
    keywords:['sol','luz','brilho','coração','criatividade','expressão','liderança','alegria'],
    default:`Respiro e me alinho com o Sol que rege Leão — a força que irradia sem pedir permissão.\n\nVocê nasceu para brilhar. Não para impressionar — para iluminar. Há uma diferença enorme entre essas duas energias. O brilho que os Seres de Luz veem em você não é vaidade: é a expressão da sua essência divina chegando ao mundo.\n\nO Sol te diz agora: pare de diminuir sua luz para que outros se sintam confortáveis. Seu brilho não apaga ninguém — convida todos a brilhar também. Erga a cabeça. Ocupe seu espaço. O universo inteiro te aguarda presente, pleno e em alegria.`
  },
  {
    id:'virgem', nome:'Virgem', glifo:'♍', periodo:'23 ago – 22 set',
    keywords:['serviço','saúde','pureza','detalhe','análise','cura','trabalho','organização'],
    default:`Respiro e honro a precisão e o amor que Virgem carrega em tudo que faz.\n\nVocê veio para servir — mas o serviço mais sagrado começa por você mesmo. Os Seres de Luz observam a perfeição com que você cuida de tudo, menos de si. É hora de virar esse cuidado para dentro.\n\nHigieia, guardiã da saúde, vem com uma mensagem: o seu corpo é um templo que pede atenção amorosa. Não crítica — atenção. Cada detalhe que você cuida no mundo reflete a maestria que você tem. Aplique essa mesma maestria em se amar. A cura que você oferece começa por aceitar que você também merece ser curado.`
  },
  {
    id:'libra', nome:'Libra', glifo:'♎', periodo:'23 set – 22 out',
    keywords:['equilíbrio','harmonia','relacionamentos','justiça','beleza','parceria','paz'],
    default:`Respiro e me sintonizo com a balança de Libra — a busca eterna pelo equilíbrio que você carrega.\n\nA harmonia que você procura fora é reflexo do equilíbrio que você está sendo chamado a construir dentro. Os Seres de Luz dizem que você tem o dom raro de ver todos os lados — e que esse dom também pode paralisar quando você esquece qual é o seu lado.\n\nVênus te pergunta agora: o que é verdadeiro para você, independente do que os outros pensam? O seu sim e o seu não, ditos desde a essência, são presentes para o mundo. O equilíbrio real começa quando você se coloca também na balança — com o mesmo amor que coloca os outros.`
  },
  {
    id:'escorpiao', nome:'Escorpião', glifo:'♏', periodo:'23 out – 21 nov',
    keywords:['transformação','renascimento','profundidade','mistério','poder','morte','cura'],
    default:`Respiro fundo e honro a coragem de Escorpião de descer onde outros não vão.\n\nVocê não tem medo do escuro — você sabe que é lá que estão os tesouros. Os Seres de Luz te mostram agora uma fênix se erguendo das cinzas — e essa fênix é você, depois de cada transformação que já viveu.\n\nPlutão te diz: o que você está sendo chamado a soltar agora não é sua morte — é sua libertação. Toda pele que você larga revela uma versão mais autêntica e poderosa de quem você sempre foi. Não tema o fim dos ciclos. Cada encerramento seu é o início de algo que nem a sua mente ainda imagina.`
  },
  {
    id:'sagitario', nome:'Sagitário', glifo:'♐', periodo:'22 nov – 21 dez',
    keywords:['expansão','liberdade','filosofia','sabedoria','viagem','otimismo','propósito'],
    default:`Respiro e sinto a flecha de Sagitário apontando para o horizonte — sempre em busca do mais, do além, do possível.\n\nSua sede de sentido não é inquietação — é chamado. Os Seres de Luz dizem que você tem a capacidade rara de enxergar o todo, de conectar pontos que outros não percebem, de transformar experiência em sabedoria.\n\nJúpiter te convida agora: confie no que você já sabe. A sabedoria que você buscou o mundo todo já está em você — acumulada em 19 anos ou mais de jornada interior. A flecha já está no arco. Respira. Mira. E lança — sabendo que o universo guia cada voo.`
  },
  {
    id:'capricornio', nome:'Capricórnio', glifo:'♑', periodo:'22 dez – 19 jan',
    keywords:['estrutura','disciplina','propósito','missão','responsabilidade','conquista','determinação'],
    default:`Respiro e honro a montanha que Capricórnio escala — não por ambição, mas por vocação.\n\nVocê sabe o que é comprometimento. Sabe o que é construir com paciência o que dura. Os Seres de Luz reconhecem isso em você e dizem: toda estrutura que você ergueu até aqui teve um propósito que vai além do que você ainda consegue ver.\n\nSaturno, seu regente, vem com uma mensagem de amor: você não precisa mais provar que merece estar aqui. Você já mereceu. A missão que você carrega não é peso — é honra. Permita-se celebrar o que já chegou ao cume, antes de olhar para o próximo pico.`
  },
  {
    id:'aquario', nome:'Aquário', glifo:'♒', periodo:'20 jan – 18 fev',
    keywords:['consciência','coletivo','humanidade','inovação','liberdade','aquariana','futuro','novo'],
    default:`Respiro e me alinho com a frequência de Aquário — a energia que veio do futuro para transformar o presente.\n\nVocê não é estranho — você é pioneiro. O que você sente que não se encaixa é exatamente a sua contribuição mais original. Os Seres de Luz dizem que sua visão de um mundo melhor não é ingenuidade: é memória de como as coisas podem ser.\n\nUrano te convida agora: não domestique a sua originalidade. O mundo não precisa de mais uma cópia — precisa da sua versão mais autêntica, mais livre e mais revolucionária. Você veio romper padrões. Com amor. Com luz. Com a consciência que tudo que existe pode ser diferente.`
  },
  {
    id:'peixes', nome:'Peixes', glifo:'♓', periodo:'19 fev – 20 mar',
    keywords:['intuição','sonhos','espiritualidade','dissolução','amor','entrega','sensibilidade','mar'],
    default:`Respiro e me dissolvo na profundidade de Peixes — o signo que lembra que somos todos um.\n\nSua intuição não é fantasia — é o canal mais direto que você tem com a verdade. Os Seres de Luz te mostram um oceano infinito de sabedoria que você acessa no silêncio, nos sonhos, nos momentos em que a mente para.\n\nNeptuno te sussurra agora: entrega. Não desistência — entrega consciente ao fluxo do universo. Você não precisa nadar contra a correnteza para chegar onde quer ir. O amor que você carrega em você é a sua âncora e o seu leme. Confie. O oceano te conhece.`
  }
];

// ── ACERVO SEARCH ──────────────────────────────────────────────────────────────
let acervoCache = null;

async function buscarImersao(signo) {
  if (!acervoCache) {
    try {
      const r = await fetch('acervo.json');
      acervoCache = await r.json();
    } catch(e) {
      return null;
    }
  }
  const kw = signo.keywords;
  const matches = acervoCache.filter(item => {
    const t = (item.titulo + ' ' + item.excerpt).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'');
    return kw.some(k => t.includes(k.normalize('NFD').replace(/[̀-ͯ]/g,'')));
  });
  if (!matches.length) return null;
  // Pick a random one from top 30 matches
  const pool = matches.slice(0, 30);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
const modal = document.getElementById('zodiacModal');
const modalGlifo    = document.getElementById('modalGlifo');
const modalNome     = document.getElementById('modalNome');
const modalPeriodo  = document.getElementById('modalPeriodo');
const modalTitulo   = document.getElementById('modalTitulo');
const modalTexto    = document.getElementById('modalTexto');
const modalLoading  = document.getElementById('modalLoading');
const modalVerMais  = document.getElementById('modalVerMais');

async function abrirSigno(id) {
  const signo = SIGNOS.find(s => s.id === id);
  if (!signo) return;

  // Show modal immediately
  modalGlifo.textContent   = signo.glifo;
  modalNome.textContent    = signo.nome;
  modalPeriodo.textContent = signo.periodo;
  modalTitulo.textContent  = '';
  modalTexto.textContent   = '';
  modalLoading.style.display = 'block';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Search acervo
  const imersao = await buscarImersao(signo);

  modalLoading.style.display = 'none';

  if (imersao) {
    modalTitulo.textContent = imersao.titulo;
    modalTexto.textContent  = imersao.excerpt;
    modalVerMais.href = `imersoes.html?q=${encodeURIComponent(signo.keywords[0])}`;
  } else {
    modalTitulo.textContent = `Mensagem dos Seres de Luz para ${signo.nome}`;
    modalTexto.innerHTML = signo.default.replace(/\n\n/g,'<br><br>');
    modalVerMais.href = 'imersoes.html';
  }
}

function fecharModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

// Attach click events to constellation groups
document.querySelectorAll('.const-group').forEach(g => {
  g.addEventListener('click', () => abrirSigno(g.dataset.sign));
});
