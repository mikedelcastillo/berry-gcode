import { watch } from "fs";
import { INDIR, tryRead } from "./lib/files";
import { join } from "path";
import { parseGCode } from "./lib/gcode";

watch(INDIR, async (eventType, filename) => {
  if(filename === null) return
  const filePath = join(INDIR, filename)
  const data = await tryRead(filePath)
  if(typeof data === "undefined") return
  console.log(parseGCode(data))
})