int sensor = A0;
int result = 0;
void setup() {
  pinMode(sensor,INPUT);
  Serial.begin(9600);
}

void loop() {
  result = analogRead(sensor);
  Serial.println(result);
  delay(1000);
}
