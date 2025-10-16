import * as React from 'react'
import { useField } from 'react-final-form'

export const RadioControl = ({ name, value, ...props }) => {
  const field = useField(name, { type: 'radio', value })
  return <input {...field.input} {...props} />
}
