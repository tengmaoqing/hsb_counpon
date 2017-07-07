<template>
  <div id="app">
    <el-row>

      <el-col>
        <el-menu mode="horizontal" theme="dark" :default-active="activeIndex">
<!--           <el-menu-item index="1">
            <router-link :to="{name: 'index'}">现金券发放</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name: 'sw'}">缓存文件控制</router-link>
          </el-menu-item> -->

          <el-submenu index="3">
            <template slot="title">页面管理</template>

            <el-menu-item :index="'2-' + index" v-for="(cate, index)  in categorys" :key="index">
              <router-link :to="'/tables/' + cate.typeId">{{cate.des}}</router-link>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        asider
      </el-col>
      <el-col :span="19">
        <router-view ></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      activeIndex: '3',
      categorys: [],
    };
  },

  mounted() {
    this.$http.get('/tableData/categorys').then((data) => {
      this.categorys = data;
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

body {
  margin: 0;
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
