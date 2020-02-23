import * as React from 'react'
import { Field } from 'react-final-form'
import { Radio } from '@smooth-ui/core-sc'

export function RadioControl(props) {
  return (
    <Field
      type="radio"
      render={({ input, ...props }) => <Radio {...input} {...props} />}
      {...props}
    />
  )
}
