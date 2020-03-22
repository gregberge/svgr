import * as React from 'react'

function SvgFile(props) {
  return (
    <svg width={48} height={1} {...props}>
      <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </svg>
  )
}

export default SvgFile
