#include<Wire.h>

unsigned long int current_millis
//Variables for Ultrasonic Distance Sensor
int trig = 5;
int echo = 6;
int motor1 = 3;
int motor2 = 9;

int distance, duration;
int intensity;


//Variables for MPU6050 Gyro Sensor
const int MPU_addr = 0x68;
int16_t GyY;

int minVal = 265;
int maxVal = 402;

double x;
double y;
double z;

float AcX,AcY, AcZ;

void setup() {

//Setup for MPU6050 Gyro Sensor
  Wire.begin();
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
  Serial.begin(9600);

//Setup for Ultrasonic Distance Sensor
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(motor1, OUTPUT);
  pinMode(motor2, OUTPUT);
}


void loop() {

//Processing for MPU6050 Gyro Sensor
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_addr, 14, true);

  AcX = Wire.read() << 8 | Wire.read();
  AcY = Wire.read() << 8 | Wire.read();
  AcZ = Wire.read() << 8 | Wire.read();


  int xAng = map(AcX, minVal, maxVal, -90, 90);
  int yAng = map(AcY, minVal, maxVal, -90, 90);
  int zAng = map(AcZ, minVal, maxVal, -90, 90);

  y = RAD_TO_DEG * (atan2(-xAng, -zAng) + PI);
  
  Serial.print("Rotation = ");
  Serial.print(y);
  Serial.print("\n");

//Processing for Ultrasonic Distance Sensor 
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  duration = pulseIn(echo, HIGH); //pulseIn function measures the time between trig low to echo high


  distance = (duration / 2) / 29.1;
  Serial.print("Obstacle Distance = ");
  Serial.print(distance);
  Serial.print("\n");
  

if(y<30)
{
  
    if (distance >= 0 && distance <=30)
    {
      analogWrite(motor1, 255);
      analogWrite(motor2, 255);

    }
    else if (distance >= 31 && distance <= 60)
    {
      analogWrite(motor1, 255);
      analogWrite(motor2, 255);
      delay(1500);
      analogWrite(motor1, 0);
      analogWrite(motor2, 0);
      delay(1500);
      
    }
     else if (distance >=61  && distance <= 120)
    {
      analogWrite(motor1, 255);
      analogWrite(motor2, 255);
      delay(2500);
      analogWrite(motor1, 0);
      analogWrite(motor2, 0);
      delay(2500);
    }
     else if (distance >= 121  && distance <= 200)
    {
      analogWrite(motor1, 255);
      analogWrite(motor2, 255);
      delay(3500);
      analogWrite(motor1, 0);
      analogWrite(motor2, 0);
      delay(3500);
    }
   }
    else
  {
    analogWrite(motor1, 0);
    analogWrite(motor2, 0);
}
delay(100);
}
