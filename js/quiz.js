/* ==========================================================================
   quiz.js — lógica do Quiz Técnico (questões em js/dados-quiz.js)
   Fluxo: tela inicial → uma questão por vez → resultado + correção comentada.
   Na correção o aluno vê quais questões acertou e errou, a resposta certa e
   a explicação tanto da alternativa correta quanto da que ele marcou.
   ========================================================================== */

const LETRAS = ["A", "B", "C", "D"];

/* estado do quiz */
const estadoQuiz = {
  atual: 0,                                   // índice da questão na tela
  respostas: new Array(QUESTOES_QUIZ.length).fill(null), // letra marcada em cada questão
  finalizado: false
};

/* atalho para pegar elementos pelo id */
function $(id) {
  return document.getElementById(id);
}

/* ---------- Troca de telas ---------- */
function mostrarTela(id) {
  ["tela-inicio", "tela-questao", "tela-resultado"].forEach(function (tela) {
    $(tela).hidden = tela !== id;
  });
  // leva o usuário ao topo do quiz ao trocar de tela
  $("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Tela de questão ---------- */

/* Bolinhas de navegação (1 a 10): mostram quais já foram respondidas. */
function montarPontos() {
  $("pontos-questoes").innerHTML = QUESTOES_QUIZ.map(function (q, i) {
    let classe = "ponto";
    if (estadoQuiz.respostas[i]) {
      classe += " respondido";
    }
    if (i === estadoQuiz.atual) {
      classe += " atual";
    }
    return (
      '<button type="button" class="' + classe + '" data-ir="' + i + '" aria-label="Questão ' + (i + 1) +
      (estadoQuiz.respostas[i] ? " (respondida)" : "") + '">' + (i + 1) + "</button>"
    );
  }).join("");
}

/* Desenha a questão atual com texto-base, código (se houver) e alternativas. */
function mostrarQuestao() {
  const indice = estadoQuiz.atual;
  const q = QUESTOES_QUIZ[indice];
  const marcada = estadoQuiz.respostas[indice];
  const total = QUESTOES_QUIZ.length;

  $("numero-questao").textContent = indice + 1;
  $("tema-questao").textContent = q.tema;

  const respondidas = estadoQuiz.respostas.filter(Boolean).length;
  $("barra-progresso").style.width = (respondidas / total) * 100 + "%";
  document.querySelector(".quiz-progresso").setAttribute("aria-valuenow", respondidas);

  const codigo = q.codigo
    ? '<div class="codigo-envolucro"><div class="codigo-barra"><span>trecho de código</span></div><pre><code>' +
      escapar(q.codigo) + "</code></pre></div>"
    : "";

  const alternativas = LETRAS.map(function (letra) {
    const selecionada = marcada === letra;
    return (
      '<li><button type="button" class="alternativa' + (selecionada ? " selecionada" : "") +
      '" data-letra="' + letra + '" aria-pressed="' + selecionada + '">' +
      '<span class="alternativa-letra">' + letra + "</span>" +
      '<span class="alternativa-texto">' + escapar(q.alternativas[letra]) + "</span></button></li>"
    );
  }).join("");

  $("questao").innerHTML =
    '<p class="questao-rotulo">Texto-base</p>' +
    '<p class="questao-texto">' + escapar(q.textoBase) + "</p>" +
    codigo +
    '<p class="questao-rotulo">Enunciado</p>' +
    '<p class="questao-enunciado">' + escapar(q.enunciado) + "</p>" +
    '<ul class="alternativas">' + alternativas + "</ul>";

  // botões de navegação
  $("botao-anterior").disabled = indice === 0;
  const ultima = indice === total - 1;
  $("botao-proxima").innerHTML = ultima ? "Finalizar quiz &#10003;" : "Próxima &rarr;";
  $("botao-proxima").disabled = !marcada;

  montarPontos();
}

/* Marca a alternativa escolhida (pode trocar antes de finalizar). */
function marcarAlternativa(letra) {
  estadoQuiz.respostas[estadoQuiz.atual] = letra;
  mostrarQuestao();
}

/* Avança para a próxima questão ou finaliza na última. */
function avancar() {
  if (!estadoQuiz.respostas[estadoQuiz.atual]) {
    return;
  }

  if (estadoQuiz.atual < QUESTOES_QUIZ.length - 1) {
    estadoQuiz.atual++;
    mostrarQuestao();
    $("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    finalizar();
  }
}

/* Se houver questões em branco, leva o aluno até a primeira delas. */
function primeiraEmBranco() {
  return estadoQuiz.respostas.findIndex(function (r) {
    return r === null;
  });
}

/* ---------- Resultado ---------- */

function contarAcertos() {
  return QUESTOES_QUIZ.reduce(function (soma, q, i) {
    return soma + (estadoQuiz.respostas[i] === q.correta ? 1 : 0);
  }, 0);
}

/* Mensagem de acordo com o desempenho. */
function mensagemDesempenho(acertos, total) {
  const pct = acertos / total;
  if (pct === 1) {
    return ["Gabaritou!", "Você acertou todas as questões. Domínio completo de robótica, sensores e programação."];
  }
  if (pct >= 0.7) {
    return ["Muito bom!", "Você mandou bem. Confira a correção das questões que errou para fechar as lacunas."];
  }
  if (pct >= 0.5) {
    return ["Bom caminho!", "Mais da metade certa. A correção comentada mostra onde revisar no portal."];
  }
  return ["Vale revisar o conteúdo", "Use a correção comentada e os links de cada questão para revisar os assuntos e tente de novo."];
}

/* Item da correção comentada para uma questão. */
function montarItemRevisao(q, i) {
  const marcada = estadoQuiz.respostas[i];
  const acertou = marcada === q.correta;
  const codigo = q.codigo
    ? '<div class="codigo-envolucro"><pre><code>' + escapar(q.codigo) + "</code></pre></div>"
    : "";

  // lista de alternativas com destaque da correta e da marcada
  const alternativas = LETRAS.map(function (letra) {
    let classe = "rev-alt";
    let marca = "";
    if (letra === q.correta) {
      classe += " rev-correta";
      marca = '<span class="rev-marca">Correta</span>';
    }
    if (letra === marcada && !acertou) {
      classe += " rev-errada";
      marca = '<span class="rev-marca">Sua resposta</span>';
    }
    if (letra === marcada && acertou) {
      marca = '<span class="rev-marca">Sua resposta &#10003;</span>';
    }
    return (
      '<li class="' + classe + '"><span class="alternativa-letra">' + letra + "</span>" +
      "<span>" + escapar(q.alternativas[letra]) + "</span>" + marca + "</li>"
    );
  }).join("");

  // explicações: por que a correta está certa e, se errou, por que a marcada está errada
  let explicacao =
    '<div class="explicacao explicacao-certa"><h4>Por que a alternativa ' + q.correta + " está correta</h4>" +
    "<p>" + escapar(q.explicacoes[q.correta]) + "</p></div>";

  if (!acertou) {
    explicacao =
      '<div class="explicacao explicacao-errada"><h4>Por que a alternativa ' + marcada + " (sua resposta) está errada</h4>" +
      "<p>" + escapar(q.explicacoes[marcada]) + "</p></div>" + explicacao;
  }

  const revisar = q.revisar
    ? '<a class="rev-link" href="' + q.revisar.link + '">Revisar no portal: ' + escapar(q.revisar.texto) + " &rarr;</a>"
    : "";

  return (
    '<article class="rev-item ' + (acertou ? "rev-item--certo" : "rev-item--errado") + ' revelar" id="rev-' + (i + 1) +
    '" data-resultado="' + (acertou ? "certas" : "erradas") + '">' +
    '<header class="rev-cabecalho">' +
    '<span class="rev-numero">Questão ' + (i + 1) + "</span>" +
    '<span class="chip">' + escapar(q.tema) + "</span>" +
    '<span class="selo ' + (acertou ? "selo-certo" : "selo-errado") + '">' + (acertou ? "&#10003; Acertou" : "&#10007; Errou") + "</span>" +
    "</header>" +
    '<p class="questao-texto">' + escapar(q.textoBase) + "</p>" +
    codigo +
    '<p class="questao-enunciado">' + escapar(q.enunciado) + "</p>" +
    '<ul class="rev-alternativas">' + alternativas + "</ul>" +
    explicacao +
    revisar +
    "</article>"
  );
}

/* Mostra a tela final com nota, mapa de acertos e correção. */
function finalizar() {
  const branco = primeiraEmBranco();
  if (branco !== -1) {
    // ainda falta responder alguma: vai até ela
    estadoQuiz.atual = branco;
    mostrarQuestao();
    return;
  }

  estadoQuiz.finalizado = true;
  const total = QUESTOES_QUIZ.length;
  const acertos = contarAcertos();
  const mensagem = mensagemDesempenho(acertos, total);

  $("nota-acertos").textContent = acertos;
  $("nota-total").textContent = total;
  $("resultado-titulo").textContent = mensagem[0];
  $("resultado-mensagem").textContent = mensagem[1];
  $("resumo-acertos").textContent = acertos + (acertos === 1 ? " acerto" : " acertos");
  $("resumo-erros").textContent = total - acertos + (total - acertos === 1 ? " erro" : " erros");

  // anel de pontuação: o traço do círculo é proporcional aos acertos
  const anel = $("anel-valor");
  const circunferencia = 2 * Math.PI * 52;
  anel.style.strokeDasharray = circunferencia;
  anel.style.strokeDashoffset = circunferencia;
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      anel.style.strokeDashoffset = circunferencia * (1 - acertos / total);
    });
  });

  // mapa com as 10 questões em verde (acerto) ou vermelho (erro)
  $("mapa-resultado").innerHTML = QUESTOES_QUIZ.map(function (q, i) {
    const certo = estadoQuiz.respostas[i] === q.correta;
    return (
      '<a class="ponto ' + (certo ? "ponto-certo" : "ponto-errado") + '" href="#rev-' + (i + 1) +
      '" aria-label="Questão ' + (i + 1) + (certo ? ": acertou" : ": errou") + '">' + (i + 1) + "</a>"
    );
  }).join("");

  $("lista-revisao").innerHTML = QUESTOES_QUIZ.map(montarItemRevisao).join("");
  aplicarFiltroRevisao("todas");
  mostrarTela("tela-resultado");
  revelarNovos($("lista-revisao"));
}

