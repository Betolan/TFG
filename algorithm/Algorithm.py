import cv2
from djitellopy import Tello
from time import sleep
import functions as f
import math

global rotationGo, distanceGo

me = Tello()
rotationGo = 0
rotationReturn = 0
distanceGo = 0
points = 0
radius = 0
height = 0
size = 0
pictures = 0
laps = 0

#Función para conectar con el dispositivo UAV, obtener el estado de batería y encender la cámara
def connect():
     me.connect()
     print('Batería inicial', me.get_battery())
     me.streamon()
     sleep(1)


#Función para despegar y encender la cámara
def takeOffUAV():
     me.takeoff()
     sleep(3)


#función para apagar la cámara, aterrizar y obtener la batería.
def landUAV():
     me.streamoff()
     me.land()
     print('Batería final', me.get_battery())

#Función para establecer todas las variables del algoritmo de trayectoria
def setParameters(pPosX, pPosY, pPoints, pRadius, pHeight, pSize, pLaps):
     global rotationGo, distanceGo, points, radius, height, size, laps
     rotationGo = f.calculateAngle(pPosX, pPosY)
     distanceGo = f.calculateDistance(pPosX, pPosY)
     points = pPoints
     radius = pRadius
     height = pHeight
     size = pSize
     laps = pLaps

#Función para viajar hacia el punto, primero rota y después se desplaza hacia adelante.
def goToPoint():
     if (rotationGo < 0):
          me.rotate_counter_clockwise(abs(rotationGo))
     else:
          me.rotate_clockwise(rotationGo)
     sleep(3)

     me.move_forward(distanceGo)
     sleep(3)

#Funcións para regresar al punto de inicio, gira 180 grados porque es la manera de mirar al lado opuesto
#de donde empezó, al llegar al punto de inicio gira 180 grados de nuevo para estar en posición de salida.
def returnFromPoint():
     global rotationReturn, rotationGo
     me.rotate_clockwise(180)
     sleep(3)

     me.move_forward(distanceGo)
     sleep(3)

     rotationReturn = 180-rotationGo
     me.rotate_clockwise(rotationReturn)
     sleep(3)

#Función para verificar si el objeto está a una altura cercana del dispositivo UAV, de lo contrario
#se desplaza de forma vertical para estar a la misma altura.
def verificationPositionVertical():
     print('height: ', me.get_height())
     global height
     difHeight = height - me.get_height()
     times = f.calculateTimesToFlyVertical(difHeight)
     truncTimes = math.fabs(math.trunc(times))

     while truncTimes > 0:
          if times > 0:
               me.move_up(20)
               sleep(1)
          else:
               me.move_down()
               sleep(1)
          # print(truncTimes)
          truncTimes = truncTimes - 1
     print('height2: ', me.get_height())


#Función para crear un polígono regular alrededor del objetivo, donde cada vértice es un punto intermedio
#para la toma de fotografías. Primero calcula el ángulo central y la distancia de cada lado, después
#la diferencia entre la altura que se encuentra el dispositivo UAV y el tamaño del objeto, así, saber si tiene que
#desplazarse se manera vertical para abarca más área del objeto.
#Además realiza una cantidad de vueltas en en cada altura diferente.
def rotate():
     global points, radius, height, size, laps
     rotateDegrees = f.calculateCentralAngle(points)
     print('rotateDegrees ',rotateDegrees)
     moveDistance = f.calculateSidePolygon(rotateDegrees, radius)
     print('moveDistance ', moveDistance)
     rotateCount = points*laps
     difHeight = size - (me.get_height() - height)
     print('difHeight', difHeight)
     timesFlyUp = math.trunc(f.calculateTimesToFlyVertical(difHeight))
     print('timesFlyUp ', timesFlyUp)
     timesFlyDown = timesFlyUp

     if(timesFlyUp == 0):
          while rotateCount > 0:
               takePicture()
               me.rotate_counter_clockwise(rotateDegrees)
               me.move_right(moveDistance)
               print('rotateCount ', rotateCount)
               rotateCount = rotateCount - 1

     else:
          while timesFlyUp > 0:
               while rotateCount > 0:
                    takePicture()
                    me.rotate_counter_clockwise(rotateDegrees)
                    me.move_right(moveDistance)
                    print('rotateCount ', rotateCount)
                    rotateCount = rotateCount - 1

               me.move_up(20)
               print('timesFlyUpCount ', timesFlyUp)
               timesFlyUp = timesFlyUp - 1

     while timesFlyDown > 0:
          me.move_down(20)
          print('timesFlyDownCount ', timesFlyDown)
          timesFlyDown = timesFlyDown - 1


#Función para tomar fotografías y guardarlas localmente.
#Tiene un contador para no repetir nombres de las imágenes.
def takePicture():
     global pictures
     img = me.get_frame_read().frame
     if cv2.waitKey(1):
          cv2.imwrite('C:/Users/betol/Documents/Photogrammetry/Images/ImagesDron/image'+ str(pictures) + '.png', img)
          print('takePicture ', pictures)
          pictures = pictures + 1



