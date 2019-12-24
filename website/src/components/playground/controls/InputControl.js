import React from 'react'
import { Field } from 'react-final-form'
import { Input } from '@smooth-ui/core-sc'

export function InputControl(props) {
  return (
    <Field
      render={({ input, ...props }) => <Input {...input} {...props} />}
      {...props}
    />
  )
}
