import React from 'react'
import { Field } from 'react-final-form'
import { Input } from '@smooth-ui/core-sc'

const InputControl = props => (
  <Field
    render={({ input, ...props }) => <Input {...input} {...props} />}
    {...props}
  />
)

export default InputControl
