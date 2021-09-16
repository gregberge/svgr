import * as React from 'react'
import { CheckGroup } from './CheckGroup'
import { CheckboxControl } from './controls/CheckboxControl'

export function SettingsFieldBoolean({ setting }) {
  return (
    <CheckGroup>
      <CheckboxControl id={setting.name} name={setting.name} />
      <label htmlFor={setting.name}>{setting.label}</label>
    </CheckGroup>
  )
}
