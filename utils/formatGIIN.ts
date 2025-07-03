export const formatGIIN = (giin: string) => {
  return !giin ? '' : giin.replace(/[^A-Z0-9]/g, "")
    .replace(/^(.{1,6})(.{1,5})?(.{1,2})?(.{1,3})?.*$/, (_, x, y, z, v) =>
      x + (y ? `.${y}` : '') + (z ? `.${z}` : '') + (v ? `.${v}` : ''))
}