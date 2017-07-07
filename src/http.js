/*
* @Author: TMQ
* @Date:   2017-10-18 00:34:02
* @Last Modified by:   TMQ
* @Last Modified time: 2017-10-18 00:37:20
*/

import axios from 'axios';
import Vue from 'vue';

const httpInstances = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

class CustomError {
  constrctor(errMsg) {
    this.errMessage = errMsg;
    this.status = -1;
  }
}

httpInstances.interceptors.response.use((response) => {
  const result = response.data;

  if (result.status !== 0) {
    return Promise.reject(new CustomError(result.message));
  }
  return result.data;
}, (err) => {
  if (err instanceof CustomError) {
    Vue.prototype.$message(err.errMessage);
  } else {
    Vue.prototype.$message('网络异常！');
  }
  return Promise.reject(err);
});

export default httpInstances;
