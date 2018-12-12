import fetch from 'isomorphic-fetch'

/* eslint-env browser */
async function svgr(code, options = {}) {
  const res = await fetch('https://svgr.now.sh/api/svgr', {
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

export default svgr
