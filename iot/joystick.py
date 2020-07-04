import sys
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)

import math
from os import path

chanX = AnalogIn(ads, ADS.P1)
chanY = AnalogIn(ads, ADS.P2)

while True:
    if math.floor(chanX.voltage) == 0:
        print("LEFT")
        sys.stdout.flush()
		
        time.sleep(0.5)
    elif math.floor(chanX.voltage) == 4:
        print("RIGHT")
        sys.stdout.flush()

        time.sleep(0.5)
    elif math.floor(chanY.voltage) == 0:
        print("UP")
        sys.stdout.flush()

        if path.exists('qcm'):
            time.sleep(0.5)
    elif math.floor(chanY.voltage) == 4:
        print("DOWN")
        sys.stdout.flush()

        if path.exists('qcm'):
            time.sleep(0.5)