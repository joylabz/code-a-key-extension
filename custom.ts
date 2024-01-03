let DEBOUNCE_TIME = 50

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
    W = 13,
    A = 12,
    S = 11,
    D = 10,
    F = 9,
    G = 8,
}

enum KeyRelease {
    W = 13,
    A = 12,
    S = 11,
    D = 10,
    F = 9,
    G = 8,
    ALL = 0
}

enum MouseDirections {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
}

enum MouseButtons {
    LEFT = 4,
    RIGHT = 5
}

//% groups=['Keyboard', 'Mouse', 'Events', 'Advanced']
//% weight=100 color=#f50019 icon="\uf11c" block="Makey Makey"
namespace MakeyMakey {
    let dir_a = 0
    let SX1509_ADDRESS = 0
    let REG_RESET = 0
    let currentValue = 0
    SX1509_ADDRESS = 62
    let REG_DIR_A = 15
    let REG_DIR_B = 14
    let REG_DATA_A = 17
    let REG_DATA_B = 16
    let SX1509_LED_PIN = 6
    let REG_INPUT_DISABLE_A = 7;
    let REG_INPUT_DISABLE_B = 6;

    let keyPressed = false;
    let mouseClicked = false;



    //% block="Initialize MakeyMakey"
    export function sx1509_init() {
        sx1509_reset();
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
    }

    function sx1509_reset() {
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

    //%group="Keyboard"
    //% weight=100
    //% block="press and release key %key"
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

    //%group="Keyboard"
    //% weight=100
    //% advanced=true
    //% block="press key %key"
    export function pressKey(key: KeyPress): void {
        sx1509_digitalWrite(key, false);
    }

    // reporter function for the keyPressed boolena state
    //%group="Keyboard"
    //% weight=100
    //% block="any Makey Makey key pressed"
    export function anyKeyPressed(): boolean {
        return keyPressed;
    }



    //%group="Keyboard"
    //% weight=90
    //% advanced=true
    //% block="release key %key"
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

    //%group="Mouse"
    //% weight=100
    //% advanced=true
    //% block="begin moving mouse %direction"
    export function moveMouse(direction: MouseDirections): void {
        sx1509_digitalWrite(direction, false);
    }

    //reporter function for the mouseClicked boolean state
    //%group="Mouse"
    //% weight=100
    //% block="any Makey Makey mouse button pressed"
    export function anyMouseClicked(): boolean {
        return mouseClicked;
    }
    
    //%group="Mouse"
    //% weight=90
    //% advanced=true
    //% block="stop mouse %direction"
    export function stopMouse(direction: MouseDirections): void {
        sx1509_digitalWrite(direction, true);
    }
    //%group="Mouse"
    //% weight=200
    //% advanced=true
    //% block="press mouse button %button"
    export function pressMouseButton(button: MouseButtons): void {
        sx1509_digitalWrite(button, false);
    }
    //%group="Mouse"
    //% weight=150
    //% advanced=true
    //% block="release mouse button %button"
    export function releaseMouseButton(button: MouseButtons): void {
        sx1509_digitalWrite(button, true);
    }
    //%group="Mouse"
    //% weight=100
    //% block="click mouse button %button"
    export function clickMouse(button: MouseButtons): void {
        pressMouseButton(button);
        basic.pause(DEBOUNCE_TIME);
        releaseMouseButton(button);
        basic.pause(DEBOUNCE_TIME);
    }

    //%group="Mouse"
    //% block="move mouse %direction|for %seconds|seconds"
    //% seconds.shadow=timePicker
    export function moveMouseForSeconds(direction: MouseDirections, seconds: number): void {
        moveMouse(direction);
        basic.pause(seconds);
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

    //% block = "when Makey Makey %event"
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

    //% block = "when all Makey Makey %event"
    //% group="Events"
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


    // Background loop checking for pin input
    control.inBackground(() => {

        let prevKeyPressedState = true;
        let prevMouseClickedState = true;

        while (true) {
            //setForInput()
            keyPressed = sx1509_digitalRead(14) === 1;
            mouseClicked = sx1509_digitalRead(15) === 1;
          //  setForOutput()
            //console.log(`keyPressed: ${keyPressed}`);

            if (!prevKeyPressedState && keyPressed && onKeyPressedHandler) {
                onKeyPressedHandler();
            } 

            if (!prevMouseClickedState && mouseClicked && onMouseClickedHandler) {
                onMouseClickedHandler();
            }

            if (!prevKeyPressedState && !prevMouseClickedState && keyPressed && mouseClicked && bothPressedHandler) {
                bothPressedHandler();
            }

            if (prevKeyPressedState && prevMouseClickedState && !keyPressed && !mouseClicked && allReleasedHandler) {
                allReleasedHandler();
            }

            if (prevKeyPressedState && !keyPressed && onKeyReleasedHandler) {
                onKeyReleasedHandler();
            }

            if (prevMouseClickedState && !mouseClicked && onMouseReleasedHandler) {
                onMouseReleasedHandler();
            }
            

            prevKeyPressedState  = keyPressed;
            prevMouseClickedState = mouseClicked;
        
            basic.pause(20)
        }
    });

}
