export const formatSSN = (ssn: string) => {
  return !ssn ? '' : ssn.replace(/[^\d*]/g, "")
    .replace(/^(.{1,3})(.{1,2})?(.{1,4})?.*$/, (_,x,y,z) =>
      x + (y ? `-${y}` : '') + (z ? `-${z}` : ''))
}