/// //////////////////////////////////////////////////////
/// //////////// The Radar Chart Function ////////////////
/// //////////// Written by Nadieh Bremer ////////////////
/// /////////////// VisualCinnamon.com ///////////////////
/// //////// Inspired by the code of alangrafu ///////////
/// //////////////////////////////////////////////////////

import _ from 'lodash'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
const tip = d3Tip().offset(function () {
  return [-(this.getBBox().height), 0] // 位置[y,x]
}).attr('class', 'd3-tip').html(d => d.value)

const getNumber = multiple => input => {
  let value = input
  while (value % multiple !== 0) {
    value++
  }
  return value
}

const index = (id, data, options, callback) => {
  const cfg = {
    width: 600, // Width of the circle
    height: 600, // Height of the circle
    margin: { top: 50, right: 50, bottom: 50, left: 50 }, // The margins of the SVG
    levels: 3, // How many levels or inner circles should there be drawn
    maxValue: 0, // What is the value that the biggest circle will represent
    labelFactor: 1.15, // How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 100, // The number of pixels after which a label needs to be given a new line
    opacityArea: 0.1, // The opacity of the area of the blob
    dotRadius: 6, // The size of the colored circles of each blog
    opacityCircles: 0.1, // The opacity of the circles of each blob
    strokeWidth: 2, // The width of the stroke around each blob
    roundStrokes: false, // If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scaleOrdinal(d3.schemeCategory10)// Color function
  }

  // Put all of the options into a variable called cfg
  if (typeof options !== 'undefined') {
    for (var i in options) {
      if (typeof options[i] !== 'undefined') { cfg[i] = options[i] }
    }// for i
  }// if

  // If the supplied maxValue is smaller than the actual one, replace by the max in the data
  var maxValue = getNumber(cfg.levels)(cfg.maxValue)

  const allAxis = (data[0].map(function (i, j) { return i.axis })) // Names of each axis
  const total = allAxis.length // The number of different axes
  const radius = Math.min(cfg.width / 2, cfg.height / 2) // Radius of the outermost circle
  // const Format = d3.format('%') // Percentage formatting
  const angleSlice = Math.PI * 2 / total // The width in radians of each "slice"

  // Scale for the radius
  var rScale = d3.scaleLinear()
    .range([50, radius])
    .domain([0, maxValue])

  /// //////////////////////////////////////////////////////
  /// ///////// Create the container SVG and g /////////////
  /// //////////////////////////////////////////////////////

  // Remove whatever chart with the same id/class was present before
  d3.select(id).select('svg').remove()

  const width = cfg.width + cfg.margin.left + cfg.margin.right
  const height = cfg.height + cfg.margin.top + cfg.margin.bottom
  // Initiate the radar chart SVG
  const svg = d3.select(id)
    .attr('width', width)
    .attr('height', height)
    .call(tip)
    // .attr('viewBox', `0 0 ${width} ${height}`)
  // Append a g element
  const g = svg.append('g')
    .attr('transform', 'translate(' + (cfg.width / 2 + cfg.margin.left) + ',' + (cfg.height / 2 + cfg.margin.top) + ')')

  /// //////////////////////////////////////////////////////
  /// /////// Glow filter for some extra pizzazz ///////////
  /// //////////////////////////////////////////////////////

  // Filter for the outside glow
  const filter = g.append('defs').append('filter').attr('id', 'glow')
  filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur')
  const feMerge = filter.append('feMerge')
  feMerge.append('feMergeNode').attr('in', 'coloredBlur')
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

  /// //////////////////////////////////////////////////////
  /// //////////// Draw the Circular grid //////////////////
  /// //////////////////////////////////////////////////////

  // Wrapper for the grid & axes
  const axisGrid = g.append('g').attr('class', 'axisWrapper')

  const levels = d3.range(1, (cfg.levels + 2)).reverse()

  const cScale = d3.scaleLinear()
    .range([50, radius])
    .domain([1, 6])

  // Draw the background circles
  axisGrid.selectAll('.levels')
    .data(levels)
    .enter().append('circle')
    .classed('grid-circle', true)
    .attr('r', d => cScale(d))
    .style('fill', '#fff')
    .style('stroke', '#ebecf0')
    .style('fill-opacity', cfg.opacityCircles)
    .style('filter', 'url(#glow)')

  /// //////////////////////////////////////////////////////
  /// ///////////////// Draw the axes //////////////////////
  /// //////////////////////////////////////////////////////

  // Create the straight lines radiating outward from the center
  const axis = axisGrid.selectAll('.axis')
    .data(allAxis)
    .enter()
    .append('g')
    .attr('class', 'axis')
  // Append the lines
  axis.append('line')
    .attr('x1', (d, i) => rScale(maxValue * 0.005) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y1', (d, i) => rScale(maxValue * 0.005) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('x2', (d, i) => rScale(maxValue * 1) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y2', (d, i) => rScale(maxValue * 1) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('class', 'line')
    .style('stroke', '#ebecf0')
    .style('stroke-width', '2px')

  // Append the labels at each axis
  axis.append('text')
    .style('font-size', '15px')
    .style('font-family', 'Rubik')
    .style('letter-spacing', '0.5px')
    .style('fill', '#5e6c84')
    .attr('class', 'legend')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('x', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
    .text(d => d)
    // .call(wrapText, cfg.wrapWidth)

  /// //////////////////////////////////////////////////////
  /// ////////// Draw the radar chart blobs ////////////////
  /// //////////////////////////////////////////////////////

  // The radial line function
  const radarLine = d3.radialLine()
    .curve(d3.curveCatmullRom.alpha(0.5))
    .radius(d => rScale(d.value))
    .angle((d, i) => i * angleSlice)

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCatmullRomClosed.alpha(0.5))
  }

  // Create a wrapper for the blobs
  const blobWrapper = g.selectAll('.radar-wrapper')
    .data(data)
    .enter().append('g')
    .attr('class', 'radar-wrapper')

  // Append the backgrounds
  blobWrapper
    .append('path')
    .classed('radar-area', true)
    .attr('d', d => radarLine(d))
    .style('fill', 'rgb(85, 191, 213)')
    .style('fill-opacity', (d) => cfg.opacityArea)

  // Create the outlines
  blobWrapper.append('path')
    .classed('radar-stroke', true)
    .attr('d', d => radarLine(d))
    .style('stroke-width', cfg.strokeWidth + 'px')
    .style('stroke', '#27b4d1')
    .style('fill', 'none')
    .style('filter', 'url(#glow)')

  // Append the circles
  blobWrapper.selectAll('.radar-circle')
    .data(function (d, i) { return d })
    .enter().append('circle')
    .classed('radar-circle', true)
    .attr('width', 12)
    .attr('height', 12)
    .attr('r', cfg.dotRadius)
    // 交界点位置
    .attr('cx', function (d, i) { return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2) })
    .attr('cy', function (d, i) { return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2) })
    .style('fill', '#21be48')
    .style('fill-opacity', d => d.value === 0 ? 0 : 0.8)

  /// //////////////////////////////////////////////////////
  /// ///// Append invisible circles for tooltip ///////////
  /// //////////////////////////////////////////////////////

  // Wrapper for the invisible circles on top
  const blobCircleWrapper = g.selectAll('.radar-circleWrapper')
    .data(data)
    .enter().append('g')
    .classed('radar-circleWrapper', true)

  // Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper.selectAll('.radar-invisible-circle')
    .data(d => d)
    .enter().append('circle')
    .style('display', d => d.value === 0 ? 'none' : undefined)
    .classed('radar-invisible-circle', true)
    .attr('width', 12)
    .attr('height', 12)
    .attr('r', cfg.dotRadius * 1.2)
    .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on('click', function (d) {
      callback && callback(d, d3.event, d3.select(this))
    })
}// RadarChart

