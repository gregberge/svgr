import * as React from 'react'
import { TextareaControl } from './controls/TextareaControl'
import { SmallLabel } from './SmallLabel'

export function SettingsFieldString({ setting }) {
  return (
    <div>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      <TextareaControl
        id={setting.name}
        placeholder={setting.placeholder}
        name={setting.name}
      />
    </div>
  )
}
