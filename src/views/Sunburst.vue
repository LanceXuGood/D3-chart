<template>
  <div class="sunburst-page">
    <div>测试页Sunburst</div>
    <!--<a rel="stylesheet" href="https://app.zeplin.io/project/5ac1a8f35bef39973cbfacbb/screen/5babb11bae76824d430d01bf">zeplin/-->
    <!--Problem - solution matrix</a>-->
    <div></div>
    <div class="container">
      <Sunburst :options="options"/>
    </div>

  </div>
</template>

<script>
  // import { search, getQuery, evolutionary } from '@/apis'
  import Sunburst from '@/components/sunburst'
  // import utilsPfq from '@/utils/pfq'
  import axios from 'axios'

  export default {
    async created () {
      // <<<test数据>>>
      const responseData = await axios.get('/json/sunburst.json')
      const data = responseData.data.results.map(record => this.loop(record, null, 'technical'))
      this.options.source = this.$set(this.options, 'source', data)
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
      Sunburst
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
          container: '#sunburst'
        }
      }
    },
    methods: {
      loop (record, parent, type) {
        let depth = 0
        if (parent && parent.depth !== undefined) {
          depth = parent.depth + 1
        }
        let { children = [], name, ...rest } = record
        const newChildren = children.map((child) => {
          return this.loop({ parent: record, ...child }, { ...record, depth }, type)
        })
        let iq = null
        const { otherName } = record
        if (depth === 0) {
          iq = `TECHNOLOGY:"${otherName}"`
        } else {
          iq = [
            `TECHNOLOGY:"${parent.otherName}"`,
            `TECHNOLOGY_REF:"${otherName}"`
          ].join(' AND ')
        }
        // if (type === 'material') {
        //   const { otherName } = record
        //   iq = `MATER_L${depth + 1}:"${otherName}"`
        // } else if (type === 'technical') {
        //   const { otherName } = record
        //   if (depth === 0) {
        //     iq = `TECH_FIELD_MAIN:"${otherName}"`
        //   } else {
        //     iq = [
        //       `TECH_FIELD_MAIN:"${parent.otherName}"`,
        //       `TECH_FIELD_MAIN_SUB_REF:"${otherName}"`
        //     ].join(' AND ')
        //   }
        // } else if (type === 'technology') {
        //   const { otherName } = record
        //   if (depth === 0) {
        //     iq = `TECHNOLOGY:"${otherName}"`
        //   } else {
        //     iq = [
        //       `TECHNOLOGY:"${parent.otherName}"`,
        //       `TECHNOLOGY_REF:"${otherName}"`
        //     ].join(' AND ')
        //   }
        // } else if (type === 'industry') {
        //   const { otherName } = record
        //   if (depth === 0) {
        //     iq = `INDUSTRY:"${otherName}"`
        //   } else {
        //     iq = [
        //       `INDUSTRY:"${parent.otherName}"`,
        //       `INDUSTRY_REF:"${otherName}"`
        //     ].join(' AND ')
        //   }
        // } else if (type === 'abbreviation') {
        //   iq = `ACRONYM_STR_EXPAN_STR_REF:"${name}"`
        //   const [n, desc] = name.split(/__/)
        //   return { iq, name: n, desc, children: newChildren, depth, ...rest }
        // }
        return { iq, name, children: newChildren, depth, ...rest }
      }
    }
  }
</script>
