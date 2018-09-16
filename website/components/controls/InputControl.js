import React from 'react'
import { Control } from 'react-redux-form'
import { Input } from '@smooth-ui/core-sc'

const InputControl = props => <Control.input {...props} component={Input} />

export default InputControl
