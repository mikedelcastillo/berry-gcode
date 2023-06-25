import { promises as fs } from "fs";
import { ENV } from "./env";
import path from "path"

export const INDIR = path.join(process.cwd(), ENV.INDIR)
export const OUTDIR = path.join(process.cwd(), ENV.OUTDIR)

export const tryRead = async (filePath: string) => {
  try{
    return await fs.readFile(filePath, "utf-8")
  } catch(e){
    console.warn(e)
  }
}