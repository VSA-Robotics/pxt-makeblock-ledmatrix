namespace LEDMatrix {
    let i2cAddr = 0x70; // Adjust if needed

    //% block="initialize LED Matrix"
    export function init(): void {
        pins.i2cWriteNumber(i2cAddr, 0x21, NumberFormat.UInt8BE); // Start oscillator
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0x81, NumberFormat.UInt8BE); // Display ON
        basic.pause(10);
        pins.i2cWriteNumber(i2cAddr, 0xE0 | 7, NumberFormat.UInt8BE); // Set brightness
    }

    //% block="display text %text"
    export function showText(text: string): void {
        basic.showString(text); // Placeholder: Replace with actual matrix mapping
    }

    //% block="set brightness %level"
    //% level.min=0 level.max=15
    export function setBrightness(level: number): void {
        let brightnessCommand = 0xE0 | (level & 0x0F); // 0xE0 + brightness (0-15)
        pins.i2cWriteNumber(i2cAddr, brightnessCommand, NumberFormat.UInt8BE);
    }
}
