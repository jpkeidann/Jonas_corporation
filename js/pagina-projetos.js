/* ==========================================================================
   pagina-projetos.js — página dos três projetos de automação (Tinkercad)
   - abre a aba certa quando o endereço tem #d1, #d2 ou #d3
   - carrega automaticamente os prints dos circuitos, se existirem em
     img/circuitos/circuito1.png, circuito2.png e circuito3.png
   ========================================================================== */

/* Abre a aba do projeto indicado no endereço (#d1, #d2 ou #d3). */
function abrirProjetoDoEndereco(rolar) {
  const painel = document.getElementById("painel-projetos");
  const id = window.location.hash.replace("#", "");

  if (!painel || !id) {
    return;
  }

  if (ativarAba(painel, id) && rolar !== false) {
    // rola até o topo das abas, para o usuário ver qual projeto abriu
    document.getElementById("desafios").scrollIntoView({ behavior: "smooth" });
  }
}

/* Troca o quadro tracejado pela imagem do circuito, caso o arquivo exista. */
function carregarCircuitos() {
  document.querySelectorAll("[data-circuito]").forEach(function (reserva) {
    const numero = reserva.getAttribute("data-circuito");
    const imagem = new Image();

    imagem.onload = function () {
      imagem.alt = "Circuito do projeto " + numero + " montado no Tinkercad";
      reserva.replaceWith(imagem);
    };
    // se o arquivo não existir, o quadro tracejado continua no lugar
    imagem.src = raizDoSite() + "img/circuitos/circuito" + numero + ".png";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  carregarCircuitos();
  abrirProjetoDoEndereco();

  // links de atalho (#d1, #d2, #d3) também trocam a aba
  window.addEventListener("hashchange", function () {
    abrirProjetoDoEndereco();
  });

  document.querySelectorAll('.atalhos a[href^="#d"]').forEach(function (link) {
    link.addEventListener("click", function (evento) {
      const painel = document.getElementById("painel-projetos");
      const id = link.getAttribute("href").replace("#", "");
      evento.preventDefault();
      ativarAba(painel, id);
      history.replaceState(null, "", "#" + id);
      document.getElementById("desafios").scrollIntoView({ behavior: "smooth" });
    });
  });
});
