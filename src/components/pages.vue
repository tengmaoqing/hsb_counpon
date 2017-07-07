<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary">新增</el-button>
      </el-col>
    </el-row>
  	<el-table
      :data="pages"
      border
      style="width: 100%">
  	    <el-table-column
  	      prop="date"
  	      label="日期"
  	      width="180">
  	    </el-table-column>
  	    <el-table-column
  	      prop="name"
  	      label="姓名"
  	      width="180">
  	    </el-table-column>
  	    <el-table-column
  	      prop="address"
  	      label="地址">
  	    </el-table-column>
  	  </el-table>

      <el-dialog title="新增页面">
        
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
	
  export default {
    data() {
      return {
        pages: [],
      };
    },
    methods: {
      getPages() {
        this.$http.post(`${this.rootPath}/createPage/pages`).then((res) => {
          this.pages = res.data;
        });
      },
    },
  };
</script>
