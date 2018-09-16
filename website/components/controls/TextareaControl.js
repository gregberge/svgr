import React from 'react'
import { Control } from 'react-redux-form'
import { Textarea } from '@smooth-ui/core-sc'

const TextareaControl = props => (
  <Control.textarea {...props} component={Textarea} />
)

export default TextareaControl
