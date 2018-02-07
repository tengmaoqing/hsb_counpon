<template>
  <div>
    <textarea ref="myTextarea" v-model="value"></textarea>
  </div>
</template>

<style type="text/css">

</style>


<script type="text/javascript">
  import CodeMirror from 'codemirror/lib/codemirror';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/mode/htmlmixed/htmlmixed';

  export default {
    data() {
      return {
        currentValue: '',
      };
    },
    props: {
      value: String,
    },
    watch: {
      value(v) {
        this.editor.setValue(v);
      },
    },
    methods: {
      init() {
        this.editor = CodeMirror.fromTextArea(this.$refs.myTextarea, {
          mode: 'application/x-ejs',
          lineNumbers: true,
          indentUnit: 2,
        });
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
  };
</script>
