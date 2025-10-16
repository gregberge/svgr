import * as React from 'react'
import { useState } from 'react'
import styled from '@xstyled/styled-components'

const FullWidth = styled.div`
  width: 100%;
  height: 100%;
`

const ChildWrapper = styled(FullWidth)`
  transition: base;
  opacity: 1;

  &[data-dragging] {
    opacity: 0.1;
  }
`

const Area = styled(FullWidth)`
  position: relative;
`

const Help = styled(FullWidth)`
  position: absolute;
  z-index: 20;
  pointer-events: none;
  padding-top: 20%;
  text-align: center;
  color: light800;
  font-size: 28;
  border: 2px dashed;
  border-color: light800;
`

const prevent = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

export const DropArea = ({ onChange, children }) => {
  const [dragging, setDragging] = useState(false)

  return (
    <Area
      onDragEnterCapture={() => {
        setDragging(true)
      }}
      onDragLeaveCapture={() => {
        setDragging(false)
      }}
      onDragOverCapture={prevent}
      onDrop={prevent}
      onDropCapture={(event) => {
        setDragging(false)
        prevent(event)
        const {
          files: [file],
        } = event.dataTransfer
        if (!file || file.type !== 'image/svg+xml') return

        const fileReader = new FileReader()
        fileReader.onload = () => {
          onChange(fileReader.result)
        }
        fileReader.readAsText(file)
      }}
    >
      {dragging && (
        <Help>
          <p id="drop-zone">📄 Drop .svg file here.</p>
        </Help>
      )}
      <ChildWrapper data-dragging={dragging ? '' : undefined}>
        {children}
      </ChildWrapper>
    </Area>
  )
}
