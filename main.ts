namespace LEDMatrix {
    const i2cAddr = 0x70; // Default I2C address for the LED Matrix

    //% block="Initialize LED Matrix"
    export function init(): void {
        pins.i2cWriteNumber(i2cAddr, 0x21, NumberFormat.UInt8BE); // Turn on oscillator
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0x81, NumberFormat.UInt8BE); // Display on, blinking off
        basic.pause(10);
        setBrightness(8); // Default brightness
    }

    //% block="Set brightness %level (0-15)"
    export function setBrightness(level: number): void {
        level = Math.max(0, Math.min(level, 15)); // Keep level within 0-15
        pins.i2cWriteNumber(i2cAddr, 0xE0 | level, NumberFormat.UInt8BE);
    }

    //% block="Clear screen"
    export function clearScreen(): void {
        for (let i = 0; i < 16; i++) {
            pins.i2cWriteNumber(i2cAddr, i * 2, NumberFormat.UInt8BE);
            pins.i2cWriteNumber(i2cAddr, 0x00, NumberFormat.UInt8BE);
        }
    }

    //% block="Display bitmap %bitmap"
    export function drawBitmap(bitmap: number[]): void {
        for (let i = 0; i < bitmap.length; i++) {
            let pos = i * 2;
            pins.i2cWriteNumber(i2cAddr, pos, NumberFormat.UInt8BE);
            pins.i2cWriteNumber(i2cAddr, bitmap[i], NumberFormat.UInt8BE);
        }
    }
}
