import * as React from 'react'
import { RadioControl } from './controls/RadioControl'
import { SmallLabel } from './SmallLabel'
import { CheckGroup } from './CheckGroup'

export function SettingsFieldEnum({ setting }) {
  return (
    <div>
      <SmallLabel htmlFor={setting.name}>{setting.label}</SmallLabel>
      {setting.values.map((value) => (
        <CheckGroup key={value}>
          <RadioControl
            id={`${setting.name}-${value}`}
            name={setting.name}
            value={value}
          />
          <label htmlFor={`${setting.name}-${value}`}>{value}</label>
        </CheckGroup>
      ))}
    </div>
  )
}
