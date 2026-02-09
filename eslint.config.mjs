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
            // 'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'vue/singleline-html-element-content-newline': ['error', {
                'ignoreWhenNoAttributes': true,
                'ignoreWhenEmpty': true,
            }],
            'vue/html-closing-bracket-newline': ['error', {
                singleline: 'never',
                multiline: 'always',
                'selfClosingTag': {
                    'singleline': 'never',
                    'multiline': 'always',
                },
            }],
            'vue/html-closing-bracket-spacing': ['error', {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always',
            }],
            'vue/script-indent': ['error', 4, {
                baseIndent: 1,
                switchCase: 1,
            }],
            'vue/html-indent': ['error', 4],
            'vue/html-quotes': ['error', 'single'],
            'vue/padding-line-between-tags': ['error', [
                { blankLine: 'always', prev: '*', next: '*' },
            ]],
            'vue/padding-line-between-blocks' : ['error', 'always'],
            'vue/padding-lines-in-component-definition': ['error', {
                'groupSingleLineProperties': true,
            }],
            'vue/multiline-html-element-content-newline': ['error', {
                'ignoreWhenEmpty': true,
                'allowEmptyLines': false,
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: 2,
                multiline: { max: 1 },
            }],
        },
    },
]);
