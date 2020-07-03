from gpiozero import Button
from signal import pause
import sys

def when_pressed():
    print("CLICK")
    sys.stdout.flush()

button = Button(20)
button.when_pressed = when_pressed

pause()