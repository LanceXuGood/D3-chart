<template>
  <div class="matrix-page">
    <div>测试页Radar</div>
    <!--<a rel="stylesheet" href="https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf">zeplin/-->
    <!--Problem - solution matrix</a>-->
    <div></div>
    <div class="container">
      <Radar :options="options"/>
    </div>

  </div>
</template>

<script>
  // import { search, getQuery, evolutionary } from '@/apis'
  // import utilsPfq from '@/utils/pfq'
  import axios from 'axios'
  import Radar from '@/components/radar'

  export default {
    async created () {
      // <<<test数据>>>
      const responseData = await axios.get('/json/radar.json')
      console.log(responseData)
      const formatData = [responseData.data.results.map(({ name: axis, count: value }) => {
        const iq = `EVOLUTION_TYPE:"${axis}"`
        let val = axis
        if (axis === 'Liquidtospray') {
          val = 'Liquid to spray'
        } else if (axis === 'Liquidtofoam') {
          val = 'Liquid to foam'
        }
        return { iq, axis: val, value }
      })]

      this.options = {
        container: '#radar',
        source: formatData,
        width: 965,
        height: 799
      }
      // <<</>>>

      // // 通过search接口查询queryId
      // const searchResponseData = await search({
      //   keyword: this.keyword
      // })
      //
      // const { queryId } = searchResponseData.data.results
      // const { pfq, pq, keyword } = await getQuery(queryId)
      // this.pfq = pfq
      // this.refiner = null
      // this.refiner = utilsPfq.decode(pfq)
      // this.pq = pq
      // this.keyword = keyword
      // const source = await evolutionary({ queryId })
      // this.options.data = this.$set(this.options, 'source', source)
    },
    components: {
      Radar
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
          width: 965,
          height: 799,
          source: [],
          container: '#radar'
        }
      }
    }
  }
</script>
