const compose = (...fs) => a => {
  let res = a
  for (let i = fs.length - 1; i >= 0; i--) res = fs[i](res)
  return res
}

module.exports = {
  compose
}