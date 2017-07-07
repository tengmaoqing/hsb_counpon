
<template>
  <div>
    <!-- <alert title="先确保页面支持https"></alert> -->

    <el-form label-width="180px">
      <form-item label="url">
        <el-input placeholder="如 https://www.baidu.com" v-model="uri">

          <el-button slot="append" icon="search" @click="getAllSrc"></el-button>
        </el-input>
      </form-item>
    </el-form>

    <row :gutter="20">
      <el-col :span="6" v-for="(types, index) in urls" :key="index">
        <card >
          <div slot="header" class="clearfix">
            <span>{{index}}</span>
            资源{{unique(types).length}}条
            <checkbox :indeterminate="false" @change="handleCheckAllChange(types, $event)">全选</checkbox>
          </div>
            <checkbox-group v-model="checkedSrouces" @change="checkedSroucesChange">
              <checkbox v-for="src in unique(types)" :label="src" :key="src">{{src}} <span>1k</span></checkbox>

            </checkbox-group>
        </card>
      </el-col>
    </row>

    <row>
      <el-col>
        <card>
          <div slot="header" class="clearfix">
            <span>已选的资源</span>
            共{{checkedSrouces.length}}条
          </div>

          <div v-for="src in checkedSrouces">
              {{src}}
          </div>
        </card>
      </el-col>
    </row>
  </div>
</template>


<style type="text/css">

  .el-card {
  }

  .el-card__body {
    overflow: auto;
    max-height: 300px;
    min-height: 300px;
    overflow: auto;
  }

  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>

<script type="text/javascript">
  import { Button, Input, Alert, Form, FormItem, Card, Row, Col, CheckboxGroup, Checkbox } from 'element-ui';

  export default {
    name: 'ws',
    components: {
      Alert,
      'el-form': Form,
      FormItem,
      'el-input': Input,
      'el-button': Button,
      Card,
      Row,
      'el-col': Col,
      CheckboxGroup,
      Checkbox,
    },
    data() {
      return {
        uri: 'http://tmq.www.huishoubao.com',
        urls: {},
        checkedSrouces: [],
      };
    },
    methods: {

      clearListFromCheckedList(lists) {
        lists.forEach((item) => {
          const index = this.checkedSrouces.indexOf(item);
          if (index > -1) {
            this.checkedSrouces.splice(index, 1);
          }
        });
      },
      handleCheckAllChange(lists, ev) {
        this.clearListFromCheckedList(lists);
        if (ev.target.checked) {
          this.checkedSrouces.push(...lists);
        }
      },
      unique(array) {
        const temp = new Set(array);
        return Array.from(temp);
      },
      getAllSrc() {
        this.$http.get(`${this.rootPath}/service_worker/get_rsc_by_page?uri=${this.uri}`).then((res) => {
          if (res.status !== 0) {
            this.$message(res.msg);
          }

          this.urls = res.data.data;
        });
      },
    },
  };

</script>
