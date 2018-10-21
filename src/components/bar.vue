<template>
  <svg id="bar"></svg>
</template>
<script>
  // VUE显示写法 ，之后会考虑包装成react组件，方便公司内部使用
  import Draw from '../charts/index.js'

  export default {
    name: 'bar',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    watch: {
      'options.source' () {
        Draw.drawBar(this.options, (selectedData, event) => {
          console.log(selectedData, event)
        })
      }
    },
    mounted () {
      if (this.options.source && this.options.source.length) {
        Draw.drawBar(this.options, (selectedData, event) => {
          console.log(selectedData, event)
        })
      }
    }
  }
</script>
