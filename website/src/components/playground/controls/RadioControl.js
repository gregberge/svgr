import React from 'react'
import { Field } from 'react-final-form'
import { Radio } from '@smooth-ui/core-sc'

const RadioControl = props => (
  <Field
    type="radio"
    render={({ input, ...props }) => <Radio {...input} {...props} />}
    {...props}
  />
)

export default RadioControl
