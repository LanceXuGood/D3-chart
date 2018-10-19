import _ from 'lodash'
import * as d3 from 'd3'
import './index.scss'

const color = d3.scaleOrdinal(d3.schemePaired)

const x = d3.scaleLinear()
  .range([0, 2 * Math.PI])

const updown = ({ x0, x1 }) => {
  const value = (x(x0) - x(x1)) / 2 + x(x1)
  return value <= Math.PI * 0.5 || value > 1.5 * Math.PI
}

const textPath = (data, { data: d, x0, x1 }) => {
  // 截取 path
  const [, m, a] = data.split(/[A-Z]/)
  let path = ''
  if (a.split(',').length === 7) {
    path = `M${m}A${a}`
    if (updown({ x0, x1 })) {
      const [x, y] = m.split(',')
      const [rx, ry, rotation, large, sweep, x2, y2] = a.split(',')
      path = `M${x2},${y2}A${rx},${ry},${rotation},${large},${sweep === '0' ? '1' : '0'},${x},${y}`
    }
  }
  return path
}

export default (options) => {
  const { container, source: origin, width, height } = options
  let data = {
    children: origin
  }
  const nameWithCount = d => {
    if (!d.parent) return
    return `${d.data.name}: ${d.data.count}`
  }

  const radius = Math.min(width, height) / 2
  const y = d3.scaleSqrt()
    .range([0, radius])

  // util
  const max = value => Math.max(0, value)
  const min = value => Math.min(2 * Math.PI, value)

  // log

  // 圆弧计算
  const arc = d3.arc()
    .startAngle(d => max(min(x(d.x0))))
    .endAngle(d => max(min(x(d.x1))))
    .innerRadius(d => max(y(d.y0)))
    .outerRadius(d => max(y(d.y1)))

  // 圆弧标签计算
  const arcLabel = d3.arc()
    .startAngle(d => max(min(x(d.x9))))
    .endAngle(d => max(min(x(d.x0))))
    .innerRadius(d => {
      return max(y(d.y0))
    })
    .outerRadius(d => {
      if (d.depth > 1) {
        return max(y(d.y1)) - (radius / ((d.depth) * 6))
      } else if (d.depth === 1) {
        return max(y(d.y1)) - (radius / 8)
      } else {
        return max(y(d.y1))
      }
    })

  const partition = data => {
    const root = d3.hierarchy(data)
      .sum(d => (!d.children || d.children.length === 0) ? d.count : 0)
      .sort((a, b) => b.value - a.value)
    return d3.partition()(root)
  }

  const svg = d3.select(container)
    .attr('viewBox', `0 0 ${width} ${height}`)

  const group = svg.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + (height / 2) + ')')

  let root = partition(data)

  group.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr('d', arc)
    .classed('arc', true)
    .attr('chart-tooltip', nameWithCount)
    .style('stroke', '#fff')
    .attr('fill', d => {
      if (d.depth === 0) {
        return '#fff'
      }
      while (d.depth > 1) d = d.parent
      return color(d.data.name)
    })
    .attr('fill-opacity', d => {
      return 1 - 0.15 * d.depth
    })
    .on('click', click)

  group.selectAll('.text-path')
    .data(root.descendants())
    .enter().append('path')
    .attr('pointer-events', 'none')
    .classed('text-path', true)
    .attr('d', (d) => textPath(arcLabel(d), d))
    .attr('id', d => {
      if (d.depth > 0) {
        return _.kebabCase(d.data.name)
      }
    })
    .style('fill-opacity', 0)

  group.selectAll('text')
    .data(root.descendants())
    .enter().append('text')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none')
    .attr('dy', d => updown(d) ? 15 : -15)
    .style('fill', '#fff')
    .style('font-size', '12px')
    .style('font-family', 'Rubik')
    .style('opacity', (d) => {
      return d.isHideText
    })
    .attr('proportion', d => {
      if (d.depth > 0) {
        return d.value / d.parent.value
      }
    })
    .attr('class', d => {
      if (d.depth > 0) {
        // 第一层显示
        if (d.depth > 1) {
          if (d.value / d.parent.value < 0.1) {
            return `sunburst-visible sunburst-level-${d.depth}`
          }
        }
        return `sunburst-level-${d.depth}`
      }
    })
    .append('textPath')
    .attr('startOffset', '50%')
    .attr('xlink:href', d => {
      if (d.depth > 0) {
        return `#${_.kebabCase(d.data.name)}`
      }
    })
    .text(d => {
      if (d.depth > 0) {
        return d.data.name
      }
    })

  function click (d) {
    if (d.depth >= 1) {
      d3.selectAll(`.sunburst-level-${d.depth + 1}`)._groups[0].forEach(item => {
        if (d3.select(item).classed('sunburst-visible')) {
          if (d3.select(item).attr('proportion') > 0.01) {
            d3.select(item)
              .style('opacity', 1)
          }
        }
      })
    } else {
      // 返回第一层
      d3.selectAll(`.sunburst-visible`)
        .style('opacity', 0)
    }
    const transition = group.transition()
      .duration(750)
      .tween('scale', () => {
        const xd = d3.interpolate(x.domain(), [d.x0, d.x1])
        const yd = d3.interpolate(y.domain(), [d.y0, 1])
        const yr = d3.interpolate(y.range(), [d.y0 ? 100 : 0, radius])
        return (t) => {
          // 重点就在于修改这个比例尺
          x.domain(xd(t))
          y.domain(yd(t)).range(yr(t))
        }
      })
    transition.selectAll('.arc')
      .attrTween('d', (d) => () => arc(d))

    transition.selectAll('.text-path')
      .attrTween('d', (d) => () => {
        return textPath(arcLabel(d), d)
      })

    if (d.depth === 0) {
      return
    }

    d3.selectAll('text')
      .transition()
      .duration(1000)
      .styleTween('fill-opacity', () => {
        return d3.interpolate(0, 1)
      })
  }
}
