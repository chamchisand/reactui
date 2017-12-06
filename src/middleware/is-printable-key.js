export default (keycode) => {
  return (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 ||
    (keycode > 64 && keycode < 91)   || // letter keys
    (keycode > 95 && keycode < 112)  || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223);   // [\]' (in order)
}
