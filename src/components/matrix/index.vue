<template>
  <div class="matrix-page">
    <a rel="stylesheet" href="https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf">zeplin/ Problem - solution matrix</a>
    <div>Problem - solution matrix</div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'home',
  created () {
    axios.get('/json/matrix.json').then(d => (this.matrixData = d.results))
  },
  data () {
    return {
      matrixData: {}
    }
  }
}
</script>
