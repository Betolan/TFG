import math

#Función para calcular el ángulo entre el punto inicial y el objetivo.
def calculateAngle(posX, posY):
    angleRad = math.atan(posY / posX)
    angleDeg = angleRad * 180.0 / math.pi
    return math.trunc(angleDeg)

#Función para calcular la distancia entre el punto inicial y el objetivo.
def calculateDistance(posX, posY):
    sumLegs = posX**2 + posY**2
    distance = math.sqrt(sumLegs)
    return math.trunc(distance)

#Función para calcular el ángulo central del polígono regular.
def calculateCentralAngle(nSide):
    centralAngle = 360 / nSide

    return math.trunc(centralAngle)

#Función para calcular la medida de cada lado del polígono regular.
def calculateSidePolygon(centralAngle, radius):
    side = 2 * math.sin(math.radians(centralAngle / 2)) * radius

    return math.trunc(side)

#Función para calcular cuantas veces debe desplazarse en vertical con módulo de 20
#ya que es la distancia mínima que puede realizar el dispositivo, si el objeto
#es mayor a ello, entonces aumenta en uno el contador.
def calculateTimesToFlyVertical(size):
    absSize = math.fabs(size)
    times = absSize / 20
    if absSize % 20 > 10:
        times = times + 1

    if size < 0:
        times = times * -1

    return times



