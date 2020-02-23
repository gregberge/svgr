import * as React from 'react'

function useScript(src) {
  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [src])
}

export function CodeFund() {
  useScript('https://codefund.io/properties/267/funder.js')
  return <div id="codefund" />
}
