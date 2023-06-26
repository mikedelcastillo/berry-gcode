import { GCode, parseGCode } from "./gcode"

const GCODE_ADD_DWELL = ["M3", "M4", "M5"]
const GCODE_IGNORE = ["G54", "M8", "M9"]

export const processData = (data: string) => {
  const output: string[] = []

  let lastG: GCode | null = null
  let lastM: GCode | null = null

  const gcodes = parseGCode(data)
  for(const gcode of gcodes){
    if(GCODE_IGNORE.includes(gcode.command)) continue
    
    if(gcode.command.startsWith("G")) lastG = gcode
    if(gcode.command.startsWith("M")) lastM = gcode
    
    if(gcode.command === "" && gcode.cleanLine !== ""){
      if(typeof gcode.parameters.T === "number"){
        // Ignore tool change
      } else if(gcode.command === "" && typeof gcode.parameters.S === "number"){
        output.push(`${lastM?.command} S${gcode.parameters.S}`)
      }else if(lastG !== null && ["G0", "G1", "G2", "G3"].includes(lastG.command)){
        output.push(`${lastG.command} ${gcode.cleanLine}`)
      } else{
        throw new Error(`Don't know what to do with "${gcode.rawLine}"`)
      }
    } else{
      output.push(gcode.cleanLine)

      // Add dwell to M3, M4, M5
      if(GCODE_ADD_DWELL.includes(gcode.command)){
        output.push(`G4 P5`) // Wait 5 seconds
      }
    }
  }
  return output.join("\n")
}