const formatAxises = (data, axises) => {
  const value = 0
  return data.map(array => {
    // 去除 DIMENSIONS 之外的 field
    const cleanData = array.filter(d => {
      return axises.indexOf(d.axis) !== -1
    })

    const exist = _.map(cleanData, ({ axis }) => {
      return axis
    })

    _.without(axises, ...exist)
      .forEach(axis => {
        cleanData.push({
          axis,
          value
        })
      })
    return [...cleanData]
      .sort((a, b) => axises.indexOf(a.axis) - axises.indexOf(b.axis))
  })
}

/**
 * 设计图 https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb2d59254c72c0338aac8
 * @param container 选择器
 * @param source 数据
 * @param width svg宽度
 * @param height svg高度
 * @param callback() 回调
 */
export default ({ container, source, width, height, axises }, callback) => {
  axises = axises || [
    'Asymmetry',
    'Liquid to spray',
    'Information',
    'Smell',
    'Surface',
    'Shape',
    'Flexibility',
    'Transparency',
    'Liquid to foam',
    'Sound',
    'Fragmentation',
    'Coordination',
    'Porosity',
    'Integration',
    'Color',
    'Components',
    'State',
    'Taste',
    'Pulsation',
    'Automation',
    'Market',
    'Senses',
    'Fibres'
  ]
  const maxValue = _.max(_.flatten(source).map(d => d.value))
  // TODO: margin作为对外接口
  const margin = { top: 100, right: 100, bottom: 100, left: 100 }
  const evolutionaryChartOptions = {
    width,
    height,
    margin: margin,
    maxValue,
    levels: 5,
    roundStrokes: true
  }
  const array = formatAxises(source, axises)
  index(container, array, evolutionaryChartOptions, callback)
}
