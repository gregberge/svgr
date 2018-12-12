import React from 'react'
import { Box, FormGroup, FormCheck, FormCheckLabel } from '@smooth-ui/core-sc'
import RadioControl from 'components/playground/controls/RadioControl'
import SmallLabel from './SmallLabel'

const SettingsFieldBoolean = ({ setting }) => (
  <Box p="5px 15px">
    <FormGroup>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      {setting.values.map(value => (
        <FormCheck key={value}>
          <RadioControl
            id={`${setting.name}-${value}`}
            name={`.${setting.name}`}
            value={value}
          />
          <FormCheckLabel htmlFor={`${setting.name}-${value}`}>
            {value}
          </FormCheckLabel>
        </FormCheck>
      ))}
    </FormGroup>
  </Box>
)

export default SettingsFieldBoolean
