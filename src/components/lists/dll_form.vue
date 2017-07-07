<template>

  <div>

    <el-form :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="venders">
        <el-select v-model="form.venders"  multiple>
          <el-option value="vue">vue</el-option>
          <el-option value="vuex">vuex</el-option>
          <el-option value="axios">axios</el-option>
          <el-option value="vue-router">vue-router</el-option>
          <el-option value="loadash">loadash</el-option>
          <el-option value="jquery">jquery</el-option>
          <el-option value="react">react</el-option>
          <el-option value="redux">redux</el-option>
          <el-option value="element-ui">element-ui</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" auto-complete="off"></el-input>
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
