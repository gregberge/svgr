import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { FormField } from '@smooth-ui/core-sc'
import { TextareaControl } from 'components/playground/controls/TextareaControl'
import { SmallLabel } from './SmallLabel'

export function SettingsFieldString({ setting }) {
  return (
    <Box m={16}>
      <FormField display="flex" flexDirection="column">
        <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
        <TextareaControl
          id={setting.name}
          placeholder={setting.placeholder}
          name={`.${setting.name}`}
          size="sm"
        />
      </FormField>
    </Box>
  )
}
