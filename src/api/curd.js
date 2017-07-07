import httpInstance from '@/http';
import qs from 'qs';

export default {
  getTemplates({ currentPage = 1, pageSize = 20, q }) {
    return httpInstance.get(`/createPage/template?${qs.stringify({ currentPage, pageSize, q })}`);
  },
  getPages({ currentPage = 1, pageSize = 20, q = '' }) {
    return httpInstance.get(`/createPage/page?${qs.stringify({ currentPage, pageSize, q })}`);
  },
  getComponents({ currentPage = 1, pageSize = 20, q }) {
    return httpInstance.get(`/createPage/component?${qs.stringify({ currentPage, pageSize, q })}`);
  },
  getProjects({ currentPage = 1, pageSize = 20, q }) {
    return httpInstance.get(`/createPage/project?${qs.stringify({ currentPage, pageSize, q })}`);
  },
  getDlls({ currentPage = 1, pageSize = 20, q }) {
    return httpInstance.get(`/createPage/dll?${qs.stringify({ currentPage, pageSize, q })}`);
  },
  addTemplate(data) {
    return httpInstance.post('/createPage/template', data);
  },
  addPage(data) {
    return httpInstance.post('/createPage/page', data);
  },
  addComponent(data) {
    return httpInstance.post('/createPage/component', data);
  },
  addProject(data) {
    return httpInstance.post('/createPage/project', data);
  },
  addDll(data) {
    return httpInstance.post('/createPage/dll', data);
  },
  updateTemplate(data) {
    return httpInstance.put('/createPage/template', data);
  },
  updatePage(data) {
    return httpInstance.put('/createPage/page', data);
  },
  updateComponent(data) {
    return httpInstance.put('/createPage/component', data);
  },
  updateProject(data) {
    return httpInstance.put('/createPage/project', data);
  },
  updateDll(data) {
    return httpInstance.put('/createPage/dll', data);
  },
};
