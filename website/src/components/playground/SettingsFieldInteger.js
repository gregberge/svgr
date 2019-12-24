import React from 'react'
import { Box } from '@xstyled/styled-components'
import { FormField } from '@smooth-ui/core-sc'
import { InputControl } from './controls/InputControl'
import { SmallLabel } from './SmallLabel'

export function SettingsFieldInteger({ setting }) {
  return (
    <Box m={16}>
      <FormField>
        <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
        <InputControl
          type="number"
          size="sm"
          id={setting.name}
          name={`.${setting.name}`}
        />
      </FormField>
    </Box>
  )
}
