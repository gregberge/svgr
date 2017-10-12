import { upperFirst, camelCase } from 'lodash'

export const pascalCase = str => upperFirst(camelCase(str))
