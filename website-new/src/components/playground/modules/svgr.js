import fetch from 'isomorphic-fetch'

/* eslint-env browser */
export async function svgr(code, options = {}) {
  const res = await fetch('https://api.react-svgr.com/api/svgr', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ code, options }),
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.output
}
