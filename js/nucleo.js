/* ==========================================================================
   nucleo.js — funções compartilhadas por todas as páginas
   - menu em abas e menu responsivo (celular)
   - cabeçalho que muda ao rolar a página
   - animação de entrada dos elementos (.revelar)
   - abas, janela modal e botão de copiar código
   - utilitários: escapar texto, normalizar acentos e montar imagens
   Escrito em JavaScript puro, sem bibliotecas externas.
   ========================================================================== */

/* ---------- Utilitários ---------- */

/* Converte caracteres especiais para HTML seguro (evita quebrar a página
   quando um texto da base de dados contém <, >, & ou aspas). */
function escapar(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Remove acentos e deixa em minúsculas — usado na busca de sensores,
   para que "medicao" encontre "medição". */
function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Caminho até a raiz do site. As páginas dentro de /html usam data-raiz="../"
   no <body>; a página inicial não precisa do atributo. */
function raizDoSite() {
  return document.body.getAttribute("data-raiz") || "";
}

/* Monta a tag <img> de uma imagem local da pasta img/.
   Se o arquivo não existir, a imagem fica apagada em vez de quebrar o layout. */
function montarImagem(caminho, alternativo) {
  return (
    '<img src="' +
    escapar(raizDoSite() + caminho) +
    '" alt="' +
    escapar(alternativo) +
    '" loading="lazy" onerror="this.onerror=null;this.classList.add(\'sem-imagem\')">'
  );
}

/* ---------- Menu ---------- */

/* Marca como ativa a aba do menu da página atual.
   Cada <body> informa sua página em data-pagina (ex.: "robos"). */
function marcarMenuAtivo() {
  const pagina = document.body.getAttribute("data-pagina");

  document.querySelectorAll(".menu a").forEach(function (link) {
    if (link.getAttribute("data-pagina") === pagina) {
      link.classList.add("ativo");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* Abre e fecha o menu no celular pelo botão ☰. */
function iniciarMenu() {
  const botao = document.querySelector(".botao-menu");
  const menu = document.querySelector(".menu");

  if (!botao || !menu) {
    return;
  }

  function fechar() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // fecha ao escolher um item, ao apertar Esc ou ao clicar fora do menu
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fechar);
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fechar();
    }
  });

  document.addEventListener("click", function (evento) {
    if (!menu.contains(evento.target) && !botao.contains(evento.target)) {
      fechar();
    }
  });

  // se a tela aumentar (girar o celular, por exemplo), volta ao menu normal
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      fechar();
    }
  });
}

/* Deixa o cabeçalho com fundo sólido depois que a página é rolada. */
function iniciarCabecalho() {
  const topo = document.querySelector(".topo");

  if (!topo) {
    return;
  }

  function atualizar() {
    topo.classList.toggle("rolado", window.scrollY > 20);
  }

  window.addEventListener("scroll", atualizar, { passive: true });
  atualizar();
}

/* ---------- Animação de entrada ---------- */

/* Mostra com uma pequena animação os elementos com a classe .revelar
   quando eles entram na área visível da tela. */
function iniciarRevelar() {
  const elementos = document.querySelectorAll(".revelar");

  // navegadores antigos: mostra tudo de uma vez
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) {
      el.classList.add("visivel");
    });
    return;
  }

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach(function (el) {
    observador.observe(el);
  });
}

/* Permite que conteúdo criado depois (pelas páginas) também seja animado. */
function revelarNovos(container) {
  if (!("IntersectionObserver" in window)) {
    container.querySelectorAll(".revelar").forEach(function (el) {
      el.classList.add("visivel");
    });
    return;
  }

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  container.querySelectorAll(".revelar:not(.visivel)").forEach(function (el) {
    observador.observe(el);
  });
}

/* ---------- Abas ---------- */

/* Liga os botões .aba aos painéis .aba-painel dentro de cada .painel-abas.
   O botão informa qual painel abrir pelo atributo data-alvo. */
