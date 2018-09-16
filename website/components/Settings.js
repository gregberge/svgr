import React from 'react'
import styled from 'styled-components'
import { LocalForm } from 'react-redux-form'
import SettingsFieldBoolean from './SettingsFieldBoolean'
import SettingsGroup from './SettingsGroup'
import SettingsFieldString from './SettingsFieldString'
import SettingsFieldEnum from './SettingsFieldEnum'
import SettingsFieldInteger from './SettingsFieldInteger'

const SettingsContainer = styled.div`
  width: 200px;
  font-size: 14px;
  background-color: #22252b;
  color: #9ea5b3;
  user-select: none;
  overflow: auto;
`

const getGroupSettings = (group, settings) =>
  settings.filter(setting => setting.group === group)

const settingComponents = {
  boolean: SettingsFieldBoolean,
  string: SettingsFieldString,
  enum: SettingsFieldEnum,
  integer: SettingsFieldInteger,
}

const renderSetting = setting => {
  const SettingComponent = settingComponents[setting.type]
  if (!SettingComponent) throw new Error(`Unknown setting type ${setting.type}`)
  return <SettingComponent key={setting.name} setting={setting} />
}

const Settings = ({ settings, initialState, onChange }) => (
  <SettingsContainer direction="column">
    <LocalForm onChange={onChange} initialState={initialState}>
      <SettingsGroup title="Global">
        {getGroupSettings('global', settings).map(renderSetting)}
      </SettingsGroup>
      <SettingsGroup title="SVGO">
        {getGroupSettings('svgo', settings).map(renderSetting)}
      </SettingsGroup>
      <SettingsGroup title="Prettier">
        {getGroupSettings('prettier', settings).map(renderSetting)}
      </SettingsGroup>
    </LocalForm>
  </SettingsContainer>
)

export default Settings
