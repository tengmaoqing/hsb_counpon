<template>
	<el-table :data="data">
    <el-table-column prop="createDate" label="创建时间">

    </el-table-column>

    <el-table-column prop="name" label="名称">

    </el-table-column>

    <el-table-column prop="isClosingTag" :formatter="boolToChart" label="可有子元素">

    </el-table-column>

    <el-table-column prop="tag" label="标签">

    </el-table-column>

    <el-table-column prop="tag" label="测试状态">
      <template scope="scope">
        <div>时间：{{scope.row.testTime}}</div>
        <div>结果：{{scope.row.testStatus}}</div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template scope="scope" >
        <opration @mouseenter.native="$emit('scopeChange', scope)" @viewmore="$emit('viewmore')" @edit="$emit('edit')" @delete="$emit('delete')"  :scope="scope"></opration>
        <el-button type="text" size="small" @click="dev(scope.row.name, scope.row._id)">组件开发</el-button>
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
      boolToChart(row, col) {
        return row[col.property] ? '是' : '否';
      },

      dev(name, id) {
        fileApi.devComponent(id).then(() => {
          const h = this.$createElement;
          this.$notify({
            title: `现在开发的是 ${name}!`,
            message: h('a', {
              domProps: {
                href: 'http://127.0.0.1:8020',
                target: '_blank',
              },
            }, '点我!'),
          });
        });
      },
    },
  };
</script>
