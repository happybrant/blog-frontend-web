<template>
  <div class="column order-2 column-main is-8-tablet is-8-desktop is-6-widescreen">
    <ArchiveCard v-if="$route.params.year != undefined || $route.params.month != undefined" 
    :date="transferDate($route.params.year,$route.params.month)" 
    :articles="articles"
     
    />
    <template v-else>
      <ArchiveCard v-for="(arr,index) in articlesByYear" :key="index" :articles="arr[1]" :date="arr[0]"   />
      <Pagination :pager="pager" :getPagerData="getArticlesByYear"    />
    </template>
  </div>
</template>
<script>
import ArchiveCard from '../components/ArchiveCard'
import { int2chineseNum, getGroupArray } from '@/utils'
import Pagination from '../components/Pagination'
export default {
  name: 'Archive',
  data() {
    return {
      articles: '',
      articlesByYear: [],
      pager: [],
    }
  },
  components: { ArchiveCard, Pagination },
  methods: {
    transferDate(year, month) {
      if (month != undefined && month != '') {
        return int2chineseNum(month) + '月 ' + year
      }
      return year
    },
    getArticlePager() {
      const _this = this
      var parameters = new Object()
      parameters.pageIndex = 1
      parameters.pageSize = 10
      if (_this.$route.params.year) {
        parameters.createYear = _this.$route.params.year
      }
      if (_this.$route.params.month) {
        parameters.createMonth = _this.$route.params.month
      }
      parameters.router = _this.$route.params.router
      _this.$store
        .dispatch('getArticlePager', parameters)
        .then(function (response) {
          if (
            response == null ||
            response.records == null ||
            response.records.length == 0
          ) {
             _this.$router.push('/404')
          }
          _this.articles = response.records
        })
    },
    getArticlesByYear(pagerIndex) {
      const _this = this
      var parameters = new Object()
      parameters.pageIndex = pagerIndex
      parameters.pageSize = 40
      parameters.router = _this.$route.params.router
      _this.$store
        .dispatch('getArticlePager', parameters)
        .then(function (response) {
          if (
            response == null ||
            response.records == null ||
            response.records.length == 0
          ) {
             _this.$router.push('/404')
          }
          let { records, ...newObj } = response
          _this.pager = newObj
          records.forEach((item) => {
            item.createYear = item.createTime.substr(0, 4)
          })
          _this.articlesByYear = getGroupArray(records, 'createYear')
        })
      window.scroll({ top: 0, behavior: 'smooth' })
    },
  },
  mounted() {
    if (
      this.$route.params.year != undefined ||
      this.$route.params.month != undefined
    ) {
      this.getArticlePager()
    } else {
      this.getArticlesByYear(1)
    }
  },
}
</script>