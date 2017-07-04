
<template>
  <div class="form-wrap">
    <el-form label-width="180px" :action="actionurl" target="_blank" method="GET" :model="form" :rules="rules" ref="form">

      <form-item label="券描述" prop="activityDescription">
        <tooltip content="券描述">

          <el-input name="activityDescription" placeholder="如：跨年20元加价券" v-model="form.activityDescription"></el-input>
        </tooltip>
      </form-item>

      <form-item label="券总量" prop="max">
        <tooltip content="券总量">

          <el-input name="max" type="number" placeholder="活动要发券数量" v-model.number="form.max"></el-input>
        </tooltip>
      </form-item>

      <form-item label="每个资格可发券数" prop="qualifactionLimited">
        <tooltip content="每个资格可发券数">

          <el-input name="qualifactionLimited" type="number" placeholder="每个资格可发券数" v-model.number="form.qualifactionLimited"></el-input>
        </tooltip>
      </form-item>

      <form-item label="下单时可使用券限制" prop="useLimited">
        <el-input type="number" placeholder="满多少钱可用" v-model.number="moneys.useLimited ">
          <template slot="append">元</template>
        </el-input>
        <input type="text" style="display: none;" v-model="form.useLimited" name="useLimited">
      </form-item>

      <form-item label="券过期时间" prop="invalidTime">
        <el-input name="invalidTime" type="number" placeholder="领取优惠券后的过期时间（天）" v-model.number="form.invalidTime">
          <template slot="append">天</template>
        </el-input>
      </form-item>

      <form-item label="检测价格可用限制" prop="bargainLimited">
        <el-input type="number" placeholder="检测价格可用限制" v-model.number="moneys.bargainLimited">
          <template slot="append">元</template>
        </el-input>
        <input type="text" style="display: none;" v-model="form.bargainLimited" name="bargainLimited">
      </form-item>

      <form-item label="加价券面值" prop="faceValue">
        <el-input type="number" placeholder="加价券面值" v-model.number="moneys.faceValue">
          <template slot="append">元</template>
        </el-input>
        <input type="text" style="display: none;" v-model="form.faceValue" name="faceValue">
      </form-item>

      <form-item  label="领取加价券截止时间" prop="endTime"
        :rules="[
          { required: true, message: '请输入日期', trigger: 'change' },
        ]"
      >

        <date-picker :editable="false" format="yyyyMMdd" placeholder="活动结束时间" v-model="endTime" @change="onPickerSelect" :picker-options="pickerOptions"></date-picker>
         <input type="text" style="display: none;" v-model="form.endTime" name="endTime">
      </form-item>

      <form-item label="领券标示" prop="token">
        <el-input class="input-small" name="token" placeholder="用户领券时输入的token" v-model="form.token"></el-input>
        <el-button v-show="hasPass" @click="validToken()">测试一下</el-button>
      </form-item>
      <form-item>
        <tooltip content="请谨慎，确保测试过!">
          <label>
            <input type="checkbox" name="product" v-model="form.product" value="1">
            已经测试过了，确认填写无误，则勾选
          </label>
        </tooltip>
      </form-item>
      <form-item  >
        <el-button ref="button" type="danger" :loading="loading" @click="submitForm('form')">现在生成券</el-button>
      </form-item>

    </el-form>
  </div>
</template>

<style type="text/css">

.form-wrap {
  width: 80%;
  margin: 0 auto;
}

.input-small.el-input {
  width: 180px;
}
</style>
<script type="text/javascript">

import { Input, Form, FormItem, DatePicker, Button, Tooltip, Checkbox } from 'element-ui';

export default {

  components: {
    'el-input': Input,
    'el-form': Form,
    'el-button': Button,
    FormItem,
    DatePicker,
    Tooltip,
    Checkbox,
  },

  data() {
    return {
      endTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      form: {
        activityDescription: '',
        max: 10000000,
        useLimited: null,
        invalidTime: '',
        bargainLimited: '',
        faceValue: '',
        qualifactionLimited: 10000000,
        endTime: '',
        token: '',
        product: false,
      },
      rules: {
        activityDescription: [
          {
            required: true, message: '请输入描述', trigger: 'blur',
          },
        ],
        max: [
          {
            type: 'number', required: true, message: '必须是数字', trigger: 'blur',
          },
        ],
        useLimited: [
          {
            type: 'number', required: true, message: '使用限制必须是数字', trigger: 'blur',
          },
        ],
        invalidTime: [
          {
            type: 'number', required: true, message: '必须且是数字', trigger: 'change',
          },
        ],
        bargainLimited: [
          {
            type: 'number', required: true, message: '必须是数字', trigger: 'blur',
          },
        ],
        faceValue: [
          {
            type: 'number', required: true, message: '必须是数字', trigger: 'blur',
          },
        ],
        qualifactionLimited: [
          {
            type: 'number', required: true, message: '必须是数字', trigger: 'blur',
          },
        ],
        // endTime: [
        //   {
        //     type: 'date', required: true, message: '必须是日期', trigger: 'change',
        //   },
        // ],
        token: [
          {
            required: true, message: '必须', trigger: 'blur',
          },
        ],
      },
      actionurl: '',
      moneys: {
        useLimited: '',
        bargainLimited: '',
        faceValue: '',
      },
      loading: false,
      hasPass: false,
    };
  },

  watch: {
    moneys: {

      handler() {
        this.dataHandle();
      },
      deep: true,
    },
  },

  methods: {
    dataHandle() {
      Object.keys(this.moneys).forEach(item => (this.form[item] = this.moneys[item] * 100));
    },

    onPickerSelect(v) {
      this.form.endTime = v;
    },

    validToken() {
      let url = `http://liuyang.www.huishoubao.com/php/index.php/mobile/Api/getCouponByToken?token=${this.form.token}&userId=61523`;
      if (this.form.product) {
        url += '&product=1';
      }
      window.location.href = url;
    },

    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
        if (valid) {
          this.hasPass = true;
          // const form = this.form;
          // const querys = Object.keys(form).map(item => `${item}=${form[item]}`).join('&');
          this.actionurl = 'http://liuyang.www.huishoubao.com/php/index.php/mobile/Api/createCoupon';
          this.$nextTick().then(() => {
            this.$refs[formName].$el.submit();
          });
          return true;
        }
        return false;
      });
    },
  },
};


</script>
