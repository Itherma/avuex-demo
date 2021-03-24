const API_URL = {}
const files = require.context('.', true, /\.js$/)

files.keys().forEach(key => {
  if (key === './index.js' || key === './util.js') {
    return
  }
  const fils = files(key)
  if (key.includes('url.js')) {
    let k = key.replace(/(^\.\/|\.url.js$)/g, '')
    const ka = k.split('/')
    k = ka[ka.length - 1]
    API_URL[k] = API_URL[k] || {}
    Object.keys(fils).forEach(item => {
      if (item === 'default') API_URL[k] = { ...API_URL[k], ...fils[item] }
      else API_URL[k][item] = fils[item]
    })
  } 
})
export default API_URL
