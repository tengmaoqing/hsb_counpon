<template>
  <el-card class="packageBox" v-show="pages.length">
    <div slot="header" class="clearfix">
      <span>要构建的页面</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="doStructor('test')">测试</el-button>
      <el-button style="float: right; padding: 3px 20px" type="text" @click="doStructor">生产</el-button>
    </div>
    <div v-for="page in pages" :key="page._id">
      <i class="el-icon-close" @click="delSelect(page)"></i>
      {{ page.name }}
    </div>
  </el-card>
</template>

<style type="text/css">
  .packageBox {
    position: fixed;
    right: 20px;
    top: 200px;
    z-index: 1000;
  }
</style>

<script type="text/javascript">

  export default {
    props: {
      pages: Array,
    },

    methods: {
      doStructor(environment = 'production') {
        /* eslint-disable no-underscore-dangle */
        const pages = this.pages.map(page => page._id);
        this.$store.dispatch('doStructure', {
          pages,
          environment,
        }).then(() => {
          this.$alert(`${environment} 已经准备打包了。。`);
        });
      },

      delSelect(page) {
        this.$emit('delSelect', page);
      },
    },
  };
</script>
