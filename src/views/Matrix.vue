<template>
  <div class="matrix-page">
    <!--<a rel="stylesheet" href="https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf">zeplin/-->
    <!--Problem - solution matrix</a>-->
    <div>Problem - solution matrix</div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'

export default {
  name: 'home',
  created () {
    axios.get('/json/matrix.json').then(d => {
      this.$nextTick(() => this.drawMatrix({
        container: '#matrix',
        width: this.width,
        height: this.height,
        source: this.formatResponseData(d.data.results)
      }))
    })
  },
  data () {
    return {
      matrixData: {},
      // 布局类
      square: 32, // 计算整体宽度，高度， 默认的间隔采用8
      textLeftDis: 120, // 左侧文字区域宽度
      textTopDis: 200, // 顶部文字区域高度
      isActiveIndex: 1,
      highLightColor: '#27b4d1'
    }
  },
  methods: {
    formatResponseData (matrixData) {
      // 重新组装数据，将x，y 并入一起
      const { data, x, y } = matrixData
      const newData = []
      // 格式化数据，将取得的数据转换成表格可用数据
      data.forEach((rowItem, rowIndex) => {
        newData[rowIndex] = Object.assign([], { isActive: this.isActiveIndex === rowIndex })
        rowItem.forEach((colItem, colIndex) => {
          newData[rowIndex].push({
            value: colItem,
            iq: `PROBLEM: "${y[colIndex]}" AND SOLUTION:"${x[colIndex]}"`
          })
        })
      })
      return {
        ...matrixData,
        data: newData
      }
    },
    drawMatrix ({ source }) {
      // 计算方正的大小
      const labelsData = {
        x: source.x,
        y: source.y
      }
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

      const rectSvgWidth = (rows - 1) * (this.square + 8) + this.square + this.textLeftDis * 2
      const rectSvgHeight = (cols - 1) * (this.square + 8) + this.square + this.textTopDis

      // 取出长宽最大值
      const value = rectSvgWidth > rectSvgHeight ? rectSvgWidth : rectSvgHeight
      // 设置最小值
      const size = value < 500 ? 500 : value
      // 添加提示框的div
      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0.0)

      const svg = d3.select('.matrix-page').append('svg')
        .attr('width', rectSvgWidth)
        .attr('height', rectSvgHeight)
        .attr('viewBox', `0 0 ${size} ${size}`)

      const cellSize = (size - 400) / (rows > cols ? rows : cols)
      const CELL_SIZE = cellSize > 50 ? 50 : cellSize
      const space = 8
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
        .attr('transform', `translate(${this.textLeftDis},${this.textTopDis})`)

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
        .attr('height', CELL_SIZE + 8)
        .style('fill', 'none')
        // 预留选中效果
        .attr('stroke', (d, i) => {
          return d.isActive ? this.highLightColor : 'transparent'
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
        .attr('transform', (d, i) => `translate(${x(i) + 4},4)`)
        .style('fill', d => {
          if (d.value === 0) {
            return startColor
          }
          return colorMap(d.value)
        })

      cell.append('rect')
        .attr('chart-tooltip', d => {
          return d.value
        })
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
        .data(labelsData.x)
        .enter().append('g')
        .attr('class', 'column-label')
        .attr('transform', (d, i) => `translate(${x(i)}, ${0 - CELL_SIZE})`)
        .on('mouseover', d => {
          tooltip
            .html(d)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY + 20) + 'px')
            .style('opacity', 0.8)
        })
        .on('mouseout', () => {
          tooltip.style('opacity', 0.0)
        })

      columnLabels.append('text')
        .attr('x', 0)
        .attr('y', CELL_SIZE / 2)
        .attr('dy', '.82em')
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(-70)')
        .attr('chart-tooltip', d => d)
        .text(d => d)

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
  }
}
</script>
<style lang="scss">
  .matrix-page {
    .cell {
      cursor: pointer;
      &:hover {
        rect {
          fill: #27b4d1;
        }
        text {
          fill: #fff;
        }
      }
    }
    .labels {
      text {
        line-height: 1.33;
        letter-spacing: 0.4px;
        text-align: right;
        color: #061632;
        font-size: 12px;
      }
    }
    .row-active {
      border-radius: 8px;
      border: solid 2px #27b4d1;
    }
  }

  .tooltip {
    position: absolute;
    padding: 5px;
    width: 156px;
    opacity: 0.8;
    background-color: #344563;
    font-family: Rubik;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: 0.3px;
    text-align: center;
    color: #ffffff;
    border-radius: 4px;
  }

</style>
