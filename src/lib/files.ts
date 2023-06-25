import { ENV } from "./env";
import path from "path"

export const INDIR = path.join(process.cwd(), ENV.INDIR)
export const OUTDIR = path.join(process.cwd(), ENV.OUTDIR)
