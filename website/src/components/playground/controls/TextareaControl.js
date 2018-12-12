import React from 'react'
import { Field } from 'react-final-form'
import { Textarea } from '@smooth-ui/core-sc'

const TextareaControl = props => (
  <Field
    render={({ input, ...props }) => <Textarea {...input} {...props} />}
    {...props}
  />
)

export default TextareaControl
