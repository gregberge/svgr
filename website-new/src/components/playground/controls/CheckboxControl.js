import * as React from 'react'
import { useField } from 'react-final-form'

export const CheckboxControl = ({ name, value, ...props }) => {
  const field = useField(name, { type: 'checkbox', value })
  return <input {...field.input} {...props} />
}
