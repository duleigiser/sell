<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="log-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart">1</span>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    background: #000
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .log-wrapper
          display inline-block
          position relative
          top:-10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            border-radius 50%
            width 100%
            height 100%
            text-align center
            background #2b343c
            .icon-shopping_cart
              display inline-block
              line-height 44px
              font-size 24px
              color #80858a
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px      

          
          



</style>
