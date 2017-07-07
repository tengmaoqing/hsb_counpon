
<template>

  <draggable @end="end" :move="checkMove" :options="options" class="sort-parent" :data-vue-id="id">
    <slot></slot>
  </draggable>
</template>

<script type="text/javascript">

  import vuedraggable from 'vuedraggable';
  import { store } from '../store/state';

  export default {
    name: 'config-sort',
    components: {
      draggable: vuedraggable,
    },

    data() {
      return {
        options: {
          group: 'components',
          handle: '.drageable',
          animation: 150,
          // onMove: this.checkMove,
          ghostClass: 'ghost',
        },
      };
    },
    props: {
      id: Number,
    },

    // computed: {

    //   options() {
    //     // return store.state.sortOption;
    //   },
    // },

    methods: {

      end(ev) {
        const item = ev.item;
        const parent = item.parentNode;

        const formRandomID = ev.from.getAttribute('data-vue-id');
        const toRandomID = parent.getAttribute('data-vue-id');
        const info = {
          formRandomID,
          toRandomID,
          newIndex: ev.newIndex,
          oldIndex: ev.oldIndex,
        };
        if (info.formRandomID === info.toRandomID && info.newIndex === info.oldIndex) {
          return;
        }

        if (info.formRandomID) {
          // 会新建一个
          setTimeout(() => {
            parent.removeChild(item);
          }, 10);
        }

        store.commit('sortContent', info);
      },

      checkMove() {
      },
    },

    mounted() {
    },
  };

</script>