function iniciarAbas() {
  document.querySelectorAll(".painel-abas").forEach(function (painel) {
    if (painel.dataset.iniciado) {
      return; // evita ligar os eventos duas vezes
    }
    painel.dataset.iniciado = "sim";

    painel.addEventListener("click", function (evento) {
      const aba = evento.target.closest(".aba");

      if (!aba || !painel.contains(aba)) {
        return;
      }

      ativarAba(painel, aba.getAttribute("data-alvo"));
    });
  });
}

/* Ativa uma aba pelo id do painel (também usado pelos links #d1, #d2...). */
function ativarAba(painel, idAlvo) {
  const abas = painel.querySelectorAll(".aba");
  const conteudos = painel.querySelectorAll(".aba-painel");
  let encontrou = false;

  conteudos.forEach(function (item) {
    if (item.id === idAlvo) {
      encontrou = true;
    }
  });

  if (!encontrou) {
    return false;
  }

  abas.forEach(function (item) {
    const ativa = item.getAttribute("data-alvo") === idAlvo;
    item.classList.toggle("ativa", ativa);
    item.setAttribute("aria-selected", ativa ? "true" : "false");
  });

  conteudos.forEach(function (item) {
    item.classList.toggle("ativo", item.id === idAlvo);
  });

  return true;
}

/* ---------- Janela modal ---------- */

/* Cria o controle de uma janela modal a partir do id do elemento.
   Retorna as funções abrir(html) e fechar(). */
function iniciarModal(idModal) {
  const modal = document.getElementById(idModal);
  let focoAnterior = null;

  if (!modal) {
    return null;
  }

  function fechar() {
    modal.classList.remove("aberto");
    document.body.style.overflow = "";
    if (focoAnterior) {
      focoAnterior.focus(); // devolve o foco para quem abriu a janela
    }
  }

  // fecha clicando fora da caixa ou no botão ×
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal || evento.target.closest(".modal-fechar")) {
      fechar();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && modal.classList.contains("aberto")) {
      fechar();
    }
  });

  return {
    abrir: function (conteudo) {
      focoAnterior = document.activeElement;
      modal.innerHTML = conteudo;
      modal.classList.add("aberto");
      document.body.style.overflow = "hidden"; // trava a rolagem do fundo
      const botaoFechar = modal.querySelector(".modal-fechar");
      if (botaoFechar) {
        botaoFechar.focus();
      }
    },
    fechar: fechar
  };
}

/* ---------- Copiar código ---------- */

/* Copia o conteúdo do bloco de código para a área de transferência.
   Usa a API moderna quando disponível e um método alternativo quando o
   site é aberto direto do computador (file://). */
function iniciarCopia() {
  document.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".botao-copiar");

    if (!botao) {
      return;
    }

    const bloco = botao.closest(".codigo-envolucro").querySelector("code");
    const texto = bloco.textContent;
    const rotulo = botao.getAttribute("data-rotulo") || botao.textContent;
    botao.setAttribute("data-rotulo", rotulo);

    function avisar() {
      botao.textContent = "Copiado!";
      setTimeout(function () {
        botao.textContent = rotulo;
      }, 1600);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(avisar, function () {
        copiarAlternativo(texto);
        avisar();
      });
    } else {
      copiarAlternativo(texto);
      avisar();
    }
  });
}

function copiarAlternativo(texto) {
  const area = document.createElement("textarea");
  area.value = texto;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } catch (erro) {
    /* sem suporte: o usuário ainda pode selecionar o texto manualmente */
  }
  document.body.removeChild(area);
}

/* ---------- Rodapé ---------- */

/* Botão "voltar ao topo" e ano atual no rodapé. */
function iniciarRodape() {
  document.querySelectorAll("[data-ano]").forEach(function (alvo) {
    alvo.textContent = new Date().getFullYear();
  });

  document.querySelectorAll(".voltar-topo").forEach(function (botao) {
    botao.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", function () {
  marcarMenuAtivo();
  iniciarMenu();
  iniciarCabecalho();
  iniciarRevelar();
  iniciarAbas();
  iniciarCopia();
  iniciarRodape();
});
