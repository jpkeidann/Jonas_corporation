/* ==========================================================================
   dados-quiz.js — questões do Quiz Técnico (estilo SAEP/ENEM)
   Fonte: arquivo "quiz_saep_enem" (Tecnologia, Eletrônica e Programação).

   Cada questão tem:
   - textoBase, codigo (opcional) e enunciado
   - alternativas A a D
   - correta: letra da resposta certa
   - explicacoes: por que cada alternativa está certa ou errada
     (a explicação da letra correta é a justificativa do gabarito)
   - revisar: página do portal onde o assunto aparece
   ========================================================================== */

const QUESTOES_QUIZ = [
  {
    tema: "Robótica industrial",
    textoBase:
      "Em uma linha de montagem de carrocerias, a equipe de manutenção precisa especificar um robô industrial articulado para executar soldagem a ponto. A tocha deve alcançar qualquer ponto dentro do volume de trabalho da célula e assumir qualquer orientação, para acessar regiões de difícil acesso na lataria.",
    enunciado:
      "Considerando o requisito de posicionar e orientar livremente a ferramenta no espaço tridimensional, qual configuração de graus de liberdade atende ao projeto?",
    alternativas: {
      A: "3 eixos, pois três juntas rotativas bastam para posicionar e orientar a ferramenta.",
      B: "6 eixos, pois três juntas definem a posição do punho e três, a orientação da ferramenta.",
      C: "4 eixos, pois a rotação ao redor do eixo da ferramenta é irrelevante na soldagem.",
      D: "5 eixos, pois a orientação completa da ferramenta exige apenas duas rotações extras."
    },
    correta: "B",
    explicacoes: {
      A: "Três juntas só conseguem posicionar o punho em um ponto do espaço (X, Y e Z). Não sobra nenhum eixo para orientar a ferramenta; para isso seriam necessários mais três.",
      B: "Para posição e orientação arbitrárias no espaço são necessários 6 graus de liberdade: 3 para a posição (X, Y, Z) e 3 para a orientação (rolagem, arfagem e guinada). Com menos eixos, algumas orientações ficam inacessíveis.",
      C: "Com 4 eixos (como no robô SCARA) a ferramenta fica presa a uma direção praticamente vertical. Na soldagem de lataria a tocha precisa inclinar em várias direções para alcançar regiões de difícil acesso.",
      D: "A orientação completa exige três rotações (rolagem, arfagem e guinada), e não duas. Com 5 eixos falta uma rotação, e algumas orientações da tocha ficam impossíveis."
    },
    revisar: { texto: "Robôs Industriais", link: "robos.html#articulado" }
  },
  {
    tema: "Sensor ultrassônico",
    textoBase:
      "Um sistema IoT monitora o nível de um reservatório de água. Um sensor ultrassônico HC-SR04 foi fixado na tampa, a 100 cm do fundo, apontado para baixo. O Arduino mede o tempo entre o envio do pulso (pino Trigger) e o retorno do eco (pino Echo) e obtém 2.320 µs. Considere a velocidade do som no ar igual a 343 m/s.",
    enunciado: "Qual é o nível da água no reservatório, medido a partir do fundo?",
    alternativas: {
      A: "39,8 cm, pois o sensor mede diretamente a altura da água no reservatório.",
      B: "20,4 cm, pois a distância de 79,6 cm foi calculada sem descontar a volta do pulso.",
      C: "80,1 cm, pois o tempo de eco deve ser dividido por dois duas vezes no cálculo.",
      D: "60,2 cm, pois a distância até a superfície é 39,8 cm e deve ser subtraída da altura."
    },
    correta: "D",
    explicacoes: {
      A: "39,8 cm é a distância do sensor até a superfície da água, não a altura da água. Como o sensor está na tampa, esse valor precisa ser subtraído da altura total (100 cm).",
      B: "2.320 µs × 343 m/s = 79,6 cm é o caminho de ida e volta do som. Sem dividir por 2, a distância fica dobrada e o nível calculado (100 − 79,6 = 20,4 cm) sai errado.",
      C: "O tempo de eco é dividido por 2 só uma vez, por causa da ida e volta. Dividir duas vezes dá 19,9 cm até a superfície e um nível falso de 80,1 cm.",
      D: "Distância = (2.320 µs × 343 m/s) ÷ 2 ≈ 39,8 cm até a superfície (divide-se por 2 por causa da ida e volta do pulso). Nível = 100 − 39,8 = 60,2 cm."
    },
    revisar: { texto: "Sensor HC-SR04 no catálogo", link: "sensores.html#catalogo" }
  },
  {
    tema: "Divisor de tensão com LDR",
    textoBase:
      "Em um projeto de iluminação automática, um LDR (resistor dependente de luz) foi ligado em série com um resistor fixo de 10 kΩ, formando um divisor de tensão. O LDR está conectado ao 5 V, o resistor fixo ao GND, e a leitura é feita pela entrada analógica A0 no ponto de junção entre os dois. A resistência do LDR diminui à medida que a luminosidade aumenta.",
    enunciado: "O que ocorre com o valor retornado por analogRead(A0) quando a luminosidade do ambiente aumenta?",
    alternativas: {
      A: "O valor aumenta, pois a resistência do LDR diminui e a tensão sobre o resistor fixo sobe.",
      B: "O valor diminui, pois a resistência do LDR diminui e a tensão sobre o resistor fixo cai.",
      C: "O valor aumenta, pois a resistência do LDR aumenta e a tensão sobre o resistor fixo sobe.",
      D: "O valor diminui, pois a resistência do LDR aumenta e a tensão sobre o resistor fixo cai."
    },
    correta: "A",
    explicacoes: {
      A: "Com mais luz, a resistência do LDR cai e a tensão se concentra no resistor fixo, que está ligado ao GND. A tensão em A0 sobe e o analogRead aumenta.",
      B: "A primeira parte está certa (a resistência do LDR diminui), mas a consequência não: com menos resistência no LDR, a tensão sobre o resistor fixo sobe, e não cai.",
      C: "O resultado (o valor aumenta) está certo, mas a justificativa não: a resistência do LDR diminui com mais luz, e não aumenta.",
      D: "Errada nos dois pontos: com mais luz o LDR perde resistência, e a tensão sobre o resistor fixo sobe, fazendo a leitura em A0 aumentar."
    },
    revisar: { texto: "Projeto 1 · Iluminação Inteligente", link: "projetos.html#d1" }
  },
  {
    tema: "Medição com multímetro",
    textoBase:
      "Um técnico deseja verificar o consumo de corrente de um módulo microcontrolado alimentado por uma fonte de 5 V. Pela folha de dados, estima-se que o consumo seja de aproximadamente 80 mA. O multímetro digital disponível possui bornes separados para tensão, mA e 10 A.",
    enunciado: "Qual procedimento correto permite medir a corrente consumida pelo módulo sem danificar o instrumento?",
    alternativas: {
      A: "Ligar em paralelo com o módulo, com o seletor na escala de tensão contínua (VDC).",
      B: "Ligar em série com o módulo, com o seletor na escala de resistência (Ω).",
      C: "Ligar em série com o módulo, com o seletor na escala de corrente contínua (mA DC).",
      D: "Ligar em paralelo com o módulo, com o seletor na escala de corrente contínua (mA DC)."
    },
    correta: "C",
    explicacoes: {
      A: "Em paralelo e na escala VDC o multímetro mede a tensão de alimentação (cerca de 5 V), e não a corrente consumida pelo módulo.",
      B: "A ligação em série está certa, mas a escala de resistência (Ω) não mede corrente. Além disso, medir resistência em um circuito energizado pode danificar o instrumento.",
      C: "A corrente é medida em série, para que passe por dentro do instrumento, usando o borne mA e a escala de corrente contínua. Como 80 mA está dentro da faixa de mA, não é preciso o borne de 10 A.",
      D: "Na escala de corrente o multímetro tem resistência interna quase nula. Ligado em paralelo, ele vira um curto-circuito na fonte e pode queimar o fusível ou o próprio instrumento."
    },
    revisar: null
  },
  {
    tema: "PWM no Arduino",
    textoBase:
      "Um estudante montou um circuito com Arduino Uno em que um potenciômetro conectado ao pino A0 deve controlar o brilho de um LED. O código lê o potenciômetro com analogRead(A0) e escreve o resultado ajustado com analogWrite(pinoLed, valor). O LED, com resistor limitador, ainda precisa ser conectado a um pino de saída da placa.",
    enunciado: "Qual pino do Arduino Uno permite que o analogWrite varie o brilho do LED, e por quê?",
    alternativas: {
      A: "Pino 7, pois qualquer pino digital gera tensão analógica variável pelo analogWrite.",
      B: "Pino 9, pois possui PWM e simula tensão média variável pela razão cíclica.",
      C: "Pino A1, pois as portas analógicas fornecem tensão de saída variável ao LED.",
      D: "Pino 2, pois os pinos de interrupção externa geram sinal PWM por hardware."
    },
    correta: "B",
    explicacoes: {
      A: "O pino 7 não tem PWM. Nele, o analogWrite apenas liga (valores de 128 para cima) ou desliga o pino, sem variação gradual. O Uno não gera tensão analógica verdadeira nos pinos digitais.",
      B: "O analogWrite só gera PWM nos pinos marcados com \"~\" no Uno (3, 5, 6, 9, 10 e 11). A variação da razão cíclica altera a tensão média sobre o LED e, com ela, o brilho.",
      C: "As portas A0 a A5 do Uno são entradas do conversor analógico-digital. O Uno não tem conversor digital-analógico (DAC), então essas portas não fornecem tensão variável de saída.",
      D: "O pino 2 serve para interrupção externa (INT0), mas não tem PWM. Interrupção e PWM são recursos diferentes do microcontrolador."
    },
    revisar: { texto: "Arduino · Características", link: "arduino.html#caracteristicas" }
  },
  {
    tema: "Resolução do conversor A/D",
    textoBase:
      "Um termômetro digital foi montado com um Arduino Uno e um sensor LM35, que fornece 10 mV por °C. O conversor analógico-digital (ADC) da placa tem resolução de 10 bits e usa a tensão de referência padrão de 5 V, sem nenhum circuito de amplificação.",
    enunciado: "Qual é a menor variação de temperatura que esse sistema consegue distinguir?",
    alternativas: {
      A: "Cerca de 0,12 °C, pois o conversor de 12 bits divide 5 V em 4.096 passos.",
      B: "Cerca de 1,95 °C, pois o conversor de 8 bits divide 5 V em 256 passos.",
      C: "Cerca de 4,88 °C, pois cada passo de 4,88 mV equivale diretamente a 4,88 graus.",
      D: "Cerca de 0,49 °C, pois o conversor de 10 bits divide 5 V em 1.024 passos."
    },
    correta: "D",
    explicacoes: {
      A: "O ADC do Arduino Uno é de 10 bits, não de 12. Conversores de 12 bits (4.096 passos) aparecem em placas como o ESP32.",
      B: "O enunciado diz que o ADC é de 10 bits (1.024 passos), e não de 8 bits (256 passos).",
      C: "4,88 mV é o tamanho de cada passo em tensão, não em temperatura. Como o LM35 fornece 10 mV por °C, é preciso dividir por 10: cada passo vale cerca de 0,49 °C.",
      D: "Cada passo do ADC vale 5 V ÷ 1.024 ≈ 4,88 mV. Com 10 mV/°C, a resolução é 4,88 ÷ 10 ≈ 0,49 °C."
    },
    revisar: { texto: "Sensor LM35 no catálogo", link: "sensores.html#catalogo" }
  },
  {
    tema: "Placas para IoT",
    textoBase:
      "Uma equipe desenvolve o monitoramento de uma estufa agrícola. A placa deve ler sensores e publicar os dados em um servidor MQTT pela rede local, sem uso de módulos externos de comunicação. Parte dos sensores disponíveis opera com saída de 5 V, e a equipe também deseja configurar a placa via Bluetooth.",
    enunciado:
      "Qual placa atende ao requisito de conectividade e qual característica elétrica exige atenção na ligação dos sensores de 5 V?",
    alternativas: {
      A: "ESP32, pois integra Wi-Fi e Bluetooth no chip e opera com lógica de 3,3 V.",
      B: "Arduino Uno, pois integra Wi-Fi no ATmega328P e opera com lógica de 3,3 V.",
      C: "ESP8266, pois integra Wi-Fi e Bluetooth no chip e opera com lógica de 5 V.",
      D: "Arduino Uno, pois integra Bluetooth no ATmega328P e opera com lógica de 5 V."
    },
    correta: "A",
    explicacoes: {
      A: "O ESP32 tem Wi-Fi e Bluetooth nativos, mas seus GPIOs operam em 3,3 V e não toleram 5 V. É necessário usar divisor de tensão ou conversor de nível lógico nos sensores de 5 V.",
      B: "O ATmega328P do Arduino Uno não tem Wi-Fi, e a lógica dele é de 5 V, não de 3,3 V.",
      C: "O ESP8266 tem Wi-Fi, mas não tem Bluetooth. Além disso, sua lógica é de 3,3 V, não de 5 V.",
      D: "O ATmega328P não tem Bluetooth nem Wi-Fi integrados; seria preciso adicionar módulos externos, o que o enunciado não permite."
    },
    revisar: { texto: "Arduino Uno × ESP32", link: "arduino.html#caracteristicas" }
  },
  {
    tema: "Programação Arduino",
    textoBase: "Um aluno carregou o código abaixo em um Arduino Uno, com um LED (e resistor) conectado ao pino 9.",
    codigo:
      "const int PINO_LED = 9;\n\nvoid setup() {\n  pinMode(PINO_LED, OUTPUT);\n}\n\nvoid loop() {\n  for (int i = 0; i <= 255; i += 51) {\n    analogWrite(PINO_LED, i);\n    delay(500);\n  }\n}",
    enunciado: "Qual é o comportamento observado no LED?",
    alternativas: {
      A: "Acende com brilho máximo e permanece fixo, pois o laço termina em 255 sem repetição.",
      B: "Pisca cinco vezes por ciclo, pois o laço executa cinco incrementos de 51 unidades.",
      C: "Sobe em seis degraus de brilho, com 500 ms cada, e reinicia o ciclo a cada 3 s.",
      D: "Oscila continuamente entre apagado e aceso, pois analogWrite alterna HIGH e LOW."
    },
    correta: "C",
    explicacoes: {
      A: "O for termina em 255, mas a função loop() é executada infinitamente pelo Arduino. O ciclo recomeça do zero (LED apagado) a cada 3 s.",
      B: "O laço gera seis valores (0, 51, 102, 153, 204 e 255), não cinco, e o LED não pisca: o brilho muda em degraus, porque cada valor do analogWrite define uma razão cíclica diferente.",
      C: "O laço gera os valores 0, 51, 102, 153, 204 e 255 (seis degraus de 20%), cada um por 500 ms. O loop() repete o ciclo de 3 s indefinidamente.",
      D: "O analogWrite gera PWM em alta frequência (cerca de 490 Hz no pino 9), rápido demais para o olho perceber. O que se vê é um brilho intermediário, não o LED alternando entre aceso e apagado."
    },
    revisar: { texto: "Arduino · Funcionamento e boas práticas", link: "arduino.html#firmware" }
  },
  {
    tema: "JavaScript para IoT",
    textoBase:
      "Uma página web recebe, a partir de um ESP32, um vetor com leituras de temperatura (°C) e executa o seguinte trecho em JavaScript para identificar valores críticos, acima de 30 °C:",
    codigo:
      "const leituras = [22, 25, 31, 28, 35];\n\nconst criticas = leituras\n  .filter(t => t > 30)\n  .map(t => t - 30);\n\nconsole.log(criticas.length, criticas[1]);",
    enunciado: "Qual será a saída exibida no console?",
    alternativas: {
      A: "Imprime \"2 35\", pois o map é ignorado e o índice 1 retorna o valor original.",
      B: "Imprime \"2 5\", pois o filter mantém 31 e 35 e o map subtrai 30 de cada um.",
      C: "Imprime \"5 -5\", pois o filter não remove elementos e o map subtrai 30 de todos.",
      D: "Imprime \"2 1\", pois o índice 1 acessa o primeiro elemento e o valor resultante é 1."
    },
    correta: "B",
    explicacoes: {
      A: "O map não é ignorado: ele cria um novo vetor com cada valor menos 30. Por isso criticas[1] vale 5, e não 35.",
      B: "O filter retorna [31, 35] e o map transforma em [1, 5]. Assim, length vale 2 e criticas[1] vale 5.",
      C: "O filter remove os elementos que não atendem à condição t > 30. Restam só 2 elementos, e não 5.",
      D: "Em JavaScript os índices começam em 0. O índice 1 é o segundo elemento (5); o primeiro seria criticas[0], que vale 1."
    },
    revisar: null
  },
  {
    tema: "Bibliotecas de sensores",
    textoBase:
      "Um estudante escreveu o código abaixo para ler a temperatura de um sensor DHT11 ligado ao pino digital 4 de um Arduino Uno, usando a biblioteca DHT. Ao abrir o Monitor Serial, as leituras exibidas são sempre nan (valor inválido), mesmo com a fiação correta.",
    codigo:
      "#include <DHT.h>\n\n#define DHTPIN 4\n#define DHTTYPE DHT11\n\nDHT dht(DHTPIN, DHTTYPE);\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  float t = dht.readTemperature();\n  Serial.println(t);\n  delay(2000);\n}",
    enunciado: "Qual alteração corrige a causa do problema no código?",
    alternativas: {
      A: "Trocar float por int na variável t, pois readTemperature retorna valor inteiro.",
      B: "Declarar pinMode(DHTPIN, OUTPUT) no setup(), pois o pino precisa ser configurado como saída.",
      C: "Mover o objeto dht para dentro do loop(), pois precisa ser recriado a cada leitura.",
      D: "Inserir dht.begin() no setup(), pois o sensor precisa ser inicializado antes das leituras."
    },
    correta: "D",
    explicacoes: {
      A: "readTemperature() retorna float, e o tipo da variável não é a causa do problema. Trocar para int só descartaria as casas decimais; a leitura continuaria falhando.",
      B: "O DHT usa um único fio de dados nos dois sentidos, e a própria biblioteca controla a direção do pino. Forçar OUTPUT não inicializa o sensor e não resolve o nan.",
      C: "Recriar o objeto a cada loop() não inicializa o sensor (continuaria faltando o begin()) e ainda gastaria memória e tempo à toa.",
      D: "Sem dht.begin(), o pino e a biblioteca não são inicializados, e as leituras falham retornando nan. As demais alterações não corrigem a causa."
    },
    revisar: { texto: "Exemplo de código do DHT11", link: "arduino.html#exemplos" }
  }
];
