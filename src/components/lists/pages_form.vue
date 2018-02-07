<template>

  <div>

    <el-form :model="form" inline>
      <el-form-item label="页面名称（文件夹名）">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="输出文件类型">
        <el-select v-model="form.extension" placeholder="活动区域">
          <el-option label="php" value="php"></el-option>
          <el-option label="html" value="html"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="输出的入口文件名称(不含扩展名)">
        <el-input v-model="form.filename" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="所属项目">
        {{form.productname}}
        <el-select v-model="form.projectId" placeholder="活动区域">
          <el-option v-for="(project, index) in projects" :key="index" :label="project.name" :value="project._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="publicPath（开发模式不生效）">
        <el-input v-model="form.publicPath" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="预加载的JS">
        <el-input v-model="form.preLoad" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item >
        <label>head里面的其它内容（暂时不编译，考虑兼容） <read-file-content style="float: right"></read-file-content></label>
        <el-input v-model="form.head" type="textarea" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item >
        <label>页尾加载的其他自定义内容（如：统计代码或者其它） <read-file-content style="float: right"></read-file-content> </label>
        <el-input v-model="form.footer" type="textarea" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="页面主题">
        <el-input v-model="form.style" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="title">
        <el-input v-model="form.title" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="keyword">
        <el-input v-model="form.keyword" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.description" auto-complete="off"></el-input>
      </el-form-item>
      <select-template v-model="form.templateId"></select-template>
      <el-form-item v-show="!form.templateId">
        <label>
          模板HTML
          <read-file-content style="float: right"></read-file-content>
        </label>
        <el-input v-model="form.template" type="textarea" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<style type="text/css">

  .el-form-item {
    max-width: 80%;
  }
</style>

<script type="text/javascript">
  import Apis from '@/api/curd';
  import readFileContent from '@/components/readFileContent';
  import selectTemplate from '../select-template';

  export default {
    data() {
      return {
        projects: [],
      };
    },
    components: {
      readFileContent,
      selectTemplate,
    },

    props: {
      editForm: Object,
    },

    computed: {
      form() {
        return this.editForm;
      },
    },

    methods: {
    },
    updated() {
      if (this.form && this.form.projectId && this.form.projectId._id) {
        this.form.projectId = this.form.projectId._id;
      }
    },
    mounted() {
      Apis.getProjects({}).then((data) => {
        this.projects = data.docs;
      });
    },
  };
</script>
