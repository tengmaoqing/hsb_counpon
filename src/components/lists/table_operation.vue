<template>

  <div slot="opration">
    <el-button @click="$emit('viewmore')" type="text" size="small">查看</el-button>
    <el-button @click="$emit('edit')" type="text" size="small">编辑</el-button>
    <el-button @click="$emit('delete')" type="text" size="small">删除</el-button>
    <slot></slot>
  </div>

</template>

<script type="text/javascript">
  export default {
    props: {
      scope: Object,
    },
  };
</script>
