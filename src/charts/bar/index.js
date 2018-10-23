import * as d3 from 'd3'
import './index.scss'

const color = ['#27b4d1', '#417fe5', '#21be48', '#e68f50']
export default (options, callback) => {
  const {
    width,
    height,
    container,
    source: data
  } = options

  //
  const rows = data.length
  // TODO: 计算出比列，相对于当前宽度
  // 1. 找出row的最大值
  const maxValue = d3.max(data, d => d.count)
  const opacityRange = d3.range(0.2, 1, 0.8 / 6)
  const formatData = data.map((row, rowIndex) => {
    let x = 0
    // 计算出每一行相对于最大宽度的长度
    const rowWidth = (row.count / maxValue) * width
    // const maxRowValue = d3.max(row.children, r => r.count)
    return {
      ...row,
      children: row.children.map((cell, cellIndex) => {
        x += cellIndex > 0 ? rowWidth * (row.children[cellIndex - 1].count / row.count) + 1 : 0
        // 占比
        const sc = cell.count / row.count
        // 计算相对于row
        const opacity = opacityRange[opacityRange.length - 1 - cellIndex]
        return {
          ...cell,
          sc,
          opacity,
          width: rowWidth * sc, // 这里要注意，转化成相对于当前图形的尺寸
          x: x,
          color: color[rowIndex]
        }
      })
    }
  })

  const y = d3.scaleLinear()
    .domain([0, rows - 1])
    .range([0, 40 * 4])

  const svg = d3.select(container)
  // .attr('width', width)
  // .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)

  const group = svg.append('g')
    .attr('transform', `translate(${0},${24})`)

  const row = group.selectAll('.row')
    .data(formatData)
    .enter().append('g')
    .attr('class', 'row')
    .attr('transform', (d, i) => `translate(0,${y(i)})`)
    .text(d => d.name)

  // label
  row.append('g')
    .attr('class', 'row-label')
    .attr('height', 24)
    .append('text')
    .text(d => d.name)

  const cell = row.selectAll('.cell')
    .data(d => d.children)
    .enter().append('g')
    .attr('class', 'cell')
    .attr('transform', (d, i) => {
      if (i > 0) {
        return `translate(${d.x}, 8)`
      } else {
        return `translate(0, 8)`
      }
    })

  cell.append('rect')
    .attr('width', d => d.width)
    .attr('height', 24)
    .style('fill', (d) => d.color)
    .style('opacity', (d) => d.opacity)
}
