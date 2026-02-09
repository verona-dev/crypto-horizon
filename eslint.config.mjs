// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import pluginVue from 'eslint-plugin-vue';

export default withNuxt([
    pluginVue.configs['vue3-recommended'],
    {
        rules: {
            'arrow-parens': ['error', 'as-needed'],
            'jsx-quotes': ['error', 'prefer-single'],
            'max-len': ['error', { code: 250 }],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'vue/singleline-html-element-content-newline': ['error', {
                'ignoreWhenNoAttributes': true,
                'ignoreWhenEmpty': true,
            }],
            'vue/script-indent': ['error', 4, { baseIndent: 1 }],
            'vue/html-indent': ['error', 4],
            'vue/html-quotes': ['error', 'single'],
        },
    },
]);
