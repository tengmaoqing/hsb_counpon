<template>
	<el-table :data="data" @selection-change="handleSelectionChange">
    <el-table-column type="selection">

    </el-table-column>
    <el-table-column prop="createDate" label="创建时间">

    </el-table-column>

    <el-table-column prop="name" label="页面名称">

    </el-table-column>

    <el-table-column prop="projectId.name" label="所属项目">

    </el-table-column>

    <el-table-column label="访问url">
      <template scope="scope">
        <span>{{'/' + (scope.row.productname || 'm6') + '/' + scope.row.name + '.' + (scope.row.extension || 'html')}}</span>
      </template>
    </el-table-column>

    <el-table-column prop="status" label="状态">

    </el-table-column>
<!--
    <el-table-column prop="startDate" label="开始时间">

    </el-table-column>

    <el-table-column prop="endDate" label="结束时间">

    </el-table-column> -->

    <el-table-column label="操作">
      <template scope="scope">
        <opration @mouseenter.native="$emit('scopeChange', scope)" @viewmore="$emit('viewmore')" @edit="$emit('edit')" @delete="$emit('delete')"  :scope="scope"></opration>
        <router-link :to="{name: 'editPage',params:{'pageID': scope.row._id}}"><el-button type="text" size="small">添加组件</el-button></router-link>
        <el-button type="text" size="small" @click="doStructure(scope.row._id)">打包</el-button>
        <el-button type="text" size="small">fork</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script type="text/javascript">
  import Opration from './table_operation';

  export default {
    components: {
      Opration,
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    methods: {
      doStructure(pageID) {
        this.$store.dispatch('doStructure', {
          pageID,
        }).then(() => {
          this.$alert('已经准备打包了。。');
        });
      },
      handleSelectionChange(...arg) {
        this.$emit('selection-change', ...arg);
      },
    },
  };
</script>
