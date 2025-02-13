namespace LEDMatrix {
    let i2cAddr = 0x70; // Default address for Makeblock LED Matrix

    //% block="Initialize LED Matrix"
    export function init(): void {
        pins.i2cWriteNumber(i2cAddr, 0x21, NumberFormat.UInt8BE); // Start oscillator
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0x81, NumberFormat.UInt8BE); // Display ON
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0xE0 | 7, NumberFormat.UInt8BE); // Set brightness
    }

    //% block="Display text %text"
    export function showText(text: string): void {
        basic.showString(text); // Placeholder: Replace with actual matrix mapping
    }
}
