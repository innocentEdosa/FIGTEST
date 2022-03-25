const placeholderColors = [
  '#55efc4',
  '#81ecec',
  '#74b9ff',
  '#a29bfe',
  '#ffeaa7',
  '#fab1a0',
  '#e17055',
  '#0984e3',
  '#badc58',
  '#c7ecee',
]

const getColor = () =>
  placeholderColors[Math.floor(Math.random() * placeholderColors.length)]

export default getColor
