******************************************************************************TETRIS GAME by Sergi Garcia*******************************************************************************

*********************************************************************************Technologies used*****************************************************************************************

jquery, Javascript, html, css, bootstrap

***********************************************************************************Instructions************************************************************************************************

**The Objectives**

Completed as menu rows as the points for victory chosen in the main menu, and/or die after the rival if two players are playing the game.

**Controls**

The player one can move the actual piece with the next keys:
	-the arrow left to go to the left
	-the arrow right to go to the right
	-the arrow down to go faster to the bottom of the grid
	-the number one in the num pad to rotate left in ubuntu and the key } in Mac
	-the number two in the num pad to rotate right in ubuntu and the key \ in Mac

The player two can move the actual piece with the next keys:
	-the 'a' to go to the left
	-the 'd' to go to the right
	-the 's' to go faster to the bottom of the grid
	-the 'g' to rotate left
	-the number 'h' to rotate right

*************************************************************************************Approach******************************************************************************************************

This tretris was first inspired by the rover game made during the prework and by the game snake given as an example byt the teacher Thor.

Basically, it consist into moving down pieces through a grid till they get to the bottom of this grid or they are placed in top of another piece.


**The piece object**:

Each piece is an object made by four blocks. Each block is saved as an object into an array of its corresponding piece. This array is called the 'body' of the piece. 

The properties that each block has are: 

- its row in the grid : it is the row of the grid in which this block is
- its column in the grid: it is the column of the grid in which this block is
- an integer referencing the block of rotation in the piece: the piece can be rotated. In order to do that, it is needed a point of reference to do it. One of the blocks of the piece will be taken as this point. This integer points to this point of rotation.
- a selector referencing the DOM: the blocks of the piece in javascript are representet in the DOM by divs with a certain height and width. This divs are moved in pixels using an absolute position as an css attribute.
- an state called erase: this state is used as a mark to the block. If the block has this mark, it means that has to be erased because it belongs to a row that has been completed (it has all of its columns with blocks )
- an state called erased: this state is used as a mark to the block. If the block has this mark, it means that it has been previously erased.
- an integer called displacement: this integer means the amount of rows that the block has to be desplaced after a row of blocks has been erased
- its position in pixels in the screen (actually, its position in pixels respect the general division to which the piece belong, that is the player's grid, also called player's board)
- the piece to which it belongs ( it is only for debugging porpuses).

Each piece goes down through the grid automatically, but it can also go left or right, and rotate to the left or to the right, depending of the user's input. A piece moves always checking if there is a potential collision with the laterals or the bottom of the grid, or with other pieces that have been already deployed in it. Also, a piece can move down faster if the player input corresponds to the key that is mapped as down in the game.

In order to mark that a piece has to stop because it cannot move down any further, the piece has a state called 'contact'. When a piece touches the bottom of the grid or the top of another piece, this state is put into true, so this piece cannot move anymore.

When a piece is stopped, the regions/cells of the grid that correspond to the blocks of this piece are marked with the state false. With this, the future pieces will know where are the already spawned pieces in the grid.

As mentioned before, the movement of each piece is represented in the DOM by divs of each of this piece's blocks that are translated in pixels. In order to know to which position in pixels each block has to go, each region of the grid has a center. This center is a value in pixels respect to the general division that is the grid/player's board. When a block moves from one region to another, its position in pixels changes from one center to another. Then, the translation in the DOM is made, and all the piece moves.

Note: each piece is bounded with the id of its player, so the player can acces to it.


**The region object**:

As mentioned above, the grid is made of regions/cells. Each region has its position in the grid so, to acces to acces to the information of each region, an array of regions has to be accessed. This array of regions is created with two for loops, so each region is placed into the array acording to the row and column that the region occupies in the grid.

Also, its reagion has an property called 'center'. This center, as said before, its the position in pixels of the region in the screen respecto to the grid. This center is used represent the movement of each block of a piece.

Finally, each region has one last property called 'state'. This state is true if there is any block of any piece stationary in it. If there is a block of an stopped piece, the 'state' value is false. That way, the future pieces will know where they can move freely in the grid and where they will male contact.

Note: each region is bounded with the id of its player, so the player can acces to it.

**The pieceGenerator object**:

The pieceGenerator is an object that each player that is playing the Tetris game owns. So, if there are two players, there will be two pieceGenerators, and if there is only one, there will be only one pieceGenerator.

The pieceGenerator is the one that generates pieces, that knows which is the actual piece being moved, that draws the pieces (calls the function draw of the piece being moved ) and that updates the state of the regions where the pieces are supposed to be.

Each time a piece is stopped and made stationary, a new piece is generated. This new piece will be considerated the new piece controlled by the player. This new piece will be pushed into an array of already generated pieces. With each new piece, and integer referencing the number of pieces created is incremented. This number of pieces is used in order to give to the blocks of each piece a unique id in order to connect the pieces in the javascript code with their representations in the DOM.

The generation of the new piece is random. There is a number of types of pieces and colors available, and with a generation two random numbers, one for each case, the type of body and the color of the piece are chosen.

