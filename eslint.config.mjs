// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';

export default withNuxt([pluginVue.configs['vue3-recommended'], pluginPrettier]);
