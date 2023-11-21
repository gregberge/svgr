export interface Configuration {
  transformAttributes: boolean
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
