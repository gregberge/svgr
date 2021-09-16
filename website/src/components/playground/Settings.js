import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Form, FormSpy } from 'react-final-form'
import { SettingsFieldBoolean } from './SettingsFieldBoolean'
import { SettingsGroup } from './SettingsGroup'
import { SettingsFieldString } from './SettingsFieldString'
import { SettingsFieldEnum } from './SettingsFieldEnum'
import { SettingsFieldInteger } from './SettingsFieldInteger'

const Container = styled.div`
  font-size: 14;
  color: on-background-light;
  user-select: none;
  width: 200;
  overflow: auto;
  border-right: 1;
  border-color: layout-border;
`

const getGroupSettings = (group, settings) =>
  settings.filter((setting) => setting.group === group)

const settingComponents = {
  boolean: SettingsFieldBoolean,
  string: SettingsFieldString,
  enum: SettingsFieldEnum,
  integer: SettingsFieldInteger,
}

const renderSetting = (setting) => {
  const SettingComponent = settingComponents[setting.type]
  if (!SettingComponent) throw new Error(`Unknown setting type ${setting.type}`)
  return <SettingComponent key={setting.name} setting={setting} />
}

const noop = () => {}

export const Settings = ({ settings, initialValues, onChange }) => {
  return (
    <Form onSubmit={noop} initialValues={initialValues}>
      {() => (
        <>
          <FormSpy
            subscription={{ values: true }}
            onChange={({ values }) => onChange(values)}
          />
          <Container>
            <SettingsGroup title="Global">
              {getGroupSettings('global', settings).map(renderSetting)}
            </SettingsGroup>
            <SettingsGroup title="SVGO">
              {getGroupSettings('svgo', settings).map(renderSetting)}
            </SettingsGroup>
            <SettingsGroup title="Prettier">
              {getGroupSettings('prettier', settings).map(renderSetting)}
            </SettingsGroup>
          </Container>
        </>
      )}
    </Form>
  )
}
