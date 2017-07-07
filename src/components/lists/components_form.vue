<template>

	<div>

		<el-form :model="form">
			<el-form-item label="模板名称">
				<el-input v-model="form.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="form.description" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="模板HTML">
				<el-input v-model="form.html" type="textarea" auto-complete="off"></el-input>
			</el-form-item>

      <el-form-item label="HTML路径">
        <el-autocomplete
        class="inline-input"
        v-model="form.pathHTML"
        :fetch-suggestions="getQuerySearch('allHTML')"
        placeholder="请输入内容"
      ></el-autocomplete>
      </el-form-item>

      <el-form-item label="模板入口JS">
        <el-autocomplete
        class="inline-input"
        v-model="form.pathJS"
        :fetch-suggestions="getQuerySearch('allJS')"
        placeholder="请输入内容"
      ></el-autocomplete>
      </el-form-item>

      <el-form-item label="是否可以拥有子元素">
        <el-switch on-text="" off-text="" v-model="form.isClosingTag"></el-switch>
      </el-form-item>
		</el-form>
	</div>

</template>

<script type="text/javascript">
  // import store from './state';

  export default {

    data() {
      return {
        // form: {
        //   _id: '',
        //   name: '',
        //   description: '',
        //   html: `<div class="test1" data-mq-components>
        //   <h4>h4</h4>
        //   <span class="hah">我是测试</span>
        //   <div data-mq-child></div></div>`,
        //   pathJS: '',
        //   pathHTML: '',
        //   isClosingTag: true,
        // },
        allHTML: [],
        allJS: [],
      };
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
      getQuerySearch(target) {
        const allHTML = this[target];
        return (queryString, cb) => {
          const results = queryString ? allHTML.filter(this.createFilter(queryString)) : allHTML;
          // 调用 callback 返回建议列表的数据
          cb(results);
        };
      },

      createFilter(str) {
        return item => item.value.indexOf(str) > -1;
      },

    },

    mounted() {
      this.$http.get('/tableData/template').then((res) => {
        this.allHTML = res.map(item => Object.create({ value: item }));
      });
      this.$http.get('/tableData/components').then((res) => {
        this.allJS = res.map(item => Object.create({ value: item }));
      });
    },
  };
</script>
