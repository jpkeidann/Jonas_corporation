# Jonas Corporation — Robótica, Sensores e IoT

Site responsivo que unifica as avaliações práticas da unidade curricular **Internet das Coisas**
(Curso Técnico em Desenvolvimento de Sistemas — SENAI/SC, docente José Ricardo Maçaneiro):

- **Robôs Industriais** — conceitos de IoT e robótica, as 7 topologias (Cartesiano, SCARA, Articulado,
  Cilíndrico, Delta, Polar e Colaborativo) com ficha técnica e tabela comparativa.
- **Sensores IoT e Industriais** — sensoriamento, protocolos e catálogo de 25 sensores com busca,
  filtro por categoria e ficha técnica em janela.
- **Arduino** — características, Uno × ESP32, boas práticas e 13 exemplos de programação.
- **Projetos** — Iluminação, Estacionamento e Ambiente Inteligente (Tinkercad), com código, testes e
  os vídeos do Arduino físico montado em sala de aula.
- **Quiz** — 10 questões estilo SAEP/ENEM com correção comentada de acertos e erros.

Visual baseado no modelo feito no Canva. HTML, CSS e JavaScript puros — **nenhuma biblioteca
ou fonte externa**.

## Estrutura de pastas

```
.
├── index.html            página inicial (Home)
├── html/                 demais páginas
│   ├── robos.html
│   ├── sensores.html
│   ├── arduino.html
│   ├── projetos.html
│   └── quiz.html
├── css/
│   ├── estilo.css        cores, cabeçalho com abas, blobs, cartões, rodapé, responsividade
│   ├── conteudo.css      tabelas, código, abas, fichas, catálogo e janela modal
│   └── quiz.css          telas do quiz e correção comentada
├── js/
│   ├── nucleo.js         menu, animações, abas, modal e botão de copiar (todas as páginas)
│   ├── dados-robos.js    base de dados dos 7 robôs
│   ├── dados-sensores.js base de dados dos 25 sensores
│   ├── dados-arduino.js  base de dados dos 13 exemplos de código
│   ├── dados-quiz.js     questões, gabarito e explicações do quiz
│   ├── pagina-robos.js   monta a grade, as fichas e a tabela comparativa
│   ├── pagina-sensores.js busca, filtros e ficha técnica dos sensores
│   ├── pagina-arduino.js abas dos exemplos de programação
│   ├── pagina-projetos.js abas dos projetos e imagens dos circuitos
│   └── quiz.js           lógica do quiz (questões, nota e revisão)
└── img/
    ├── robos/            imagens dos robôs
    ├── sensores/         imagens dos sensores
    └── circuitos/        prints do Tinkercad: circuito1.png, circuito2.png, circuito3.png
```
