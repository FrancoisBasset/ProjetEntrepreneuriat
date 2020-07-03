import signal
import sys
from gpiozero import LED
from time import sleep

leds = []

leds.append(LED(5))
leds.append(LED(6))
leds.append(LED(13))
leds.append(LED(19))

def red(index):
	leds[index].blink(0.2, 0)

def blink(index):
	leds[index].blink(1, 0)

def off():
	leds[0].off()
	leds[1].off()
	leds[2].off()
	leds[3].off()


i = sys.stdin.readline()

off()

if i == '0':
	blink(0)
elif i == '1':
	blink(1)
elif i == '2':
	blink(2)
elif i == '3':
	blink(3)

signal.pause()
