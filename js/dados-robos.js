/* ==========================================================================
   dados-robos.js — base de dados das 7 topologias de robôs industriais
   Cada robô traz: nome, cinemática, graus de liberdade, conceito,
   funcionamento, características, aplicações, integração com IoT,
   3 modelos comerciais de fabricantes distintos, fontes, imagem e os
   valores da tabela comparativa. Usada por js/pagina-robos.js.
   ========================================================================== */

const ROBOS = [
  {
    id: "cartesiano",
    nome: "Robô Cartesiano (Gantry)",
    cinematica: "PPP - Prismática / Prismática / Prismática",
    gdl: "3 graus de liberdade lineares",
    conceito:
      "O robô cartesiano, frequentemente denominado Gantry quando suspenso sobre uma estrutura de pórtico, opera exclusivamente com juntas prismáticas. Seus três eixos principais de movimento coincidem com os eixos ortogonais coordenados X, Y e Z do espaço euclidiano, o que torna sua programação a mais intuitiva entre todas as topologias industriais.",
    funcionamento:
      "A transformação cinemática inversa deste sistema é trivial, apresentando desacoplamento completo entre os eixos, o que elimina singularidades matemáticas no espaço de trabalho: cada coordenada cartesiana desejada corresponde diretamente ao deslocamento de um único atuador. A rigidez estrutural é sua principal característica, permitindo a distribuição uniforme de momentos fletores e forças torcionais ao longo de vigas estruturais longitudinais. O volume de trabalho resultante é um prisma retangular, aproveitando de forma linear o espaço disponível sobre as linhas de produção.",
    caracteristicas: [
      "Volume de trabalho em formato de prisma retangular",
      "Ausência de singularidades cinemáticas",
      "Rigidez estrutural elevada, com capacidade de carga de até várias toneladas",
      "Repetibilidade típica de +/- 0,01 a 0,05 mm",
      "Velocidade nominal de 0,5 a 1,5 m/s",
      "Ocupação de área proporcional ao curso útil de cada eixo"
    ],
    aplicacoes: [
      "Armazenamento e paletização: movimentação de cargas pesadas em finais de linha logísticos",
      "Usinagem e corte CNC: operações de corte a laser, plasma ou jato d'água de grande formato",
      "Pick-and-place de grande escala: alimentação de prensas e linhas de montagem automotiva",
      "Impressão 3D industrial e deposição aditiva de grande volume"
    ],
    iot:
      "Servoacionamentos com realimentação de encoder absoluto publicam posição, torque e temperatura por EtherCAT ou Profinet. Esses dados alimentam algoritmos de manutenção preditiva que acompanham a degradação de fusos de esferas e guias lineares pela variação do torque necessário para vencer o atrito ao longo do curso. Sensores indutivos de fim de curso e sensores de vibração complementam o diagnóstico e alimentam o gêmeo digital da célula.",
    modelos: [
      {
        fabricante: "Festo",
        modelo: "Sistema Cartesiano Linear CMSH",
        nota: "Pórtico linear modular para manipulação leve, integrado a controladores CMMT e válvulas de vácuo."
      },
      {
        fabricante: "Bosch Rexroth",
        modelo: "Sistema Multi-eixo EasyHandling",
        nota: "Módulos lineares padronizados com dimensionamento assistido por software e integração direta com o controle IndraMotion."
      },
      {
        fabricante: "Gudel",
        modelo: "Robô Gantry Linear ZP-4",
        nota: "Pórtico de grande curso para cargas elevadas em interligação de máquinas-ferramenta e prensas."
      }
    ],
    fontes: [
      "IEEE Xplore: Analysis and Design of Industrial Gantry Robots for High-Load Applications, IEEE Transactions on Automation Science and Engineering",
      "Festo Technical Documentation: Linear and Cartesian Robot Systems - Design and Kinematics Manual",
      "ScienceDirect (Elsevier): Structural optimization of heavy-duty gantry robots, Journal of Materials Processing Technology"
    ],
    imagem: "img/robos/cartesiano.jpg",
    comparativo: {
      velocidade: "Baixa a Média (0,5 - 1,5 m/s)",
      carga: "Altíssima (100 - 5000+ kg)",
      precisao: "Alta (+/- 0,01 - 0,05 mm)",
      custo: "Baixo a Médio",
      complexidade: "Baixa"
    }
  },
  {
    id: "scara",
    nome: "Robô SCARA",
    cinematica: "RRP - Rotativa / Rotativa / Prismática",
    gdl: "4 graus de liberdade",
    conceito:
      "SCARA é a sigla de Selective Compliance Assembly Robot Arm. Apresenta uma configuração cinemática híbrida composta por duas juntas rotativas paralelas seguidas por uma junta prismática, fornecendo 4 graus de liberdade. Sua principal característica de projeto é a complacência seletiva: o braço é altamente flexível no plano horizontal X-Y, mas extremamente rígido no eixo vertical Z.",
    funcionamento:
      "Essa conformidade mecânica permite que o robô se ajuste microscopicamente a desalinhamentos concêntricos durante operações de inserção de pinos ou componentes, prevenindo o travamento mecânico das peças. O espaço de trabalho assume um formato de donut ou cilindro truncado. Devido a baixa inércia dos elos móveis, os SCARAs atingem acelerações elevadas no plano horizontal, sendo a topologia dominante em montagem eletrônica de alta cadência.",
    caracteristicas: [
      "Espaço de trabalho em formato de cilindro truncado (donut)",
      "Complacência seletiva: flexível em X-Y, rígido em Z",
      "Repetibilidade típica de +/- 0,005 a 0,02 mm",
      "Velocidade nominal de 3 a 10 m/s",
      "Carga útil típica de 1 a 50 kg",
      "Tempo de ciclo padrão de aproximadamente 0,3 s no teste 25-300-25 mm"
    ],
    aplicacoes: [
      "Montagem eletrônica (SMT): posicionamento ultrapreciso de semicondutores e placas de circuito impresso",
      "Inserção de componentes mecânicos: processos de parafusamento, aplicação de vedações e encaixes rápidos",
      "Linhas de embalagem secundária: triagem rápida e kitting na indústria farmacêutica e alimentícia",
      "Aplicação de adesivos e dosagem de fluidos em padrões planos"
    ],
    iot:
      "Controladores SCARA modernos expõem contadores de ciclo, corrente de cada eixo e temperatura dos servos via OPC UA, permitindo que o sistema MES correlacione desvios de tempo de ciclo com defeitos de montagem detectados na inspeção óptica automática. Sensores de força no eixo Z registram a curva força-deslocamento de cada inserção, criando um registro de qualidade rastreável por número de série do produto.",
    modelos: [
      {
        fabricante: "Epson Robots",
        modelo: "Série G3",
        nota: "SCARA compacto de alta precisão para montagem eletrônica, com repetibilidade de +/- 0,005 mm."
      },
      {
        fabricante: "Omron",
        modelo: "SCARA i4H",
        nota: "Integra controlador embarcado no próprio braço e diagnóstico preditivo de correias e reduções."
      },
      {
        fabricante: "FANUC",
        modelo: "Série SR-3iA",
        nota: "SCARA de 3 kg com controlador R-30iB Compact Plus e visão iRVision integrada."
      }
    ],
    fontes: [
      "ScienceDirect (Elsevier): Kinematics and dynamic modeling of SCARA robots for high-speed pick-and-place, Mechanism and Machine Theory",
      "Epson Technical Manual: SCARA Robots - Principles, Compliance and Calibration Guide",
      "Association for Advancing Automation (A3): The Role of SCARA Architecture in Modern Electronics Manufacturing"
    ],
    imagem: "img/robos/scara.jpg",
    comparativo: {
      velocidade: "Alta (3 - 10 m/s)",
      carga: "Baixa a Média (1 - 50 kg)",
      precisao: "Excelente (+/- 0,005 - 0,02 mm)",
      custo: "Médio",
      complexidade: "Média"
    }
  },
  {
    id: "articulado",
    nome: "Robô Articulado (Braço Antropomórfico)",
    cinematica: "RRRRRR - Seis juntas de revolução",
    gdl: "6 graus de liberdade",
    conceito:
      "Os robôs articulados representam a configuração mais versátil da automação industrial, estruturados tipicamente com 6 juntas de revolução. Sua arquitetura mimetiza a anatomia de um braço humano, segmentada em base (cintura), elo inferior (ombro), elo superior (cotovelo) e o punho esférico, formado por três eixos rotativos concorrentes para orientação espacial da ferramenta.",
    funcionamento:
      "A cinemática inversa envolve matrizes de transformação homogênea não lineares complexas, resolvidas por algoritmos numéricos ou pelo método geométrico de Pieper, aplicável quando os três últimos eixos se interceptam em um único ponto. Apresentam pontos de singularidade cinemática, configurações em que o determinante da matriz Jacobiana é nulo, resultando na perda de graus de liberdade locais e demandando velocidades angulares infinitas das juntas para manter trajetórias lineares. O planejamento de trajetória deve, portanto, evitar ou atravessar essas regiões com estratégias específicas.",
    caracteristicas: [
      "Espaço de trabalho aproximadamente esférico, com maior alcance relativo por área ocupada",
      "Seis eixos permitem alcançar qualquer posição e orientação dentro do envelope",
      "Repetibilidade típica de +/- 0,03 a 0,1 mm",
      "Velocidade nominal de 2 a 5 m/s",
      "Carga útil de 1 a 2300 kg conforme o porte",
      "Presença de singularidades de ombro, cotovelo e punho"
    ],
    aplicacoes: [
      "Soldagem automotiva: processos de soldagem a ponto (spot welding) e soldagem a arco MIG/MAG e TIG",
      "Pintura e revestimento: aplicação de tintas automotivas em superfícies tridimensionais complexas",
      "Manipulação de cargas e fundição: operações em ambientes severos e alimentação de fornos e forjaria",
      "Montagem final, rebarbação e manuseio de peças de grande porte"
    ],
    iot:
      "São os robôs com maior densidade de instrumentação IoT. Interfaces como a KUKA RSI e a FANUC FIELD system transmitem por Ethernet industrial o torque, a corrente e a posição de cada um dos seis eixos em ciclos de poucos milissegundos. Esses fluxos alimentam modelos de manutenção preditiva que detectam desgaste de reduções harmônicas e ciclodais pela evolução da assinatura de torque, além de alimentar gêmeos digitais usados para simulação offline de novas trajetórias sem parar a produção.",
    modelos: [
      {
        fabricante: "KUKA",
        modelo: "Braço Industrial KR QUANTEC",
        nota: "Família de 90 a 300 kg de carga para soldagem e manuseio pesado na indústria automotiva."
      },
      {
        fabricante: "ABB",
        modelo: "Robô Industrial IRB 6700",
        nota: "Plataforma de 150 a 300 kg com diagnóstico integrado ABB Ability Connected Services."
      },
      {
        fabricante: "Yaskawa Motoman",
        modelo: "Robô de Alta Velocidade GP25",
        nota: "Manipulador de 25 kg com controlador YRC1000 voltado a manuseio e montagem de alta cadência."
      }
    ],
    fontes: [
      "International Federation of Robotics (IFR): World Robotics Report - Industrial Robots Section",
      "IEEE Robotics and Automation Society: Singularity avoidance algorithms for 6-DoF anthropomorphic manipulators, IEEE Transactions on Robotics",
      "KUKA Robot Sensor Interface (RSI): Technical Reference Manual for Advanced Motion Control"
    ],
    imagem: "img/robos/articulado.jpg",
    comparativo: {
      velocidade: "Média a Alta (2 - 5 m/s)",
      carga: "Muito Baixa a Altíssima (1 - 2300 kg)",
      precisao: "Boa a Excelente (+/- 0,03 - 0,1 mm)",
      custo: "Alto a Altíssimo",
      complexidade: "Alta"
    }
  },
  {
    id: "cilindrico",
    nome: "Robô Cilíndrico",
    cinematica: "RPP - Rotativa / Prismática / Prismática",
    gdl: "3 graus de liberdade principais",
    conceito:
      "A topologia do robô cilíndrico é definida por uma junta rotativa na base seguida por duas juntas prismáticas lineares. O movimento angular da base determina a orientação azimutal, enquanto as juntas prismáticas controlam a altura vertical e a extensão radial da ferramenta.",
    funcionamento:
      "O envelope de trabalho gerado mapeia perfeitamente um cilindro geométrico oco. Sob a ótica do controle, a cinemática desse manipulador é direta e simplificada, uma vez que as coordenadas da junta relacionam-se de forma direta com o sistema de coordenadas cilíndricas theta, z e r. Sua rigidez estrutural ao longo do eixo vertical é elevada, embora a extensão máxima do braço linear radial introduza momentos defletores significativos na base pivotante, o que limita a carga útil em grandes alcances.",
    caracteristicas: [
      "Envelope de trabalho em formato de cilindro oco",
      "Cinemática direta é de fácil parametrização",
      "Boa rigidez vertical, com deflexão crescente na extensão radial",
      "Repetibilidade típica de +/- 0,05 a 0,1 mm",
      "Velocidade nominal de 1 a 2 m/s",
      "Carga útil típica de 5 a 100 kg"
    ],
    aplicacoes: [
      "Manipulação de wafer de semicondutores: transporte interno de discos de silício em salas limpas",
      "Alimentação de máquinas-ferramenta: carga e descarga concêntrica de tornos e fresadoras",
      "Rebarbação e polimento: operações de acabamento em componentes tubulares ou concêntricos",
      "Montagem em torno de um eixo central com posicionamento angular repetitivo"
    ],
    iot:
      "Em ambientes de sala limpa, os robôs cilíndricos operam com monitoramento contínuo de particulado e de posição. Controladores de manipuladores de wafer publicam por SECS/GEM e OPC UA o número de ciclos, a temperatura dos acionamentos e o desalinhamento detectado pelos sensores ópticos de centralização, permitindo que o sistema de execução da fábrica bloqueie o equipamento antes que uma lâmina de silício seja danificada.",
    modelos: [
      {
        fabricante: "Brooks Automation",
        modelo: "Manipulador de Wafers Vacuofílico MagnaTran 8",
        nota: "Robô de transferência para ambientes de vácuo em linhas de fabricação de semicondutores."
      },
      {
        fabricante: "Rorze Corporation",
        modelo: "Robô de Atmosfera de Alta Precisão RR701",
        nota: "Manipulador atmosférico de dupla lâmina para carregamento de wafers em salas limpas classe 1."
      },
      {
        fabricante: "Hirata",
        modelo: "Série Cilíndrica AR-C",
        nota: "Robô cilíndrico compacto para alimentação de máquinas e montagem em células concêntricas."
      }
    ],
    fontes: [
      "IEEE Xplore: Precision control of cylindrical coordinate robots for semiconductor manufacturing, IEEE Transactions on Semiconductor Manufacturing",
      "ScienceDirect (Elsevier): Kinematic optimization of cylindrical manipulators in cleanroom operations, Robotics and Computer-Integrated Manufacturing",
      "Brooks Automation: MagnaTran Atmospheric and Vacuum Robot Systems Technical Specifications"
    ],
    imagem: "img/robos/cilindrico.svg",
    comparativo: {
      velocidade: "Baixa a Média (1 - 2 m/s)",
      carga: "Média (5 - 100 kg)",
      precisao: "Regular (+/- 0,05 - 0,1 mm)",
      custo: "Médio",
      complexidade: "Média"
    }
  },
  {
    id: "delta",
    nome: "Robô Delta (Cinemática Paralela)",
    cinematica: "PKM - Parallel Kinematic Machine",
    gdl: "3 graus de liberdade translacionais (4 com eixo de rotação adicional)",
    conceito:
      "O robô Delta adota o conceito de Mecanismo Cinemático Paralelo. Ao contrário das cadeias cinemáticas seriais, onde o erro posicional acumula-se a cada elo, a estrutura Delta conecta o efetuador final a base superior por meio de três ou quatro cadeias cinemáticas paralelas formadas por paralelogramos articulados.",
    funcionamento:
      "Os atuadores servomotores permanecem fixos na base estacionária superior, transmitindo movimento por braços de fibra de carbono de baixíssima massa. Como resultado, o efetuador final mantém uma orientação puramente translacional estrita, permanecendo sempre paralelo a base, em três graus de liberdade puros X, Y e Z. A baixa inércia do conjunto móvel confere taxas de aceleração extremas, frequentemente superando 10 G (aproximadamente 98 m/s2), com frequências de ciclo superiores a 150 picapes por minuto.",
    caracteristicas: [
      "Espaço de trabalho em formato de domo achatado",
      "Acelerações superiores a 10 G e velocidades acima de 10 m/s",
      "Efetuador sempre paralelo a base, sem acumulo de erro entre elos",
      "Repetibilidade típica de +/- 0,005 a 0,01 mm",
      "Carga útil reduzida, de 0,5 a 15 kg",
      "Calibração dinâmica complexa e volume útil limitado em altura"
    ],
    aplicacoes: [
      "Triagem ultrarrápida de alimentos: seleção, orientação e empacotamento primário de produtos",
      "Indústria farmacêutica: alimentação de blisters de medicamentos em alta velocidade",
      "Montagem de microcomponentes: separação mecânica (sorting) de componentes eletrônicos",
      "Linhas de embalagem primária com rastreamento de esteira em movimento (conveyor tracking)"
    ],
    iot:
      "O Delta é o robô que mais depende de integração com visão artificial e sensoriamento em tempo real. Cameras de linha sincronizadas por encoder de esteira enviam as coordenadas de cada produto ao controlador, que distribui as peças entre vários robôs em cascata. Os controladores publicam por Ethernet industrial a taxa de picape efetiva, a taxa de falha de pega e o desvio de sincronismo, dados que alimentam painéis OEE em tempo real e ajustam automaticamente a velocidade da esteira.",
    modelos: [
      {
        fabricante: "ABB",
        modelo: "Série IRB 360 FlexPicker",
        nota: "Referência de mercado em picape de alta velocidade, com versões de 1 a 8 kg e opção de lavagem intensiva."
      },
      {
        fabricante: "FANUC",
        modelo: "Robô Delta de Alta Velocidade M-3iA",
        nota: "Disponível em versões de 3, 4 e 6 eixos, com visão iRVision e rastreamento de esteira integrados."
      },
      {
        fabricante: "Codian Robotics",
        modelo: "Robô Delta de Estrutura Aberta D4-1300",
        nota: "Construção higiênica em aço inoxidável para contato direto com alimentos e limpeza CIP."
      }
    ],
    fontes: [
      "IEEE Xplore: Kinematics, Singularity, and Stiffness Analysis of Delta-Type Parallel Robots, IEEE Robotics & Automation Magazine",
      "ScienceDirect (Elsevier): Dynamic modeling and high-speed tracking control of parallel delta robots, Control Engineering Practice",
      "ABB Product Specification: IRB 360 FlexPicker Parallel Kinematics Industrial Robot Manual"
    ],
    imagem: "img/robos/delta.jpg",
    comparativo: {
      velocidade: "Extrema (10+ m/s)",
      carga: "Muito Baixa (0,5 - 15 kg)",
      precisao: "Altíssima (+/- 0,005 - 0,01 mm)",
      custo: "Médio a Alto",
      complexidade: "Alta (calibração dinâmica complexa)"
    }
  },
  {
    id: "polar",
    nome: "Robô Polar (Esférico)",
    cinematica: "RRP - Rotativa / Rotativa / Prismática",
    gdl: "3 graus de liberdade principais",
    conceito:
      "Os robôs polares representam uma das primeiras topologias industriais maduras, caracterizados por uma configuração de duas juntas rotativas e uma junta prismática. Os movimentos baseiam-se em coordenadas esféricas: rotação em torno do eixo central da base, elevação angular do braço pivotante e extensão telescópica do elo linear final.",
    funcionamento:
      "O volume de trabalho gerado assemelha-se a uma esfera truncada. A mecânica desse sistema apresenta desafios associados a variação drástica do momento de inércia a medida que a junta linear se estende, exigindo algoritmos de controle dinâmico compensatórios para ajustar os ganhos dos servomotores em tempo real de acordo com o deslocamento radial. Foi a topologia do Unimate, instalado em 1961 na General Motors, marco inicial da robótica industrial.",
    caracteristicas: [
      "Volume de trabalho em formato de esfera truncada",
      "Grande alcance radial com base compacta",
      "Momento de inércia variável conforme a extensão do braço telescópico",
      "Repetibilidade típica de +/- 0,1 a 0,5 mm",
      "Velocidade nominal de 0,5 a 1 m/s",
      "Carga útil elevada, de 100 a 1000 kg em modelos de fundição"
    ],
    aplicacoes: [
      "Processos de fundição e forjaria pesada: remoção de peças incandescentes de moldes de injeção metálica",
      "Alimentação de prensas estampadoras: movimentação linear telescópica dentro da prensa de estampagem",
      "Aplicações históricas e manutenção industrial em retrofit: operações robustas onde o alcance telescópico direto sobrepõe-se a necessidade de orientação angular complexa",
      "Manipulação em ambientes de temperatura elevada com proteção térmica do braço"
    ],
    iot:
      "Instalações remanescentes recebem tipicamente projetos de retrofit: os controladores originais são substituídos ou complementados por CLPs modernos e gateways que traduzem sinais discretos para Modbus TCP ou OPC UA. Sensores de temperatura e de vibração adicionados a base e ao braço telescópico permitem monitorar o desgaste das guias lineares, historicamente o ponto crítico dessa topologia em ambientes de fundição.",
    modelos: [
      {
        fabricante: "Unimation (histórico/legacy)",
        modelo: "Unimate 2000 Séries",
        nota: "Marco histórico da robótica industrial, mantido em operação para restauração e aplicações específicas."
      },
      {
        fabricante: "Prab Robots",
        modelo: "Série Prab Heavy Duty Foundry",
        nota: "Manipuladores polares especializados em fundição sob configuração polar com proteção térmica."
      },
      {
        fabricante: "Reis Robotics (KUKA)",
        modelo: "Série V15 customizada",
        nota: "Modelos estruturados em coordenadas esféricas para manipulação em prensas e fundição."
      }
    ],
    fontes: [
      "Association for Advancing Automation (A3): The Gênesis of Automation - Historical Perspectives and Kinematic Legacy of Spherical Manipulators",
      "ScienceDirect (Elsevier): Dynamic load analysis of telescoping links in spherical industrial robots, Mechanism and Machine Theory",
      "IEEE Xplore: Unimate - The first industrial robot and its polar coordinate control paradigm, IEEE Control Systems Magazine"
    ],
    imagem: "img/robos/polar.jpg",
    comparativo: {
      velocidade: "Baixa (0,5 - 1 m/s)",
      carga: "Altíssima (100 - 1000 kg)",
      precisao: "Baixa a Regular (+/- 0,1 - 0,5 mm)",
      custo: "Alto (customizado)",
      complexidade: "Alta (controle dinâmico não linear)"
    }
  },
  {
    id: "cobot",
    nome: "Robô Colaborativo (Cobot)",
    cinematica: "Articulada serial redundante",
    gdl: "6 ou 7 graus de liberdade",
    conceito:
      "Os robôs colaborativos representam uma mudança paradigmática na automação. Diferente dos robôs industriais tradicionais, projetados para operar isolados por barreiras físicas devido ao alto risco de acidentes letais, os cobots foram projetados para compartilhar o espaço de trabalho diretamente com operadores humanos, interagindo sem cercas de proteção.",
    funcionamento:
      "Cinematicamente, a arquitetura predominante é a articulada serial de 6 ou 7 graus de liberdade. A introdução do sétimo eixo, uma junta redundante, permite ao braço alterar sua configuração interna (orientação do cotovelo) sem modificar a posição e a orientação do efetuador final, facilitando o desvio dinâmico de obstáculos humanos em tempo real. A filosofia de projeto foca na minimização da energia cinética de impacto e na eliminação de pontos de esmagamento: carcaças com geometrias convexas arredondadas, motores de baixa inércia acoplados a redutores harmônicos e fiação totalmente interna para prevenir o engate de membros do operador.",
    caracteristicas: [
      "Geometria convexa que minimiza pontos de cisalhamento",
      "Massa reduzida, que diminui a energia cinética residual em caso de impacto",
      "Sensores de torque em cada junta para interrupção imediata por contato",
      "Repetibilidade típica de +/- 0,02 a 0,05 mm",
      "Velocidade limitada por segurança, até 1 m/s em modo PFL",
      "Carga útil de 3 a 30 kg e instalação plug-and-play"
    ],
    aplicacoes: [
      "Alimentação de máquinas CNC e injetoras em células compartilhadas com operadores",
      "Montagem assistida, parafusamento e aplicação de adesivo em bancadas mistas",
      "Inspeção de qualidade e teste funcional com visão artificial",
      "Paletização de baixo volume e alto mix de produtos (HMLV)"
    ],
    iot:
      "O cobot é a interface física mais direta entre a Indústria 4.0 e a Indústria 5.0. Plataformas como UR+ e FANUC FIELD expõem dados de torque de junta, contagem de ciclos e eventos de parada de segurança por MQTT e OPC UA. A programação por Direct Teaching (guiamento manual) e a montagem sobre bases móveis com engates rápidos permitem que o mesmo robô seja realocado entre postos ao longo da semana, com o programa correspondente carregado automaticamente pelo sistema MES a partir da leitura de uma etiqueta RFID no posto de trabalho.",
    seguranca: {
      titulo: "Normas de segurança aplicáveis",
      texto:
        "A conformidade regulatória exige a transição da segurança focada na exclusão física para a segurança focada no controle de força e energia. As normas ISO 10218-1 e ISO 10218-2 definem os requisitos essenciais para o fabricante do robô e para o integrador da célula, estabelecendo quatro modos formais de operação colaborativa. A especificação técnica ISO/TS 15066 é o documento central para a implementação de sistemas de limitação de força e potência, definindo limiares biomecânicos de dor e lesão para 29 regiões corporais distintas.",
      modos: [
        {
          nome: "Parada Monitorada Autônoma (Monitored Safe Stop)",
          desc: "O robô cessa o movimento assim que um operador entra no espaço colaborativo. O movimento e retomado automaticamente, sem intervenção adicional, quando o operador sai."
        },
        {
          nome: "Guia Manual (Hand Guiding)",
          desc: "O operador controla a trajetória e a velocidade do robô diretamente por meio de uma interface física presa a ponta do braço, atuando em modo de força zero."
        },
        {
          nome: "Monitoramento de Velocidade e Separação",
          desc: "Utiliza scanners a laser e cameras 3D para criar zonas dinâmicas de segurança. A velocidade decresce linearmente conforme a distância do operador diminui, atingindo parada completa antes do contato físico."
        },
        {
          nome: "Limitação de Força e Potência (PFL)",
          desc: "O robô pode entrar em contato físico direto com o ser humano. Sensores internos limitam as forças estáticas e dinâmicas do impacto a níveis predeterminados pela análise de risco."
        }
      ],
      limites:
        "A ISO/TS 15066 divide as colisões em contatos transitórios (impactos dinâmicos rápidos, onde o membro humano pode recuar livremente) e contatos quase-estáticos (compressão prolongada contra uma superfície fixa). A norma dita os limites máximos de pressão em N/cm2 e de força em N: por exemplo, a força máxima quase-estática permitida no peito é de 140 N, enquanto na região do crânio o limite cai drasticamente, exigindo que o projeto evite qualquer colisão nesta área por meio de restrições geométricas de trajetória."
    },
    sensoriamento: [
      {
        nome: "Sensores de torque baseados em strain gauges",
        desc: "Extensômetros em cada junta rotativa medem a microdeformação da estrutura interna. A leitura contínua permite computar o vetor de força externa pelo Jacobiano transposto (tau_ext = J^T(q) . F_ext). Se as forças medidas divergirem do modelo dinâmico computado em tempo real, o sistema interpreta a divergência como impacto humano e executa parada de categoria 0 ou 1 conforme a IEC 60204-1, em milissegundos."
      },
      {
        nome: "Sensoriamento por corrente do servomotor",
        desc: "Sistemas com restrição de custo eliminam os sensores de torque dedicados e baseiam a segurança no monitoramento da corrente elétrica dos servomotores, usando a relação direta tau_m = Kt . I. Apresenta menor sensibilidade e maior tempo de resposta devido a perdas por atrito nos redutores e a ruído elétrico."
      },
      {
        nome: "Sensores de superfície capacitivos (pele robótica)",
        desc: "Matrizes de sensores capacitivos e indutivos ao longo do revestimento externo do braço, conhecidas comercialmente como AirSkin, criam um campo elétrico de proximidade. Ao detectar a aproximação de tecido biológico humano, que altera a permissividade dielétrica local, o robô desacelera preemptivamente, eliminando colisões dinâmicas de alta energia."
      }
    ],
    roi:
      "O modelo econômico do cobot difere da automação rígida: o custo de aquisição do hardware é médio, mas a infraestrutura de segurança é praticamente nula por dispensar cercas, clausuras e relés dedicados. A engenharia de integração é baixa graças ao conceito plug-and-play, e a remodelação de layout fabril é mínima devido a pegada compacta e portátil. A eliminação de periféricos de segurança reduz o custo total de propriedade e antecipa o ponto de equilíbrio financeiro: o retorno sobre o investimento é frequentemente atingido entre 6 e 12 meses, contra 24 a 36 meses observados em sistemas tradicionais enclausurados.",
    modelos: [
      {
        fabricante: "Universal Robots",
        modelo: "UR10e (e-Séries)",
        nota: "Líder pioneiro global, com sensor de força-torque integrado no punho e ecossistema de acessórios UR+."
      },
      {
        fabricante: "FANUC",
        modelo: "Robô Colaborativo CRX-10iA",
        nota: "Revestimento macio, programação por arrastar e soltar em tablet e manutenção declarada de 8 anos sem lubrificação."
      },
      {
        fabricante: "ABB",
        modelo: "GoFa CRB 15000",
        nota: "Sensores de torque nas seis juntas e velocidade de até 2,2 m/s, com carga útil de 5 kg."
      }
    ],
    fontes: [
      "International Federation of Robotics (IFR): Collaborative Robots Market Trends and Penetration Statistics Annual Report",
      "ISO/TS 15066:2016: Robots and robotic devices - Collaborative robots (especificação técnica internacional oficial)",
      "IEEE Xplore: Human-Robot Collaboration in Industry - Safety, Control and Design Methodologies, IEEE Robotics & Automation Magazine"
    ],
    imagem: "img/robos/cobot.jpg",
    comparativo: {
      velocidade: "Limitada por segurança (até 1 m/s em PFL)",
      carga: "Baixa a Média (3 - 30 kg)",
      precisao: "Alta (+/- 0,02 - 0,05 mm)",
      custo: "Médio (excelente custo-benefício de célula)",
      complexidade: "Muito Baixa (foco em plug-and-play)"
    }
  }
];
