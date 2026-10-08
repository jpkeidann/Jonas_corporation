/* ==========================================================================
   dados-arduino.js — 13 exemplos de programação com sensores
   Cada exemplo traz: sensor, título, tipo de sinal, biblioteca, ligação,
   descrição e o código-fonte (.ino). Usada por js/pagina-arduino.js.
   ========================================================================== */

const EXEMPLOS_ARDUINO = [
  {
    id: "ex-dht11",
    sensor: "DHT11",
    titulo: "Leitura de temperatura e umidade",
    sinal: "Digital 1-Wire proprietário",
    biblioteca: "DHT sensor library (Adafruit)",
    ligacao: "VCC em 5V, GND em GND, DATA em D2 com resistor de pull-up de 10 kohm",
    descricao:
      "O sensor exige intervalo mínimo de 1 segundo entre leituras. A função isnan verifica se a comunicação falhou, situação comum quando o cabo é longo ou o pull-up está ausente.",
    codigo: `#include <DHT.h>

#define PINO_DHT 2
#define TIPO_DHT DHT11

DHT dht(PINO_DHT, TIPO_DHT);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float umidade = dht.readHumidity();
  float temperatura = dht.readTemperature();

  if (isnan(umidade) || isnan(temperatura)) {
    Serial.println("Falha na leitura do sensor DHT11");
    delay(2000);
    return;
  }

  Serial.print("Temperatura: ");
  Serial.print(temperatura, 1);
  Serial.print(" C  |  Umidade: ");
  Serial.print(umidade, 1);
  Serial.println(" %");

  delay(2000);
}`
  },
  {
    id: "ex-lm35",
    sensor: "LM35",
    titulo: "Medição analógica com referência interna de 1,1 V",
    sinal: "Analógico linear 10 mV/C",
    biblioteca: "Nenhuma",
    ligacao: "VCC em 5V, GND em GND, saída central em A0",
    descricao:
      "Trocar a referência do conversor de 5 V para a interna de 1,1 V eleva a resolução de 4,88 mV para 1,07 mV por passo, o que corresponde a cerca de 0,1 C. A média de dez amostras reduz o ruído de quantizacao.",
    codigo: `#define PINO_LM35 A0

void setup() {
  Serial.begin(9600);
  analogReference(INTERNAL);
}

float lerTemperatura() {
  long soma = 0;
  for (int i = 0; i < 10; i++) {
    soma += analogRead(PINO_LM35);
    delay(10);
  }
  float media = soma / 10.0;
  float tensao = media * (1.1 / 1023.0);
  return tensao * 100.0;
}

void loop() {
  float temperatura = lerTemperatura();

  Serial.print("Temperatura: ");
  Serial.print(temperatura, 1);
  Serial.println(" C");

  if (temperatura > 70.0) {
    Serial.println("ALARME: sobretemperatura no motor");
  }

  delay(1000);
}`
  },
  {
    id: "ex-ds18b20",
    sensor: "DS18B20",
    titulo: "Varredura de múltiplos sensores no barramento 1-Wire",
    sinal: "Digital 1-Wire (Dallas)",
    biblioteca: "OneWire + DallasTemperature",
    ligacao: "VCC em 5V, GND em GND, DATA em D3 com resistor de pull-up de 4,7 kohm",
    descricao:
      "Cada DS18B20 possui endereço único de 64 bits, o que permite ligar vários sensores no mesmo par de fios. A resolução e configurada em 12 bits para obter 0,0625 C.",
    codigo: `#include <OneWire.h>
#include <DallasTemperature.h>

#define PINO_ONEWIRE 3

OneWire barramento(PINO_ONEWIRE);
DallasTemperature sensores(&barramento);

void setup() {
  Serial.begin(9600);
  sensores.begin();
  sensores.setResolution(12);

  Serial.print("Sensores encontrados: ");
  Serial.println(sensores.getDeviceCount());
}

void loop() {
  sensores.requestTemperatures();

  for (int i = 0; i < sensores.getDeviceCount(); i++) {
    float temperatura = sensores.getTempCByIndex(i);

    Serial.print("Ponto ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.print(temperatura, 2);
    Serial.println(" C");
  }

  delay(2000);
}`
  },
  {
    id: "ex-ldr",
    sensor: "LDR",
    titulo: "Contador de peças por interrupção de feixe com histerese",
    sinal: "Analógico resistivo",
    biblioteca: "Nenhuma",
    ligacao: "LDR entre 5V e A1, resistor de 10 kohm entre A1 e GND",
    descricao:
      "Dois limiares distintos evitam contagem dupla quando a leitura oscila na fronteira. A peça só e contada na transição de feixe livre para feixe bloqueado.",
    codigo: `#define PINO_LDR A1
#define LIMIAR_BLOQUEADO 300
#define LIMIAR_LIVRE 500

bool feixeBloqueado = false;
unsigned long totalPecas = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int leitura = analogRead(PINO_LDR);

  if (!feixeBloqueado && leitura < LIMIAR_BLOQUEADO) {
    feixeBloqueado = true;
    totalPecas++;
    Serial.print("Peças contadas: ");
    Serial.println(totalPecas);
  }

  if (feixeBloqueado && leitura > LIMIAR_LIVRE) {
    feixeBloqueado = false;
  }

  delay(5);
}`
  },
  {
    id: "ex-hcsr04",
    sensor: "HC-SR04",
    titulo: "Medição de nível por tempo de voo com média móvel",
    sinal: "Digital por largura de pulso",
    biblioteca: "Nenhuma",
    ligacao: "VCC em 5V, GND em GND, TRIG em D9, ECHO em D10",
    descricao:
      "A função pulseIn recebe um tempo limite para não travar o programa quando não há eco. A média de cinco leituras atenua reflexões espúrias causadas por poeira em suspensão.",
    codigo: `#define PINO_TRIG 9
#define PINO_ECHO 10
#define ALTURA_SILO_CM 300.0

void setup() {
  Serial.begin(9600);
  pinMode(PINO_TRIG, OUTPUT);
  pinMode(PINO_ECHO, INPUT);
}

float medirDistancia() {
  digitalWrite(PINO_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PINO_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PINO_TRIG, LOW);

  unsigned long duracao = pulseIn(PINO_ECHO, HIGH, 30000UL);
  if (duracao == 0) {
    return -1.0;
  }
  return duracao * 0.0343 / 2.0;
}

void loop() {
  float soma = 0;
  int validas = 0;

  for (int i = 0; i < 5; i++) {
    float d = medirDistancia();
    if (d > 0) {
      soma += d;
      validas++;
    }
    delay(60);
  }

  if (validas == 0) {
    Serial.println("Sem eco válido");
    return;
  }

  float distancia = soma / validas;
  float ocupacao = (1.0 - (distancia / ALTURA_SILO_CM)) * 100.0;

  Serial.print("Distância: ");
  Serial.print(distancia, 1);
  Serial.print(" cm  |  Ocupação: ");
  Serial.print(ocupacao, 1);
  Serial.println(" %");

  delay(1000);
}`
  },
  {
    id: "ex-pir",
    sensor: "PIR HC-SR501",
    titulo: "Detecção de presença em área restrita",
    sinal: "Digital de nível lógico",
    biblioteca: "Nenhuma",
    ligacao: "VCC em 5V, GND em GND, OUT em D4, sirene via relé em D5",
    descricao:
      "O sensor exige cerca de 60 segundos de estabilização após energizar. A detecção por borda de subida evita reacionamento contínuo enquanto a presença permanece.",
    codigo: `#define PINO_PIR 4
#define PINO_SIRENE 5

int estadoAnterior = LOW;
unsigned long ultimoEvento = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PINO_PIR, INPUT);
  pinMode(PINO_SIRENE, OUTPUT);

  Serial.println("Estabilizando o sensor PIR...");
  delay(60000);
  Serial.println("Sistema armado");
}

void loop() {
  int estadoAtual = digitalRead(PINO_PIR);

  if (estadoAtual == HIGH && estadoAnterior == LOW) {
    ultimoEvento = millis();
    digitalWrite(PINO_SIRENE, HIGH);
    Serial.println("INTRUSAO detectada na área restrita");
  }

  if (digitalRead(PINO_SIRENE) == HIGH && millis() - ultimoEvento > 10000) {
    digitalWrite(PINO_SIRENE, LOW);
    Serial.println("Sirene desarmada");
  }

  estadoAnterior = estadoAtual;
  delay(50);
}`
  },
  {
    id: "ex-indutivo",
    sensor: "Sensor Indutivo LJ12A3",
    titulo: "Contagem de peças metálicas por interrupção externa",
    sinal: "Digital NPN 24 V",
    biblioteca: "Nenhuma",
    ligacao:
      "Marrom em 24V, azul em GND comum, preto na entrada D2 através de divisor resistivo ou optoacoplador",
    descricao:
      "O sensor opera em 24 V e não pode ser ligado diretamente ao Arduino. A rotina de interrupção apenas incrementa a variável volátil; o filtro de tempo elimina repique elétrico.",
    codigo: `#define PINO_INDUTIVO 2
#define TEMPO_DEBOUNCE_US 2000

volatile unsigned long contagem = 0;
volatile unsigned long ultimoPulso = 0;

void contarPeca() {
  unsigned long agora = micros();
  if (agora - ultimoPulso > TEMPO_DEBOUNCE_US) {
    contagem++;
    ultimoPulso = agora;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PINO_INDUTIVO, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PINO_INDUTIVO), contarPeca, FALLING);
}

void loop() {
  noInterrupts();
  unsigned long total = contagem;
  interrupts();

  Serial.print("Peças metálicas no turno: ");
  Serial.println(total);

  delay(1000);
}`
  },
  {
    id: "ex-mq2",
    sensor: "MQ-2",
    titulo: "Detecção de vazamento de GLP com calibração Rs/Ró",
    sinal: "Analógico com saída digital auxiliar",
    biblioteca: "Nenhuma",
    ligacao: "VCC em 5V, GND em GND, AOUT em A2, DOUT em D7",
    descricao:
      "A leitura bruta não representa concentração. A rotina calibra a resistência de referência Ró em ar limpo durante a partida e compara a razão Rs/Ró para decidir o alarme.",
    codigo: `#define PINO_MQ2 A2
#define PINO_VALVULA 8
#define RESISTOR_CARGA 5.0
#define RAZAO_AR_LIMPO 9.83

float Ro = 0;

float lerRs() {
  long soma = 0;
  for (int i = 0; i < 20; i++) {
    soma += analogRead(PINO_MQ2);
    delay(10);
  }
  float media = soma / 20.0;
  float tensao = media * (5.0 / 1023.0);
  return (5.0 - tensao) / tensao * RESISTOR_CARGA;
}

void setup() {
  Serial.begin(9600);
  pinMode(PINO_VALVULA, OUTPUT);

  Serial.println("Pré-aquecendo o MQ-2...");
  delay(120000);

  Ro = lerRs() / RAZAO_AR_LIMPO;
  Serial.print("Ró calibrado: ");
  Serial.println(Ro, 2);
}

void loop() {
  float razao = lerRs() / Ro;

  Serial.print("Rs/Ró: ");
  Serial.println(razao, 2);

  if (razao < 1.5) {
    digitalWrite(PINO_VALVULA, HIGH);
    Serial.println("ALARME: vazamento de GLP - válvula fechada");
  }

  delay(1000);
}`
  },
  {
    id: "ex-yfs201",
    sensor: "YF-S201",
    titulo: "Totalização de vazão por contagem de pulsos",
    sinal: "Digital em trem de pulsos",
    biblioteca: "Nenhuma",
    ligacao: "Vermelho em 5V, preto em GND, amarelo em D2 (interrupção externa)",
    descricao:
      "A rotina de interrupção apenas incrementa o contador. A cada segundo o laço principal lê e zera a variável, calculando a vazão instantânea e acumulando o volume total.",
    codigo: `#define PINO_FLUXO 2
#define FATOR_K 7.5

volatile unsigned int pulsos = 0;
float volumeTotal = 0;
unsigned long marcoTempo = 0;

void contarPulso() {
  pulsos++;
}

void setup() {
  Serial.begin(9600);
  pinMode(PINO_FLUXO, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PINO_FLUXO), contarPulso, RISING);
  marcoTempo = millis();
}

void loop() {
  if (millis() - marcoTempo < 1000) {
    return;
  }

  noInterrupts();
  unsigned int pulsosSegundo = pulsos;
  pulsos = 0;
  interrupts();

  float vazao = pulsosSegundo / FATOR_K;
  volumeTotal += vazao / 60.0;
  marcoTempo = millis();

  Serial.print("Vazão: ");
  Serial.print(vazao, 2);
  Serial.print(" L/min  |  Volume acumulado: ");
  Serial.print(volumeTotal, 3);
  Serial.println(" L");
}`
  },
  {
    id: "ex-acs712",
    sensor: "ACS712",
    titulo: "Medição de corrente eficaz em carga alternada",
    sinal: "Analógico bidirecional",
    biblioteca: "Nenhuma",
    ligacao: "VCC em 5V, GND em GND, OUT em A3, carga em série nos terminais de potência",
    descricao:
      "O cálculo RMS exige amostrar um número inteiro de ciclos. A janela de 200 ms cobre doze ciclos de 60 Hz, e o offset de repouso é medido com a carga desligada.",
    codigo: `#define PINO_ACS712 A3
#define SENSIBILIDADE 0.100
#define JANELA_MS 200

float offset = 512.0;

void calibrarOffset() {
  long soma = 0;
  for (int i = 0; i < 500; i++) {
    soma += analogRead(PINO_ACS712);
    delay(1);
  }
  offset = soma / 500.0;
}

void setup() {
  Serial.begin(9600);
  Serial.println("Calibrando com a carga desligada...");
  calibrarOffset();
}

void loop() {
  unsigned long inicio = millis();
  double somaQuadrados = 0;
  unsigned long amostras = 0;

  while (millis() - inicio < JANELA_MS) {
    float desvio = analogRead(PINO_ACS712) - offset;
    float corrente = (desvio * 5.0 / 1023.0) / SENSIBILIDADE;
    somaQuadrados += corrente * corrente;
    amostras++;
  }

  float correnteRms = sqrt(somaQuadrados / amostras);

  Serial.print("Corrente eficaz: ");
  Serial.print(correnteRms, 2);
  Serial.println(" A");

  delay(500);
}`
  },
  {
    id: "ex-hx711",
    sensor: "Célula de Carga + HX711",
    titulo: "Dosagem gravimétrica com tara automática",
    sinal: "Digital serial de dois fios",
    biblioteca: "HX711 (bogde)",
    ligacao: "DT em D6, SCK em D7, célula ligada aos terminais E+, E-, A+ e A-",
    descricao:
      "O fator de escala é obtido dividindo a leitura bruta por um peso padrão conhecido. A dosagem usa vazão alta até 90 % do alvo e vazão fina no trecho final.",
    codigo: `#include <HX711.h>

#define PINO_DT 6
#define PINO_SCK 7
#define PINO_VALVULA_RAPIDA 8
#define PINO_VALVULA_FINA 9
#define FATOR_ESCALA 420.5
#define ALVO_GRAMAS 500.0

HX711 balanca;

void setup() {
  Serial.begin(9600);
  pinMode(PINO_VALVULA_RAPIDA, OUTPUT);
  pinMode(PINO_VALVULA_FINA, OUTPUT);

  balanca.begin(PINO_DT, PINO_SCK);
  balanca.set_scale(FATOR_ESCALA);
  balanca.tare(20);

  Serial.println("Balança tarada. Iniciando dosagem.");
}

void loop() {
  float peso = balanca.get_units(5);

  Serial.print("Peso: ");
  Serial.print(peso, 1);
  Serial.println(" g");

  if (peso < ALVO_GRAMAS * 0.9) {
    digitalWrite(PINO_VALVULA_RAPIDA, HIGH);
    digitalWrite(PINO_VALVULA_FINA, HIGH);
  } else if (peso < ALVO_GRAMAS) {
    digitalWrite(PINO_VALVULA_RAPIDA, LOW);
    digitalWrite(PINO_VALVULA_FINA, HIGH);
  } else {
    digitalWrite(PINO_VALVULA_RAPIDA, LOW);
    digitalWrite(PINO_VALVULA_FINA, LOW);
    Serial.println("Dosagem concluída");
    delay(5000);
    balanca.tare(20);
  }

  delay(100);
}`
  },
  {
    id: "ex-mfrc522",
    sensor: "MFRC522",
    titulo: "Liberação de máquina por credencial RFID",
    sinal: "Digital SPI",
    biblioteca: "MFRC522 (miguelbalboa)",
    ligacao: "SDA em D10, SCK em D13, MOSI em D11, MISO em D12, RST em D9, VCC em 3,3V",
    descricao:
      "Os pinos de sinal do MFRC522 não toleram 5 V. O UID lido e comparado com a lista de operadores autorizados antes de energizar o relé de habilitação da máquina.",
    codigo: `#include <SPI.h>
#include <MFRC522.h>

#define PINO_SS 10
#define PINO_RST 9
#define PINO_RELE 5

MFRC522 leitor(PINO_SS, PINO_RST);

String autorizados[] = {"A3B41F27", "7C2E9D04", "1F8B60AA"};
const int TOTAL_AUTORIZADOS = 3;

String lerUid() {
  String uid = "";
  for (byte i = 0; i < leitor.uid.size; i++) {
    if (leitor.uid.uidByte[i] < 0x10) {
      uid += "0";
    }
    uid += String(leitor.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

void setup() {
  Serial.begin(9600);
  SPI.begin();
  leitor.PCD_Init();
  pinMode(PINO_RELE, OUTPUT);
  Serial.println("Aproxime o crachá do leitor");
}

void loop() {
  if (!leitor.PICC_IsNewCardPresent() || !leitor.PICC_ReadCardSerial()) {
    return;
  }

  String uid = lerUid();
  Serial.print("UID lido: ");
  Serial.println(uid);

  bool liberado = false;
  for (int i = 0; i < TOTAL_AUTORIZADOS; i++) {
    if (autorizados[i] == uid) {
      liberado = true;
    }
  }

  if (liberado) {
    digitalWrite(PINO_RELE, HIGH);
    Serial.println("Acesso liberado - máquina habilitada");
    delay(5000);
    digitalWrite(PINO_RELE, LOW);
  } else {
    Serial.println("Acesso negado - operador não treinado");
  }

  leitor.PICC_HaltA();
}`
  },
  {
    id: "ex-ky040",
    sensor: "Encoder KY-040",
    titulo: "Ajuste de setpoint com leitura em quadratura",
    sinal: "Digital em quadratura A/B",
    biblioteca: "Nenhuma",
    ligacao: "CLK em D2, DT em D3, SW em D4, VCC em 5V",
    descricao:
      "O sentido de giro e determinado comparando o estado do canal B no instante da borda do canal A. O botão integrado confirma o valor e o grava na EEPROM.",
    codigo: `#include <EEPROM.h>

#define PINO_CLK 2
#define PINO_DT 3
#define PINO_SW 4

volatile int setpoint = 60;
volatile bool alterado = false;

void tratarGiro() {
  if (digitalRead(PINO_DT) != digitalRead(PINO_CLK)) {
    setpoint++;
  } else {
    setpoint--;
  }

  setpoint = constrain(setpoint, 0, 250);
  alterado = true;
}

void setup() {
  Serial.begin(9600);
  pinMode(PINO_CLK, INPUT_PULLUP);
  pinMode(PINO_DT, INPUT_PULLUP);
  pinMode(PINO_SW, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(PINO_CLK), tratarGiro, FALLING);
  setpoint = EEPROM.read(0);
}

void loop() {
  if (alterado) {
    Serial.print("Setpoint: ");
    Serial.print(setpoint);
    Serial.println(" C");
    alterado = false;
  }

  if (digitalRead(PINO_SW) == LOW) {
    EEPROM.update(0, setpoint);
    Serial.println("Setpoint gravado na EEPROM");
    delay(400);
  }
}`
  }
];
