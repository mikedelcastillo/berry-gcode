import { parseGCode } from "../src/lib/parse"

const TEST_GCODE = `g28\ng0 x123 y345 z420\ns5000 m3`

describe('Parseing GCode', () => {
  it('should read lines properly', async () => {
      const gcodes = parseGCode(TEST_GCODE)
      expect(gcodes.length).toEqual(3)
      expect(gcodes[0].command).toEqual("G28")
      expect(gcodes[1].command).toEqual("G0")
      expect(gcodes[1].parameters.X).toEqual(123)
      expect(gcodes[1].parameters.Y).toEqual(345)
      expect(gcodes[1].parameters.Z).toEqual(420)
      expect(gcodes[2].command).toEqual("M3")
      expect(gcodes[2].parameters.S).toEqual(5000)
  })
})
