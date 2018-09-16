import React from 'react'
import { Box, FormGroup } from '@smooth-ui/core-sc'
import SmallLabel from './SmallLabel'
import TextareaControl from './controls/TextareaControl'

const SettingsFieldBoolean = ({ setting }) => (
  <Box p="5px 15px">
    <FormGroup>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      <TextareaControl
        id={setting.name}
        placeholder={setting.placeholder}
        model={`.${setting.name}`}
        size="sm"
      />
    </FormGroup>
  </Box>
)

export default SettingsFieldBoolean
