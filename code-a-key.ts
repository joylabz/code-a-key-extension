enum MakeyMakeyPressEventTypes {
    //% block="key pressed"
    KeyPressed = 1,
    //% block="mouse clicked"
    MouseClicked = 2,
    //% block="key pressed+mouse clicked"
    BothPressed = 3
}

enum MakeyMakeyReleaseEventTypes {
    //% block="keys released"
    KeyReleased = 1,
    //% block="mouse buttons released"
    MouseReleased = 2,
    //% block="keys+mouse buttons released"
    AllReleased = 3
}

enum KeyPress {
    //% block="w"
    W = 13,
    //% block="a"
    A = 12,
    //% block="s"
    S = 11,
    //% block="d"
    D = 10,
    //% block="f"
    F = 9,
    //% block="g"
    G = 8,
}

enum KeyRelease {
    //% block="w"
    W = 13,
    //% block="a"
    A = 12,
    //% block="s"
    S = 11,
    //% block="d"
    D = 10,
    //% block="f"
    F = 9,
    //% block="g"
    G = 8,
    //% block="all"
    ALL = 0
}

enum MouseDirections {
    //% block="up"
    UP = 0,
    //% block="down"
    DOWN = 1,
    //% block="left"
    LEFT = 2,
    //% block="right"
    RIGHT = 3
}

enum MouseButtons {
    //% block="left"
    LEFT = 4,
    //% block="right"
    RIGHT = 5
}

//% groups=['Keyboard', 'Mouse', 'Events', 'Advanced']
//% weight=100 color=#f50019 icon="\uf11c" block="Makey Makey"
namespace MakeyMakey {

    let DEBOUNCE_TIME = 50

    let SX1509_ADDRESS = 0
    let REG_RESET = 0
    let currentValue = 0
    SX1509_ADDRESS = 62
    let REG_DIR_A = 15
    let REG_DIR_B = 14
    let REG_DATA_A = 17
    let REG_DATA_B = 16

    let keyPressed = false;
    let mouseClicked = false;



    //% blockId="makeymakey_init" block="initialize Makey Makey"
    /**
     * Initializes the Makey Makey code-a-key backpack.  This must be called before any other Makey Makey blocks will work.
     */

