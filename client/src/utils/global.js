module.exports.modelData = (model, data) => {
  let m = JSON.parse(JSON.stringify(model))
  Object.keys(model).forEach(k => {  if (data[k] != null) m[k] = data[k] })
  return m
}