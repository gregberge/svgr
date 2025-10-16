import * as React from 'react'
import styled from '@xstyled/styled-components'
import { useField } from 'react-final-form'

const Textarea = styled.textarea`
  width: 100%;
  font-size: 11;
  border: 1;
  border-color: layout-border;
  border-radius: 3;
`

export const TextareaControl = ({ name, ...props }) => {
  const field = useField(name)
  return <Textarea {...field.input} rows={4} {...props} />
}
