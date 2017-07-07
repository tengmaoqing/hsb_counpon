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
    </el-form>
  </div>

</template>

<script type="text/javascript">

  export default {

    data() {
      return {
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
  };
</script>
