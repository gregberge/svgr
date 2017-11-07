import SVGO from 'svgo'

export default async (code, opts) => {
  const svgo = new SVGO(opts)
  const { data } = await svgo.optimize(code)
  return data
}
