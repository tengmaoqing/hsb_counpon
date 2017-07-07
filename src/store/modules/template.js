import { getTemplates, addTemplates, updateTemplates } from '@/api/curd';

const state = {
	templates: [],
};

const actions = {
	getTemplates ({ commit, state }, { currentPage = 1, pageSize = 20, templateName }) {
		return getTemplates({ currentPage, pageSize, templateName });
	},
};
