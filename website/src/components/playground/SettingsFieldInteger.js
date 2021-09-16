import * as React from 'react'
import { InputControl } from './controls/InputControl'
import { SmallLabel } from './SmallLabel'

export function SettingsFieldInteger({ setting }) {
  return (
    <div>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      <InputControl type="number" id={setting.name} name={setting.name} />
    </div>
  )
}
