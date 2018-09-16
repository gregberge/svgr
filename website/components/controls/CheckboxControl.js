import React from 'react'
import { Control } from 'react-redux-form'
import { Checkbox } from '@smooth-ui/core-sc'

const CheckboxControl = props => (
  <Control.checkbox component={Checkbox} {...props} />
)

export default CheckboxControl
