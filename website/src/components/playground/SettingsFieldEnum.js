import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { FormField, FormCheck, FormCheckLabel } from '@smooth-ui/core-sc'
import { RadioControl } from 'components/playground/controls/RadioControl'
import { SmallLabel } from './SmallLabel'

export function SettingsFieldEnum({ setting }) {
  return (
    <Box m={16}>
      <FormField>
        <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
        {setting.values.map(value => (
          <FormCheck key={value}>
            <RadioControl
              scale="sm"
              id={`${setting.name}-${value}`}
              name={`.${setting.name}`}
              value={value}
            />
            <FormCheckLabel htmlFor={`${setting.name}-${value}`}>
              {value}
            </FormCheckLabel>
          </FormCheck>
        ))}
      </FormField>
    </Box>
  )
}
