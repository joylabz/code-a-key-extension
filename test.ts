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
  MakeyMakey.typeKey(MakeyMakey.KeyPress.W)
  MakeyMakey.typeKey(MakeyMakey.KeyPress.A)
  MakeyMakey.typeKey(MakeyMakey.KeyPress.S)
  MakeyMakey.typeKey(MakeyMakey.KeyPress.D)
  MakeyMakey.typeKey(MakeyMakey.KeyPress.F)
  MakeyMakey.typeKey(MakeyMakey.KeyPress.G)
  MakeyMakey.clickMouse(MakeyMakey.MouseButtons.RIGHT)
  MakeyMakey.moveMouseForSeconds(MakeyMakey.MouseDirections.LEFT, 500)
  MakeyMakey.clickMouse(MakeyMakey.MouseButtons.LEFT)
  MakeyMakey.moveMouseForSeconds(MakeyMakey.MouseDirections.RIGHT, 500)
  MakeyMakey.moveMouseForSeconds(MakeyMakey.MouseDirections.UP, 500)
  MakeyMakey.moveMouseForSeconds(MakeyMakey.MouseDirections.DOWN, 500)
})