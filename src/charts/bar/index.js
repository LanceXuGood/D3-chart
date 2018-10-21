/* eslint-disable */
import * as d3 from 'd3'
const color = d3.scaleOrdinal(d3.schemePaired)
export default (options, callback) => {
  const {
    width,
    height,
    container,
    source: data
  } = options

  const rows = data.scale.length
  const cols = data.scale[0].length


  const x = d3.scaleLinear()
    .domain([0, cols - 1])
    .range([0, (100 + 10) * cols])

  const y = d3.scaleLinear()
    .domain([0, rows - 1])
    .range([0, 10 * rows])

  const svg = d3.select(container)
    // .attr('width', rectSvgWidth)
    // .attr('height', rectSvgHeight)
    .attr('viewBox', `0 0 ${width} ${height}`)

  const group = svg.append('g')
    .attr('transform', `translate(${0},${0})`)

  const row = group.selectAll('.row')
    .data(data.scale)
    .enter().append('g')
    .attr('class', 'row')
    .attr('transform', (d, i) => `translate(0,${y(i)})`)

  const cell = row.selectAll('.cell')
    .data(d => d)
    .enter().append('g')
    .attr('class', 'cell')

  cell.append('rect')
    .attr('width', 200)
    // 8表示上下间隔
    .attr('height', 10)
    .attr('transform', (d, i) => `translate(${x(i)}, 0)`)
    .style('fill', (d, i) => color(i))
  // // 制作边框效果
  // const scale = row.selectAll('.scale')
  //   .data(data.scale)
  //   .enter().append('rect')
  //   .attr('width', 200)
  //   // 8表示上下间隔
  //   .attr('height', 10)
  //   .style('fill', '#f00')


}
// var chartWidth = 300,
//     barHeight = 20,
//     groupHeight = barHeight * data.series.length,
//     gapBetweenGroups = 10,
//     spaceForLabels = 150,
//     spaceForLegend = 150

// // Zip the series data together (first values, second values, etc.)
// var zippedData = []
// for (var i = 0; i < data.labels.length; i++) {
//   for (var j = 0; j < data.series.length; j++) {
//     zippedData.push(data.series[j].values[i])
//   }
// }

// // Color scale
// var color = d3.scale.category20()
// var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length

// var x = d3.scale.linear()
//     .domain([0, d3.max(zippedData)])
//     .range([0, chartWidth])

// var y = d3.scale.linear()
//     .range([chartHeight + gapBetweenGroups, 0])

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .tickFormat('')
//     .tickSize(0)
//     .orient('left')

// // Specify the chart area and dimensions
// var chart = d3.select('.chart')
//     .attr('width', spaceForLabels + chartWidth + spaceForLegend)
//     .attr('height', chartHeight)

// // Create bars
// var bar = chart.selectAll('g')
//     .data(zippedData)
//     .enter().append('g')
//     .attr('transform', function (d, i) {
//       return 'translate(' + spaceForLabels + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ')'
//     })

// // Create rectangles of the correct width
// bar.append('rect')
//     .attr('fill', function (d, i) { return color(i % data.series.length) })
//     .attr('class', 'bar')
//     .attr('width', x)
//     .attr('height', barHeight - 1)

// // Add text label in bar
// bar.append('text')
//     .attr('x', function (d) { return x(d) - 3 })
//     .attr('y', barHeight / 2)
//     .attr('fill', 'red')
//     .attr('dy', '.35em')
//     .text(function (d) { return d })

// // Draw labels
// bar.append('text')
//     .attr('class', 'label')
//     .attr('x', function (d) { return -10 })
//     .attr('y', groupHeight / 2)
//     .attr('dy', '.35em')
//     .text(function (d, i) {
//       if (i % data.series.length === 0) { return data.labels[Math.floor(i / data.series.length)] } else { return '' }
// })

// chart.append('g')
//       .attr('class', 'y axis')
//       .attr('transform', 'translate(' + spaceForLabels + ', ' + -gapBetweenGroups / 2 + ')')
//       .call(yAxis)

// // Draw legend
// var legendRectSize = 18,
//     legendSpacing = 4

// var legend = chart.selectAll('.legend')
//     .data(data.series)
//     .enter()
//     .append('g')
//     .attr('transform', function (d, i) {
//         var height = legendRectSize + legendSpacing
//         var offset = -gapBetweenGroups / 2
//         var horz = spaceForLabels + chartWidth + 40 - legendRectSize
//         var vert = i * height - offset
//         return 'translate(' + horz + ',' + vert + ')'
//     })

// legend.append('rect')
//     .attr('width', legendRectSize)
//     .attr('height', legendRectSize)
//     .style('fill', function (d, i) { return color(i) })
//     .style('stroke', function (d, i) { return color(i) })

// legend.append('text')
//     .attr('class', 'legend')
//     .attr('x', legendRectSize + legendSpacing)
//     .attr('y', legendRectSize - legendSpacing)
//     .text(function (d) { return d.label })
