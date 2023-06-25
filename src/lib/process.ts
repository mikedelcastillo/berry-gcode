import { parseGCode } from "./parse"

export const process = (data: string) => {
  const gcode = parseGCode(data)
}