// TODO: 不依赖任何框架
import './index.scss'
import * as d3 from 'd3'
import d3Tip from '@/assets/d3-tip'
const tip = d3Tip().direction('w').attr('class', 'd3-tip').html(d => {
  if (typeof d === 'object') {
    return d.x
  }
  return d
})

/**
 * 绘制 https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf
 * @param space // cell右侧间隔
 * @param square // cell 尺寸
 * @param textLeftDis // 左侧文本距离
 * @param textTopDis // 顶部文本距离
 * @param highLightColor // 高亮颜色
 * @param source // 数据
 * @param container // select
 * @param callback(selectedData, event, d3SelectedObject) 点击事件的回调
 */
export default ({ space, square, textLeftDis, textTopDis, highLightColor, source, container }, callback) => {
  // 计算方正的大小
  const labelsData = {
    x: source.x,
    y: source.y
  }
  labelsData.formatAxisx = labelsData.x.map(item => {
    return item.length < 20 ? item : {
      x: item,
      formatX: `${item.substring(0, 20)}...`
    }
  })

  const startColor = '#fafbfc'
  const endColor = '#344563'

  const { data } = source

  if (!data) {
    throw new Error('Please pass data')
  }

  if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
    throw new Error('It should be a 2-D array')
  }

  const maxValue = d3.max(data, layer => d3.max(layer, d => d.value))
  const minValue = 0

  const rows = data.length
  const cols = data[0].length

  const rectSvgWidth = (rows - 1) * (square + space) + square + textLeftDis * 2
  const rectSvgHeight = (cols - 1) * (square + space) + square + textTopDis

  // 取出长宽最大值
  const value = rectSvgWidth > rectSvgHeight ? rectSvgWidth : rectSvgHeight

  // 设置最小值
  const size = value < 500 ? 500 : value

  // 添加提示框的div
  // const tooltip = d3.select('body').append('div')
  //   .attr('class', 'tooltip')
  //   .style('opacity', 0.0)

  // 考虑计算图形的长度，所以不预先设定长宽，采用动态计算的方式
  const svg = d3.select(container)
    .attr('width', rectSvgWidth)
    .attr('height', rectSvgHeight)
    // .attr('viewBox', `0 0 ${rectSvgWidth} ${rectSvgHeight}`)
    .call(tip)

  const cellSize = (size - 400) / (rows > cols ? rows : cols)
  const CELL_SIZE = cellSize > 50 ? 50 : cellSize

  // const fontSize = Math.ceil(CELL_SIZE / 3)

  const x = d3.scaleLinear()
    .domain([0, cols - 1])
    .range([0, (CELL_SIZE + space) * cols])

  const y = d3.scaleLinear()
    .domain([0, rows - 1])
    .range([0, (CELL_SIZE + space) * rows])

  const colorMap = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([startColor, endColor])

  const group = svg.append('g')
    .attr('transform', `translate(${textLeftDis},${textTopDis})`)

  // zoom(svg, { width, height, group })
  // 行
  const row = group.selectAll('.row')
    .data(data)
    .enter().append('g')
    .attr('class', (d, i) => {
      return i !== 0 ? 'row' : 'row row-active'
    })
    .attr('transform', (d, i) => {
      return `translate(0,${y(i)})`
    })

  // 制作边框效果
  row.append('rect')
    .data(data)
    .attr('width', x(20))
    // 8表示上下间隔
    .attr('height', CELL_SIZE + space)
    .style('fill', 'none')
    // 预留选中效果
    .attr('stroke', (d, i) => {
      return d.isActive ? highLightColor : 'transparent'
    })
    .attr('stroke-width', '2')
    .attr('rx', '8')
    .attr('ry', '8')

  // 单元格
  const cell = row.selectAll('.cell')
    .data(d => d)
    .enter().append('g')
    .attr('class', 'cell')
    .attr('data-iq', d => d.iq)
    .attr('transform', (d, i) => `translate(${x(i) + space / 2}, ${space / 2})`)
    .style('fill', d => {
      if (d.value === 0) {
        return startColor
      }
      return colorMap(d.value)
    })
    .on('click', function (d) {
      callback && callback(d, d3.event, d3.select(this))
    })

  cell.append('rect')
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('rx', '4')
    .attr('ry', '4')

  cell.append('text')
    .attr('dy', '.32em')
    .attr('x', CELL_SIZE / 2)
    .attr('y', CELL_SIZE / 2)
    .style('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none')
    .text(d => d.value)

  const labels = group.append('g')
    .attr('class', 'labels')

  const columnLabels = labels.selectAll('.column-label')
    .data(labelsData.formatAxisx)
    .enter().append('g')
    .attr('class', 'column-label')
    .attr('transform', (d, i) => `translate(${x(i)}, ${0 - CELL_SIZE})`)
    // 利用d3-tip.js 来实现
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  columnLabels.append('text')
    .attr('x', 0)
    .attr('y', CELL_SIZE / 2)
    .attr('dy', '.82em')
    .attr('text-anchor', 'start')
    .attr('transform', 'rotate(-70)')
    .attr('chart-tooltip', d => d)
    .text(d => {
      if (typeof d === 'object') {
        return d.formatX
      }
      return d
    })

  const rowLabels = labels.selectAll('.row-label')
    .data(labelsData.y)
    .enter().append('g')
    .attr('class', 'row-label')
    .attr('transform', (d, i) => `translate(0,${y(i)})`)

  rowLabels.append('text')
    .attr('x', -8)
    .attr('y', CELL_SIZE / 2)
    .attr('dy', '.32em')
    .attr('text-anchor', 'end')
    .text(d => d)
}
