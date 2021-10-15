import Algorithm  as Al
from time import sleep
import timeit

start = timeit.default_timer()

# posX, posY, points, radius, height, size, laps
Al.setParameters(-40, 40, 18, 70, 55, 10, 3)
Al.connect()
Al.takeOffUAV()
Al.goToPoint()
Al.verificationPositionVertical()
Al.rotate()
Al.returnFromPoint()
Al.landUAV()

stop = timeit.default_timer()
print('Time: ', stop - start)