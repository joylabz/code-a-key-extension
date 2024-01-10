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

makeyMakey.sx1509Init()
input.onButtonPressed(Button.A, function () {
  makeyMakey.typeKey(makeyMakey.KeyPress.W)
  makeyMakey.typeKey(makeyMakey.KeyPress.A)
  makeyMakey.typeKey(makeyMakey.KeyPress.S)
  makeyMakey.typeKey(makeyMakey.KeyPress.D)
  makeyMakey.typeKey(makeyMakey.KeyPress.F)
  makeyMakey.typeKey(makeyMakey.KeyPress.G)
  makeyMakey.clickMouse(makeyMakey.MouseButtons.Right)
  makeyMakey.moveMouseForSeconds(makeyMakey.MouseDirections.Left, 500)
  makeyMakey.clickMouse(makeyMakey.MouseButtons.Left)
  makeyMakey.moveMouseForSeconds(makeyMakey.MouseDirections.Right, 500)
  makeyMakey.moveMouseForSeconds(makeyMakey.MouseDirections.Up, 500)
  makeyMakey.moveMouseForSeconds(makeyMakey.MouseDirections.Down, 500)
})