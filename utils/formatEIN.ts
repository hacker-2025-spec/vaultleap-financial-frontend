export const formatEIN = (ein: string) => {
  return !ein ? '' : ein.replace(/[^\d*]/g, "")
    .replace(/^(.{1,2})?(.{1,7})?.*$/, (_,x,y,z) =>
      x + (y ? `-${y}` : '') + (z ? `-${z}` : ''))
}