// ---------- PROJETO: ALIGN U ---------------  ORIENTADOR: ALAN LIMA ---------------- EQUIPE: 3018BST  ----------
// ---------- INTEGRANTES: MARIA CLARA (31 TE), MARINA (32 BI), PEDRO NOGUEIRA (34 DS) E RAÍSSA (31 TE) ----------

// MONITORAMENTO: Monitora a variação da coluna ao longo do dia e alerta a pessoa caso esteja em uma má postura.
// MEDIÇÃO SEMANAL: Faz a medição comparando postura reta e repouso e envia para Ubidots.

/* ORDEM VOID:
    configModeCallback()
    SETUP()
    LOOP()
    sensor1()
    sensor2()
    le_posturaReta()  
    le_posturaRepouso()
    medicao_coluna()   
*/

#include<Wire.h>
#define AR 16384.0
#define GR 131.0
#define RAD_A_DEG 57.295779

#define botao1 D1
#define botao2 D2
#define vibracall D3

#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include "Ubidots.h"

//Endereço em hexadecimal do sensor MPU 6050
const int ENDERECO_SENSOR1=0x68;  
const int ENDERECO_SENSOR2=0x69;

const char* UBIDOTS_TOKEN = "BBFF-5zcBruZbdvVyGO4YswaqzubqY8QbC1";  // Put here your Ubidots TOKEN
Ubidots ubidots(UBIDOTS_TOKEN);

int girX1, girY1, girZ1, acelX1, acelY1, acelZ1;
int girX2, girY2, girZ2, acelX2, acelY2, acelZ2;

float Acc1_reto[2];
float Acc1_repouso[2];
float Gy1[2];

float Acc2_reto[2];
float Acc2_repouso[2];
float Gy2[2];

float ang1_reto[2];
float ang1_repouso[2];

float ang2_reto[2];
float ang2_repouso[2];

float aux=0;
float aux2=0;

float diferencapX1 = 0; // diferença monitoramento
float diferencapX2 = 0; // diferença monitoramento
float diferencapY1 = 0; // diferença monitoramento
float diferencapY2 = 0; // diferença monitoramento

float diferencaX1 = 0;  // diferença medição semanal
float diferencaY1 = 0;  // diferença medição semanal
float diferencaX2 = 0;  // diferença medição semanal
float diferencaY2 = 0;  // diferença medição semanal

float mediaX = 0;       // média medição semanal
float mediaY = 0;       // média medição semanal

unsigned long cont_tempoInicial = millis();
unsigned long cont_tempoPostura = millis();

int cont_padrao = 0;    // identifica que o botão de monitoramento foi acionado
int cont_postura = 0;   // identifica que a pessoa está em uma má postura por mais de 10 seg 
int cont_tempo;         // 


void configModeCallback (WiFiManager *myWiFiManager) {
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());
  //if you used auto generated SSID, print it
  Serial.println(myWiFiManager->getConfigPortalSSID());
}

///////////////////////////////////////////////////////////////////////// VOID SETUP /////////////////////////////////////////////////////////////////////////

void setup() {
  pinMode(D1,INPUT);
  pinMode(D2,INPUT);
  pinMode(D3,OUTPUT); // Pino para acionar Vibracall

  Serial.begin(115200);
  WiFiManager wifiManager;
  //set callback that gets called when connecting to previous WiFi fails, and enters Access Point mode
  wifiManager.setAPCallback(configModeCallback);
  //fetches ssid and pass and tries to connect
      if(!wifiManager.autoConnect()) {
        Serial.println("failed to connect and hit timeout");
        //reset and try again, or maybe put it to deep sleep
        ESP.restart();
        delay(1000);  
        const char *WIFI = WiFi.SSID().c_str(); // Converte string para char* para não haver probvlema de leitura
        const char *SENHA =WiFi.psk().c_str();  // Converte string parar char* para não haver probvlema de leitura
        ubidots.wifiConnect(WIFI, SENHA);           
    }

  //Inicializa a biblioteca Wire
  Wire.begin(D6,D5);
  Wire.beginTransmission(ENDERECO_SENSOR1);
  Wire.write(0x6B); 
   
  //Inicializa o sensor
  Wire.write(0); 
  Wire.endTransmission(true);
  Wire.beginTransmission(ENDERECO_SENSOR2);
  Wire.write(0x6B); 
   
  //Inicializa o sensor
  Wire.write(0); 
  Wire.endTransmission(true);

  //attachInterrupt(digitalPinToInterrupt(D2), medicao, RISING);
}

