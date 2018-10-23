<template>
  <div class="bar-page">
    <div>测试页Bar</div>
    <div></div>
    <div class="container">
      <Bar :options="options"/>
    </div>

  </div>
</template>

<script>
  // import { search, getQuery, elements } from '@/apis'
  // import utilsPfq from '@/utils/pfq'
  import axios from 'axios'
  import Bar from '@/components/bar'

  export default {
    async created () {
      // <<<test数据>>>
      const responseData = await axios.get('/json/bar.json')
      this.options = {
        container: '#bar',
        source: responseData.data.results,
        width: 965,
        height: 799
      }
      // <<</>>>
    },
    components: {
      Bar
    },
    data () {
      return {
        refiner: {},
        pfq: '', // search api 支持的query参数
        pq: '', // TODO: 暂不清楚
        iq: '', // innavation query
        keyword: 'apple',
        isActiveIndex: 1,
        queryId: '',
        options: {
          // 数据类
          width: 1200,
          height: 799,
          source: [],
          container: '#bar'
        }
      }
    }
  }
</script>
