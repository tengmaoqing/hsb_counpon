
<template>
	<vuedraggable :options="dragOptions" class="vue-wrap" element="div" @mouseover.native.stop="mouseoverHandler" @mouseout.native="mouseoutHandler" :class="{'is-hover': hover}">
    <div>
      <div class="vue-wrap-nav">
        <i v-if="!isLayout" class="el-icon-edit" @click="clikHandler"></i>
        <i class="el-icon-more" :class="drageClass"></i>
        <i class="el-icon-delete"></i>
      </div>
      <slot ></slot>
    </div>
	</vuedraggable>
</template>

<style type="text/css">
</style>

<script type="text/javascript">
  import vuedraggable from 'vuedraggable';

  export default {
    data() {
      return {
        hover: false,
        // currentView: null,
        // dialogVisible: false,
      };
    },
    props: {
      modName: String,
      options: Object,
      directives: Array,
      compoentId: String,
      type: String,
    },

    computed: {
      drageClass() {
        return `${this.type}-${this.compoentId}`;
      },
      isLayout() {
        return this.type === 'layout';
      },
      dragOptions() {
        // if (this.isLayout) {
        //   return {};
        // }

        return {
          handle: `.${this.drageClass}`,
          group: {
            name: `name-${this.type}`,
            put: ['name', `name-${this.type}`],
          },
        };
      },
    },

    components: {
      vuedraggable,
    },

    methods: {
      mouseoverHandler() {
        this.hover = true;
      },
      mouseoutHandler() {
        this.hover = false;
      },
      clikHandler() {
        this.$store.commit('updateCurrentLayer', {
          state: true,
          slotName: this.modName,
          options: this.options,
          directives: this.directives,
          $compoentRandomID: this.compoentId,
        });
      },
    },
    mounted() {
      // this.currentView = vueC;
      // console.log(this.options);
    },
  };
</script>
