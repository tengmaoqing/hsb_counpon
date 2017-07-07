import cheerio from 'cheerio';
import { store } from '../store/state';

function bindText($el, $) {
  // console.log($el.contents());

  $el.contents().each((index, item) => {
    const $item = $(item);

    if (item.nodeType === Node.TEXT_NODE) {
      // console.log($item.text());
      // item.nodeValue = '{{sdffg}}';
    }

    if ($item.contents().length) {
      bindText($item, $);
    }
  });
}

// const imgReplacer = (html, preImg) => {
//   const $ = cheerio.load(html, {
//     decodeEntities: false,
//   });
//   $('img').eq(preImg.index).attr('src', preImg.src);
//   return $('body').html();
// };

function dataToVue(data, updated) {
  // const tpl = `<div>
  //   ${data.html}
  // </div>`;
  const tpl = data.html;
  const $ = cheerio.load(tpl);
  const $that = $('body').children();

  bindText($that, $);
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
  $that.attr(':style', 'data.style');
  $that.addClass('vue-wrap');
  $that.attr(':class', '{"is-hover": hover}');
  $that.attr(':style', '{"position": position}');
  $that.find('[data-child-wrap]').attr('data-child-wrap', data.$compoentRandomID);
  $that.find('[data-child-wrap]').html('<slot></slot>');

  // $that.append(`
  // <el-dialog :visible.sync="imgChanger" :modal="false">
  //   <p>输入图片的地址</p>
  //   <el-input placeholder="src" v-model="selectedIMG.src"></el-input>
  //   <el-button @click="imgReplace">确认</el-button>
  // </el-dialog>`);

  // image 指令
  // const imgs = $that.find('img');
  // const vueImgs = [];
  // Array.prototype.forEach.call(imgs, (item, imgIndex) => {
  //   const $img = $(item);
  //   vueImgs.push({
  //     index: imgIndex,
  //     src: $(item).attr('src'),
  //   });

  //   $img.attr(':src', `vueImgs[${imgIndex}].src`);
  //   $img.attr('@click', `imgClick(${imgIndex})`);
  // });

  return {
    template: $('body').html(),
    data() {
      return {
        hover: false,
        type: data.type,
        data,
        deleteVisible: false,
        position: '',
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

      // imgReplace() {
      //   this.imgChanger = false;
      //   const nHTML = imgReplacer(this.data.html, this.selectedIMG);
      //   this.$store.commit('updateCotentByRandomID', {
      //     $compoentRandomID: this.data.$compoentRandomID,
      //     key: 'html',
      //     value: nHTML,
      //   });
      // },

      // imgClick(i) {
      //   this.selectedIMG.index = i;
      //   this.selectedIMG.src = this.vueImgs[i].src;
      //   this.imgChanger = true;
      // },

      deleteCOM() {
        this.$store.commit('deleteCOMByRandomID', this.data.$compoentRandomID);
        // this.$destroy();
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (window.getComputedStyle(this.$el).position === 'static') {
          this.position = 'relative';
        }
      });
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
