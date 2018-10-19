<template>
  <svg id="sunburst"></svg>
</template>
<script>
  // VUE显示写法 ，之后会考虑包装成react组件，方便公司内部使用
  import Draw from '../charts/index.js'

  export default {
    name: 'elementsCom',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    watch: {
      'options.source' () {
        Draw.drawSunburst(this.options, (selectedData, event) => {
          console.log(selectedData, event)
        })
      }
    },
    mounted () {
      if (this.options.source && this.options.source.length) {
        Draw.drawSunburst(this.options, (selectedData, event) => {
          console.log(selectedData, event)
        })
      }
    }
  }
</script>
