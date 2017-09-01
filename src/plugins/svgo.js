import SVGO from 'svgo'

export default async (code, opts) => {
  const svgo = new SVGO(opts)

  return new Promise((resolve, reject) => {
    svgo.optimize(code, result => {
      if (result.error) reject(result.error)
      else resolve(result.data)
    })
  })
}
