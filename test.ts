/*  Test script for the Code-a-Key Backpack.
1.  Plug MakeyMakey into the Code-a-Key Backpack.
2.  Plug the micro:bit into the Code-a-Key Backpack.
2.  Connect the MakeyMakey to your computer.
3.  Connect the Code-a-Key Backpack to your computer.
4.  Download the script to the micro:bit.
5.  Open up a text editor (e.g. Notepad) and click on the text editor window.  This will allow you to see the results of the script.
6.  Press the A button on the micro:bit to run the script.
You should see the following actions:
-  The micro:bit will type the letters W, A, S, D, F, G.
-  The micro:bit will right click the mouse.
-  The micro:bit will move the mouse left for 500 milliseconds.
-  The micro:bit will left click the mouse.
-  The micro:bit will move the mouse right for 500 milliseconds.
-  The micro:bit will move the mouse up for 500 milliseconds.
-  The micro:bit will move the mouse down for 500 milliseconds.
*/

MakeyMakey.sx1509_init()
input.onButtonPressed(Button.A, function () {
  MakeyMakey.typeKey(KeyPress.W)
  MakeyMakey.typeKey(KeyPress.A)
  MakeyMakey.typeKey(KeyPress.S)
  MakeyMakey.typeKey(KeyPress.D)
  MakeyMakey.typeKey(KeyPress.F)
  MakeyMakey.typeKey(KeyPress.G)
  MakeyMakey.clickMouse(MouseButtons.RIGHT)
  MakeyMakey.moveMouseForSeconds(MouseDirections.LEFT, 500)
  MakeyMakey.clickMouse(MouseButtons.LEFT)
  MakeyMakey.moveMouseForSeconds(MouseDirections.RIGHT, 500)
  MakeyMakey.moveMouseForSeconds(MouseDirections.UP, 500)
  MakeyMakey.moveMouseForSeconds(MouseDirections.DOWN, 500)
})