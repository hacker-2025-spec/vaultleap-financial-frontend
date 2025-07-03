export const formatDate = (date: string) => {
  return !date ? '' : date.replace(/[^\d*]/g, "")
    .replace(/^(.{1,2})(.{1,2})?(.{1,4})?.*$/, (_,x,y,z) =>
      x + (y ? `/${y}` : '') + (z ? `/${z}` : ''))
}