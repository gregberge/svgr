import React from 'react'
import { styled } from '@smooth-ui/core-sc'

const FullWidth = styled.div`
  width: 100%;
  height: 100%;
`
const ChildWrapper = styled(FullWidth)`
  opacity: ${({ dragging }) => (dragging ? 0.1 : 1)};
`
const Area = styled(FullWidth)`
  position: relative;
`

const DragHelp = styled(FullWidth)`
  position: absolute;
  text-align: center;
  color: white;
  font-size: 18px;
  border: 4px dashed white;
`

const prevent = e => {
  e.preventDefault()
  e.stopPropagation()
}

export default class DropArea extends React.Component {
  state = { dragging: false }

  onDrop = e => {
    this.onEnd()
    prevent(e)
    const { files } = e.dataTransfer
    const file = files[0]
    if (!file || file.type !== 'image/svg+xml') {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const text = fileReader.result
      this.props.onChange(text)
    }
    fileReader.readAsText(file)
  }

  onStart = () => this.setState({ dragging: true })

  onEnd = () => this.setState({ dragging: false })

  render() {
    const { dragging } = this.state
    return (
      <Area
        onDragEnterCapture={this.onStart}
        onDragLeaveCapture={this.onEnd}
        onDragOverCapture={prevent}
        onDrop={prevent}
        onDropCapture={this.onDrop}
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
        <ChildWrapper dragging={dragging}>{this.props.children}</ChildWrapper>
      </Area>
    )
  }
}