/* Filtra a correção: todas, só as certas ou só as erradas. */
function aplicarFiltroRevisao(filtro) {
  document.querySelectorAll("#filtros-revisao .filtro").forEach(function (botao) {
    const ativo = botao.getAttribute("data-filtro") === filtro;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", ativo);
  });

  let visiveis = 0;
  document.querySelectorAll("#lista-revisao .rev-item").forEach(function (item) {
    const mostrar = filtro === "todas" || item.getAttribute("data-resultado") === filtro;
    item.hidden = !mostrar;
    if (mostrar) {
      visiveis++;
    }
  });

  // mensagem quando o filtro não tem nenhuma questão
  let aviso = $("revisao-vazia");
  if (!aviso) {
    aviso = document.createElement("p");
    aviso.id = "revisao-vazia";
    aviso.className = "vazio";
    $("lista-revisao").appendChild(aviso);
  }
  aviso.hidden = visiveis > 0;
  aviso.textContent = filtro === "erradas" ? "Nenhum erro — você acertou todas!" : "Nenhuma questão certa ainda. Revise o conteúdo e tente de novo!";
}

/* Recomeça do zero. */
function refazer() {
  estadoQuiz.atual = 0;
  estadoQuiz.respostas = new Array(QUESTOES_QUIZ.length).fill(null);
  estadoQuiz.finalizado = false;
  mostrarQuestao();
  mostrarTela("tela-questao");
}

