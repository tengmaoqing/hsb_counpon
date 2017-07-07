<template>

  <div>
    <el-input v-model="options.text"></el-input>
    <el-tag class="drageable" type="primary" v-for="(item, index) in directives" :key="index">
      {{item.name}}
    </el-tag>
  </div>
</template>

<script type="text/javascript">

  export default {

    computed: {
      options() {
        return this.$store.state.currentLayer.cpm.options;
      },
      directives() {
        return this.$store.state.currentLayer.cpm.directives;
      },
    },
  };

</script>
