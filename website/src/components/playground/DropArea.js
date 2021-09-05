import * as React from 'react'
import styled from '@xstyled/styled-components'

const FullWidth = styled.div`
  width: 100%;
  height: 100%;
`

const ChildWrapper = styled(FullWidth)`
  transition: base;
  opacity: 1;

  &[data-dragging='true'] {
    opacity: 0.1;
  }
`

const Area = styled(FullWidth)`
  position: relative;
`

const DragHelp = styled(FullWidth)`
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

function prevent(event) {
  event.preventDefault()
  event.stopPropagation()
}

export function DropArea({ onChange, children }) {
  const [dragging, setDragging] = React.useState(false)

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
        <DragHelp>
          <p id="drop-zone">
            <span role="img" aria-labelledby="drop-zone">
              📄
            </span>{' '}
            Drop .svg file here.
          </p>
        </DragHelp>
      )}
      <ChildWrapper data-dragging={dragging}>{children}</ChildWrapper>
    </Area>
  )
}
