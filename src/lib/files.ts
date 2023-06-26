import { promises as fs } from "fs";
import { ENV } from "./env";
import path from "path"
import { processData } from "./process";

export const INDIR = path.join(process.cwd(), ENV.INDIR)
export const OUTDIR = path.join(process.cwd(), ENV.OUTDIR)

export const tryRead = async (filePath: string) => {
  try{
    return await fs.readFile(filePath, "utf-8")
  } catch(e){
    console.warn(e)
  }
}

export const processFile = async (filename: string | null) => {
  if(filename === null) return
  const fileId = filename.split(".").slice(0, -1).join(".")
  console.log(`Processing ${fileId}`)
  const filePath = path.join(INDIR, filename)
  const data = await tryRead(filePath)
  if(typeof data === "undefined") return
  const processedData = processData(data)
  const outPath = path.join(OUTDIR, `${fileId}.gcode`)
  await fs.writeFile(outPath, processedData)
}