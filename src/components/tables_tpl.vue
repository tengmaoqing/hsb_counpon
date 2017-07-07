<template>

  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <slot name="btns"></slot>
      </el-col>
    </el-row>

    <slot name="tables"></slot>

  	<el-dialog title="新增" :visible.sync="dialogVisible">

      <slot name="form"></slot>
  		<span slot="footer" class="dialog-footer">
  		    <el-button @click="onCancel">取 消</el-button>
  		    <el-button type="primary" @click="onConfirm">确 定</el-button>
  		  </span>
  	</el-dialog>
  </div>

</template>

<script type="text/javascript">
  import store from './lists/state';

  export default {
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      onCancel() {
        this.dialogVisible = false;
      },

      onConfirm() {
        this.dialogVisible = false;
        console.log(store.state.currentForm);
        this.$http.post(`${this.rootPath}/createPage/template`, store.state.currentForm).then((res) => {
          console.log(res);
        });
      },

      viewDetailHandle(scope) {
        console.log(scope);
      },
    },
    mounted() {
      // @viewDetail="viewDetailHandle"
      this.$on('viewDetail', this.viewDetailHandle);
    },
  };

</script>
