<template>

  <div>
    <el-row style="margin-bottom: 15px;">
      <h4 v-text="currentName"></h4>
      <el-col :span="6">
        <el-button type="primary" @click="newForm">新增</el-button>

        <el-button-group>
          <el-button v-show="resourceName === 'pages'" type="success">访问性测试</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="名字或描述" v-model="searchKey" class="input-with-select">
         <!--  <el-select v-model="searchType" slot="prepend" placeholder="请选择">
            <el-option label="名称" value="1"></el-option>
            <el-option label="描述" value="2"></el-option>
          </el-select> -->
          <el-button slot="append" icon="el-icon-search" @click="search">搜</el-button>
        </el-input>

      </el-col>
    </el-row>

    <package-box :pages="selectCol" @delSelect="delSelect"></package-box>
    <component v-bind:is="currentView" :data="tableData" @selection-change="handleSelectionChange" @scopeChange="scopeChange" @edit="edit" @delete="deleteRow" @viewmore="viewDetailHandle">

    </component>

    <div style="text-align: right">
      <el-pagination
      layout="prev, pager, next, total"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="pagination"
      >
      </el-pagination>
    </div>

    <el-dialog title="新增" :visible.sync="dialogVisible">

      <component v-bind:is="currentForm" :edit-form="editForm"></component>
      <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script type="text/javascript">
  import Apis from '@/api/curd';
  import packageBox from './packageBox';

  const MODELTPL = {
    pages: {
      name: '',
      description: '',
      extension: '',
      filename: '',
      productname: '',
      projectId: '',
      publicPath: '/',
      preLoad: '',
      head: '',
      footer: '',
      title: '',
      keyword: '',
      templateId: '',
      templateName: '',
      template: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black">
          <meta name="format-detection" content="telephone=no, email=no">
          <title>回收宝</title>
      </head>
      <body>
      </body>
      </html>
      `,
      style: '',
    },
    components: {
      name: '',
      description: '',
      html: '<div></div>',
      pathJS: '',
      pathHTML: '',
      isClosingTag: true,
    },
    templates: {
      type: '',
      name: '',
      html: '',
      description: '',
      disabled: false,
    },
    projects: {
      name: '',
      description: '',
      templateId: '',
      dllId: null,
      disabled: false,
      remark: '',
      commonSrc: [],
      style: '',
      remUnit: 0,
      publicPath: '',
      testPublicPath: '',
    },
    dll: {
      type: '',
      name: '',
      venders: [],
      description: '',
      disabled: false,
    },
  };


  const tableMap = require.context('./lists/', false, /.vue$/);
  const tableNames = {
    components: '组件',
    pages: '页面',
    templates: '模板',
    projects: '项目',
    dll: '动态库',
  };

  // const resources = {
  //   components: 'component',
  //   pages: 'page',
  //   templates: 'template',
  // };

  const apiMaps = {
    components: 'Component',
    pages: 'Page',
    templates: 'Template',
    projects: 'Project',
    dll: 'Dll',
  };

  /* eslint-disable no-underscore-dangle */
  export default {
    components: {
      packageBox,
      // TablesTpl,
    },

    data() {
      return {
        dialogVisible: false,
        currentView: null,
        currentForm: null,
        currentName: '',
        tableData: [],
        selectCol: [],
        editForm: null,
        resourceName: '',
        total: 0,
        tablesNames: {
          2: 'pages',
          3: 'components',
          1: 'templates',
          4: 'projects',
          5: 'dll',
        },
        pageSize: 15,
        currentPage: 1,
        searchKey: '',
        searchType: '',
      };
    },

    methods: {
      onCancel() {
        this.dialogVisible = false;
      },

      newForm() {
        this.editForm = MODELTPL[this.resourceName];
        this.dialogVisible = true;
      },

      onConfirm() {
        this.dialogVisible = false;
        if (this.editForm._id) {
          Apis[`update${this.apiName}`](this.editForm).then(() => {
            this.getTableDatas();
          });
        } else {
          Apis[`add${this.apiName}`](this.editForm).then(() => {
            this.getTableDatas();
          });
        }
      },

      getTableDatas() {
        Apis[`get${this.apiName}s`]({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          q: this.searchKey,
        }).then((data) => {
          this.tableData = data.docs;
          this.total = data.total;
        });
      },

      search() {
        this.currentPage = 1;
        this.getTableDatas();
      },

      viewDetailHandle() {

      },

      edit() {
        this.editForm = JSON.parse(JSON.stringify(this.tableRow.row));
        this.dialogVisible = true;
      },

      deleteRow() {
        const row = this.tableRow.row;
        this.$alert(`确认要删除 ${row.name} 吗`, '注意', {
          confirmButtonText: '确定',
          showCancelButton: true,
          callback: (action) => {
            if (action === 'confirm') {
              this.$http.delete(`/createPage/${this.apiName}?_id=${row._id}`).then(() => {
                this.$message({
                  type: 'info',
                  message: '删除成功',
                });
                this.getTableDatas();
              });
            }
          },
        });
      },

      scopeChange(scope) {
        this.tableRow = scope;
      },
      changeCurrent(tableName) {
        this.currentName = tableNames[tableName];
        this.currentView = tableMap(`./${tableName}_table.vue`);
        this.currentForm = tableMap(`./${tableName}_form.vue`);
        this.resourceName = tableName;
        this.apiName = apiMaps[tableName];
        this.getTableDatas();
      },

      pagination(currentPage) {
        this.currentPage = currentPage;
        this.getTableDatas();
      },

      handleSelectionChange(selects) {
        this.selectCol = selects.map((sl) => {
          const page = {
            _id: sl._id,
            name: sl.name,
          };
          return page;
        });
      },

      delSelect(select) {
        this.selectCol = this.selectCol.filter(sl => sl !== select);
      },
    },

    watch: {
      /* eslint-disable */
      '$route'(to, from) {
        // 对路由变化作出响应...
        const tableName = this.tablesNames[to.params.tableName];
        this.changeCurrent(tableName);
      },
    },

    mounted() {
      const tableName = this.tablesNames[this.$route.params.tableName];
      this.changeCurrent(tableName);
    },
  };
</script>
