import Vue from 'vue';
import Vuex from 'vuex';
import httpInstance from '../http';

Vue.use(Vuex);

function findContentByRandID(contents, id) {
  let result = null;
  for (let i = contents.length - 1; i >= 0; i--) {
    const content$ = contents[i];

    if (content$) {
      if (content$.$compoentRandomID === id) {
        return {
          content: content$,
          parent: contents,
        };
      }

      if (content$.childs) {
        result = findContentByRandID(content$.childs, id);
        if (result) {
          return result;
        }
      }
    }
  }

  return result;
}

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    // configName: '',
    currentLayer: {
      state: false,
      cpm: '',
    },
    pageInfo: {},
  },
  mutations: {
    updateCurrentLayer(state, layer) {
      /* eslint-disable no-param-reassign */
      state.currentLayer.state = layer.state;
      if (layer.cpm) {
        // console.log(layer);
        state.currentLayer.cpm = layer.cpm;
      }
    },
    initPageInfo(state, info) {
      state.pageInfo = info;
    },
    updateCotentByRandomID(state, obj) {
      const id = Number(obj.$compoentRandomID);
      const nContent = JSON.parse(JSON.stringify(state.pageInfo.content));
      const finded = findContentByRandID(nContent, id);
      const cpm = finded.content;
      if (!cpm) {
        return;
      }
      cpm[obj.key] = obj.value;
      state.pageInfo.content = nContent;
    },
    deleteCOMByRandomID(state, id) {
      const newContent = Array.slice(state.pageInfo.content);
      const result = findContentByRandID(newContent, id);
      const parentCOM = result.parent;
      const index = parentCOM.indexOf(result.content);
      parentCOM.splice(index, 1);
      state.pageInfo.content = newContent;
    },
    addContent(state, info) {
      let contents = state.pageInfo.content;
      let content = state.pageInfo;
      const parentID = Number(info.parentID);
      if (parentID) {
        content = findContentByRandID(state.pageInfo.content, parentID).content;
        contents = content.childs;
        // return;
      }

      contents.splice(info.index, 0, info.content);
    },
    sortContent(state, info) {
      /* eslint-disable no-unused-vars */
      let fromContent = Array.slice(state.pageInfo.content);
      let toContent = fromContent;
      const originContent = fromContent;
      let parentCOM = Object.assign(state.pageInfo);

      if (info.formRandomID) {
        fromContent = findContentByRandID(fromContent, Number(info.formRandomID)).content.childs;
      }

      if (info.toRandomID) {
        parentCOM = findContentByRandID(toContent, Number(info.toRandomID)).content;
        toContent = parentCOM.childs;
      }

      const draged = fromContent.splice(info.oldIndex, 1)[0];
      // draged.$parentID = parentCOM.$compoentRandomID;
      toContent.splice(info.newIndex, 0, draged);
      state.pageInfo.content = originContent;
    },
    clearContent(state) {
      state.pageInfo.content = [];
    },
    reloadContent(state) {
      state.pageInfo.content = Array.slice(state.pageInfo.content);
    },
  },
  actions: {
    doStructure({ commit }, { pageID, environment, pages }) {
      return httpInstance.post('/createPage/structure', { pages, pageID, environment });
    },
  },
});

export default store;
export {
  store,
  findContentByRandID,
};
