<template>
	<el-table :data="data">
		<el-table-column prop="createDate" label="创建时间">

		</el-table-column>

		<el-table-column prop="name" label="模板名称">

		</el-table-column>

    <el-table-column prop="description" label="描述">

    </el-table-column>

		<el-table-column label="操作">
			<template scope="scope">
        <opration @mouseenter.native="$emit('scopeChange', scope)" @edit="$emit('edit')" @viewmore="$emit('viewmore')" @delete="$emit('delete')"  :scope="scope"></opration>
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
