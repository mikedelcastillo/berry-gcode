const GCODE_COMMAND_START = ["G", "M"]
const GCODE_IGNORE_COMMAND = ["G93", "G94", "G95"]
const GCODE_COMMENT_REGEX = /\(.*?\)|\;.*$/

export type GCode = {
  command: string,
  parameters: Record<string, string | number>,
  rawLine: string,
  cleanLine: string,
}

export const parseGCode = (data: string): GCode[] => {
  return data.trim()
    .split(/[\n\r]+/gmi)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => parseLine(line))
    .filter(gcode => gcode.cleanLine.length > 0)
}

export const parseLine = (line: string): GCode => {
  const cleanLine = line.replace(GCODE_COMMENT_REGEX, "").toUpperCase()
  const gcode: GCode = {
    command: "",
    parameters: {},
    rawLine: line,
    cleanLine,
  }

  const words = cleanLine
    .trim()
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 0)

  for(const word of words){
    const isCommand = GCODE_COMMAND_START.includes(word[0])
    const shouldIgnoreCommand = GCODE_IGNORE_COMMAND.includes(word)
    if(isCommand && !shouldIgnoreCommand){
      gcode.command = word
    } else{
      const rawValue = word.slice(1)
      const numValue = Number(rawValue)
      const value = isNaN(numValue) ? rawValue : numValue
      gcode.parameters[word[0]] = value
    }
  }

  gcode.cleanLine = `${gcode.command} ${parametersToString(gcode.parameters)}`.trim()

  return gcode
}

export const parametersToString = (parameters: GCode["parameters"]) => 
  Object.entries(parameters)
    .map(word => word.join("").toUpperCase())
    .sort(([a], [b]) => a.charCodeAt(0) - b.charCodeAt(0))
    .join(" ")