export type TransformAttributes = boolean | ((key: string) => string)

export interface Configuration {
  transformAttributes: TransformAttributes
}

export const getConfig = <K extends keyof Configuration>(
  config: Partial<Configuration> = {},
  key: K,
): Configuration[K] => {
  switch (key) {
    case 'transformAttributes':
      return config.transformAttributes ?? true
    default:
      throw new Error(`Unknown option ${key}`)
  }
}
