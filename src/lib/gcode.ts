const GCODE_INSTRUCTION_LETTERS = ["G", "M"]
const GCODE_COMMENT_REGEX = /\(.*?\)/

export type GCode = {
  command: string,
  parameters: Record<string, string | number>,
  line: string,
  cleanLine: string,
}

export const parseGCode = (data: string): GCode[] => {
  return data.trim().split(/[\n\r]+/).map(line => parseLine(line))
}

export const parseLine = (line: string): GCode => {
  const cleanLine = line.replace(GCODE_COMMENT_REGEX, "")
  const gcode: GCode = {
    command: "",
    parameters: {},
    line,
    cleanLine,
  }

  const words = cleanLine
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

export const parametersToString = (parameters: GCode["parameters"]) => 
  Object.entries(parameters)
    .map(word => word.join(""))
      .join(" ")