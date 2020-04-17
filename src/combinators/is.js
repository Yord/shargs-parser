module.exports = (...psList) => obj => psList.reduce(
  (bool, ps) => bool && Object.keys(ps).reduce(
    (bool, key) => bool && (typeof ps[key] === 'function' ? ps[key] : (() => false))(obj[key], obj),
    true
  ),
  true
)
