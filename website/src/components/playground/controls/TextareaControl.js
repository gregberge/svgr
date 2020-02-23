import * as React from 'react'
import { Field } from 'react-final-form'
import { Textarea } from '@smooth-ui/core-sc'

export function TextareaControl(props) {
  return (
    <Field
      render={({ input, ...props }) => (
        <Textarea fontSize={12} rows={4} {...input} {...props} />
      )}
      {...props}
    />
  )
}
