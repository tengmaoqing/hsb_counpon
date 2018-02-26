
import Vue from 'vue';
import ElementUI from 'element-ui';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import debounce from 'lodash/debounce';
import { store, findContentByRandID } from '@/store/state';
import SortWrap from '../components/sort';
// import { updateStyle } from './data_process';
import Data2Vue from './data2Vue';

Vue.use(ElementUI);
// 针对iframe做处理
const getComputedStyle$1 = window.getComputedStyle;
window.getComputedStyle = (...args) => {
  if (!args[0].tagName || args[0].tagName.toLowerCase() === 'body') {
    return {
      position: 'fixed',
    };
  }
  return getComputedStyle$1.call(window, ...args);
};

const updateStyle = (module, obj) => {
  const currentStyle = JSON.parse(module.style || '{}');
  const newStyle = Object.assign({}, currentStyle, obj);
  store.commit('updateCotentByRandomID', {
    $compoentRandomID: module.$compoentRandomID,
    key: 'style',
    value: JSON.stringify(newStyle),
  });
};

function getCOMRoot(el) {
  let current = el;
  while (current.tagName && current.tagName.toLowerCase() !== 'body' && !current.getAttribute('data-child-wrap')) {
    current = current.parentNode;
  }
  return current;
}

const debounceedResize = debounce((el, data) => {
  const parent = getCOMRoot(el);
  const pH = window.parseInt(window.getComputedStyle(parent).height);
  const pW = window.parseInt(window.getComputedStyle(parent).width);
  const w = `${(el.clientWidth / pW) * 100}%`;
  const h = `${(el.clientHeight / pH) * 100}%`;
  updateStyle(data.content, {
    width: w,
    height: h,
  });
}, 300);

const IframeCss = `
    .vue-wrap {
      // position: relative;
      box-shadow: 0 0 0 1px transparent;
    }

    .vue-wrap.is-hover {
      box-shadow: 0 0 0 1px #88ceff;
      border-radius: 4px;
      transition: box-shadow 80ms ease;
    }

    .vue-wrap-nav {
      position: absolute;
      top: 0;
      left: 0;
      z-index:10000;
      width: 100%;
      height: 20px;
      display: none;
      justify-content: space-between;
    }

    .vue-wrap.is-hover>.vue-wrap-nav{
      display: flex;
    }

    .vue-wrap-nav i {
        background-color: #fff;
        padding: 3px;
        height: 17px;
        border: 1px solid #88ceff;
        border-radius: 4px;
        font-style: normal;
        color: #000;
    }

    .sort-parent {
      padding-bottom: 30px;
      position: relative;
      box-sizing: border-box;
      min-height: 100%;
    }

    .sort-parent:empty::after {
      content: "在这里嵌入组件！";
      font-size: 12px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f5f5f5;
      height: 29px;
    }

    body {
      min-height: 100px;
    }

    .ghost {
      opacity: .5;
      background: #C8EBFB;
    }

    .drageable {
      cursor: move;
    }

    [data-drageable] [data-drageable-bar] {
      opacity: .6;
      outline: 1px dotted #20a0ff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 80%;
    }

    [data-resizeable] {
      resize: both;
      overflow: auto;
    }
`;

// deep
// function pageToVue(content, parent, result = []) {
//   let childs = [];

//   childs = content.map((item) => {
//     const vue$3 = Data2Vue(item);
//     if (item.isClosingTag) {
//       item.childs = item.childs || [];
//       pageToVue(item.childs, `[data-child-wrap="${item.$compoentRandomID}"]`, result);
//     }
//     return vue$3;
//   });

//   result.push({
//     el: parent,
//     render(h) {
//       return h(SortWrap, {

//       }, childs.map(item => h(item)));
//     },
//   });
// }

const treeView = Vue.component('treeView', {

  props: {

    content: {
      type: Array,
      required: true,
    },

    update: Function,
  },
  data() {
    return {
      coms: [],
    };
  },
  render(h) {
    const getCOM = contents => contents.map((baseData) => {
      if (!baseData) {
        return false;
      }
      const vueObjLike = Data2Vue(baseData, this.update);

      let childs = null;
      if (baseData.childs) {
        childs = h(SortWrap, {
          props: {
            id: baseData.$compoentRandomID,
          },
        }, getCOM(baseData.childs));
      }
      return h(vueObjLike, {}, [childs]);
    });

    const allContent = getCOM(this.content);
    return h(SortWrap, {}, allContent);
  },
});

