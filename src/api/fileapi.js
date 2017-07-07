/*
* @Author: tengmaoqing
* @Date:   2017-12-12 14:32:47
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-01-12 16:51:13
*/

import httpInstance from '@/http';

export default {
  devComponent(id) {
    return httpInstance.get(`/createPage/componentDev/${id}`);
  },
  dll(id) {
    return httpInstance.get(`/createPage/doDll/?dll=${id}`);
  },
};
