import type { Configuration } from './configuration'
import * as handlers from './handlers'

export const helpers = { handlers, config: {} as Partial<Configuration> }

export type Helpers = typeof helpers
