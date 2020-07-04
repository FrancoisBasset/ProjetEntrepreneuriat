import signal
import sys
from gpiozero import LED
from time import sleep
import json

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

while True:
	led = sys.stdin.readline()
	led = led.split('\n')[0]

	print(led)

	if led == "off":
		off()
		continue
	else:
		led = json.loads(led)

	off()

	if led["function"] == "blink":
		blink(led["value"])
	elif led['function'] == 'red':
		red(led["value"])