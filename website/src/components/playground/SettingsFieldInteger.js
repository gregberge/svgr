import React from 'react'
import { Box, FormGroup } from '@smooth-ui/core-sc'
import InputControl from './controls/InputControl'
import SmallLabel from './SmallLabel'

const SettingsFieldBoolean = ({ setting }) => (
  <Box p="5px 15px">
    <FormGroup>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      <InputControl
        type="number"
        size="sm"
        id={setting.name}
        name={`.${setting.name}`}
      />
    </FormGroup>
  </Box>
)

export default SettingsFieldBoolean
