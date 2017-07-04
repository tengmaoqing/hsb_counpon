<template>
  <div id="app">
    <el-menu mode="horizontal" theme="dark" :default-active="activeIndex">
      <el-menu-item index="1">
        <router-link :to="{name: 'index'}">现金券发放</router-link>
      </el-menu-item>
     <!--  <el-menu-item index="2">
        <router-link :to="{name: 'other'}">ohter</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{name: 'other2'}">ohter2</router-link>
      </el-menu-item> -->
    </el-menu>
    <div class="router-wrap-outer">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'element-ui';

export default {
  name: 'app',
  components: {
    'el-menu-item': MenuItem,
    'el-menu': Menu,
  },

  data() {
    return {
      activeIndex: '1',
    };
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

div.router-wrap-outer {
  margin: 36px 0;
}
</style>
