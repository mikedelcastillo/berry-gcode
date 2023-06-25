import { parseGCode } from "./gcode"

export const process = (data: string) => {
  const gcode = parseGCode(data)
}