/* ---------- Eventos ---------- */
document.addEventListener("DOMContentLoaded", function () {
  if (!$("quiz")) {
    return;
  }

  $("total-questoes").textContent = QUESTOES_QUIZ.length;
  document.querySelector(".quiz-progresso").setAttribute("aria-valuemax", QUESTOES_QUIZ.length);

  $("botao-comecar").addEventListener("click", function () {
    mostrarQuestao();
    mostrarTela("tela-questao");
  });

  // escolha da alternativa
  $("questao").addEventListener("click", function (evento) {
    const botao = evento.target.closest(".alternativa");
    if (botao) {
      marcarAlternativa(botao.getAttribute("data-letra"));
      $("botao-proxima").focus();
    }
  });

  $("botao-proxima").addEventListener("click", avancar);

  $("botao-anterior").addEventListener("click", function () {
    if (estadoQuiz.atual > 0) {
      estadoQuiz.atual--;
      mostrarQuestao();
    }
  });

  // pular para uma questão pelas bolinhas
  $("pontos-questoes").addEventListener("click", function (evento) {
    const ponto = evento.target.closest("[data-ir]");
    if (ponto) {
      estadoQuiz.atual = Number(ponto.getAttribute("data-ir"));
      mostrarQuestao();
    }
  });

  // atalhos de teclado: A–D (ou 1–4) marcam, Enter avança
  document.addEventListener("keydown", function (evento) {
    if ($("tela-questao").hidden || evento.ctrlKey || evento.metaKey || evento.altKey) {
      return;
    }
    const tecla = evento.key.toUpperCase();
    const porNumero = { "1": "A", "2": "B", "3": "C", "4": "D" };
    const letra = LETRAS.indexOf(tecla) !== -1 ? tecla : porNumero[tecla];

    if (letra) {
      marcarAlternativa(letra);
    } else if (evento.key === "Enter" && !evento.target.closest("button, a")) {
      avancar();
    }
  });

  $("filtros-revisao").addEventListener("click", function (evento) {
    const botao = evento.target.closest(".filtro");
    if (botao) {
      aplicarFiltroRevisao(botao.getAttribute("data-filtro"));
    }
  });

  // ao clicar no mapa, garante que a questão esteja visível mesmo com filtro
  $("mapa-resultado").addEventListener("click", function () {
    aplicarFiltroRevisao("todas");
  });

  $("botao-refazer").addEventListener("click", refazer);
});
