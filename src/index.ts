import { watch, promises as fs } from "fs";
import { INDIR, processFile } from "./lib/files";

const run = async () => {
  const filenames = await fs.readdir(INDIR)
  for(const filename of filenames){
    await processFile(filename)
  }

  watch(INDIR, async (_eventType, filename) => {
    await processFile(filename)
  })
}

run()