When a piece is stopped, appart from the generation of a new piece, the states of the regions are updated. In this update, the pieceGenerator looks for the rows that may have been completed after the last piece has been placed. If a row has been completed, the blocks of the pieces that are in that row are marked with the state 'erase', and the blocks that are below the index of that row have their attribute 'displacement' incremented by one, so they can be displaced one row up in the index of the grid in order to occupy the place of the just erased rows. The translation of this in the DOM is that the blocks erased are remove from it, and the blocks displaced are moved in pixels to the regions below. Furthermore, in this update, the rows that has been completed are taken into account in the player's score. And the pieces that have all their blocks erased from the grid are removed from the array of generated pieces.

Note: the pieceGenerator is bounded with the id of its player, so the player can acces to it.

**the listData object**

An object where all the kinds of bodies for the pieces and all the available colors for them are stored.

**the input object**

An object that maps the keys of the keyboard as the input of the player. The player one has its own keys mapped, as well as the player two. Each time one of this keys is pressed, its corresponding property in the object is changed to true. Each time a pressed key is released, this state is changed to false. 
With all the keys used mapped into an object as properties the used is able to press more than one when moving a piece.

**the game object**

This is the object that controls the logic of the game, draws the different components and allow to the player to interact with them.

This object has a execution order that is the next:

- Initialization of the game: the game is first initializated with the function 'StartGame()'. In this function, it's created the layout corresponding to the player's area of play, separated in two parts, one for the score of the player, and the other for the player's board, corresponding to the region grid, that is also created. Each of this parts is bounded by an id with its player in order to acces to them. The pieceGenerator is also created and the first piece is deployed. After this, the first call to the main loop of the game object is called. 


- Main Loop: This main loop is called with the function requestAnimationFrame. This function returns a timeStamp each time the main loop is called with it. With this timeStamp, it is possible to build the frame rate with which the game will be executed. Also, this timeStamp will be avaible to use a time called 'delta' with which the movement of the pieces won't depend on the frame rate but on the time. 

in this main loop the functions update and draw will be called.

- Update: here, the logic of the game is updated:
	- if the other player has won, the player has lost
	- if the other player has lost, the player has won
	- it is checked if the actual piece being moved has been stopped by the bottom of the grid or by an stationary piece.
	- if the piece is stopped, another piece is created. Also, the regions' states are updated to true or false depending if there are blocks of stationary pieces in them and rows of pieces are erased and/or displaced if it is the case
	- if the number of rows completad is greater than the points for the victory, the player has won
	- if a piece is present in the spawning zone, the player has lost
	- the actual piece being moved increments its position to the bottom of the grid
	- the input keys are taken into account to perform the different actions in a piece.

In the movement of the piece and in the different actions performed, there is a velocity, a time delta and a distance (or delay) taken into account. In order to move the piece down, or to perform one of the actions, a distance has to be completed. This distance is completed by velocity*delta time, so it doesn't depend on the frames per second.

- Draw: here the piece is draw and the score of the player is refreshed.

Each player has its own game object (in fact, it is considered the player as it is implemented right now)

**the main object**

The object that manages the players and the game. It has three states: the main menu, the loading page, and the in-play menu. Each state has its owns options to interact with.

The main object is initialized when the 'document', the DOM, is ready - jquery is being used -. The first state to appear is the main menu, where the menu-layout-start is presented. In this state, the player has the option to start the game choosing the number of players that will play it, the points for the victory, and the level of the game. Every button has its own listener.

Once pressed the 'START GAME' button, a game object or two game objects will be created depending on the number of players selected. But before starting the logic of the game objects, the state of loading page is presented in the loading.layout. Here, a setInterval is used in order to remain in this page during a period of time, and then a setTimeout is also used to make the game or games begin in a state of pause during a seconds to give the player enough time to be actually ready.

So, after the loading state, the in.game state is present. In this state, the ingame layout is shown. In this layout, the game or games are presented (the grids, the pieces, the score, etc). During the time that the game or games are being played, the main object is listening with a setInterval the states of the game or games. If a player wins, then, as the game or games stop by itself, the main object will show a message of victory or defeat in the screen.

In the ingame state, the player has the options to restart the game, or to go back to the main menu. When a player goes back to the main menu, the game is paused. Then, in the main menu ( so in the main menu state ), a player can choose to return to the actual game, or to start a new game with a new configuration. Whatever the options choosed, the loading page state will appear again, and the game will resume or start in pause again.


********************************************************************************unsolved problems and unfinished aspects*********************************************************************************

- The future piece couldn't be displayed. Working with requestAnimationFrame is giving some problems when assigning certains variables. Is has to be further studied
- A better integration of the games with the menus' layouts. The development of the game itself has taken away a lot of time, and a better looking presentation and the integration of the grids in the layouts can be improved. New ideas have to be thought about it.
- Make configurable the mapping of the keys in ubuntu and Mac. 
- Test the game in Mac. It has been only tested in ubuntu.
- Show the actual controls in a menu
- Make different types of gamemodes
- Integration of mobile mode - touch screen options
- Testing in all the browsers 
 




	
