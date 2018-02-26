import cheerio from 'cheerio';
import Mustache from 'mustache';
import { store } from '../store/state';

// function bindText($el, $) {
//   // console.log($el.contents());

//   $el.contents().each((index, item) => {
//     const $item = $(item);

//     if (item.nodeType === Node.TEXT_NODE) {
//       // console.log($item.text());
//       // item.nodeValue = '{{sdffg}}';
//     }

//     if ($item.contents().length) {
//       bindText($item, $);
//     }
//   });
// }

// const imgReplacer = (html, preImg) => {
//   const $ = cheerio.load(html, {
//     decodeEntities: false,
//   });
//   $('img').eq(preImg.index).attr('src', preImg.src);
//   return $('body').html();
// };
const encodeVueTag = html => html.replace(/(\s+)(:)(\w+=)/g, '$1tmqx1$3')
.replace(/(\s+)(v)(-\w+=)/g, '$1tmqx2$3')
.replace(/(\s+)(@)(\w+=)/g, '$1tmqx3$3');

const decodeVueTag = html => html.replace(/(\s+)(tmqx1)(\w+=)/g, '$1:$3')
.replace(/(\s+)(tmqx2)(-\w+=)/g, '$1v$3')
.replace(/(\s+)(tmqx3)(\w+=)/g, '$1@$3');

function dataToVue(data, updated) {
  // const tpl = `<div>
  //   ${data.html}
  // </div>`;
  const originHTML = data.html;
  let tpl = encodeVueTag(originHTML);
  const replacedTpl = tpl;
  tpl = Mustache.render(tpl, JSON.parse(data.vars || '{}'));
  const $ = cheerio.load(tpl);
  const $that = $('body').children();

  // bindText($that, $);
  $that.append(`
  <el-popover
    ref="popover3"
    placement="top"
    width="160"
    v-model="deleteVisible"
    >
    <p>Hey, 确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="deleteCOM">确定</el-button>
    </div>
  </el-popover>`);
  $that.append(`<div class="vue-wrap-nav">
      <i class="el-icon-edit" @click.stop="editHandler"></i>
      <i v-if="!isLayout" class="drageable">:::</i>
      <i class="el-icon-delete" v-popover:popover3></i>
    </div>`);
  $that.attr('@mouseover.stop', 'mouseoverHandler');
  $that.attr('@mouseout', 'mouseoutHandler');
  // $that.attr('@click.stop', 'mutilClick');
  $that.attr(':style', 'style');
  $that.addClass('vue-wrap');
  $that.attr(':class', '{"is-hover": hover}');
  $that.find('[data-child-wrap]').attr('data-child-wrap', data.$compoentRandomID);
  $that.find('[data-child-wrap]').html('<slot></slot>');

  return {
    template: $('body').html(),
    data() {
      return {
        hover: false,
        type: data.type,
        data,
        style: window.JSON.parse(data.style || '{}'),
        deleteVisible: false,
        // vueImgs,
        // imgChanger: false,
        // selectedIMG: {
        //   index: 0,
        //   src: '',
        // },
      };
    },
    computed: {
      isLayout() {
        return this.type === 'layout';
      },
    },
    store,
    methods: {
      mouseoverHandler() {
        this.hover = true;
      },
      mouseoutHandler() {
        this.hover = false;
      },
      editHandler() {
        this.$store.commit('updateCurrentLayer', {
          state: true,
          cpm: this.data,
        });
      },

      deleteCOM() {
        this.$store.commit('deleteCOMByRandomID', this.data.$compoentRandomID);
        // this.$destroy();
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (window.getComputedStyle(this.$el).position === 'static') {
          this.$set(this.style, 'position', 'relative');
        }
      });
      if (replacedTpl !== originHTML) {
        this.$el.outerHTML = decodeVueTag(originHTML);
      }
      if (updated) {
        updated(this.data.$compoentRandomID);
      }
    },

    destroyed() {
      // this.$el.parentNode.removeChild(this.$el);
    },
  };
}

export default dataToVue;

export {
  dataToVue,
};
