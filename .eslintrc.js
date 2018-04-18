const path = require('path');

module.exports = {
    extends: "airbnb-base",
    env: {
        "browser": true,
        "node": true,
    },
    rules: {
        "no-console": 0,
        "no-alert": 0,
        'prefer-destructuring': 0,
        "import/extensions": ["error", "never", { "scss": "always", "hbs": "always",  }],
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": ["error"],

    },
    settings: {
        'import/resolver': {
            webpack: {
                config : 'build/webpack.config.dev.babel.js',
            },
            alias: [
                    ['@root', path.resolve(__dirname, '.')],
                    ['@frontend', path.resolve(__dirname, 'src/frontend')],
                    ["@pages", path.resolve(__dirname, 'src/backend/views')],
                    ["@backend", path.resolve(__dirname, 'src/backend')],
                ],
        },
    },
};
