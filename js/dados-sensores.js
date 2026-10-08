/* ==========================================================================
   dados-sensores.js — base de dados dos 25 sensores do catálogo
   Cada sensor traz: nome, categoria, tipo de sinal, conceito, princípio de
   funcionamento, especificações, aplicações, exemplo de projeto,
   fabricantes e imagem. Usada por js/pagina-sensores.js.
   ========================================================================== */

const SENSORES = [
  {
    id: "dht11",
    nome: "DHT11",
    categoria: "Temperatura e Umidade",
    sinal: "Digital (1-Wire proprietário)",
    conceito:
      "Módulo composto de baixo custo que reúne, em um único encapsulamento, um termístor NTC e um sensor capacitivo de umidade relativa. Um microcontrolador interno de 8 bits converte as duas grandezas e devolve o resultado já calibrado de fábrica, dispensando qualquer circuito de condicionamento externo.",
    principio:
      "A umidade é obtida por um substrato higroscópico posicionado entre dois elétrodos: a água absorvida altera a constante dielétrica e, portanto, a capacitância lida. A temperatura vem da variação resistiva do termístor NTC. O controlador interno digitaliza ambas as leituras e as transmite em um pacote de 40 bits (16 de umidade, 16 de temperatura e 8 de checksum) por um único fio de dados, usando modulação por largura de pulso.",
    especificacoes: [
      "Alimentação: 3,0 a 5,5 V CC",
      "Faixa de temperatura: 0 a 50 C, precisão de +/- 2 C",
      "Faixa de umidade: 20 a 90 % UR, precisão de +/- 5 % UR",
      "Resolução: 1 C e 1 % UR (valores inteiros)",
      "Taxa de amostragem máxima: 1 leitura por segundo",
      "Corrente em medição: aproximadamente 0,3 mA"
    ],
    aplicacoes: [
      "Monitoramento ambiental de salas de controle e quadros elétricos",
      "Estações meteorológicas didáticas e projetos de prototipagem IoT",
      "Controle de conforto térmico em ambientes prediais automatizados",
      "Registro de condições ambientais em pequenos almoxarifados"
    ],
    projeto:
      "Estação de monitoramento de quadro elétrico: o DHT11 conectado a um ESP32 publica temperatura e umidade em um broker MQTT a cada 30 segundos. Um painel Node-RED registra a série histórica e dispara alerta quando a umidade relativa ultrapassa 80 % UR, condição associada a risco de condensação sobre as barras de cobre.",
    fabricantes: ["Aosong (ASAIR) DHT11", "Adafruit 386", "Robotdyn DHT11 Module"],
    imagem: "img/sensores/dht11.jpg"
  },
  {
    id: "dht22",
    nome: "DHT22 / AM2302",
    categoria: "Temperatura e Umidade",
    sinal: "Digital (1-Wire proprietário)",
    conceito:
      "Evolução direta do DHT11, o DHT22 mantém o mesmo protocolo de comunicação, porém amplia a faixa útil de medição e entrega resolução decimal. É a escolha padrão quando o projeto exige leitura de temperaturas negativas ou precisão superior a 1 C.",
    principio:
      "Utiliza o mesmo par sensor capacitivo de umidade e termístor NTC do DHT11, mas com elemento sensor de maior qualidade e conversor analógico-digital de maior resolução. Cada unidade recebe coeficientes de calibração gravados em memória OTP durante a fabricação, que o controlador interno aplica antes de transmitir o pacote de 40 bits.",
    especificacoes: [
      "Alimentação: 3,3 a 6,0 V CC",
      "Faixa de temperatura: -40 a 80 C, precisão de +/- 0,5 C",
      "Faixa de umidade: 0 a 100 % UR, precisão de +/- 2 % UR",
      "Resolução: 0,1 C e 0,1 % UR",
      "Taxa de amostragem máxima: 1 leitura a cada 2 segundos",
      "Comprimento máximo de cabo: até 20 m com resistor de pull-up adequado"
    ],
    aplicacoes: [
      "Câmaras frias e ambientes refrigerados com temperatura negativa",
      "Controle de umidade em estufas agrícolas e cultivo protegido",
      "Monitoramento de datacenters e salas técnicas",
      "Sistemas de climatização HVAC com registro de tendência"
    ],
    projeto:
      "Controle de estufa agrícola: dois DHT22 instalados em alturas diferentes alimentam um CLP compacto por meio de um gateway ESP32. A lógica compara as leituras, calcula o gradiente vertical de temperatura e aciona exaustores e nebulizadores para manter a umidade dentro da faixa definida para a cultura.",
    fabricantes: ["Aosong (ASAIR) AM2302", "Adafruit 385", "DFRobot SEN0137"],
    imagem: "img/sensores/dht22.jpg"
  },
  {
    id: "lm35",
    nome: "LM35",
    categoria: "Temperatura",
    sinal: "Analógico (tensão linear)",
    conceito:
      "Circuito integrado sensor de temperatura de saída analógica linear calibrado diretamente em graus Celsius. Diferente de um termístor, não exige linearização por software nem divisor de tensão, o que simplifica o projeto de aquisição e reduz erro de cálculo.",
    principio:
      "Explora a dependência previsível da tensão base-emissor de junções de silício com a temperatura absoluta. Um circuito interno amplifica e compensa essa diferença de tensão entre dois transístores operando em densidades de corrente distintas, produzindo uma saída de exatamente 10 mV por grau Celsius, com 0 V correspondendo a 0 C.",
    especificacoes: [
      "Alimentação: 4 a 30 V CC",
      "Faixa de medição: -55 a 150 C (versão LM35A com polarização negativa)",
      "Sensibilidade: 10 mV/C, linear",
      "Precisão típica: +/- 0,5 C a 25 C",
      "Impedância de saída: 0,1 ohm para carga de 1 mA",
      "Consumo: inferior a 60 uA"
    ],
    aplicacoes: [
      "Proteção térmica de motores elétricos e transformadores",
      "Termostatos industriais de acionamento simples",
      "Monitoramento de dissipadores em inversores de frequência",
      "Entradas analógicas de CLPs com condicionamento de sinal"
    ],
    projeto:
      "Proteção térmica de motor: o LM35 fixado na carcaça do motor alimenta uma entrada analógica do Arduino. Como o conversor de 10 bits com referência de 5 V oferece 4,88 mV por passo, o firmware muda a referência para a interna de 1,1 V, elevando a resolução para cerca de 0,1 C, e desliga o contator via relé quando ultrapassa 70 C.",
    fabricantes: ["Texas Instruments LM35DZ", "STMicroelectronics LM35CZ", "onsemi LM35DT"],
    imagem: "img/sensores/lm35.jpg"
  },
  {
    id: "ds18b20",
    nome: "DS18B20",
    categoria: "Temperatura",
    sinal: "Digital 1-Wire (Dallas)",
    conceito:
      "Termômetro digital que se comunica pelo barramento 1-Wire e possui um número de série único de 64 bits gravado em ROM. Essa identificação permite ligar dezenas de sensores em um único par de fios, endereçando cada um individualmente, característica que o tornou padrão em medição distribuída de temperatura.",
    principio:
      "Internamente compara a frequência de dois osciladores: um com coeficiente térmico baixo, usado como referência, e outro fortemente dependente da temperatura. A diferença de contagem entre eles alimenta um registrador que produz o valor digital. A versão encapsulada em tubo de aço inoxidável permite imersão direta em líquidos.",
    especificacoes: [
      "Alimentação: 3,0 a 5,5 V, com opção de modo parasita alimentado pela linha de dados",
      "Faixa de medição: -55 a 125 C",
      "Precisão: +/- 0,5 C entre -10 e 85 C",
      "Resolução configurável: 9 a 12 bits (0,5 C a 0,0625 C)",
      "Tempo de conversão: até 750 ms em 12 bits",
      "Endereço único de 64 bits por dispositivo"
    ],
    aplicacoes: [
      "Medição de temperatura de líquidos em tanques e tubulações",
      "Perfil térmico multiponto em fornos e câmaras de secagem",
      "Monitoramento de temperatura de água em sistemas de refrigeração",
      "Redes de sensores distribuídos em galpões e silos"
    ],
    projeto:
      "Perfil térmico de tanque de processo: quatro DS18B20 em alturas diferentes compartilham o mesmo barramento 1-Wire de um Raspberry Pi. Um serviço em Python lê os quatro endereços, calcula o gradiente vertical e expõe os valores por OPC UA para o sistema supervisório da planta.",
    fabricantes: ["Analog Devices (Maxim) DS18B20", "SparkFun SEN-11050", "Adafruit 381"],
    imagem: "img/sensores/ds18b20.jpg"
  },
  {
    id: "ldr",
    nome: "LDR (Fotorresistor)",
    categoria: "Luminosidade",
    sinal: "Analógico (resistivo)",
    conceito:
      "Resistor cuja resistência elétrica varia de forma inversa e não linear com a intensidade luminosa incidente. É o transdutor óptico mais simples e econômico disponível, usado sempre que basta distinguir faixas de claro e escuro em vez de medir lux com exatidão.",
    principio:
      "O elemento sensível é uma trilha de sulfeto de cádmio depositada em formato serpentinado sobre substrato cerâmico. Fótons com energia suficiente liberam elétrons da banda de valência para a banda de condução, aumentando a quantidade de portadores livres e reduzindo drasticamente a resistência do material. No escuro a resistência pode superar 1 Mohm, caindo para poucas centenas de ohms sob luz intensa.",
    especificacoes: [
      "Resistência no escuro: 0,5 a 20 Mohm conforme o modelo",
      "Resistência sob 10 lux: 5 a 20 kohm",
      "Tensão máxima de operação: 150 V CC",
      "Pico de sensibilidade espectral: aproximadamente 540 nm, próximo a resposta do olho humano",
      "Tempo de resposta: dezenas de milissegundos, com efeito de histerese",
      "Necessita divisor resistivo para gerar sinal de tensão"
    ],
    aplicacoes: [
      "Acionamento automático de iluminação publica e industrial",
      "Detecção de presença de peça por interrupção de feixe luminoso",
      "Controle de brilho de painéis e interfaces homem-máquina",
      "Chaves crepusculares em quadros de comando"
    ],
    projeto:
      "Contador de peças em esteira: um LED emissor e um LDR ficam alinhados em lados opostos da correia. Cada peça que passa interrompe o feixe e provoca uma queda abrupta na leitura analógica do Arduino. O firmware aplica histerese com dois limiares distintos para evitar contagem dupla e envia o total acumulado por Modbus RTU.",
    fabricantes: ["Advanced Photonix GL5528", "Excelitas VT90N séries", "Token PGM5539"],
    imagem: "img/sensores/ldr.jpg"
  },
  {
    id: "bh1750",
    nome: "BH1750",
    categoria: "Luminosidade",
    sinal: "Digital I2C",
    conceito:
      "Sensor de luz ambiente digital que entrega diretamente o valor em lux, sem necessidade de calibração ou conversão no microcontrolador. Substitui o LDR sempre que o projeto exige medição fotométrica quantitativa em vez de simples detecção de claro e escuro.",
    principio:
      "Um fotodiodo com resposta espectral aproximada a da visão humana gera fotocorrente proporcional a iluminância. Um amplificador de transimpedância converte essa corrente em tensão e um conversor analógico-digital de 16 bits produz o valor final, já escalonado em lux e disponibilizado por registradores no barramento I2C.",
    especificacoes: [
      "Alimentação: 2,4 a 3,6 V (módulos comerciais incluem regulador para 5 V)",
      "Faixa de medição: 1 a 65.535 lux",
      "Resolução selecionável: 0,5 lux, 1 lux ou 4 lux",
      "Interface: I2C com dois endereços selecionáveis (0x23 ou 0x5C)",
      "Tempo de medição: 120 ms em alta resolução, 16 ms em baixa",
      "Rejeição interna de ruído de 50/60 Hz da rede elétrica"
    ],
    aplicacoes: [
      "Controle de iluminação por daylight harvesting em galpões industriais",
      "Verificação de nível de iluminamento em postos de trabalho conforme norma",
      "Ajuste automático de exposição em sistemas de visão artificial",
      "Estações meteorológicas e monitoramento agrícola de radiação"
    ],
    projeto:
      "Economia de energia em galpão logístico: BH1750 instalados sob os domos de luz natural informam a iluminância real a um controlador ESP32 por I2C. O sistema modula por PWM as luminárias LED via driver DALI, mantendo 500 lux constantes no piso e reduzindo o consumo nos horários de maior claridade.",
    fabricantes: ["ROHM BH1750FVI", "GY-302 Module", "DFRobot SEN0097"],
    imagem: "img/sensores/bh1750.svg"
  },
  {
    id: "hc-sr04",
    nome: "HC-SR04",
    categoria: "Distância",
    sinal: "Digital (largura de pulso)",
    conceito:
      "Módulo de medição de distância por ultrassom formado por um transdutor emissor e um receptor. Determina a distância até um obstáculo pelo tempo de voo do eco, sem contato físico e sem depender da cor ou da transparência do alvo.",
    principio:
      "O microcontrolador aplica um pulso de 10 us no pino TRIG. O módulo emite então uma rajada de oito ciclos a 40 kHz e coloca o pino ECHO em nível alto. Quando o eco retorna ao receptor, ECHO volta a nível baixo. A distância é obtida por d = (t x 343) / 2, onde t é a duração do pulso em segundos e 343 m/s a velocidade do som no ar a 20 C.",
    especificacoes: [
      "Alimentação: 5 V CC, corrente de 15 mA",
      "Faixa de medição: 2 cm a 400 cm",
      "Resolução: aproximadamente 3 mm",
      "Ângulo de abertura efetivo: cerca de 15 graus",
      "Frequência de operação: 40 kHz",
      "Taxa de atualização recomendada: até 20 leituras por segundo"
    ],
    aplicacoes: [
      "Medição de nível de sólidos e líquidos em silos e reservatórios",
      "Detecção de obstáculos em veículos guiados automaticamente (AGV)",
      "Verificação de presença e altura de peças em esteiras",
      "Controle de posicionamento aproximado em portões e docas"
    ],
    projeto:
      "Nível de silo de grãos: o HC-SR04 montado no topo do silo mede a distância até a superfície do produto. O firmware do ESP32 aplica média móvel de dez amostras para atenuar o efeito da poeira em suspensão, converte a distância em percentual de ocupação e publica o valor por MQTT no supervisório da planta.",
    fabricantes: ["Elec Freaks HC-SR04", "SparkFun SEN-15569", "DFRobot URM09"],
    imagem: "img/sensores/hc-sr04.jpg"
  },
  {
    id: "pir",
    nome: "PIR HC-SR501",
    categoria: "Movimento",
    sinal: "Digital (nível lógico)",
    conceito:
      "Sensor infravermelho passivo que detecta a presença de corpos com temperatura próxima a do corpo humano em movimento. É chamado de passivo porque não emite radiação, apenas capta a energia térmica que já existe no ambiente.",
    principio:
      "Um elemento piroelétrico dividido em dois segmentos gera cargas elétricas quando exposto a variação de radiação infravermelha na faixa de 8 a 14 um. Uma lente de Fresnel segmentada divide o campo de visão em múltiplas zonas: quando uma fonte de calor cruza a fronteira entre zonas, os dois segmentos recebem energias diferentes e o desequilíbrio resultante é amplificado e comparado com um limiar, gerando nível lógico alto na saída. Corpos parados não produzem variação e portanto não são detectados.",
    especificacoes: [
      "Alimentação: 4,5 a 20 V CC",
      "Saída: nível lógico de 3,3 V, corrente reduzida",
      "Alcance ajustável: 3 a 7 m",
      "Ângulo de detecção: aproximadamente 110 graus",
      "Tempo de retenção ajustável: 5 s a 300 s",
      "Modos de disparo: único (H) ou repetitivo (L) por jumper"
    ],
    aplicacoes: [
      "Segurança perimetral e alarme de intrusão em áreas restritas",
      "Acionamento de iluminação por presença em corredores e almoxarifados",
      "Monitoramento de ocupação de células robóticas não colaborativas",
      "Ativação de sinalização em zonas de tráfego de empilhadeiras"
    ],
    projeto:
      "Supervisão de área restrita: um PIR posicionado na entrada de uma célula robótica cercada envia sinal digital a uma entrada rápida do CLP. Ao detectar presença com a célula em ciclo, o programa registra o evento no histórico de segurança e aciona sinalizador sonoro e luminoso, complementando (sem substituir) a cortina de luz certificada da porta.",
    fabricantes: ["HC-SR501 (Hiletgo, Elegoo)", "Panasonic EKMB séries", "Murata IRA-S210ST01"],
    imagem: "img/sensores/pir.jpg"
  },
  {
    id: "indutivo",
    nome: "Sensor Indutivo LJ12A3",
    categoria: "Proximidade",
    sinal: "Digital PNP ou NPN (24 V)",
    conceito:
      "Chave de proximidade sem contato que detecta exclusivamente materiais metálicos. É o sensor de posição mais empregado no chão de fábrica por não possuir partes móveis, o que lhe confere vida útil praticamente ilimitada e alta imunidade a poeira, óleo e vibração.",
    principio:
      "Um oscilador LC alimenta uma bobina que gera campo eletromagnético alternado na face sensora. Quando um alvo metálico entra nesse campo, correntes parasitas (correntes de Foucault) são induzidas na peça e dissipam energia do circuito ressonante, amortecendo a amplitude da oscilação. Um circuito comparador detecta essa queda e comuta a saída a transístor. O alcance nominal é definido para aço doce; alumínio e cobre exigem fator de correção de 0,4 a 0,5.",
    especificacoes: [
      "Alimentação: 6 a 36 V CC, tipicamente 24 V industrial",
      "Distância sensora nominal: 4 mm (LJ12A3-4) em versão blindada",
      "Corrente de saída: até 300 mA com proteção contra curto-circuito",
      "Frequência de comutação: até 500 Hz",
      "Grau de proteção: IP67",
      "Configurações: NA ou NF, saída PNP ou NPN"
    ],
    aplicacoes: [
      "Fim de curso de cilindros pneumáticos e mesas lineares",
      "Contagem de peças metálicas em transportadores",
      "Detecção de posição de came e verificação de fixação de gabaritos",
      "Referenciamento (homing) de eixos em máquinas CNC"
    ],
    projeto:
      "Contagem de tampas metálicas: um LJ12A3-4-Z/BX com saída NPN ligado a entrada rápida de um CLP Siemens S7-1200 conta cada tampa que passa pela esteira. Um contador de alta velocidade acumula o total e o dado é disponibilizado ao MES por Profinet, permitindo calcular a taxa real de produção por turno.",
    fabricantes: ["Omron E2B séries", "Pepperl+Fuchs NBB4-12GM50", "SICK IME12 séries"],
    imagem: "img/sensores/indutivo.jpg"
  },
  {
    id: "capacitivo",
    nome: "Sensor Capacitivo LJ18A3",
    categoria: "Proximidade",
    sinal: "Digital PNP ou NPN (24 V)",
    conceito:
      "Sensor de proximidade capaz de detectar praticamente qualquer material, condutor ou não: metais, plásticos, vidro, madeira, grãos, pôs e líquidos. Permite inclusive detecção através de paredes finas de recipientes não metálicos.",
    principio:
      "A face sensora forma uma das placas de um capacitor, sendo a outra o próprio alvo ou o ambiente. A aproximação de um material com constante dielétrica superior a do ar aumenta a capacitância do conjunto, alterando a frequência de um oscilador RC até que ele entre em oscilação sustentada. O circuito detector identifica essa transição e comuta a saída. Materiais com constante dielétrica alta, como água, são detectados a distâncias maiores que plásticos.",
    especificacoes: [
      "Alimentação: 6 a 36 V CC",
      "Distância sensora ajustável: 1 a 10 mm (LJ18A3-8)",
      "Potenciômetro de ajuste de sensibilidade integrado",
      "Frequência de comutação: até 100 Hz",
      "Grau de proteção: IP67",
      "Sensível a variações de umidade e a acumulo de sujeira na face"
    ],
    aplicacoes: [
      "Detecção de nível de grãos, pôs e líquidos através da parede do recipiente",
      "Verificação de presença de embalagens plásticas e de vidro",
      "Controle de nível em tremonhas e silos de dosagem",
      "Detecção de ruptura de filme plástico em máquinas de embalagem"
    ],
    projeto:
      "Nível alto em tremonha: um LJ18A3-8-Z/BX fixado externamente na parede plástica da tremonha detecta quando o material atinge a altura máxima. O sinal entra em uma entrada digital do CLP que para a rosca transportadora de alimentação, evitando transbordo. O potenciômetro e ajustado em campo para ignorar o pó aderido a parede interna.",
    fabricantes: ["IFM KI5083", "Pepperl+Fuchs CBN séries", "Autonics CR séries"],
    imagem: "img/sensores/capacitivo.jpg"
  },
  {
    id: "mq2",
    nome: "MQ-2",
    categoria: "Gás",
    sinal: "Analógico e Digital (comparador)",
    conceito:
      "Sensor de gás do tipo semicondutor sensível a fumaça, GLP, propano, metano, hidrogênio e álcool. Amplamente aplicado em detecção precoce de incêndio e vazamento de gases combustíveis por seu custo baixo e resposta rápida.",
    principio:
      "O elemento sensor é uma camada de dióxido de estanho aquecida a cerca de 300 C por uma resistência interna. Nessa temperatura, o oxigênio do ar e adsorvido na superfície do material e captura elétrons, elevando a resistência elétrica. Gases redutores presentes no ambiente reagem com esse oxigênio adsorvido e liberam os elétrons de volta, reduzindo a resistência. A variação e lida por um divisor resistivo e disponibilizada na saída analógica; um comparador LM393 com potenciômetro fornece também uma saída digital de limiar.",
    especificacoes: [
      "Alimentação: 5 V CC, corrente de aquecimento cerca de 150 mA",
      "Faixa de detecção: 300 a 10.000 ppm",
      "Tempo de pré-aquecimento: 24 a 48 h para estabilização completa",
      "Saídas: analógica proporcional e digital com limiar ajustável",
      "Resposta cruzada a vários gases, sem seletividade química",
      "Sensível a temperatura e umidade do ambiente"
    ],
    aplicacoes: [
      "Detecção de vazamento de GLP em cozinhas industriais e caldeiras",
      "Alarme de fumaça em salas elétricas e almoxarifados",
      "Monitoramento de atmosfera em ambientes confinados",
      "Intertravamento de ventilação forçada em áreas de risco"
    ],
    projeto:
      "Alarme de vazamento de GLP: o MQ-2 fica ligado a uma entrada analógica de um ESP32 instalado na casa de gás. Após rotina de aquecimento de dois minutos no boot, o firmware calcula a razão Rs/Ró em relação ao valor de ar limpo memorizado e, ao ultrapassar o limiar, fecha uma válvula solenoide e publica alerta por MQTT.",
    fabricantes: ["Hanwei MQ-2", "Winsen MQ-2", "Zhengzhou Futian MQ-2"],
    imagem: "img/sensores/mq2.svg"
  },
  {
    id: "mq135",
    nome: "MQ-135",
    categoria: "Gás",
    sinal: "Analógico e Digital (comparador)",
    conceito:
      "Sensor semicondutor voltado ao monitoramento da qualidade do ar, sensível a amônia, óxidos de nitrogênio, benzeno, fumaça e dióxido de carbono. É usado como indicador relativo de degradação da atmosfera, não como instrumento de medição certificado.",
    principio:
      "Compartilha a mesma tecnologia de óxido metálico semicondutor do MQ-2, com dopagem diferente na camada de dióxido de estanho, que desloca a sensibilidade para compostos orgânicos voláteis e gases poluentes. A resistência do elemento cai na presença desses gases e o valor é lido por divisor resistivo. Como a resposta e cruzada, a leitura representa uma carga total de poluentes e não a concentração de um gás específico.",
    especificacoes: [
      "Alimentação: 5 V CC, corrente de aquecimento cerca de 150 mA",
      "Faixa de detecção: 10 a 1.000 ppm equivalentes",
      "Tempo de pré-aquecimento: 24 h para leitura estável",
      "Saídas: analógica e digital com limiar por potenciômetro",
      "Requer calibração em ar limpo para definir a resistência de referência Ró",
      "Vida útil típica: 5 anos em operação contínua"
    ],
    aplicacoes: [
      "Monitoramento de qualidade do ar em galpões e áreas de produção",
      "Detecção de amônia em sistemas de refrigeração industrial",
      "Controle de renovação de ar em ambientes fechados",
      "Indicadores ambientais em redes de sensores IoT urbanas"
    ],
    projeto:
      "Rede de qualidade do ar fabril: cinco MQ-135 distribuídos pelo galpão enviam leituras por LoRaWAN a um gateway central. Um serviço em nuvem normaliza os valores com a temperatura medida por DHT22 no mesmo ponto e gera um mapa de calor da qualidade do ar por setor, acionando a exaustão quando um setor ultrapassa o limiar definido.",
    fabricantes: ["Hanwei MQ-135", "Winsen MQ-135", "Olimex SNS-MQ135"],
    imagem: "img/sensores/mq135.svg"
  },
  {
    id: "umidade-solo",
    nome: "Sensor Capacitivo de Umidade do Solo",
    categoria: "Umidade",
    sinal: "Analógico (tensão)",
    conceito:
      "Sonda que estima o teor de água do solo sem colocar elétrodos em contato direto com o substrato. Por não haver superfície metálica exposta, elimina a corrosão galvânica que inutiliza os sensores resistivos tradicionais em poucas semanas de uso.",
    principio:
      "Duas trilhas de cobre cobertas por máscara de solda formam as placas de um capacitor, tendo o solo como dielétrico. A água possui constante dielétrica próxima a 80, muito superior a do solo seco (cerca de 4) e a do ar (1). Um oscilador de 1,5 MHz integrado a placa varia sua amplitude conforme a capacitância do meio e um detector de envoltória converte essa variação em tensão contínua proporcional ao teor de umidade.",
    especificacoes: [
      "Alimentação: 3,3 a 5,5 V CC",
      "Saída: 0 a 3 V analógico, tensão inversamente proporcional a umidade",
      "Consumo típico: 5 mA",
      "Corpo em material resistente a corrosão",
      "Requer calibração de dois pontos: solo seco e solo saturado",
      "Leitura sensível a salinidade e a compactação do solo"
    ],
    aplicacoes: [
      "Irrigação automatizada e agricultura de precisão",
      "Monitoramento de umidade em estufas e viveiros",
      "Controle de umidade em canteiros de obra e compactação de aterros",
      "Redes agrícolas IoT alimentadas por energia solar"
    ],
    projeto:
      "Irrigação por demanda: um ESP32 alimentado por painel solar lê três sondas capacitivas em profundidades distintas e entra em deep sleep entre as leituras. Quando a média ponderada indica umidade abaixo do ponto de manejo definido para a cultura, o módulo aciona uma válvula solenoide por relé e registra o volume aplicado em um painel Grafana.",
    fabricantes: ["DFRobot SEN0193", "Adafruit STEMMA Soil Sensor", "Catnip Electronics Chirp"],
    imagem: "img/sensores/umidade-solo.jpg"
  },
  {
    id: "fc37",
    nome: "Sensor FC-37",
    categoria: "Chuva",
    sinal: "Analógico e Digital (comparador)",
    conceito:
      "Conjunto formado por uma placa coletora com trilhas interdigitadas e um módulo comparador. Detecta a presença de água sobre a superfície exposta e indica de forma aproximada a intensidade da precipitação.",
    principio:
      "A placa coletora possui duas trilhas de cobre paralelas e entrelaçadas, eletricamente isoladas entre si. Gotas de água depositadas sobre o niquelado criam um caminho condutivo entre as trilhas, reduzindo a resistência do conjunto. Quanto maior a área molhada, menor a resistência e menor a tensão na saída analógica. O módulo comparador LM393 permite ajustar por potenciômetro o limiar em que a saída digital comuta.",
    especificacoes: [
      "Alimentação: 3,3 a 5 V CC",
      "Saídas: analógica proporcional a área molhada e digital de limiar",
      "Placa coletora com tratamento superficial anticorrosivo",
      "LED indicador de estado no módulo comparador",
      "Recomenda-se acionamento intermitente da alimentação para reduzir eletrólise",
      "Requer limpeza periódica por acumulo de poeira e resíduos"
    ],
    aplicacoes: [
      "Fechamento automático de claraboias e janelas em galpões",
      "Recolhimento de toldos e proteções móveis",
      "Estações meteorológicas automáticas de baixo custo",
      "Intertravamento de processos externos sensíveis a umidade"
    ],
    projeto:
      "Fechamento de claraboia: o FC-37 instalado no telhado envia a saída digital ao Arduino que controla o atuador linear da claraboia. Para prolongar a vida útil da placa, o firmware energiza o sensor por apenas 200 ms a cada 10 segundos, evitando a eletrólise contínua entre as trilhas, e exige três leituras positivas consecutivas antes de acionar o fechamento.",
    fabricantes: ["Módulo genérico FC-37 / YL-83", "Keyes KY-Rain", "Iduino SE045"],
    imagem: "img/sensores/fc37.svg"
  },
  {
    id: "boia",
    nome: "Sensor de Nível tipo Boia",
    categoria: "Nível",
    sinal: "Digital (contato seco)",
    conceito:
      "Chave de nível eletromecânica composta por um flutuador que se desloca com a superfície do líquido. É o método mais robusto e confiável para detecção de nível discreto, imune a espuma, vapor e variação de constante dielétrica do produto.",
    principio:
      "Dentro do flutuador há um imã permanente anelar. A haste fixa aloja um reed switch, contato lamelar selado em ampola de vidro com atmosfera inerte. Conforme o líquido sobe, o flutuador desliza pela haste e o campo magnético do imã aproxima as lamelas ferromagnéticas, fechando o circuito. Por ser um contato seco, o sinal e totalmente isolado do circuito de controle e a inversão da posição do flutuador alterna a lógica entre NA e NF.",
    especificacoes: [
      "Tensão de comutação: até 100 V CC",
      "Corrente máxima: 0,5 A resistiva",
      "Temperatura de operação: -10 a 80 C conforme o material",
      "Materiais disponíveis: polipropileno, PVDF e aço inoxidável",
      "Vida útil: superior a 100.000 operações",
      "Montagem lateral, superior ou inferior conforme o modelo"
    ],
    aplicacoes: [
      "Proteção contra funcionamento a seco de bombas centrífugas",
      "Alarme de nível alto e baixo em reservatórios e cisternas",
      "Controle liga-desliga de bombas de recalque",
      "Intertravamento de segurança em tanques de processo químico"
    ],
    projeto:
      "Proteção de bomba de recalque: duas boias instaladas na cisterna definem os níveis mínimo e máximo. Os contatos secos entram em duas entradas digitais do CLP, que implementa a lógica de histerese: liga a bomba na boia inferior e desliga na superior, além de bloquear a partida caso o nível mínimo permaneça aberto por mais de cinco segundos.",
    fabricantes: ["Gems Sensors LS-3 Séries", "Margirius NA-30", "Digimec Boia de Nível"],
    imagem: "img/sensores/boia.jpg"
  },
  {
    id: "yf-s201",
    nome: "YF-S201",
    categoria: "Fluxo",
    sinal: "Digital (trem de pulsos)",
    conceito:
      "Medidor de vazão volumétrica do tipo turbina, com corpo plástico e rosca de meia polegada. Converte o escoamento de água em uma frequência de pulsos diretamente proporcional a vazão, formato ideal para leitura por contadores de microcontroladores e CLPs.",
    principio:
      "A água que atravessa o corpo do sensor faz girar um rotor de pás com ímãs embutidos. Um sensor Hall montado externamente na parede da câmara, portanto sem contato com o fluido, detecta a passagem de cada polo magnético e gera um pulso digital. A vazão instantânea é obtida dividindo a frequência medida pelo fator K do modelo, e o volume acumulado vem da contagem total de pulsos.",
    especificacoes: [
      "Alimentação: 5 a 18 V CC",
      "Faixa de vazão: 1 a 30 litros por minuto",
      "Fator K típico: 450 pulsos por litro (F = 7,5 x Q, com Q em L/min)",
      "Pressão máxima de trabalho: 1,75 MPa",
      "Precisão: +/- 10 % do valor lido",
      "Conexão: rosca BSP de 1/2 polegada"
    ],
    aplicacoes: [
      "Totalização de consumo de água em setores fabris",
      "Dosagem volumétrica em processos de mistura e envase",
      "Monitoramento de fluxo em circuitos de refrigeração de máquinas",
      "Detecção de vazamento por consumo anômalo em horário ocioso"
    ],
    projeto:
      "Submedição de água industrial: a saída do YF-S201 e ligada a um pino de interrupção externa do ESP32. A rotina de interrupção apenas incrementa um contador volátil; a cada segundo o laço principal lê e zera o contador, calculando vazão instantânea e volume acumulado. Os valores são publicados por MQTT e comparados ao consumo esperado para detectar vazamentos na madrugada.",
    fabricantes: ["Seeed Studio YF-S201", "Digiten FL-S201C", "Adafruit 828"],
    imagem: "img/sensores/yfs201.svg"
  },
  {
    id: "acs712",
    nome: "ACS712",
    categoria: "Corrente",
    sinal: "Analógico (tensão bidirecional)",
    conceito:
      "Sensor de corrente por efeito Hall com isolação galvânica entre o circuito de potência e o de medição. Mede corrente contínua e alternada sem inserir resistor shunt no caminho, o que elimina perdas significativas e protege eletricamente o microcontrolador.",
    principio:
      "A corrente a medir percorre um condutor de cobre interno de baixíssima resistência, gerando um campo magnético proporcional ao seu valor. Um elemento Hall integrado ao mesmo encapsulamento, porém eletricamente isolado do condutor, converte esse campo em tensão. Um amplificador interno ajusta o ganho e desloca o nível de saída para Vcc/2 em repouso, de modo que correntes positivas elevam a tensão e negativas a reduzem, permitindo leitura bidirecional.",
    especificacoes: [
      "Alimentação: 5 V CC",
      "Versões disponíveis: +/- 5 A (185 mV/A), +/- 20 A (100 mV/A) e +/- 30 A (66 mV/A)",
      "Tensão de isolação: 2,1 kV RMS",
      "Resistência interna do condutor: 1,2 mohm",
      "Largura de banda: até 80 kHz",
      "Erro típico total: 1,5 % a 25 C"
    ],
    aplicacoes: [
      "Monitoramento de consumo e carga de motores elétricos",
      "Detecção de sobrecorrente e falta de fase em quadros de comando",
      "Manutenção preditiva por análise da assinatura de corrente do motor",
      "Medição de energia em sistemas fotovoltaicos e bancos de baterias"
    ],
    projeto:
      "Manutenção preditiva de motor: um ACS712 de 20 A instalado em uma das fases do motor e amostrado a 2 kHz por um ESP32. A FFT calculada no próprio microcontrolador identifica bandas laterais em torno da frequência da rede, indicativas de barras de rotor quebradas. O espectro e enviado periodicamente ao servidor, gerando ordem de serviço preventiva antes da falha.",
    fabricantes: ["Allegro MicroSystems ACS712ELCTR", "Sparkfun BOB-08882", "Robotdyn ACS712 Module"],
    imagem: "img/sensores/acs712.svg"
  },
  {
    id: "zmpt101b",
    nome: "ZMPT101B",
    categoria: "Tensão",
    sinal: "Analógico (tensão CA reduzida)",
    conceito:
      "Módulo transformador de precisão destinado a medir tensão alternada da rede elétrica com isolação galvânica total. Reduz a tensão de linha a um sinal de baixa amplitude, seguro para ser lido por entradas analógicas de 3,3 V ou 5 V.",
    principio:
      "Um transformador de corrente de precisão com relação 1000:1 recebe a tensão da rede através de um resistor limitador de alta impedância, convertendo tensão em corrente controlada no primário. O secundário alimenta um amplificador operacional em configuração de transimpedância que devolve o sinal como tensão alternada de baixa amplitude, deslocada para metade da alimentação por um divisor, de modo que o semiciclo negativo também possa ser digitalizado. O valor eficaz é obtido por software pelo cálculo RMS sobre um número inteiro de ciclos.",
    especificacoes: [
      "Alimentação: 5 V CC",
      "Faixa de medição: até 250 V CA",
      "Relação de transformação: 1000:1",
      "Linearidade: 0,2 %",
      "Faixa de frequência: 50/60 Hz",
      "Requer potenciômetro de ajuste de ganho e calibração com referência conhecida"
    ],
    aplicacoes: [
      "Medição de tensão de linha em quadros de distribuição",
      "Detecção de subtensão, sobretensão e falta de fase",
      "Análise de qualidade de energia junto a medição de corrente",
      "Monitoramento de nobreaks e geradores de emergência"
    ],
    projeto:
      "Monitor de qualidade de energia: um ZMPT101B para tensão e um ACS712 para corrente são amostrados de forma sincronizada por um ESP32 a 4 kHz. O firmware calcula tensão RMS, corrente RMS, potência ativa, aparente e fator de potência por ciclo, e registra eventos de subtensão com carimbo de tempo obtido por NTP.",
    fabricantes: ["Qingxian Zeming ZMPT101B", "Winson Module ZMPT101B", "Robotdyn AC Voltage Sensor"],
    imagem: "img/sensores/zmpt101b.svg"
  },
  {
    id: "sw420",
    nome: "SW-420",
    categoria: "Vibração",
    sinal: "Digital (nível lógico)",
    conceito:
      "Módulo detector de vibração e impacto baseado em uma chave mecânica de mola condutiva. Não mede amplitude nem frequência: apenas indica que houve agitação mecânica acima de um limiar ajustável, funcionando como sensor de evento.",
    principio:
      "O componente SW-420 contém uma mola helicoidal condutiva envolvendo um elétrodo central dentro de um tubo selado. Em repouso, a mola não toca o elétrodo e o circuito permanece aberto. Vibrações ou choques fazem a mola oscilar e tocar intermitentemente o elétrodo, fechando o contato de forma pulsada. Um comparador LM393 com potenciômetro de sensibilidade filtra esses pulsos e produz saída digital estável.",
    especificacoes: [
      "Alimentação: 3,3 a 5 V CC",
      "Saída: digital, nível alto ou baixo conforme ajuste do potenciômetro",
      "Sensibilidade ajustável por trimpot no módulo",
      "LED indicador de disparo integrado",
      "Não direcional: responde a vibração em qualquer eixo",
      "Não fornece medição quantitativa de amplitude"
    ],
    aplicacoes: [
      "Alarme de vibração anormal em máquinas rotativas",
      "Detecção de violação ou queda de equipamentos e painéis",
      "Monitoramento de impacto em transporte de cargas sensíveis",
      "Acionamento de rotina de diagnóstico em manutenção preditiva"
    ],
    projeto:
      "Alerta de desbalanceamento: um SW-420 fixado na carcaça de um exaustor industrial monitora vibração anormal. Como o sensor gera pulsos, o firmware do Arduino conta as transições em janelas de 5 segundos. Se a contagem ultrapassar a linha de base aprendida durante a partida da máquina, o sistema envia alerta e sugere inspeção de balanceamento do rotor.",
    fabricantes: ["Módulo genérico SW-420", "Keyes KY-002", "Iduino SE046"],
    imagem: "img/sensores/sw420.svg"
  },
  {
    id: "hall-a3144",
    nome: "Sensor Hall A3144",
    categoria: "Rotação",
    sinal: "Digital (coletor aberto)",
    conceito:
      "Chave Hall digital unipolar utilizada para detecção de posição angular e medição de velocidade de rotação. Por operar sem contato mecânico, não sofre desgaste e mantém precisão constante ao longo de milhões de ciclos.",
    principio:
      "Um elemento Hall de silício percorrido por corrente gera tensão transversal quando submetido a campo magnético perpendicular. Um amplificador e um comparador com histerese (trigger de Schmitt) integrados ao chip convertem essa pequena tensão em um sinal lógico limpo. A saída é do tipo coletor aberto: satura em nível baixo na presença do polo sul magnético e retorna ao nível alto por resistor de pull-up quando o campo se afasta. A rotação é calculada contando pulsos por unidade de tempo, dividindo pelo número de ímãs fixados no eixo.",
    especificacoes: [
      "Alimentação: 4,5 a 24 V CC",
      "Saída: coletor aberto NPN, até 25 mA",
      "Campo de operação: aproximadamente 25 mT",
      "Frequência máxima: até 100 kHz",
      "Temperatura de operação: -40 a 85 C",
      "Requer resistor de pull-up externo de 10 kohm"
    ],
    aplicacoes: [
      "Tacômetro de eixos de motores e redutores",
      "Detecção de posição de referência em mecanismos rotativos",
      "Medição de velocidade de esteiras por roda dentada magnetizada",
      "Realimentação de velocidade para controle PID de motores CC"
    ],
    projeto:
      "Tacômetro de esteira: dois ímãs diametralmente opostos são colados no tambor de acionamento e o A3144 é fixado a poucos milímetros da trajetória. Uma interrupção externa no Arduino registra o intervalo entre pulsos consecutivos. Dividindo por dois (ímãs por volta) e conhecendo o diâmetro do tambor, o firmware calcula a velocidade linear em m/min e realimenta um controlador PID que ajusta o inversor.",
    fabricantes: ["Allegro MicroSystems A3144", "Honeywell SS41F", "Diodes Incorporated AH3144"],
    imagem: "img/sensores/hall-a3144.svg"
  },
  {
    id: "mfrc522",
    nome: "MFRC522",
    categoria: "RFID",
    sinal: "Digital SPI (opcional I2C e UART)",
    conceito:
      "Leitor e gravador de cartões RFID de proximidade operando em 13,56 MHz, compatível com o padrão ISO/IEC 14443A e com cartões MIFARE Classic. Permite identificar pessoas, ferramentas e produtos por aproximação, sem contato e sem linha de visada direta.",
    principio:
      "A antena do módulo emite um campo eletromagnético de 13,56 MHz que energiza por acoplamento indutivo a etiqueta passiva, que não possui bateria. Alimentado por esse campo, o chip da etiqueta responde modulando a carga da própria antena, o que provoca variações detectáveis de impedância no leitor. O MFRC522 demodula essas variações, gerência o protocolo anticolisão (permitindo distinguir várias etiquetas no campo) e a autenticação criptográfica CRYPTO1, entregando os dados ao microcontrolador por SPI.",
    especificacoes: [
      "Alimentação: 2,5 a 3,3 V (não tolerante a 5 V nos pinos de sinal)",
      "Frequência de operação: 13,56 MHz",
      "Distância de leitura: até 5 cm com a antena padrão do módulo",
      "Interfaces: SPI até 10 Mbit/s, I2C e UART",
      "Compatibilidade: MIFARE Classic 1K/4K, MIFARE Ultralight, NTAG",
      "Cada etiqueta possui UID único de 4 ou 7 bytes"
    ],
    aplicacoes: [
      "Controle de acesso a áreas restritas e salas elétricas",
      "Rastreabilidade de ferramentas e dispositivos em ferramentaria",
      "Identificação de operador para liberação de máquina",
      "Rastreio de pallets e caixas retornáveis na logística interna"
    ],
    projeto:
      "Liberação de máquina por credencial: o MFRC522 conectado por SPI a um ESP32 lê o UID do crachá do operador. O firmware consulta por HTTPS a lista de operadores treinados para aquela máquina e, se autorizado, energiza o relé de habilitação do painel. Todos os eventos de acesso ficam registrados com carimbo de tempo para auditoria de segurança.",
    fabricantes: ["NXP Semiconductors MFRC522", "Módulo RC522 (Hiletgo, Elegoo)", "Sunfounder RFID Kit"],
    imagem: "img/sensores/mfrc522.jpg"
  },
  {
    id: "hx711",
    nome: "Célula de Carga + HX711",
    categoria: "Peso",
    sinal: "Digital serial (protocolo proprietário de 2 fios)",
    conceito:
      "Conjunto formado por uma célula de carga com extensômetros e um amplificador conversor analógico-digital de 24 bits dedicado. Constitui a solução padrão para pesagem eletrônica de precisão em aplicações industriais e de prototipagem.",
    principio:
      "A célula de carga é um corpo metálico calibrado que se deforma elasticamente sob carga. Quatro extensômetros colados a ele formam uma ponte de Wheatstone: dois se alongam e dois se comprimem, desequilibrando a ponte e gerando uma tensão diferencial da ordem de poucos milivolts, proporcional a força aplicada. O HX711 amplifica esse sinal com ganho de 128 e o digitaliza com 24 bits de resolução, transmitindo o resultado por um protocolo serial simples de dois fios (DT e SCK).",
    especificacoes: [
      "Alimentação do HX711: 2,6 a 5,5 V",
      "Resolução: 24 bits, com cerca de 20 bits úteis após ruído",
      "Ganhos selecionáveis: 32, 64 e 128",
      "Taxa de amostragem: 10 ou 80 amostras por segundo",
      "Sensibilidade típica da célula: 1 mV/V",
      "Capacidades comuns: 1 kg, 5 kg, 20 kg, 50 kg e 200 kg"
    ],
    aplicacoes: [
      "Balanças industriais e postos de pesagem em linha",
      "Dosagem gravimétrica de insumos em processos de mistura",
      "Controle de estoque por peso em silos e tanques",
      "Verificação de peso líquido em linhas de envase"
    ],
    projeto:
      "Dosagem gravimétrica: uma célula de 20 kg sob a tremonha de dosagem alimenta o HX711 ligado a um Arduino. Após tara automática no início do ciclo, o sistema abre a válvula de alimentação em vazão alta até 90 % do alvo, reduz para vazão fina no trecho final e fecha ao atingir o peso programado, compensando o material em queda livre pelo valor de antecipação aprendido nos ciclos anteriores.",
    fabricantes: ["Avia Semiconductor HX711", "SparkFun SEN-13879", "Alfa Instrumentos Célula GL"],
    imagem: "img/sensores/hx711.svg"
  },
  {
    id: "ky037",
    nome: "KY-037",
    categoria: "Som",
    sinal: "Analógico e Digital (comparador)",
    conceito:
      "Módulo microfone de eletreto com amplificador e comparador integrados, usado para detectar nível de ruído acústico. Fornece uma saída analógica proporcional a pressão sonora instantânea e uma saída digital que comuta acima de um limiar regulável.",
    principio:
      "A cápsula de eletreto contém um diafragma com carga elétrica permanente próximo a uma placa fixa, formando um capacitor. As ondas sonoras deslocam o diafragma, alterando a capacitância e, como a carga e constante, gerando variação de tensão. Um transístor JFET interno faz a adaptação de impedância. No módulo, um amplificador eleva o sinal e um comparador LM393 com potenciômetro define o limiar da saída digital.",
    especificacoes: [
      "Alimentação: 3,3 a 5 V CC",
      "Saídas: analógica de sinal instantâneo e digital de limiar",
      "Sensibilidade da cápsula: aproximadamente -46 dB",
      "Resposta em frequência: 50 Hz a 20 kHz",
      "Ajuste de limiar por potenciômetro no módulo",
      "Não e instrumento calibrado: não substitui decibelímetro certificado"
    ],
    aplicacoes: [
      "Monitoramento indicativo de nível de ruído em postos de trabalho",
      "Detecção de ruído anormal em máquinas rotativas",
      "Acionamento de dispositivos por comando sonoro (palma)",
      "Identificação de vazamento de ar comprimido por assinatura acústica"
    ],
    projeto:
      "Indicador de ruído ocupacional: o KY-037 amostrado a 8 kHz por um ESP32 permite calcular o valor RMS do sinal em janelas de um segundo. Após calibração comparativa com um decibelímetro de referência, o valor é convertido em dB estimado e exibido em um painel na área de produção, alertando quando a média de 15 minutos se aproxima do limite de exposição.",
    fabricantes: ["Módulo genérico KY-037", "Adafruit MAX9814", "DFRobot SEN0232 (calibrado)"],
    imagem: "img/sensores/ky037.jpg"
  },
  {
    id: "chama",
    nome: "Sensor de Chama IR",
    categoria: "Chama",
    sinal: "Analógico e Digital (comparador)",
    conceito:
      "Detector óptico que identifica a radiação infravermelha característica emitida pela combustão. Responde muito mais rápido que sensores de fumaça ou de temperatura, pois detecta a própria chama e não seus subprodutos.",
    principio:
      "Um fotodiodo com filtro óptico centrado na faixa de 760 a 1100 nm capta a radiação infravermelha próxima emitida pela chama. Como a combustão produz cintilação característica entre 5 e 30 Hz, o circuito discrimina esse padrão de fontes contínuas como lâmpadas incandescentes e luz solar. A fotocorrente é convertida em tensão e comparada a um limiar ajustável pelo potenciômetro do módulo. Detectores industriais empregam múltiplos comprimentos de onda (IR triplo ou UV/IR) para reduzir alarmes falsos.",
    especificacoes: [
      "Alimentação: 3,3 a 5 V CC",
      "Faixa espectral de detecção: 760 a 1100 nm",
      "Ângulo de detecção: aproximadamente 60 graus",
      "Distância efetiva: até 100 cm nos módulos didáticos",
      "Tempo de resposta: inferior a 15 us",
      "Saídas: analógica proporcional e digital de limiar"
    ],
    aplicacoes: [
      "Detecção precoce de incêndio em salas elétricas e cabines",
      "Supervisão de chama em queimadores e caldeiras",
      "Proteção de áreas de solda e corte térmico",
      "Intertravamento de sistemas de combate a incêndio"
    ],
    projeto:
      "Supervisão de queimador: três sensores de chama IR distribuídos em ângulos diferentes ao redor do queimador entram em um Arduino que aplica lógica de votação dois de três. Essa redundância evita tanto o desligamento indevido por sujeira em um sensor quanto a falha de detecção, e o resultado comanda a válvula de bloqueio de combustível dentro do tempo de segurança exigido.",
    fabricantes: ["Módulo genérico KY-026", "Honeywell FSG séries", "Spectrex SharpEye 40/40"],
    imagem: "img/sensores/chama.jpg"
  },
  {
    id: "ky040",
    nome: "Encoder Incremental KY-040",
    categoria: "Encoder",
    sinal: "Digital (quadratura A/B + botão)",
    conceito:
      "Encoder rotativo incremental de acionamento manual que fornece informação de deslocamento angular relativo e de sentido de giro. Diferente de um potenciômetro, não possui batente e gira indefinidamente, sendo ideal para ajuste de parâmetros em interfaces homem-máquina.",
    principio:
      "Dois contatos internos, denominados canais A e B, são acionados por um disco com ressaltos posicionados de forma que os sinais fiquem defasados em 90 graus elétricos. Essa defasagem, chamada de quadratura, permite determinar o sentido: se o canal A muda de estado antes do canal B, o giro e horário; caso contrário, e anti-horário. A contagem dos pulsos indica o deslocamento. Em versões industriais, o mesmo princípio e implementado por discos ópticos e fotossensores, alcançando milhares de pulsos por revolução.",
    especificacoes: [
      "Alimentação: 3,3 a 5 V CC",
      "Resolução: 20 pulsos por revolução no KY-040",
      "Saídas: canais A (CLK) e B (DT) em quadratura, mais botão de pressão (SW)",
      "Necessita tratamento de repique (debounce) por hardware RC ou software",
      "Encoders industriais ópticos: 100 a 10.000 PPR",
      "Não mantém a posição após queda de energia: e incremental, não absoluto"
    ],
    aplicacoes: [
      "Ajuste de parâmetros em interfaces homem-máquina e painéis",
      "Realimentação de posição em eixos de máquinas CNC (versões industriais)",
      "Medição de comprimento por roda odométrica em linhas de corte",
      "Sincronismo eletrônico entre eixos em máquinas de embalagem"
    ],
    projeto:
      "Ajuste de setpoint local: um KY-040 conectado a um Arduino com display OLED permite ao operador ajustar a temperatura desejada de um forno diretamente na máquina. As duas saídas em quadratura são lidas por interrupção com filtro RC de debounce, e o botão integrado confirma o valor, que e então gravado na EEPROM e enviado ao controlador PID por Modbus.",
    fabricantes: ["Alps Alpine EC11 séries", "Bourns PEC11R", "Módulo KY-040 genérico"],
    imagem: "img/sensores/ky040.jpg"
  }
];

/* lista de categorias sem repetição, em ordem alfabética (usada nos filtros) */
const CATEGORIAS_SENSORES = [...new Set(SENSORES.map((s) => s.categoria))].sort();