    export function sx1509_init() {
        REG_RESET = 125
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_RESET << 8) | 0x12,
            NumberFormat.UInt16BE,
            false
        )
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_RESET << 8) | 0x34,
            NumberFormat.UInt16BE,
            false
        )
        basic.pause(100)
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_DIR_B << 8) | 0xC0,
            NumberFormat.UInt16BE,
            false
        )

        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_DIR_A << 8) | 0x00,
            NumberFormat.UInt16BE,
            false
        )

        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_DATA_A << 8) | 0xFF,
            NumberFormat.UInt16BE,
            false
        )
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (REG_DATA_B << 8) | 0xFF,
            NumberFormat.UInt16BE,
            false
        )

        // Background loop checking for pin input
        control.inBackground(() => {

            let prevKeyPressedState = false;
            let prevMouseClickedState = false;

            while (true) {
                keyPressed = sx1509_digitalRead(14) === 1;
                mouseClicked = sx1509_digitalRead(15) === 1;
                if (!prevKeyPressedState && keyPressed && onKeyPressedHandler) {
                    onKeyPressedHandler();
                }

                if (!prevMouseClickedState && mouseClicked && onMouseClickedHandler) {
                    onMouseClickedHandler();
                }

                if (!prevKeyPressedState && !prevMouseClickedState && keyPressed && mouseClicked && bothPressedHandler) {
                    bothPressedHandler();
                }

                if ((prevKeyPressedState || prevMouseClickedState) && !keyPressed && !mouseClicked && allReleasedHandler) {
                    allReleasedHandler();
                }

                if (prevKeyPressedState && !keyPressed && onKeyReleasedHandler) {
                    onKeyReleasedHandler();
                }

                if (prevMouseClickedState && !mouseClicked && onMouseReleasedHandler) {
                    onMouseReleasedHandler();
                }


                prevKeyPressedState = keyPressed;
                prevMouseClickedState = mouseClicked;

                basic.pause(20)
            }
        });
    }

    function sx1509_digitalWrite(pin: number, state: boolean) {
        let register = pin < 8 ? REG_DATA_A : REG_DATA_B;
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            register,
            NumberFormat.UInt8LE,
            true
        )
        currentValue = pins.i2cReadNumber(SX1509_ADDRESS, NumberFormat.UInt8LE, false)
        let data = (1 << (pin % 8));
        if (state) {
            currentValue |= data;
        } else {
            currentValue &= ~data;
        }
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            (register << 8) | currentValue,
            NumberFormat.UInt16BE,
            false
        )
    }
    /**
     * Presses and releases a specified key.
     * @param key the key to press and release
     */
    //% blockId="makeymakey_press_release_key" block="press and release key %key"   
    //%group="Keyboard"
    //% weight=100
    
    export function typeKey(key: KeyPress): void {
        pressKey(key);
        basic.pause(DEBOUNCE_TIME);
        switch (key) {
            case KeyPress.W:
                release(KeyRelease.W);
                break;
            case KeyPress.A:
                release(KeyRelease.A);
                break;
            case KeyPress.S:
                release(KeyRelease.S);
                break;
            case KeyPress.D:
                release(KeyRelease.D);
                break;
            case KeyPress.F:
                release(KeyRelease.F);
                break;
            case KeyPress.G:
                release(KeyRelease.G);
                break;
        }
        basic.pause(DEBOUNCE_TIME);
    }
    /**
     * Presses a specified key.
     * @param key the key to press
     */
    //% blockId="makeymakey_press_key" block="press key %key"
    //%group="Keyboard"
    //% weight=20
    export function pressKey(key: KeyPress): void {
        sx1509_digitalWrite(key, false);
    }

    /**
     * Checks if any key on the Makey Makey is currently pressed.
     */
    //% blockId="makeymakey_any_key_pressed" block="any Makey Makey key pressed"    
    //%group="Keyboard"
    //% advanced=true
    //% weight=0
    export function anyKeyPressed(): boolean {
        return keyPressed;
    }

    /**
     * Releases a specified key.
     * @param key the key to release
     */
    //% blockId="makeymakey_release_key" block="release key %key"
    //%group="Keyboard"
    //% weight=10
    export function release(key: KeyRelease): void {
        if (key === KeyRelease.ALL) {
            for (let i = 8; i < 14; i++) {
                sx1509_digitalWrite(i, true);
            }
        } else {
            switch (key) {
                case KeyRelease.W:
                    sx1509_digitalWrite(KeyPress.W, true);
                    break;
                case KeyRelease.A:
                    sx1509_digitalWrite(KeyPress.A, true);
                    break;
                case KeyRelease.S:
                    sx1509_digitalWrite(KeyPress.S, true);
                    break;
                case KeyRelease.D:
                    sx1509_digitalWrite(KeyPress.D, true);
                    break;
                case KeyRelease.F:
                    sx1509_digitalWrite(KeyPress.F, true);
                    break;
                case KeyRelease.G:
                    sx1509_digitalWrite(KeyPress.G, true);
                    break;
            }
        }
    }

    /**
     * Begins moving the mouse in the specified direction.
     * @param direction the direction in which to move the mouse
     */
    //% blockId="makeymakey_move_mouse" block="begin moving mouse %direction"
    //%group="Mouse"
    //% weight=100
    //% advanced=true
    export function moveMouse(direction: MouseDirections): void {
        sx1509_digitalWrite(direction, false);
    }

    /**
     * Checks if any Makey Makey mouse button is currently pressed.
     */
    //% blockId="makeymakey_any_mouse_clicked" block="any Makey Makey mouse button pressed"
    //%group="Mouse"
    //% weight=0
    //% advanced=true
    export function anyMouseClicked(): boolean {
        return mouseClicked;
    }

    /**
     * Stops the mouse from moving in the specified direction.
     * @param direction the direction in which to stop the mouse
     */
    //% blockId="makeymakey_stop_mouse" block="stop mouse %direction"
    //%group="Mouse"
    //% weight=90
    //% advanced=true
    export function stopMouse(direction: MouseDirections): void {
        sx1509_digitalWrite(direction, true);
    }

    /**
     * Presses a specified mouse button.
     * @param button the mouse button to press
     */
    //% blockId="makeymakey_press_mouse_button" block="press mouse button %button"
    //%group="Mouse"
    //% weight=20
    export function pressMouseButton(button: MouseButtons): void {
        sx1509_digitalWrite(button, false);
    }

    /**
     * Releases a specified mouse button.
     * @param button the mouse button to release
     */
    //% blockId="makeymakey_release_mouse_button" block="release mouse button %button"
    //%group="Mouse"
    //% weight=10
    export function releaseMouseButton(button: MouseButtons): void {
        sx1509_digitalWrite(button, true);
    }

    /**
     * Simulates a click of a specified mouse button.
     * @param button the mouse button to click
     */
    //% blockId="makeymakey_click_mouse_button" block="click mouse button %button"
    //%group="Mouse"
    //% weight=100
    export function clickMouse(button: MouseButtons): void {
        pressMouseButton(button);
        basic.pause(DEBOUNCE_TIME);
        releaseMouseButton(button);
        basic.pause(DEBOUNCE_TIME);
    }

    /**
     * Moves the mouse in a specified direction for a certain amount of time.
     * @param direction the direction to move the mouse
     * @param ms the duration in milliseconds to move the mouse
     */
    //% blockId="makeymakey_move_mouse_for_ms" block="move mouse %direction|for %ms|ms"
    //%group="Mouse"
    //% ms.shadow=timePicker
    export function moveMouseForMilliseconds(direction: MouseDirections, ms: number): void {
        moveMouse(direction);
        basic.pause(ms);
        stopMouse(direction);
        basic.pause(DEBOUNCE_TIME);
    }
    //% advanced=true
    //% group="Advanced"
    //% weight=0
    //% block="set debounce %ms"
    export function setDebounce(ms: number): void {
        DEBOUNCE_TIME = ms;
    }


    // Event handlers
    let onKeyPressedHandler: () => void;
    let onMouseClickedHandler: () => void;
    let bothPressedHandler: () => void;
    let onKeyReleasedHandler: () => void;
    let onMouseReleasedHandler: () => void;
    let allReleasedHandler: () => void;

    //% block="when Makey Makey %event"
    //% group="Events"
    //% weight=0
    export function onPressEvent(event: MakeyMakeyPressEventTypes, handler: () => void): void {
        if (event === MakeyMakeyPressEventTypes.KeyPressed) {
            onKeyPressedHandler = handler;
        } else if (event === MakeyMakeyPressEventTypes.MouseClicked) {
            onMouseClickedHandler = handler;
        } else if (event === MakeyMakeyPressEventTypes.BothPressed) {
            bothPressedHandler = handler;
        }
    }

    //% block="when all Makey Makey %event"
    //% group="Events"
    //% advanced=true
    //% weight=0
    export function onReleaseEvent(event: MakeyMakeyReleaseEventTypes, handler: () => void): void {
        if (event === MakeyMakeyReleaseEventTypes.KeyReleased) {
            onKeyReleasedHandler = handler;
        } else if (event === MakeyMakeyReleaseEventTypes.MouseReleased) {
            onMouseReleasedHandler = handler;
        } else if (event === MakeyMakeyReleaseEventTypes.AllReleased) {
            allReleasedHandler = handler;
        }
    }

    //% block="when Makey Makey key pressed"
    //%group="Keyboard"
    export function whenKeyPressed(handler: () => void): void {
        onKeyPressedHandler = handler;
    }
    //%group="Mouse"
    //% weight=0
    //% block="when Makey Makey mouse clicked"
    export function whenMouseClicked(handler: () => void): void {
        onMouseClickedHandler = handler;
    }

    function sx1509_digitalRead(pin: number): number {
        let register = pin < 8 ? REG_DATA_A : REG_DATA_B;
        pins.i2cWriteNumber(
            SX1509_ADDRESS,
            register,
            NumberFormat.UInt8LE,
            true
        )
        let currentValue = pins.i2cReadNumber(SX1509_ADDRESS, NumberFormat.UInt8LE, false);
        let data = (1 << (pin % 8));
        return (currentValue & data) > 0 ? 1 : 0;
    }

}
