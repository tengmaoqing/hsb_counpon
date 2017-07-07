<template>

  <div class="page-wrap">
    <el-row>
      <el-col :span="12">
        <h4>页面名称：{{pageName}}</h4>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="8">
            <h4>组件</h4>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="名字或描述" v-model="searchKey" class="input-with-select" @keyup.native.enter="getComponents(searchKey)">
              <el-button slot="append" icon="el-icon-search" @click="getComponents(searchKey)">搜</el-button>
            </el-input>
          </el-col>
        </el-row>
        <vuedraggable :options="{handle: '.drageable', group: {name: 'components', put: false, pull: 'clone', revertClone: true}}" @end="onEnd" class="components-wrapper">

          <el-tag :data-component-id="component._id" type="primary" v-for="(component, index) in components" :key="index">
            <span class="drageable">:::</span>
            {{component.name}}
          </el-tag>
        </vuedraggable>
      </el-col>

      <el-col :span="6">
        <h4>指令</h4>
        <vuedraggable :options="{handle:'.drageable', group: {name: 'components', put: false, pull: 'clone', revertClone: true}}">

        <el-tag class="drageable" type="primary" v-for="(diretive, index) in diretives" :key="index">
            {{diretive.name}}
          </el-tag>
        </vuedraggable>

      </el-col>
    </el-row>

    <el-row>
      <el-popover ref="popover1"  placement="right" width="200" trigger="click">
        <el-table :data="allCOM">
          <el-table-column property="name" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="popoverHandleClick(scope)" type="text" size="small"><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
      <el-col>
        <el-button-group>
          <!-- <el-button type="primary">暂存</el-button> -->
          <el-tooltip class="item" effect="dark" content="按模板、数据生成HTML。最好先填充字符串模板" placement="top-start">
            <el-button type="info" @click="genPage">只生成HTML</el-button>
          </el-tooltip>
          <el-button type="success" @click="preview">预览</el-button>
          <el-tooltip class="item" effect="dark" content="CDN： s1.huishoubao.com" placement="top-start">
            <el-button type="warning" @click="doStructure">发布</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="绝对路径，无CDN" placement="top-start">
            <el-button type="warning" @click="doStructure('test')">测试</el-button>
          </el-tooltip>
          <el-button type="warning" @click="editPage">开始编辑</el-button>
          <el-button type="danger" @click="clearContent">清空页面</el-button>
          <el-button type="primary" @click="reloadContent">刷新页面</el-button>
          <el-button type="primary" v-popover:popover1>所有组件</el-button>
          <el-button type="primary" @click="dataVisibleToggle" icon="el-icon-view">查看页面数据</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24 - dataWith">
        <iframe ref="iframe" width="100%" height="800px" ></iframe>
      </el-col>

      <el-col :span="dataWith" v-show="dataWith !== 0">
        <textarea style="width:100%; height:800px;" readonly="readonly" v-model="dataVisible"></textarea>
      </el-col>
    </el-row>
    <edit-popup></edit-popup>

  </div>
</template>

<style type="text/css">
  .components-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .drageable {
    cursor: all-scroll;
  }
</style>

