# Pac-Man Game written in vanillaJS

Pac-Man (known as Puck-Man in Japan) is a popular game in the USA and Japan. 
It was first created by Toru Iwatani and released by Namco/Midway. 
It consists of a yellow partial-pizza-shaped Pac-Man who eats dots inside a blue maze.

## Gameplay

The player controls a circular character which has a pie wedge shaped mouth to eat pellets through a maze, eating Pac-Dots. When all dots are eaten, Pac-Man is taken to the next stage. Four ghosts, Blinky, Pinky, Inky and Clyde roam the maze, trying to catch Pac-Man. If a ghost chomps (touches) Pac-Man, a life is lost. When all lives have been lost, the game ends. Pac-Man is awarded a single bonus life at 10,000 points by default–DIP switches inside the machine can change the required points or disable the bonus life altogether.

Near the corners of the maze are four larger, flashing dots known as Power Pellets, provide Pac-Man with the temporary ability to eat the ghosts. The ghosts turn deep blue, reverse direction, and move slower when Pac-Man eats one. When a ghost is eaten, its eyes return to the ghost home where it is regenerated in its normal color. Blue ghosts flash white before they become dangerous again and the amount of time the ghosts remain vulnerable varies from one round to the next, but the time period generally becomes shorter as the game progresses. In later stages, the ghosts don't change colors at all, but still reverse direction when a power pellet is eaten.

In addition to Pac-Dots and Power Pellets, bonus items, usually referred to as fruits (though not all items are fruits) appear near the center of the maze. These items score extra bonus points when eaten. The items change and bonus values increase throughout the game. Sometimes, items can appear several times. Also, a series of intermissions play after certain levels toward the beginning of the game, showing a humorous set of interactions (the first being after level 2, which has a giant Pac-Man chasing a blue Blinky) between Pac-Man and Blinky. Intermissions: #1: Giant Pac-Man vs Blue Blinky. #2: Blinky chases Pac-Man, but gets cut on a white stick. #3: Number 3 has Blinky, who's wound has been glued on again, chase Pac-Man, but his entire slime (body) fall off! Intermission 3 is used as all other intermissions after.
PacMaze


### Scoring System 

* `Pac-Dot` - **10** points. [TODO]

* `Power Pellet` - **50** points. [TODO]

* `Vulnerable Ghosts`:
	* `#1` in succession - **200** points. [TODO]
	* `#2` in succession - **400** points. [TODO]
	* `#3` in succession - **800** points. [TODO]
	* `#4` in succession - **1600** points. [TODO]
* `Fruit`:
	* `Cherry`: **100** points. [TODO]
	* `Strawberry`: **300** points [TODO]
	* `Orange`: **500** points [TODO]
	* `Apple`: **700** points [TODO]
	* `Melon`: **1000** points [TODO]
	* `Galxian` Boss: 2000 points [TODO]
	* `Bell`: **3000** points [TODO]
	* `Key`: **5000** points [TODO]


### Ghosts

The four ghosts, formerly known as "monsters", are the enemies in the original arcade game. They cycle through different "modes" of behavior, colloquially known as "scatter"–where they retreat to the four corners of the maze–and "chase"–where their A.I. kicks in. Each ghost has unique A.I., programmed so that the game would not get impossibly difficult or boring. There are certain one-way areas on the maze–namely, the two "T" formations located directly above and below the Ghost Home (the box in the center of the stage)–that the ghosts can travel down through, but can't go up through. There are also two entrances to a tunnel on either side of the maze that Pac-Man can travel through and come out the opposite side of the screen on, which will slow the ghosts down if they enter it. Yet another advantage Pac-Man has over the quartet is that he can turn slightly faster. Once each ghosts' mannerisms are fully learned, they can be easily manipulated by the player to get a very high score. Here is a breakdown of each ghosts' behavior when in chase mode, generally speaking:

-   `the red ghost`, `Blinky,` doggedly pursues Pac-Man; [TODO]
-   `the pink ghost`, `Pinky`, tries to ambush Pac-Man by moving parallel to him; [TODO]
-   `the cyan ghost`, `Inky`, tends not to chase Pac-Man directly unless Blinky is near; [TODO]
-   `the orange ghost`, `Clyde`, pursues Pac-Man when far from him, but usually wanders away when he gets close. [TODO]

Here is a set of all of the ghosts' character names (hinting at their behavior), 
and nicknames. (The alternate names for Puck-Man are triggered through a DIP switch.)

|Color |Pac-Man Character|Pac-Man Nickname |
|------|-----------------|-----------------|
|Red   |Shadow           |Blinky           |
|Pink  |Speedy           |Pinky            |
|Cyan  |Bashful          |Inky             |
|Orange|Pokey            |Clyde            |


### Split-screen levelEdit


When the player gets to the 256th level, the right side of the maze becomes a garbled mess of code, 
therefore making the level impossible. The right side has some Pac-Dots too, but only 9. 

The right side of the screen also traps the ghosts and can make Pac-Man go off the screen. 

The left side of the maze remains fine though. 

If one uses a hack to skip the level, then the game goes back to the first level. 

Because of this bug, a perfect game only counts the first 255 levels. 

This is more commonly known as a kill screen.

## Development (Version 0.1)
	* Written in vanillaJS, HTML5 and CSS3
	* Graphics in SVG

## Referências

 [Pac-Man wikia](http://pacman.wikia.com/wiki/Pac-Man_(game)