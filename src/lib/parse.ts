export const GCODE_INSTRUCTION_LETTERS = ["G", "M"]

export type GCode = {
  command: string,
  parameters: Record<string, string | number>,
  line: string,
}

export const parseGCode = (data: string): GCode[] => {
  return data.trim().split(/\n+/).map(line => parseLine(line))
}

export const parseLine = (line: string): GCode => {
  const gcode: GCode = {
    command: "",
    parameters: {},
    line,
  }

  const words = line
    .toUpperCase()
    .trim()
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 0)

  for(const word of words){
    if(GCODE_INSTRUCTION_LETTERS.includes(word[0])){
      gcode.command = word
    } else{
      const rawValue = word.slice(1)
      const numValue = Number(rawValue)
      const value = isNaN(numValue) ? rawValue : numValue
      gcode.parameters[word[0]] = value
    }
  }

  return gcode
}