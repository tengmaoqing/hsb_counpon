<template>
  <el-table :data="data">
    <el-table-column prop="createDate" label="创建时间">

    </el-table-column>

    <el-table-column prop="name" label="名称">

    </el-table-column>

    <el-table-column prop="remUnit" label="remUnit">

    </el-table-column>

    <el-table-column prop="tag" label="标签">

    </el-table-column>

    <el-table-column label="操作">
      <template scope="scope" >
        <opration @mouseenter.native="$emit('scopeChange', scope)" @viewmore="$emit('viewmore')" @edit="$emit('edit')" @delete="$emit('delete')"  :scope="scope"></opration>
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
  };
</script>
