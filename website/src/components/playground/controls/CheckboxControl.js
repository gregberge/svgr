import * as React from 'react'
import { Field } from 'react-final-form'
import { Checkbox } from '@smooth-ui/core-sc'

export function CheckboxControl(props) {
  return (
    <Field
      type="checkbox"
      render={({ input: { value, ...inputProps }, ...props }) => (
        <Checkbox {...inputProps} {...props} />
      )}
      {...props}
    />
  )
}
