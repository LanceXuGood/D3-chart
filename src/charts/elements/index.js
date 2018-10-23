import { elements } from './data'
import './index.scss'
import * as d3 from 'd3'
import d3Tip from '@/assets/d3-tip'
const tip = d3Tip().offset(function () {
  return [-10, 0] // 位置[y,x]
}).attr('class', 'd3-tip').html(d => {
  return d.name
})
const SIZE = 64
// 表示预留的空白位置， 5表示每个单元格右侧底部空白
const width = (SIZE + 5) * 18 - 5 + 2
const height = (SIZE + 5) * 9 + SIZE / 2 - 5 + 2
const items = [
  { name: 'atomicnumber', x: 5, y: 15, textAnchor: 'start' },
  { name: 'symbol', x: 33, y: SIZE / 2, textAnchor: 'middle' },
  { name: 'patentcount', x: 33, y: 55, textAnchor: 'middle' }
]

export default (options, callback) => {
  const { container, source: origin } = options
  const data = elements(origin)
  const svg = d3.select(container)
    // .attr('width', width)
    // .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .call(tip)

  const group = svg.append('g')
    .attr('transform', `translate(1,1)`)

  const element = group.selectAll('g')
    .data(data)
    .enter().append('g')
    .classed('element', true)
    .attr('transform', ({ x, y }) => {
      return `translate(${x},${y})`
    })

  element.append('rect')
    .attr('class', d => {
      if (d.patentcount) return `zhy-element-cell`
      else return `zhy-element-cell disabled`
    })
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', SIZE)
    .attr('height', SIZE)
    .attr('fill-opacity', ({ patentcount }) => {
      if (!patentcount) return 0.8
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on('click', function (d) {
      callback && callback(d, d3.event, d3.select(this))
    })

  items.forEach(({ name, x, y, fontSize, textAnchor }) => {
    element.append('text')
      .attr('class', d => {
        if (d.patentcount) return `zhy-${name}`
        else return `zhy-${name} disabled`
      })
      .style('text-anchor', textAnchor)
      .attr('pointer-events', 'none')
      .attr('x', x)
      .attr('y', y)
      .text(d => {
        const value = d[name]
        if (name === 'patentcount') {
          if (value) return d3.format(',')(value)
          else return `--`
        }
        return value
      })
  })
}
