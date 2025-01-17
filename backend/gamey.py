# Import the pygame module

import pygame
import requests

# Import pygame.locals for easier access to key coordinates

# Updated to conform to flake8 and black standards

loc = {}
loc[0]="001"
loc[1]="002"
loc[2]="003"
loc[3]="004"
loc[4]="007"

current_loc=1
old_loc=-1


from pygame.locals import (

    K_UP,

    K_DOWN,

    K_LEFT,

    K_RIGHT,

    K_ESCAPE,

    KEYDOWN,

    QUIT,

)



# Define constants for the screen width and height

SCREEN_WIDTH = 1500

SCREEN_HEIGHT = 600


# Define a player object by extending pygame.sprite.Sprite

# The surface drawn on the screen is now an attribute of 'player'

class Player(pygame.sprite.Sprite):

    def __init__(self):

        super(Player, self).__init__()

        self.surf = pygame.Surface((25, 25))

        self.surf.fill((0, 102, 204))

        self.rect = self.surf.get_rect()

    # Move the sprite based on user keypresses

    def update(self, pressed_keys):

        if pressed_keys[K_UP]:

            self.rect.move_ip(0, -5)

        if pressed_keys[K_DOWN]:

            self.rect.move_ip(0, 5)

        if pressed_keys[K_LEFT]:

            self.rect.move_ip(-5, 0)

        if pressed_keys[K_RIGHT]:

            self.rect.move_ip(5, 0)

        
        # Keep player on the screen

        if self.rect.left < 0:

            self.rect.left = 0

        if self.rect.right > SCREEN_WIDTH:

            self.rect.right = SCREEN_WIDTH

        if self.rect.top <= 0:

            self.rect.top = 0

        if self.rect.bottom >= SCREEN_HEIGHT:

            self.rect.bottom = SCREEN_HEIGHT



# Initialize pygame

pygame.init()


# Create the screen object

# The size is determined by the constant SCREEN_WIDTH and SCREEN_HEIGHT

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

# Instantiate player. Right now, this is just a rectangle.

player = Player()


# Variable to keep the main loop running

running = True

clock = pygame.time.Clock()

# Main loop

while running:

    # for loop through the event queue

    for event in pygame.event.get():

        # Check for KEYDOWN event

        if event.type == KEYDOWN:

            # If the Esc key is pressed, then exit the main loop

            if event.key == K_ESCAPE:

                running = False

        # Check for QUIT event. If QUIT, then set running to false.

        elif event.type == QUIT:

            running = False


    # Get all the keys currently pressed

    pressed_keys = pygame.key.get_pressed()


    # Update the player sprite based on user keypresses

    player.update(pressed_keys)
    
    tmp = int(player.rect.left/300)
    if tmp!=old_loc:
        url='http://127.0.0.1:5000/bt/newloc/'+loc[tmp]
        resp = requests.get(url)
        old_loc=tmp

    

    # Fill the screen with black

    screen.fill((229, 255, 204))

    pygame.draw.rect(screen, (204,255,153), (0,0,300,800), 0)
    pygame.draw.rect(screen, (153,255,204), (300,0,300,800), 0)
    pygame.draw.rect(screen, (204,153,255), (600,0,300,800), 0)
    pygame.draw.rect(screen, (255,255,153), (900,0,300,800), 0)
    pygame.draw.rect(screen, (224,224,224), (1200,0,300,800), 0)

    # Draw Store Layout
    pygame.draw.rect(screen, (0, 0, 0), (80, 0, 1500, 30), 0)
    pygame.draw.rect(screen, (0, 0, 0), (1470, 0, 30, 800), 0)
    pygame.draw.rect(screen, (0, 0, 0), (0, 80, 30, 800), 0)
    pygame.draw.rect(screen, (0, 0, 0), (0, 570, 1500, 600), 0)
    pygame.draw.rect(screen, (0, 0, 0), (125, 100, 60, 400), 0)
    pygame.draw.rect(screen, (0, 0, 0), (415, 100, 60, 400), 0)
    pygame.draw.rect(screen, (0, 0, 0), (715, 100, 60, 400), 0)
    pygame.draw.rect(screen, (0, 0, 0), (1020, 100, 60, 400), 0)
    pygame.draw.rect(screen, (0, 0, 0), (1305, 100, 60, 400), 0)
    
    # Draw the player on the screen
    screen.blit(player.surf, player.rect)

    # Update the display

    pygame.display.flip()

    clock.tick(60)