import React from 'react'
import { Field } from 'react-final-form'
import { Checkbox } from '@smooth-ui/core-sc'

const CheckboxControl = props => (
  <Field
    type="checkbox"
    render={({ input: { value, ...inputProps }, ...props }) => (
      <Checkbox {...inputProps} {...props} />
    )}
    {...props}
  />
)

export default CheckboxControl
