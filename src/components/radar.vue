<template>
  <svg id="radar"></svg>
</template>
<script>
  // VUE显示写法 ，之后会考虑包装成react组件，方便公司内部使用
  import Draw from '../charts/index.js'

  export default {
    name: 'home',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    watch: {
      'options.source' () {
        Draw.drawRadar(this.options, (d) => {
          console.log(d, this)
        })
      }
    },
    mounted () {
      if (this.options.source.length) {
        Draw.drawRadar(this.options, (d) => {
          console.log(d, this)
        })
      }
    }
  }
</script>
