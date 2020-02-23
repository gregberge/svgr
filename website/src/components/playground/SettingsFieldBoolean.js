import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { FormCheck, FormCheckLabel } from '@smooth-ui/core-sc'
import { CheckboxControl } from './controls/CheckboxControl'

export function SettingsFieldBoolean({ setting }) {
  return (
    <Box mx={16} my={8}>
      <FormCheck>
        <CheckboxControl
          scale="sm"
          id={setting.name}
          name={`.${setting.name}`}
        />
        <FormCheckLabel htmlFor={setting.name}>{setting.label}</FormCheckLabel>
      </FormCheck>
    </Box>
  )
}
