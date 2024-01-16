# Makey Makey Code-a-Key MakeCode Package

This extension integrates the [Makey Makey](https://www.makeymakey.com) with the micro:bit through the [Code-a-Key backpack](https://makeymakey.com/products/code-a-key-backpack). It allows you to program the micro:bit for keyboard and mouse interactions, responding to key presses and mouse clicks from the Makey Makey.

## Basic Blocks

### Initialize Makey Makey {#makeymakey-sx1509init}
The `initialize Makey Makey` block is essential and should be placed at the start of your `On Start` event block.

```blocks
// initialize Makey Makey block
MakeyMakey.sx1509Init()
```

### Press and Release Key
Simulates a key press and release sequence with an adjustable delay.

```blocks
// press and release Key block
MakeyMakey.typeKey(KeyPress.W)
```
### Press Key
Holds a key down until released.

```blocks
// press key block
MakeyMakey.pressKey(KeyPress.W)
```

### Release Key
Releases a key that was held down.

```blocks
// release key block
MakeyMakey.release(KeyRelease.W)
```
### When Makey Makey Key Pressed
Triggers an event when the Makey Makey sends any key press to the computer.

```blocks
// when key pressed block
MakeyMakey.whenKeyPressed(() => {
  // Code to execute when a key is pressed
})
```

### Click Mouse Button
Mimics a mouse click, consisting of a mouse down and up event.

```blocks
// click mouse button block
MakeyMakey.clickMouse(MouseButtons.Left)
```

### Move Mouse for Milliseconds
Moves the mouse cursor in a specified direction for a set duration.

```blocks
// move mouse for ms block
MakeyMakey.moveMouseForMilliseconds(MouseDirections.Up, 1000)
```

### When Makey Makey Mouse clicked
Triggers an event when the Makey Makey sends a left or right mouse click to the computer.

```blocks
// when makey makey mouse clicked block
MakeyMakey.whenMouseClicked(() => {
  // Code to execute when a mouse button is clicked
})
```

## Advanced Blocks
These blocks offer more control over key and mouse button presses, allowing for complex behaviors.

### Press Mouse Button
Holds down a mouse button until released.

```blocks
// press mouse button block
MakeyMakey.pressMouseButton(MouseButtons.Left)
```

### Release Mouse Button
Releases a mouse button that was held down.

```blocks
// release mouse button block
MakeyMakey.releaseMouseButton(MouseButtons.Left)
```

### Begin Moving Mouse
Starts moving the mouse in a given direction.

```blocks
// begin moving mouse block
MakeyMakey.moveMouse(MouseDirections.Up)
```

### Stop Mouse
Stops the mouse from moving in a given direction.

```blocks
// stop mouse block
MakeyMakey.stopMouse(MouseDirections.Up)
```

### Set Debounce
Adjusts the debounce timing for press-and-release and click actions.

```blocks
// set debounce block
MakeyMakey.setDebounce(100)
```

### Set polling rate
Sets the polling rate for the Makey Makey input event blocks.  The default rate is 20ms.
This is how often the micro:bit will check for changes in the state of the Makey Makey input pins
```blocks
// set polling rate block
MakeyMakey.setPollingRate(50)
```

### When All Makey Makey Keys or Mouse Buttons Released
Executes code when the Makey Makey transitions from having _any_ keys and/or mouse buttons pressed to _zero_ keys and/or mouse buttons pressed.

```blocks
// when all makey makey released block
MakeyMakey.onReleaseEvent(MakeyMakeyReleaseEventTypes.AllReleased, () => {
    // Code to execute when all keys and/or mouse buttons are released
})
```
### When Makey Makey Keys or Mouse Buttons Pressed
Executes code when the Makey Makey transitions from having _zero_ keys and/or mouse buttons pressed to _any_ keys and/or mouse buttons pressed.

```blocks
// when Makey Makey pressed block
MakeyMakey.onReleaseEvent(MakeyMakeyReleaseEventTypes.AllReleased, () => {
    // Code to execute when any keys and/or mouse buttons are pressed
})
```

### Set Debounce Time
Configures the debounce time for key and mouse events.

```blocks
// Set Debounce Time block
MakeyMakey.setDebounce(100) // Set the debounce time in milliseconds
```

### Any Key Pressed
Checks if any Makey Makey key is currently pressed.

```blocks
// Any Key Pressed block
let isAnyKeyPressed = MakeyMakey.anyKeyPressed()
```

### Any Mouse Button Pressed
Checks if any Makey Makey mouse button is currently pressed.

```blocks
// Any Mouse Button Pressed block
let isAnyMouseButtonPressed = MakeyMakey.anyMouseClicked()
```