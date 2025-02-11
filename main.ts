namespace LEDMatrix {
    //% block="initialize LED Matrix"
    export function init(): void {
        pins.i2cWriteNumber(0x70, 0x21, NumberFormat.UInt8BE); // Example I2C init
        basic.pause(10);
        pins.i2cWriteNumber(0x70, 0x81, NumberFormat.UInt8BE); // Display ON
        basic.pause(10);
        pins.i2cWriteNumber(0x70, 0xE0 | 7, NumberFormat.UInt8BE); // Set brightness
    }

    //% block="display text %text"
    export function showText(text: string): void {
        // Convert text to matrix data and send via I2C
    }
}
