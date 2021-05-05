<template>
  <div class="searchPageContainer">
    <Toolbar></Toolbar>
    <!-- <SearchResultPagination></SearchResultPagination> -->
    <SearchResultTable></SearchResultTable>
    <div class="bottomSpace"></div>
  </div>
</template>
<script  >
import { defineComponent } from 'vue'
import Toolbar from '../../components/Toolbar/Toolbar.vue'
import SearchResultTable from './SearchResultTable.vue'
export default defineComponent({
  name: 'searchPage',
  components: {
    Toolbar,
    SearchResultTable
  },
  setup: () => {}
})
</script>
<style scoped>
.searchPageContainer {
  position: fixed;
  background-color: palegoldenrod;
  height: 89vh;
  width: 95%;
  top: 0rem;
  padding-top: 3.5rem;
  left: 2.5vw;
  margin: 0 auto 0;
  overflow-y: scroll;
}

.searchResult {
  height: 65vh;
  position: relative;
  z-index: 3;
}
</style>

<style>
/* override  .pagination__page 的設定*/
.searchResult .van-pagination__page {
  z-index: 2;
}
</style>
