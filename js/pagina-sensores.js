/* ==========================================================================
   pagina-sensores.js — catálogo de sensores (dados em js/dados-sensores.js)
   - busca em tempo real (ignora acentos e maiúsculas)
   - filtro por categoria
   - ficha técnica completa em janela modal
   ========================================================================== */

/* estado atual da busca e do filtro */
const estadoSensores = {
  termo: "",
  categoria: "Todas"
};

/* Cartão de um sensor na grade (imagem + nome + categoria). */
function montarCartaoSensor(sensor) {
  return (
    '<button type="button" class="cartao-img" data-sensor="' + sensor.id + '" aria-label="Abrir ficha técnica do sensor ' + escapar(sensor.nome) + '">' +
    '<span class="cartao-img-figura">' + montarImagem(sensor.imagem, "Sensor " + sensor.nome) + "</span>" +
    '<span class="cartao-img-legenda"><strong>' + escapar(sensor.nome) + "</strong>" +
    "<small>" + escapar(sensor.categoria) + "</small></span>" +
    "</button>"
  );
}

/* Lista simples em <li>. */
function listaItens(itens) {
  return itens
    .map(function (item) {
      return "<li>" + escapar(item) + "</li>";
    })
    .join("");
}

/* Ficha técnica completa — os 10 itens pedidos na avaliação:
   nome, categoria, conceito, princípio, especificações, tipo de sinal,
   aplicações, exemplo de projeto, imagem e fabricantes. */
function montarFichaSensor(sensor) {
  const fabricantes = sensor.fabricantes
    .map(function (item) {
      return "<span>" + escapar(item) + "</span>";
    })
    .join("");

  return (
    '<div class="modal-caixa">' +
    '<div class="modal-cabecalho"><div>' +
    '<span class="modal-categoria">' + escapar(sensor.categoria) + "</span>" +
    "<h2>" + escapar(sensor.nome) + "</h2></div>" +
    '<button type="button" class="modal-fechar" aria-label="Fechar ficha">&times;</button></div>' +
    '<div class="modal-corpo"><div class="ficha-sensor">' +
    '<div class="ficha-sensor-imagem">' + montarImagem(sensor.imagem, "Imagem ilustrativa do sensor " + sensor.nome) +
    '<div class="ficha-dados">' +
    "<div><span>Categoria</span>" + escapar(sensor.categoria) + "</div>" +
    "<div><span>Tipo de sinal</span>" + escapar(sensor.sinal) + "</div>" +
    "</div></div>" +
    "<div>" +
    '<div class="bloco"><h4>Conceito</h4><p>' + escapar(sensor.conceito) + "</p></div>" +
    '<div class="bloco"><h4>Princípio de funcionamento</h4><p>' + escapar(sensor.principio) + "</p></div>" +
    '<div class="bloco"><h4>Principais especificações técnicas</h4><ul>' + listaItens(sensor.especificacoes) + "</ul></div>" +
    '<div class="bloco"><h4>Aplicações industriais e IoT</h4><ul>' + listaItens(sensor.aplicacoes) + "</ul></div>" +
    '<div class="bloco"><h4>Exemplo de utilização em um projeto</h4><p>' + escapar(sensor.projeto) + "</p></div>" +
    '<div class="bloco"><h4>Fabricantes e modelos comerciais</h4><div class="fabricantes">' + fabricantes + "</div></div>" +
    "</div></div></div></div>"
  );
}

/* Aplica busca + filtro e devolve só os sensores que combinam. */
function filtrarSensores() {
  const termo = normalizar(estadoSensores.termo.trim());

  return SENSORES.filter(function (sensor) {
    const combinaCategoria =
      estadoSensores.categoria === "Todas" || sensor.categoria === estadoSensores.categoria;

    if (!combinaCategoria) {
      return false;
    }

    if (!termo) {
      return true;
    }

    const texto = normalizar(sensor.nome + " " + sensor.categoria + " " + sensor.sinal + " " + sensor.conceito);
    return texto.indexOf(termo) !== -1;
  });
}

/* Redesenha a grade e o contador de resultados. */
function renderizarSensores() {
  const grade = document.getElementById("grade-sensores");
  const contador = document.getElementById("contador-sensores");
  const resultado = filtrarSensores();

  grade.innerHTML = resultado.length
    ? resultado.map(montarCartaoSensor).join("")
    : '<div class="vazio">Nenhum sensor encontrado. Tente outro termo ou a categoria "Todas".</div>';

  contador.textContent =
    resultado.length + (resultado.length === 1 ? " sensor exibido" : " sensores exibidos") +
    " de " + SENSORES.length + " cadastrados";
}

/* Cria os botões de categoria (gerados a partir dos próprios dados). */
function montarFiltrosSensores() {
  const area = document.getElementById("filtros-sensores");
  const opcoes = ["Todas"].concat(CATEGORIAS_SENSORES);

  area.innerHTML = opcoes
    .map(function (categoria) {
      const ativo = categoria === estadoSensores.categoria;
      return (
        '<button type="button" class="filtro' + (ativo ? " ativo" : "") + '" aria-pressed="' + ativo +
        '" data-categoria="' + escapar(categoria) + '">' + escapar(categoria) + "</button>"
      );
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const grade = document.getElementById("grade-sensores");

  if (!grade) {
    return;
  }

  const modal = iniciarModal("modal-sensor");
  const busca = document.getElementById("busca-sensores");
  const filtros = document.getElementById("filtros-sensores");

  montarFiltrosSensores();
  renderizarSensores();

  // busca enquanto digita
  busca.addEventListener("input", function () {
    estadoSensores.termo = busca.value;
    renderizarSensores();
  });

  // troca de categoria
  filtros.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".filtro");
    if (!botao) {
      return;
    }
    estadoSensores.categoria = botao.getAttribute("data-categoria");
    montarFiltrosSensores();
    renderizarSensores();
  });

  // abre a ficha do sensor clicado
  grade.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-sensor]");
    if (!botao) {
      return;
    }
    const sensor = SENSORES.find(function (item) {
      return item.id === botao.getAttribute("data-sensor");
    });
    if (sensor) {
      modal.abrir(montarFichaSensor(sensor));
    }
  });
});
