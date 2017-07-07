<template>

  <div>

    <el-form :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="remUnit">
        <el-select v-model="form.remUnit" placeholder="请选择">
          <el-option :value="75"></el-option>
          <el-option :value="37.5"></el-option>
          <el-option :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="publicPath">
        <el-input v-model="form.publicPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="testPublicPath">
        <el-input v-model="form.testPublicPath" auto-complete="off"></el-input>
      </el-form-item>

      <select-template v-model="form.templateId"></select-template>

      <el-form-item label="dll">
        <el-select
          v-model="form.dllId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="searchDll">
          <el-option
            v-for="item in dlls"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公共资源（公共的、全局的、不影响组件功能的）">
        <el-button style="float: right" @click="addSRC" type="warning">新增</el-button>
        <el-table :data="commonSrc" v-if="commonSrc.length">
          <el-table-column label="类型">
            <template scope="scope">
              <span v-if="!scope.row.isEditing">{{ scope.row.type }}</span>
              <el-select v-model="scope.row.type" v-else placeholder="请选择">
                <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="位置">
            <template scope="scope">
              <span v-if="!scope.row.isEditing">{{ scope.row.position }}</span>
              <el-select v-model="scope.row.position" v-else placeholder="请选择">
                <el-option v-for="item in positions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资源路径">
            <template scope="scope">
              <span v-if="!scope.row.isEditing">{{ scope.row.src }}</span>
              <el-select v-model="scope.row.src" v-else placeholder="请选择">
                <el-option v-for="item in allSRC" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  label="内联">
            <template scope="scope">
              <span v-if="!scope.row.isEditing">{{ scope.row.isInline }}</span>
              <el-switch
                v-else
                v-model="scope.row.isInline">
              </el-switch>
              <!--
              <el-select v-model="scope.row.isInline" v-else placeholder="请选择">
                <el-option v-for="item in allSRC" :key="item" :label="item" :value="item"></el-option>
              </el-select> -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="customStr" label="自定义内容">
          </el-table-column> -->
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" size="small" v-if="!scope.row.isEditing" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" v-if="scope.row.isEditing" @click="mDelete(scope.row)">删除</el-button>
              <el-button type="text" size="small" v-if="scope.row.isEditing" @click="save(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

<!--       <el-form-item label="公共资源（公共的、全局的、不影响组件功能的）">
        <el-select v-model="form.commonSrc" multiple placeholder="请选择">
          <el-option
            v-for="item in allSRC"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
  </div>

</template>

<script type="text/javascript">
  import Apis from '@/api/curd';
  import selectTemplate from '../select-template';

  export default {
    data() {
      return {
        commonSrc: [],
        allSRC: [],
        dlls: [],
        types: ['js', 'css'],
        positions: ['', 'head', 'body'],
      };
    },

    components: {
      selectTemplate,
    },
    props: {
      editForm: Object,
    },

    methods: {
      addSRC() {
        this.commonSrc.push({
          type: 'js',
          position: '',
          src: '',
          customStr: '',
          isInline: false,
        });
      },
      edit(row) {
        const index = this.commonSrc.findIndex(item => item === row);
        const nSrcs = [...this.commonSrc];
        nSrcs[index].isEditing = true;
        this.commonSrc = [...nSrcs];
      },
      save(row) {
        const index = this.commonSrc.findIndex(item => item === row);
        const nSrcs = [...this.commonSrc];
        delete nSrcs[index].isEditing;
        this.commonSrc = [...nSrcs];
        this.form.commonSrc = [...nSrcs];
      },
      mDelete(row) {
        this.doDelete(row);
      },

      doDelete(row) {
        const index = this.commonSrc.findIndex(item => item === row);
        if (index > -1) {
          this.commonSrc.splice(index, 1);
        }
        this.form.commonSrc = [...this.commonSrc];
      },

      searchDll(q) {
        Apis.getDlls({ q }).then((data) => {
          this.dlls = data.docs;
        });
      },
    },

    computed: {
      form() {
        return this.editForm;
      },
    },

    mounted() {
      this.$http.get('/tableData/src').then((res) => {
        this.allSRC = res;
      });

      if (this.form.commonSrc.length) {
        this.commonSrc = JSON.parse(JSON.stringify(this.form.commonSrc));
      }
    },

  };
</script>
