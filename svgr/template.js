// src/components/icons/svg-template.js

const comments = `
// Auto-generated file created by svgr-cli source svg-template.js
// Run yarn icons:create to update
// Do not edit
`
const template = (variables, { tpl }) => {
  return tpl`
${comments}
import type { SVGProps } from 'react'

const ${variables.componentName} = (props: SVGProps<SVGSVGElement> & { size?: string | number | undefined }) => (
  ${variables.jsx}
);
${variables.exports};
`
}

module.exports = template
