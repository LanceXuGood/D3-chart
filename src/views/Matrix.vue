<template>
  <div class="matrix-page">
    <div>测试页Matrix</div>
    <!--<a rel="stylesheet" href="https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf">zeplin/-->
    <!--Problem - solution matrix</a>-->
    <div>Problem - solution matrix</div>
    <div class="container">
      <Matrix :options="options"/>
    </div>

  </div>
</template>

<script>
import { search, getQuery, $problemRefSolution } from '@/apis'
import Matrix from '@/components/matrix'
import utilsPfq from '@/utils/pfq'
// import axios from 'axios'

export default {
  async created () {
    // //<<<test数据>>>
    // const responseData = await axios.get('/json/matrix.json')
    // this.options.source = this.$set(this.options, 'source', this.formatResponseData(responseData.data.results))
    // //<<</>>>

    const searchResponseData = await search({
      keyword: this.keyword
    })

    const { queryId } = searchResponseData.data.results
    const { pfq, pq, keyword } = await getQuery(queryId)
    this.pfq = pfq
    this.refiner = null
    this.refiner = utilsPfq.decode(pfq)
    this.pq = pq
    this.keyword = keyword
    const matrixData = await $problemRefSolution({ version: 1, queryId })
    // 加上高亮参数
    matrixData.data.forEach((rowItem, rowIndex) => {
      rowItem = Object.assign(rowItem, { isActive: this.isActiveIndex === rowIndex })
    })
    this.options.source = this.$set(this.options, 'source', matrixData)
  },
  components: {
    Matrix
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
        source: {},
        // 布局类
        container: '#matrix',
        square: 32, // 计算整体宽度，高度，
        space: 8, // 默认的间隔采用8
        textLeftDis: 120, // 左侧文字区域宽度
        textTopDis: 150, // 顶部文字区域高度
        highLightColor: '#27b4d1'
      }
    }
  }
}
</script>