///////////////////////////////////////////////////////////////////////// VOID LOOP /////////////////////////////////////////////////////////////////////////

void loop() {

  // ------------------------------------------------------------ LEITURA DA POSTURA PADRÃO  ------------------------------------------------------------
  if(digitalRead(botao1)==HIGH) {
    cont_padrao=1;
       
    delay(1000);

    Serial.println("  ");
    Serial.println("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    Serial.println("  ");
    Serial.println("Fique com a postura reta para a medição padrão");
    Serial.println("  ");

    delay(500);

    digitalWrite(vibracall, HIGH);
    delay(200);
    digitalWrite(vibracall, LOW);
    delay(1000); 
    
    le_posturaReta();

    delay(500);

    digitalWrite(vibracall, HIGH);
    delay(200);
    digitalWrite(vibracall, LOW);
    delay(200);
    digitalWrite(vibracall, HIGH);
    delay(200);
    digitalWrite(vibracall, LOW);

    Serial.println("SENSOR 1 PADRAO                              SENSOR2 PADRAO");
    Serial.print("X de ang1_padrao: ");     Serial.print(ang1_reto[0]);
    Serial.print("                        X de ang2_padrao: ");       Serial.println(ang2_reto[0]);
    Serial.print("Y de ang1_padrao: ");     Serial.print(ang1_reto[1]);
    Serial.print("                        Y de ang2_padrao: ");       Serial.println(ang2_reto[1]);
  
    Serial.println("  ");
    Serial.println("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    
    delay(3000);  // DELAY REDUZIDO
  }

  // ----------------------------------------------------------- DIFERENÇA PADRÃO E REPOUSO  ------------------------------------------------------------
  if(cont_padrao>0) {
    Serial.println("Calculando a diferenca...");
    Serial.println("   ");
    
    delay(100);  // DELAY REDUZIDO
    
    diferencapX1 = ang1_reto[0]-ang1_repouso[0]; // diferença sensor 1 de X padrão e repouso
    diferencapY1 = ang1_reto[1]-ang1_repouso[1]; // diferença sensor 1 de Y padrão e repouso
    
    diferencapX2 = ang2_reto[0]-ang2_repouso[0]; // diferença sensor 2 de X padrão e repouso
    diferencapY2 = ang2_reto[1]-ang2_repouso[1]; // diferença sensor 2 de Y padrão e repouso
  
    Serial.println("SENSOR 1                                     SENSOR 2");
    Serial.print("diferencapX1: ");    Serial.print(diferencapX1);
    Serial.print("                           diferencapX2: ");    Serial.println(diferencapX2);
    Serial.print("diferencapY1: ");    Serial.print(diferencapY1);
    Serial.print("                           diferencapY2: ");    Serial.println(diferencapY2);
  
    Serial.println("   ");
    Serial.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    delay(500);  // DELAY REDUZIDO
  }
    
  // ------------------------------------------------------------ LEITURA DA POSTURA REPOUSO  ------------------------------------------------------------
  le_posturaRepouso();
  Serial.println("SENSOR 1 REPOUSO                             SENSOR 2 REPOUSO");
  Serial.print("X de ang1_repouso: ");        Serial.print(ang1_repouso[0]);
  Serial.print("                     X de ang2_repouso: ");            Serial.println(ang2_repouso[0]);
  Serial.print("Y de ang1_repouso: ");        Serial.print(ang1_repouso[1]);
  Serial.print("                     Y de ang2_repouso: ");            Serial.println(ang2_repouso[1]);
  Serial.println("  ");
  
  delay(500);  // DELAY NÃO REDUZIDO
    
  // -------------------------------------------------------------- FAZ A MEDIÇÃO SEMANAL  --------------------------------------------------------------- 
  if(digitalRead(botao2)==HIGH){  // SUBSTITUIR POR INTERRUPÇÃO EXTERNA
    medicao_coluna();
    }

  // -----------------------------------------------------------------------------------------------------------------------------------------------------
    
      if(diferencapX1<-10||diferencapX1>10 || diferencapY1<-10||diferencapY1>10 || diferencapX2<-10||diferencapX2>10 || diferencapY2<-10||diferencapY2>10)
         { // se a variação é maior que 10
            if(cont_postura==0)
            {
              //primeira vez
              cont_tempoInicial = millis();
            }
          
        cont_postura=1;   // soma 1
        cont_tempoPostura = millis();
         
        if((cont_tempoPostura - cont_tempoInicial) > 10000)
        {
            cont_tempo=1; 
        }
        else 
        {
          cont_tempo=0; 
        }
        Serial.print("Tempo: ");
        Serial.print(cont_tempo);
     }

  if(cont_padrao>0) {
     if(cont_tempo==1) {       
      delay(2000);
      digitalWrite(vibracall, HIGH);
      delay(2000);
      digitalWrite(vibracall, LOW);
      Serial.println("  ");
      Serial.print("                           Resultado: Postura incorreta");
      Serial.println("  ");
      delay(500);
      cont_postura=0;
      cont_tempo=0;
    }
    else{
      digitalWrite(vibracall, LOW);
      Serial.println("  ");
      Serial.println("                               Sem mudanças");
      Serial.println("  ");
      //cont_postura=0;
      //cont_tempo=0;
      }
  }

    Serial.println("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  
    delay(20);  // DELAY REDUZIDO
}

///////////////////////////////////////////////////////////////////////// VOID SENSOR 1 /////////////////////////////////////////////////////////////////////////

void sensor1(){
  //Começa uma transmissão com o sensor
  Wire.beginTransmission(ENDERECO_SENSOR1);

  //Enfilera os bytes a ser transmitidos para o sensor
  //Começando com o registor 0x3B
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)

  //Finaliza e transmite os dados para o sensor. O false fará com que seja enviado uma mensagem 
  //de restart e o barramento não será liberado
  Wire.endTransmission(false);
  
  //Solicita os dados do sensor, solicitando 14 bytes, o true fará com que o barramento seja liberado após a solicitação 
  //(o valor padrão deste parâmetro é true)
  Wire.requestFrom(ENDERECO_SENSOR1, 14, true);  
  
  //Armazena o valor dos sensores nas variaveis correspondentes
  acelX1 = Wire.read()<<8|Wire.read();  //0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)  
  acelY1 = Wire.read()<<8|Wire.read();  //0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)  
  acelZ1 = Wire.read()<<8|Wire.read();  //0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)  
 
  girX1 = Wire.read()<<8|Wire.read();  //0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)     
  girY1 = Wire.read()<<8|Wire.read();  //0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  girZ1 = Wire.read()<<8|Wire.read();  //0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)

  // Calculamos os ângulos Y, X respectivamente.
  aux = pow((acelY1/AR),2)+pow((acelZ1/AR),2);
  aux=sqrt(aux);
  aux2 = acelX1/AR;
  }

///////////////////////////////////////////////////////////////////////// VOID SENSOR 2 /////////////////////////////////////////////////////////////////////////
    
void sensor2(){
  //Começa uma transmissão com o sensor
  Wire.beginTransmission(ENDERECO_SENSOR2);

  //Enfilera os bytes a ser transmitidos para o sensor
  //Começando com o registor 0x3B
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)

  //Finaliza e transmite os dados para o sensor. O false fará com que seja enviado uma mensagem 
  //de restart e o barramento não será liberado
  Wire.endTransmission(false);
  
  //Solicita os dados do sensor, solicitando 14 bytes, o true fará com que o barramento seja liberado após a solicitação 
  //(o valor padrão deste parâmetro é true)
  Wire.requestFrom(ENDERECO_SENSOR2, 14, true);  
  
  //Armazena o valor dos sensores nas variaveis correspondentes
  acelX2 = Wire.read()<<8|Wire.read();  //0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)  
  acelY2 = Wire.read()<<8|Wire.read();  //0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)  
  acelZ2 = Wire.read()<<8|Wire.read();  //0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)  
 
  girX2 = Wire.read()<<8|Wire.read();  //0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)     
  girY2 = Wire.read()<<8|Wire.read();  //0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  girZ2 = Wire.read()<<8|Wire.read();  //0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)

  // Calculamos os ângulos Y, X respectivamente.
  aux = pow((acelY2/AR),2)+pow((acelZ2/AR),2);
  aux=sqrt(aux);
  aux2 = acelX2/AR;
  }

//////////////////////////////////////////////////////////////////// VOID LE POSTURA RETA ///////////////////////////////////////////////////////////////////////

void le_posturaReta() {
 // ---------------------------------------------- LEITURA DO MPU 1 POSTURA RETA ----------------------------------------------
  sensor1();
  
  // Calculamos os ângulos Y, X respectivamente.
  Acc1_reto[1] = atan(-1*aux2/aux)*RAD_TO_DEG;
  aux = pow((acelX1/AR),2)+pow((acelZ1/AR),2);
  aux=sqrt(aux);
  aux2 = acelY1/AR;
  Acc1_reto[0] = atan(aux2/aux)*RAD_TO_DEG;
  // Calculamos o ângulo do giroscópio 
  Gy1[0] = girX1/GR;  
  Gy1[1] = girY1/GR;

  ang1_reto[0] = Acc1_reto[0];  // Sensor 1, valor reto de X
  ang1_reto[1] = Acc1_reto[1];  // Sensor 1, valor reto de Y

  // ---------------------------------------------- LEITURA DO MPU 2 POSTURA RETA ----------------------------------------------
  sensor2();
  
  // Calculamos os ângulos Y, X respectivamente.
  Acc2_reto[1] = atan(-1*aux2/aux)*RAD_TO_DEG;
  aux = pow((acelX2/AR),2)+pow((acelZ2/AR),2);
  aux=sqrt(aux);
  aux2 = acelY2/AR;
  Acc2_reto[0] = atan(aux2/aux)*RAD_TO_DEG;

  // Calculamos o ângulo do giroscópio 
  Gy2[0] = girX2/GR;  
  Gy2[1] = girY2/GR;
  
  ang2_reto[0] = Acc2_reto[0];  // Sensor 2, valor reto de X
  ang2_reto[1] = Acc2_reto[1];  // Sensor 2, valor reto de Y

  delay(30);  // DELAY REDUZIDO 
 }

//////////////////////////////////////////////////////////////////// VOID LE POSTURA REPOUSO ///////////////////////////////////////////////////////////////////////

void le_posturaRepouso() {
  
  // ---------------------------------------------- LEITURA DO MPU 1 POSTURA REPOUSO ----------------------------------------------  
  sensor1();
  
  // Calculamos os ângulos Y, X respectivamente.
  Acc1_repouso[1] = atan(-1*aux2/aux)*RAD_TO_DEG;
  aux = pow((acelX1/AR),2)+pow((acelZ1/AR),2);
  aux=sqrt(aux);
  aux2 = acelY1/AR;
  Acc1_repouso[0] = atan(aux2/aux)*RAD_TO_DEG;
  // Calculamos o ângulo do giroscópio 
  Gy1[0] = girX1/GR;  
  Gy1[1] = girY1/GR;
  
  ang1_repouso[0] = Acc1_repouso[0];  // Sensor 1, valor repouso de X
  ang1_repouso[1] = Acc1_repouso[1];  // Sensor 1, valor repouso de Y
   
  // ---------------------------------------------- LEITURA DO MPU 2 POSTURA REPOUSO ----------------------------------------------  
  sensor2();
  
  // Calculamos os ângulos Y, X respectivamente.
  Acc2_repouso[1] = atan(-1*aux2/aux)*RAD_TO_DEG;
  aux = pow((acelX2/AR),2)+pow((acelZ2/AR),2);
  aux=sqrt(aux);
  aux2 = acelY2/AR;
  Acc2_repouso[0] = atan(aux2/aux)*RAD_TO_DEG;
  // Calculamos o ângulo do giroscópio 
  Gy2[0] = girX2/GR;  
  Gy2[1] = girY2/GR;
  
  ang2_repouso[0] = Acc2_repouso[0];  // Sensor 2, valor repouso de X
  ang2_repouso[1] = Acc2_repouso[1];  // Sensor 2, valor repouso de Y  
}

///////////////////////////////////////////////////////////////////////// VOID MEDICAO /////////////////////////////////////////////////////////////////////////

void medicao_coluna() {
  cont_padrao=0;
  delay(1000);
  Serial.println("  ");
  Serial.println("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
  Serial.println("  ");
  Serial.println("A medição vai comecar...");
  Serial.println("  ");

  delay(1000); 

  // ---------------------------------- MEDIÇÃO DA COLUNA RETA ---------------------------------

  Serial.println("Fique com a coluna bem reta...");
  Serial.println("  ");

  delay(500);

  digitalWrite(vibracall, HIGH);
  delay(200);
  digitalWrite(vibracall, LOW);
  
  delay(1000);  // DELAY NÃO REDUZIDO

  le_posturaReta();

  Serial.println("SENSOR 1 RETO                                SENSOR2 RETO");
  Serial.print("X de ang1_reto: ");     Serial.print(ang1_reto[0]);
  Serial.print("                        X de ang2_reto: ");       Serial.println(ang2_reto[0]);
  Serial.print("Y de ang1_reto: ");     Serial.print(ang1_reto[1]);
  Serial.print("                        Y de ang2_reto: ");       Serial.println(ang2_reto[1]);
  
  delay(1000);  // DELAY NÃO REDUZIDO

  Serial.println("--------------------------                   -------------------------- ");
  Serial.println("Pode relaxar...");
  Serial.println("  ");

  delay(500);

  digitalWrite(vibracall, HIGH);
  delay(200);
  digitalWrite(vibracall, LOW);

  delay(1000);

  le_posturaRepouso();

  Serial.println("SENSOR 1 REPOUSO                             SENSOR 2 REPOUSO");
  Serial.print("X de ang1_repouso: ");        Serial.print(ang1_repouso[0]);
  Serial.print("                     X de ang2_repouso: ");            Serial.println(ang2_repouso[0]);
  Serial.print("Y de ang1_repouso: ");        Serial.print(ang1_repouso[1]);
  Serial.print("                     Y de ang2_repouso: ");            Serial.println(ang2_repouso[1]);

  delay(500);

  digitalWrite(vibracall, HIGH);
  delay(200);
  digitalWrite(vibracall, LOW);
  delay(200);
  digitalWrite(vibracall, HIGH);
  delay(200);
  digitalWrite(vibracall, LOW);
  
  delay(1000);  // DELAY NÃO REDUZIDO

  Serial.println("-----------------------------------------------------------------------------------------");

  delay(1000);  // DELAY NÃO REDUZIDO
  
  // ---------------------------------- DIFERENÇA RETO E REPOUSO --------------------------------

  Serial.println("Calculando a diferenca...");
  Serial.println("   ");
  
  delay(100);  // DELAY REDUZIDO
  
  diferencaX1 = ang1_reto[0]-ang1_repouso[0]; // diferença sensor 1 de X reto e repouso
  diferencaY1 = ang1_reto[1]-ang1_repouso[1]; // diferença sensor 1 de Y reto e repouso

  diferencaX2 = ang2_reto[0]-ang2_repouso[0]; // diferença sensor 2 de X reto e repouso
  diferencaY2 = ang2_reto[1]-ang2_repouso[1]; // diferença sensor 2 de Y reto e repouso

  mediaX = (diferencaX1 + diferencaX2) / 2;
  mediaY = (diferencaY1 + diferencaY2) / 2;

  if(diferencaX1<0) {
    diferencaX1 = diferencaX1 * (-1);  
  }
  
  if(diferencaX2<0) {
    diferencaX2 = diferencaX2 * (-1);
  }

  if(diferencaY1<0) {
    diferencaY1 = diferencaY1 * (-1);  
  }
  
  if(diferencaY2<0) {
    diferencaY2 = diferencaY2 * (-1);
  }

  if(mediaX<0) {
    mediaX = mediaX * (-1);  
  }
  
  if(mediaY<0) {
    mediaY = mediaY * (-1);
  }

  Serial.println("SENSOR 1                                     SENSOR 2");
  Serial.print("diferencaX1: ");    Serial.print(diferencaX1);
  Serial.print("                           diferencaX2: ");    Serial.println(diferencaX2);
  Serial.print("diferencaY1: ");    Serial.print(diferencaY1);
  Serial.print("                           diferencaY2: ");    Serial.println(diferencaY2);

  Serial.println("  ");

  Serial.println("SENSOR 1                                     SENSOR 2");
  Serial.println("----------------   CÁLCULO MÉDIAS   -----------------");

  Serial.println("  ");
  
  Serial.print("mediaX: ");    Serial.print(mediaX);
  Serial.print("                           mediaY: ");    Serial.println(mediaY);
  
  Serial.println("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
  Serial.println("  ");
  delay(500);  // DELAY REDUZIDO

  // ---------------------------------- ENVIO PARA O UBIDOTS ---------------------------------

  unsigned long timestamp_seconds = 1571615253L;  // Put here your timestamp in seconds
  unsigned int timestamp_milliseconds = 0;        // Put here the number of milliseconds to shift your timestamp
  
  
  ubidots.add("mpux1", diferencaX1, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name
  ubidots.add("mpuy1", diferencaY1, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name

  ubidots.add("mpux2", diferencaX2, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name
  ubidots.add("mpuy2", diferencaY2, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name
  
  ubidots.add("mediaX", mediaX, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name
  ubidots.add("mediaY", mediaY, NULL, timestamp_seconds, timestamp_milliseconds);  // Change for your variable name
  
  bool bufferSent = false;
  bufferSent = ubidots.send();  // Will send data to a device label that matches the device Id

  if (bufferSent) {
    // Do something if values were sent properly
    //Serial.println("Values sent by the device");
    Serial.println("Os dados foram enviados ao Ubidots.");
  }

  delay(1000);
  cont_padrao++;
}
