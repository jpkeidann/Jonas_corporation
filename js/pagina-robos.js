/* ==========================================================================
   pagina-robos.js — monta a página de Robôs a partir de js/dados-robos.js
   - grade com as 7 topologias (cartões com imagem e legenda)
   - ficha técnica de cada robô, que abre e fecha com um botão
   - tabela comparativa final
   ========================================================================== */

/* cores dos blobs, usadas em rodízio para as imagens dos robôs */
const CORES_BLOB = ["figura-blob--ciano", "figura-blob--medio", "figura-blob--roxo"];

/* imagens de cena (fotos com fundo) ficam cortadas para preencher;
   fotos de produto ficam inteiras sobre fundo branco */
const IMAGENS_CENA = ["articulado", "polar"];

/* Transforma um vetor de textos em itens <li>. */
function listaHtml(itens) {
  return itens
    .map(function (item) {
      return "<li>" + escapar(item) + "</li>";
    })
    .join("");
}

/* Cartão da grade: imagem + nome (leva até a ficha do robô). */
function montarCartaoRobo(robo) {
  const imagem = montarImagem(robo.imagem, robo.nome);
  const classe = IMAGENS_CENA.indexOf(robo.id) === -1 ? "" : '<img class="cobrir" ';
  return (
    '<a class="cartao-img" href="#' + robo.id + '" data-robo="' + robo.id + '">' +
    '<span class="cartao-img-figura">' + (classe ? imagem.replace("<img ", classe) : imagem) + "</span>" +
    '<span class="cartao-img-legenda"><strong>' + escapar(robo.nome) + "</strong>" +
    "<small>" + escapar(robo.gdl) + "</small></span>" +
    "</a>"
  );
}

/* Três modelos comerciais de fabricantes distintos. */
function montarModelos(modelos) {
  return modelos
    .map(function (modelo) {
      return (
        '<div class="modelo"><strong>' + escapar(modelo.fabricante) + "</strong>" +
        "<em>" + escapar(modelo.modelo) + "</em>" +
        "<span>" + escapar(modelo.nota) + "</span></div>"
      );
    })
    .join("");
}

/* Bloco extra do robô colaborativo: normas, modos de colaboração,
   sensores de força e retorno sobre o investimento. */
function montarSegurancaCobot(robo) {
  if (!robo.seguranca) {
    return "";
  }

  const modos = robo.seguranca.modos
    .map(function (modo) {
      return "<div><strong>" + escapar(modo.nome) + "</strong><span>" + escapar(modo.desc) + "</span></div>";
    })
    .join("");

  const sensores = robo.sensoriamento
    .map(function (item) {
      return "<div><strong>" + escapar(item.nome) + "</strong><span>" + escapar(item.desc) + "</span></div>";
    })
    .join("");

  return (
    '<div class="cartao cartao--largo"><h3>' + escapar(robo.seguranca.titulo) + "</h3>" +
    "<p>" + escapar(robo.seguranca.texto) + "</p>" +
    '<div class="lista-modos">' + modos + "</div></div>" +
    '<div class="cartao"><h3>Limites biomecânicos (ISO/TS 15066)</h3><p>' + escapar(robo.seguranca.limites) + "</p></div>" +
    '<div class="cartao"><h3>Retorno sobre o investimento</h3><p>' + escapar(robo.roi) + "</p></div>" +
    '<div class="cartao cartao--largo"><h3>Sensores de força e mitigação de impacto</h3>' +
    '<div class="lista-modos">' + sensores + "</div></div>"
  );
}

/* Seção completa de um robô: linha com texto + imagem no blob
   e, abaixo, a ficha técnica que abre pelo botão. */
