function line_folow () {
    reromicro.ReadLineSensors()
    if (reromicro.LineSensorDetectsLine(LineSensors.Center)) {
        reromicro.MoveForward(30)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Right)) {
        reromicro.RunMotor(Motors.Left, 30)
        reromicro.RunMotor(Motors.Right, 0)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Left)) {
        reromicro.RunMotor(Motors.Left, 0)
        reromicro.RunMotor(Motors.Right, 35)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Left) && reromicro.LineSensorDetectsLine(LineSensors.Center) && reromicro.LineSensorDetectsLine(LineSensors.Right)) {
        reromicro.RunMotor(Motors.Left, 20)
        reromicro.RunMotor(Motors.Right, 35)
    } else if (reromicro.LineSensorDetectsLine(LineSensors.Center) && reromicro.LineSensorDetectsLine(LineSensors.Right)) {
        reromicro.RunMotor(Motors.Left, 35)
        reromicro.RunMotor(Motors.Right, 20)
    } else {
        reromicro.Brake()
    }
}
let strip = neopixel.create(DigitalPin.P1, 7, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Red))
basic.showString("Ready,")
strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
basic.showString("Get Set")
strip.showColor(neopixel.colors(NeoPixelColors.Green))
basic.showString("Go!")
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    if (reromicro.ReadUltrasonic() <= 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        reromicro.Brake()
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    } else if (reromicro.ReadUltrasonic() > 5) {
        music.stopMelody(MelodyStopOptions.All)
        line_folow()
    } else {
        reromicro.Brake()
    }
})
