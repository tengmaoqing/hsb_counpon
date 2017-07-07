<template>

  <el-button type="primary" @click="clickHandler" size="small">从文件中读取添加</el-button>
</template>

<script type="text/javascript">

  export default {
    methods: {
      clickHandler() {
        this.$notify({
          title: '提示',
          message: '未完成的功能！',
        });
      },
    },
  };
</script>
