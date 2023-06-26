import { parametersToString, parseGCode, parseLine } from "../src/lib/gcode"

describe('parsing gcode', () => {
  it('should read lines properly', async () => {
      const gcodes = parseGCode(`g28\ng0 x123 y345 z420\ns5000 m3`)
      expect(gcodes.length).toEqual(3)
      expect(gcodes[0].command).toEqual("G28")
      expect(gcodes[1].command).toEqual("G0")
      expect(gcodes[1].parameters.X).toEqual(123)
      expect(gcodes[1].parameters.Y).toEqual(345)
      expect(gcodes[1].parameters.Z).toEqual(420)
      expect(gcodes[2].command).toEqual("M3")
      expect(gcodes[2].parameters.S).toEqual(5000)
  })

  it('should ignore parenthesis comments', async () => {
    const gcode = parseLine("(2D Contour)")
    expect(gcode.command).toBe("")
    expect(gcode.cleanLine).toBe("")
    expect(Object.values(gcode.parameters).length).toBe(0)
  })

  it('should ignore semicolon comments', async () => {
    const gcode = parseLine(";FLAVOR:Marlin")
    expect(gcode.command).toBe("")
    expect(gcode.cleanLine).toBe("")
    expect(Object.values(gcode.parameters).length).toBe(0)
  })

  it('should ignore comments', async () => {
    const gcode = parseLine("(2D Contour)")
    expect(gcode.command).toBe("")
    expect(gcode.cleanLine).toBe("")
    expect(Object.values(gcode.parameters).length).toBe(0)
  })

  it('should ignore G94', async () => {
    const gcode = parseLine("G90 G94")
    expect(gcode.command).toBe("G90")
    expect(gcode.cleanLine).toBe("G90 G94")
  })
})

describe("parameters to string", () => {
  it("should turn parameters to string", () => {
    const params = parametersToString({X: 500, F: 6000})
    expect(params).toBe("F6000 X500")
  })
})