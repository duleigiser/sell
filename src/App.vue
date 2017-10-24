<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/table'}">商家</a>
      </div>
    </div>
    <select name="" v-model="goto" >
      <option value="goods">
        商品
      </option>
      <option value="ratings">
        评论
      </option>
      <option value="table">
        商家
      </option>

    </select>
    <router-view :data="data"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {},
        goto: '',
        data: [{
          'key': 1,
          'value': '星期一'
        }]
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 88, 93)
        &.active
          color:rgb(240, 20, 20)

</style>
