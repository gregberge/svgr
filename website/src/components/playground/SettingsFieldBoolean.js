import React from 'react'
import { FormCheck, FormCheckLabel, Box } from '@smooth-ui/core-sc'
import CheckboxControl from './controls/CheckboxControl'

const SettingsFieldBoolean = ({ setting }) => (
  <Box p="3px 15px">
    <FormCheck>
      <CheckboxControl id={setting.name} name={`.${setting.name}`} />
      <FormCheckLabel htmlFor={setting.name}>{setting.label}</FormCheckLabel>
    </FormCheck>
  </Box>
)

export default SettingsFieldBoolean