// function addVueDirective($cp, component) {
//   component.$compoentRandomID = +new Date();
//   $cp.attr(`v-component.${component.$compoentRandomID}`, '$store.state.pageInfo.content');
//   $cp.wrap(`<edit-base
//     mod-name="${component.name}" :options='${JSON.stringify(component.options)}'
//     :directives='${JSON.stringify(component.directives)}'
//     compoent-id="${component.$compoentRandomID}"
//     type="${component.type}" ></edit-base>`);
// }

function injectAssetToHead(option, target) {
  let defaultOption = {};
  if (typeof option === 'string') {
    defaultOption.css = option;
  } else {
    defaultOption = option;
  }

  const head = target || document.getElementsByTagName('head')[0];
  let domEl = null;
  if (defaultOption.href) {
    domEl = document.createElement('link');
    domEl.setAttribute('href', defaultOption.href);
    domEl.setAttribute('rel', 'stylesheet');
  } else if (defaultOption.src) {
    domEl = document.createElement('script');
    domEl.setAttribute('src', defaultOption.src);
  } else {
    domEl = document.createElement('style');
    domEl.innerHTML = defaultOption.css;
  }
  head.appendChild(domEl);
}

function posTFPrecent(el) {
  const current = getCOMRoot(el);
  const width = window.parseInt(window.getComputedStyle(current).width);
  const height = window.parseInt(window.getComputedStyle(current).height);
  const offsetX = window.parseInt(window.getComputedStyle(el).left);
  const offsetY = window.parseInt(window.getComputedStyle(el).top);
  return [`${(offsetX / width) * 100}%`, `${(offsetY / height) * 100}%`];
}

function bindDrag(window, document) {
  const allDragableEls = document.querySelectorAll('[data-drageable]');
  const allResizeAble = document.querySelectorAll('[data-resizeable]');

  Array.from(allResizeAble).forEach((el) => {
    const cpmID = Number(el.getAttribute('data-mq-id'));
    const data = findContentByRandID(store.state.pageInfo.content, cpmID);
    return new ResizeSensor(el, () => debounceedResize(el, data, cpmID));
  });

  Array.from(allDragableEls).forEach((el) => {
    const bar = document.createElement('div');
    const cpmID = Number(el.getAttribute('data-mq-id'));
    const data = findContentByRandID(store.state.pageInfo.content, cpmID);
    bar.setAttribute('data-drageable-bar', '');
    el.appendChild(bar);

    bar.addEventListener('click', (ev) => {
      ev.stopPropagation();
      return false;
    });

    // bar.addEventListener('contextmenu', () => {
    //   console.log(1);
    //   // mutilClick();
    //   store.commit('updateCurrentLayer', {
    //     state: true,
    //     cpm: data.content,
    //   });
    // });

    window.startDrag(bar, el, null, () => {
      const [x, y] = posTFPrecent(el);
      updateStyle(data.content, {
        top: y,
        left: x,
      });
    });
  });
}

let timer = 0;
function renderPage(window, doc) {
  /* eslint-disable */
  doc.body.innerHTML = '<div id="vueAppRoot"></div>';
  const els = doc.querySelectorAll('#vueAppRoot');

  return new Vue({
    el: els[0],
    render(h) {
      return h(treeView, {
        props: {
          content: store.state.pageInfo.content,
          update: (id) => {
            if (window.mqManger._fns[id]) {
              window.mqManger.startCP(window.mqManger._fns[id], id);
            }

            clearTimeout(timer);
            timer = setTimeout(() => {
              if (window.startDrag) {
                bindDrag(window, doc);
              }
            }, 400);
          },
        },
      });
    },
  });
}

function init(iWindow) {
  const iDocument = iWindow.document;
  const head = iDocument.getElementsByTagName('head')[0];
  init.frameDocument = iDocument;

  injectAssetToHead(IframeCss, head);
  injectAssetToHead({
    href: '//unpkg.com/element-ui@1.4.12/lib/theme-default/index.css',
  }, head);
  injectAssetToHead({
    src: `${window.location.origin}/static/js/drag.js`,
  }, head);

  // function newVueOneByeOne(instans) {
  //   const instance = instans.pop();
  //   if (instance) {
  //     if (typeof instance.el === 'string') {
  //       instance.el = iDocument.querySelector(instance.el);
  //     }
  //     const vueID = instance.el.getAttribute('data-child-wrap');

  //     const xx = new Vue(instance);

  //     Vue.nextTick(() => {
  //       if (vueID) {
  //         xx.$el.setAttribute('data-vue-id', vueID);
  //       }

  //       newVueOneByeOne(instans);
  //     });
  //   }
  // }

  renderPage(iWindow, iDocument);
}

export default init;

