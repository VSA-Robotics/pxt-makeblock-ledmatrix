namespace LEDMatrix {
    const i2cAddr = 0x70; // Default I2C address for the LED Matrix

    // Initialize the LED Matrix
    export function init(): void {
        pins.i2cWriteNumber(i2cAddr, 0x21, NumberFormat.UInt8BE); // Turn on oscillator
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0x81, NumberFormat.UInt8BE); // Display on, blinking off
        basic.pause(10);
        setBrightness(15); // Set brightness to max (0 to 15)
    }

    // Set the brightness of the display (0 to 15)
    export function setBrightness(level: number): void {
        if (level < 0) level = 0;
        if (level > 15) level = 15;
        pins.i2cWriteNumber(i2cAddr, 0xE0 | level, NumberFormat.UInt8BE);
    }

    // Clear the display
    export function clear(): void {
        for (let i = 0; i < 16; i++) {
            pins.i2cWriteNumber(i2cAddr, i * 2, NumberFormat.UInt8BE);
            pins.i2cWriteNumber(i2cAddr, 0x00, NumberFormat.UInt8BE);
        }
    }

    // Display a character on the LED Matrix
    export function showChar(char: string): void {
        // Define a simple font for characters A-Z (5x7)
        const font: { [key: string]: number[] } = {
            "A": [0x1F, 0x05, 0x05, 0x1F, 0x00],
            // Add other characters as needed
        };

        const data = font[char.toUpperCase()];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                pins.i2cWriteNumber(i2cAddr, i * 2, NumberFormat.UInt8BE);
                pins.i2cWriteNumber(i2cAddr, data[i], NumberFormat.UInt8BE);
            }
        }
    }
}

