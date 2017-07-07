<template>
  <section>
<!--     <el-form-item v-show="value">
      <label>
        选择的模板
        <el-button type="primary" @click="deleteTemplateId" size="small" >更换</el-button>
      </label>
      {{value}}
    </el-form-item> -->
    <el-form-item label="选择模板" >
      <el-select
        v-model="selectedTemplateId"
        filterable
        remote
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in templates"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
    </el-form-item>
  </section>
</template>

<script type="text/javascript">
  import Apis from '@/api/curd';

  export default {
    data() {
      return {
        loading: false,
        selectedTemplateId: '',
        templates: [],
      };
    },

    props: {
      value: String,
    },

    watch: {
      selectedTemplateId(v) {
        this.$emit('input', v);
      },
    },

    methods: {
      remoteMethod() {
        this.loading = true;
        Apis.getTemplates({}).then((data) => {
          this.loading = false;
          this.templates = data.docs;
        });
      },

      deleteTemplateId() {
        this.selectedTemplateId = null;
      },
    },

    mounted() {
      this.selectedTemplateId = this.value;
    },
  };
</script>