function montarSecaoRobo(robo, indice) {
  const invertida = indice % 2 === 1 ? " linha--invertida" : "";
  const cor = CORES_BLOB[indice % CORES_BLOB.length];
  const classeImg = IMAGENS_CENA.indexOf(robo.id) === -1 ? "contem" : "";
  const idFicha = "ficha-" + robo.id;

  return (
    '<article class="robo" id="' + robo.id + '">' +
    '<div class="linha' + invertida + ' revelar">' +
    '<div class="linha-texto">' +
    '<span class="etiqueta">Modelo ' + (indice + 1) + " de " + ROBOS.length + "</span>" +
    '<h3 class="titulo-roxo">' + escapar(robo.nome) + "</h3>" +
    '<div class="chips"><span class="chip">' + escapar(robo.cinematica) + '</span><span class="chip">' + escapar(robo.gdl) + "</span></div>" +
    '<p class="robo-conceito">' + escapar(robo.conceito) + "</p>" +
    '<div class="grupo-botoes"><button type="button" class="botao alternar-ficha" aria-expanded="false" aria-controls="' + idFicha + '">Ver ficha técnica completa</button></div>' +
    "</div>" +
    '<figure class="figura-blob ' + cor + '">' +
    montarImagem(robo.imagem, "Imagem ilustrativa: " + robo.nome).replace("<img ", '<img class="' + classeImg + '" ') +
    "</figure>" +
    "</div>" +
    '<div class="ficha-robo" id="' + idFicha + '" hidden>' +
    '<div class="cartao cartao--largo"><h3>Princípio de funcionamento e cinemática</h3><p>' + escapar(robo.funcionamento) + "</p></div>" +
    '<div class="cartao"><h3>Principais características técnicas</h3><ul>' + listaHtml(robo.caracteristicas) + "</ul></div>" +
    '<div class="cartao"><h3>Aplicações industriais</h3><ul>' + listaHtml(robo.aplicacoes) + "</ul></div>" +
    '<div class="cartao cartao--largo"><h3>Integração com automação e Internet das Coisas</h3><p>' + escapar(robo.iot) + "</p></div>" +
    montarSegurancaCobot(robo) +
    '<div class="cartao cartao--largo"><h3>Modelos comerciais de fabricantes distintos</h3><div class="modelos">' + montarModelos(robo.modelos) + "</div></div>" +
    '<div class="cartao cartao--largo fontes"><h3>Fontes de pesquisa</h3><ul>' + listaHtml(robo.fontes) + "</ul>" +
    '<a class="topo-link" href="#topologias">&uarr; Voltar à grade de robôs</a></div>' +
    "</div>" +
    "</article>"
  );
}

/* Tabela comparativa entre as topologias. */
function montarTabelaComparativa() {
  const linhas = ROBOS.map(function (robo) {
    const c = robo.comparativo;
    return (
      "<tr><td><strong>" + escapar(robo.nome) + "</strong></td>" +
      "<td>" + escapar(c.velocidade) + "</td>" +
      "<td>" + escapar(c.carga) + "</td>" +
      "<td>" + escapar(c.precisao) + "</td>" +
      "<td>" + escapar(c.custo) + "</td>" +
      "<td>" + escapar(c.complexidade) + "</td></tr>"
    );
  }).join("");

  return (
    "<thead><tr><th>Tipo de robô</th><th>Velocidade nominal</th><th>Carga útil</th>" +
    "<th>Precisão / repetibilidade</th><th>Custo relativo</th><th>Complexidade</th></tr></thead>" +
    "<tbody>" + linhas + "</tbody>"
  );
}

/* Abre ou fecha a ficha técnica ligada a um botão. */
function alternarFicha(botao, abrir) {
  const ficha = document.getElementById(botao.getAttribute("aria-controls"));
  const deveAbrir = typeof abrir === "boolean" ? abrir : ficha.hidden;

  ficha.hidden = !deveAbrir;
  botao.setAttribute("aria-expanded", deveAbrir ? "true" : "false");
  botao.textContent = deveAbrir ? "Ocultar ficha técnica" : "Ver ficha técnica completa";
}

/* Se a página abrir com #id-do-robo (ou o usuário clicar na grade),
   abre a ficha correspondente. */
function abrirRoboDoEndereco(rolar) {
  const id = window.location.hash.replace("#", "");
  const secao = id ? document.getElementById(id) : null;

  if (secao && secao.classList.contains("robo")) {
    alternarFicha(secao.querySelector(".alternar-ficha"), true);
    // na primeira carga a seção ainda não existia; rola até ela agora
    if (rolar === true) {
      secao.scrollIntoView();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const grade = document.getElementById("grade-robos");
  const lista = document.getElementById("lista-robos");
  const tabela = document.getElementById("tabela-comparativa");

  if (grade) {
    grade.innerHTML = ROBOS.map(montarCartaoRobo).join("");

    // clicar em um robô da grade já abre a ficha dele
    grade.addEventListener("click", function (evento) {
      const cartao = evento.target.closest("[data-robo]");
      const secao = cartao ? document.getElementById(cartao.getAttribute("data-robo")) : null;
      if (secao) {
        alternarFicha(secao.querySelector(".alternar-ficha"), true);
      }
    });
  }

  if (lista) {
    lista.innerHTML = ROBOS.map(montarSecaoRobo).join("");
    revelarNovos(lista);

    // botões "Ver ficha técnica completa"
    lista.addEventListener("click", function (evento) {
      const botao = evento.target.closest(".alternar-ficha");
      if (botao) {
        alternarFicha(botao);
      }
    });
  }

  if (tabela) {
    tabela.innerHTML = montarTabelaComparativa();
  }

  abrirRoboDoEndereco(true);
  window.addEventListener("hashchange", abrirRoboDoEndereco);
});
