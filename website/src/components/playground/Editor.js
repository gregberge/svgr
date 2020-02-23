import * as React from 'react'
import { useColorMode } from '@xstyled/styled-components'

import AceEditor from 'react-ace'
import 'brace'
import 'brace/mode/xml'
import 'brace/mode/jsx'
import 'brace/theme/tomorrow_night'
import 'brace/theme/github'

const editorProps = { $blockScrolling: true }

export default function Editor(props) {
  const [colorMode] = useColorMode()
  const theme = colorMode === 'dark' ? 'tomorrow_night' : 'github'
  return (
    <AceEditor
      key={theme}
      width="100%"
      height="100%"
      showPrintMargin={false}
      theme={theme}
      editorProps={editorProps}
      scrollMargin={[10, 0, 0, 0]}
      fontSize={13}
      {...props}
    />
  )
}
