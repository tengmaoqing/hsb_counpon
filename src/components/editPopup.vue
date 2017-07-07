<template>

  <el-dialog :title="'自定义' + comname" v-model="editVisible" size="large">
    <el-row  :gutter="20">
      <el-col :span="12">

        <el-input v-model="customOptions" placeholder="自定义选项（JSON）" type="textarea" auto-complete="off"></el-input>

      </el-col>

    </el-row>
    <el-row>
      <label>开发者选项</label>
      <el-switch
        v-model="devLock">
      </el-switch>
      <br>
      <br>
      <el-col v-show="devLock">
        <edit-style></edit-style>
        <p>两者一次同时修改以下面为准</p>
        <el-input v-model="customHtml" placeholder="自己动手编写HTML" type="textarea" auto-complete="off"></el-input>
      </el-col>

    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>

</template>

<style type="text/css">

</style>

<script type="text/javascript">
  import EditStore from '@/store/edite';
  import { addHtmlPropser } from '@/page_contlrs/data_process';
  import editStyle from './editStyle';

  let initHtml = '';
  // const configMods = require.context('../config_components/', false, /.vue$/);
  export default {
    data() {
      return {
        devLock: false,
        htmlLock: false,
        customOptions: '',
        customHtml: '',
        comname: '',
      };
    },

    components: {
      editStyle,
    },
    computed: {
      editVisible: {
        get() {
          return this.$store.state.currentLayer.state;
        },
        set(value) {
          this.customHtml = this.$store.state.currentLayer.cpm.html;
          initHtml = this.customHtml;
          this.comname = this.$store.state.currentLayer.cpm.name;
          this.customOptions = JSON.stringify(this.$store.state.currentLayer.cpm.options);
          this.$store.commit('updateCurrentLayer', {
            state: value,
          });
        },
      },
    },
    methods: {
      ok() {
        const props = EditStore.state.domProps;
        const cpm = this.$store.state.currentLayer.cpm;
        let replacedHTML = addHtmlPropser(cpm, props);
        if (this.customHtml !== initHtml) {
          replacedHTML = this.customHtml;
        }
        this.$store.commit('updateCotentByRandomID', {
          $compoentRandomID: cpm.$compoentRandomID,
          key: 'html',
          value: replacedHTML,
        });

        let customOptions = this.customOptions;
        if (!customOptions) {
          this.editVisible = false;
          return;
        }

        try {
          customOptions = JSON.parse(customOptions);
          if (typeof customOptions !== 'object') {
            this.$message('只支持对向形式的JSON');
            return;
          }

          this.$store.commit('updateCotentByRandomID', {
            $compoentRandomID: cpm.$compoentRandomID,
            key: 'options',
            value: customOptions,
          });
          this.editVisible = false;
        } catch (err) {
          this.$message('输入的JSON有毛病！');
        }
      },
    },
  };
</script>
