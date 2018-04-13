export default (keyCode) => {
  return keyCode === 32 || // space
    (keyCode > 47 && keyCode < 58) || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}
