import * as React from 'react'
import { useField } from 'react-final-form'

export const InputControl = ({ name, ...props }) => {
  const field = useField(name)
  return <input {...field.input} {...props} />
}
