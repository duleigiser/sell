<template>
  <div class="box">
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th width="10%">id</th>
          <th width="30%">name</th>
          <th width="40%">content</th>
          <th width="20%">remark</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableList">
          <td v-text="data.num"></td>
          <td v-text="data.author"></td>
          <td v-text="data.contents"></td>
          <td v-text="data.remark"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            <div class="pull-left">
              <button class="btn btn-default" @click="refresh">刷新</button>
            </div>
            <div class="pull-right">
              <boot-page v-ref:page :async="true" :lens="lenArr" :url="url" :page-len="pageLen" :param="param"></boot-page>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import bootPage from 'components/bootpage/bootpage.vue'
  export default {
    data () {
      return {
        lenArr: [5, 10, 20], // 每页显示长度设置
        pageLen: 5, // 可显示的分页数
        url: '/table/', // 请求路径
        param: {
          activeNum: 1,
          pageLen: 10
        }, // 传递参数
        tableList: [] // 分页组件传回的分页后数据
      }
    },
    components: {
      bootPage
    },
    methods: {
      refresh () {
        this.$refs.page.refresh()
      }
    },
    events: {
      // 分页组件传回的表格数据
      'data' (data) {
        this.tableList = data
      },
      // 刷新数据
      'refresh' () {
        this.refresh()
      }
    }
  }

</script>

<style>
  .box {
    padding: 100px;
  }

</style>
