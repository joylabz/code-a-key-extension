# Makey Makey Code-a-Key MakeCode Package

This is an extension which allows you to use the [Makey Makey](https://www.makeymakey.com) with the micro:bit through the [Code-a-Key backpack](https://www.makeymakey.com).  The Code-a-Key backpack allows you to:

* Program the micro:bit to send keyboard and mouse input to a computer through the attached Makey Makey
* Program the micro:bit to respond to *key presses* and *mouse clicks* triggerd by the Makey Makey

## Blocks

### makeymakey-sx1509_init

![block-images/initialize.png]

This block initializes the Code-a-Key backpack and the Makey Makey and *must be used* before any of the other blocks will work.  You will almost always put this at the top of your `On Start` event block.