/* ==========================================================================
   pagina-arduino.js — exemplos de programação (dados em js/dados-arduino.js)
   Cria uma aba para cada sensor e o painel com descrição, tipo de sinal,
   biblioteca, ligação e o código com botão de copiar.
   ========================================================================== */

/* Botões das abas (um por exemplo). */
function montarNavegacaoExemplos() {
  return EXEMPLOS_ARDUINO.map(function (exemplo, indice) {
    const ativa = indice === 0;
    return (
      '<button type="button" role="tab" class="aba' + (ativa ? " ativa" : "") + '" aria-selected="' + ativa +
      '" data-alvo="' + exemplo.id + '">' + escapar(exemplo.sensor) + "</button>"
    );
  }).join("");
}

/* Painel de um exemplo. */
function montarPainelExemplo(exemplo, indice) {
  const ativo = indice === 0 ? " ativo" : "";

  return (
    '<div class="aba-painel' + ativo + '" id="' + exemplo.id + '" role="tabpanel">' +
    '<div class="exemplo-cabecalho"><h3>' + escapar(exemplo.titulo) + "</h3>" +
    '<span class="tag-sinal">' + escapar(exemplo.sensor) + "</span></div>" +
    '<p style="color:#cfd6e6">' + escapar(exemplo.descricao) + "</p>" +
    '<div class="exemplo-meta">' +
    "<div><span>Tipo de sinal</span>" + escapar(exemplo.sinal) + "</div>" +
    "<div><span>Biblioteca</span>" + escapar(exemplo.biblioteca) + "</div>" +
    "<div><span>Ligação</span>" + escapar(exemplo.ligacao) + "</div>" +
    "</div>" +
    '<div class="codigo-envolucro">' +
    '<div class="codigo-barra"><span>' + escapar(exemplo.id.replace("ex-", "")) + '.ino</span>' +
    '<button type="button" class="botao-copiar">Copiar código</button></div>' +
    "<pre><code>" + escapar(exemplo.codigo) + "</code></pre>" +
    "</div>" +
    "</div>"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const navegacao = document.getElementById("abas-exemplos");
  const conteudo = document.getElementById("paineis-exemplos");

  if (!navegacao || !conteudo) {
    return;
  }

  navegacao.innerHTML = montarNavegacaoExemplos();
  conteudo.innerHTML = EXEMPLOS_ARDUINO.map(montarPainelExemplo).join("");

  // atualiza o número de exemplos citado no topo da página
  const total = document.getElementById("total-exemplos");
  if (total) {
    total.textContent = EXEMPLOS_ARDUINO.length;
  }
});
