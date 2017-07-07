
<template>

<el-form :inline="true">

  <el-popover
    ref="popover4"
    placement="top"
    width="160"
    v-model="popoverVisible">
    <p>新增什么属性？</p>
    <el-input v-model="prop"></el-input>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="addProp">确定</el-button>
    </div>
  </el-popover>

  <el-card>
    <div slot="header">
      为组件增加HTML属性（谨慎）
      <el-button style="float: right;" type="primary" v-popover:popover4>增加</el-button>
    </div>
    <el-form-item :label="key" v-for="(item, key) in domProps" :key="key">
      <span v-show="!edits[key]">{{ domProps[key] }}</span>
      <el-input class="auto-input" v-show="edits[key]" v-model="domProps[key]"></el-input>
      <el-button type="primary" @click="updateProp(key)" v-show="!edits[key]" icon="edit"></el-button>
      <el-button type="danger" @click="delProp(key)" icon="delete"></el-button>
      <el-button type="success" @click="confirm(key)" v-show="edits[key]" icon="check"></el-button>
    </el-form-item>
  </el-card>

</el-form>

</template>

<style type="text/css">
  .auto-input {
    width: 180px;
  }
</style>

<script type="text/javascript">
  import EditStore from '@/store/edite';

  export default {

    data() {
      return {
        popoverVisible: false,
        edits: {},
        domProps: EditStore.state.domProps,
        prop: '',
      };
    },

    computed: {
    },

    methods: {
      addProp() {
        this.$set(this.domProps, this.prop, '');
        this.$set(this.edits, this.prop, true);
        this.prop = '';
        this.popoverVisible = false;
      },

      confirm(key) {
        EditStore.commit('updateDomProps', Object.assign(this.domProps));
        this.edits[key] = false;
      },

      updateProp(key) {
        this.edits[key] = true;
      },

      delProp(key) {
        this.$delete(this.domProps, key);
        delete this.domProps[key];
      },
    },

    mounted() {
    },
  };
</script>
