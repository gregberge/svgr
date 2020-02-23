import * as React from 'react'
import styled, { up, css } from '@xstyled/styled-components'
import { Form, FormSpy } from 'react-final-form'
import { SettingsFieldBoolean } from './SettingsFieldBoolean'
import { SettingsGroup } from './SettingsGroup'
import { SettingsFieldString } from './SettingsFieldString'
import { SettingsFieldEnum } from './SettingsFieldEnum'
import { SettingsFieldInteger } from './SettingsFieldInteger'

const SettingsContainer = styled.div`
  width: 100%;
  font-size: 14;
  background-color: light100;
  color: light800;
  user-select: none;
  overflow: auto;
  max-height: 50%;

  ${up(
    'md',
    css`
      width: 200px;
      height: 100%;
      max-height: 100%;
    `,
  )}
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

const noop = () => {}

export function Settings({ settings, initialValues, onChange }) {
  return (
    <Form onSubmit={noop} initialValues={initialValues}>
      {() => (
        <>
          <FormSpy
            subscription={{ values: true }}
            onChange={({ values }) => onChange(values)}
          />
          <SettingsContainer direction="column">
            <SettingsGroup title="Global">
              {getGroupSettings('global', settings).map(renderSetting)}
            </SettingsGroup>
            <SettingsGroup title="SVGO">
              {getGroupSettings('svgo', settings).map(renderSetting)}
            </SettingsGroup>
            <SettingsGroup title="Prettier">
              {getGroupSettings('prettier', settings).map(renderSetting)}
            </SettingsGroup>
          </SettingsContainer>
        </>
      )}
    </Form>
  )
}