<script type="text/javascript">

  import vuedraggable from 'vuedraggable';
  import api from '@/api/curd';
  import windowHandler from '../page_contlrs/index';
  import EditPopup from './editPopup';
  import { initContentItem } from '../page_contlrs/data_process';

  document.domain = '127.0.0.1';
  window.domain = '127.0.0.1';

  const getAllCom = (lists, result = []) => {
    if (!(lists instanceof Array)) {
      return result;
    }
    lists.forEach((item) => {
      if (item.childs) {
        getAllCom(item.childs, result);
      }
      result.push({
        name: item.name,
        $compoentRandomID: item.$compoentRandomID,
      });
    });

    return result;
  };

  export default {
    name: 'editpage',
    data() {
      return {
        components: [],
        diretives: [],
        iframe: null,
        allCOMVisible: false,
        dataWith: 12,
        searchKey: '',
      };
    },

    components: {
      vuedraggable,
      EditPopup,
    },

    computed: {
      dataVisible() {
        const dataContent = this.getNewPageInfo();
        if (!dataContent) {
          return null;
        }

        this.$http.put('/createPage/page', dataContent);
        return JSON.stringify(this.$store.state.pageInfo, null, 4);
      },
      allCOM() {
        return getAllCom(this.$store.state.pageInfo.content);
      },
      pageName() {
        const pageDATA = this.$store.state.pageInfo;
        if (pageDATA) {
          return pageDATA.name;
        }
        return '';
      },
    },

    methods: {
      getNewPageInfo() {
        const pageInfo = this.$store.state.pageInfo;
        if (!pageInfo.name) {
          return false;
        }
        // console.log(pageInfo.content);
        const dataContent = JSON.parse(JSON.stringify(pageInfo));
        dataContent.content = JSON.stringify(dataContent.content);
        return dataContent;
      },
      popoverHandleClick(scope) {
        const row = scope.row;
        this.$store.commit('deleteCOMByRandomID', row.$compoentRandomID);
      },
      getComponents(q) {
        api.getComponents({ q }).then((data) => {
          this.components = data.docs;
        });
      },
      // getDirectives() {
      //   this.$http.post('/createPage/getDirectives').then((data) => {
      //     this.diretives = data;
      //   });
      // },
      getPageByID() {
        this.$http.get(`/createPage/page?pageID=${this.$route.params.pageID}`).then((data) => {
          const pageData = data;

          try {
            pageData.content = JSON.parse(pageData.content);
            if (!(pageData.content instanceof Array)) {
              pageData.content = [];
            }
          } catch (err) {
            pageData.content = [];
          }
          this.$store.commit('initPageInfo', pageData);
          this.doPackage();

          this.iframe.src = 'http://127.0.0.1:8090';
          // this.iframe.src = 'http://127.0.0.1:8080/';
          this.iframe.onload = () => {
            // this.iframe.onload = null;
            const iWindow = this.$refs.iframe.contentWindow;
            windowHandler(iWindow, pageData);
          };
        });
      },

      onEnd(ev) {
        const item = ev.item;
        const parent = item.parentNode;
        if (parent === ev.from) {
          return;
        }

        const index = ev.newIndex;
        const parentID = parent.getAttribute('data-vue-id');
        const componentID = item.getAttribute('data-component-id');
        parent.removeChild(item);
        this.addComToPage(index, parentID, componentID);
      },

      addComToPage(index, parentID, componentID) {
        this.$http.get(`/createPage/component?_id=${componentID}`).then((data) => {
          initContentItem(data);
          this.$store.commit('addContent', {
            content: data,
            parentID,
            index,
          });

          this.doPackage();
        });
      },

      genPage() {
        const page = this.getNewPageInfo();
        this.$http.post('/createPage/genPage', page);
      },

      clearContent() {
        this.$confirm('此操作将清空页面', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$store.commit('clearContent');
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        });
      },

      reloadContent() {
        this.getPageByID();
        this.$store.commit('reloadContent');
      },

      editPage() {
        this.getPageByID();
      },

      doPackage() {
        const page = this.getNewPageInfo();
        this.$http.post('/createPage/packagePage', page).then();
      },

      preview() {
        this.iframe.src = 'http://127.0.0.1:8090';
      },

      doStructure(environment = 'production') {
        /* eslint-disable no-underscore-dangle */
        const page = this.getNewPageInfo();
        this.$store.dispatch('doStructure', {
          pageID: page._id,
          environment,
        }).then(() => {
          this.$alert('已经准备打包了。。');
        });
      },

      dataVisibleToggle() {
        this.dataWith = this.dataWith === 0 ? 12 : 0;
      },

      search() {
        this.getComponents();
      },
    },

    mounted() {
      this.getComponents();
      this.editPage();
      // this.getDirectives();
      this.iframe = this.$refs.iframe;
      // this.getPageByID(); // 监听iframe
      // this.doPackage();
    },
  };

</script>
