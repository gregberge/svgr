import React from 'react'
import { Box, FormGroup } from '@smooth-ui/core-sc'
import SmallLabel from 'components/playground/SmallLabel'
import TextareaControl from 'components/playground/controls/TextareaControl'

const SettingsFieldBoolean = ({ setting }) => (
  <Box p="5px 15px">
    <FormGroup display="flex" flexDirection="column">
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      <TextareaControl
        id={setting.name}
        placeholder={setting.placeholder}
        name={`.${setting.name}`}
        size="sm"
      />
    </FormGroup>
  </Box>
)

export default SettingsFieldBoolean
