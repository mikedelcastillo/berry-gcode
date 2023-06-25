const ENV_KEYS = ["INDIR", "OUTDIR"] as const

type EnvKeys = (typeof ENV_KEYS)[number]

const DEFAULT_ENV = {
  "INDIR": "./examples/in",
  "OUTDIR": "./examples/out",
} satisfies Partial<Record<EnvKeys, string>>

type Env = Record<EnvKeys, string>

const getEnv = (): Env => {
  const env = {} as Env
  for(const key of ENV_KEYS){
    const value = process.env[key] || DEFAULT_ENV[key]
    if(typeof value === "undefined")
      throw new Error(`Environment variable "${key}" is undefined.`)
    env[key] = value
  }
  return env
}

export const ENV = getEnv()