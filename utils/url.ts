export const getHashParams = () => {
  const hashParams = {} as any
  let r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1)
  let e = r.exec(q)

  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2])
    e = r.exec(q)
  }
  
  return hashParams
 }
