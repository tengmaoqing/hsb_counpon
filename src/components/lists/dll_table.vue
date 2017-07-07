<template>
  <el-table :data="data">
    <el-table-column prop="createDate" label="创建时间">

    </el-table-column>

    <el-table-column prop="name" label="名称">

    </el-table-column>

    <el-table-column prop="description" label="描述">

    </el-table-column>

    <el-table-column label="操作">
      <template scope="scope">
        <opration @mouseenter.native="$emit('scopeChange', scope)" @edit="$emit('edit')" @viewmore="$emit('viewmore')" @delete="$emit('delete')"  :scope="scope"></opration>
        <el-button type="text" size="small" @click="dll(scope.row.name, scope.row._id)">生成Dll</el-button>

      </template>
    </el-table-column>

  </el-table>
</template>

<script type="text/javascript">
  import fileApi from '@/api/fileapi';
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
      dll(name, id) {
        fileApi.dll(id).then(() => {
          this.$notify({
            title: `dll资源 ${name}!`,
            message: '已经在准备了',
          });
        });
      },
    },
  };
</script>
