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
        "import/no-unresolved":{ commonjs: true, amd: true }

    },
    settings: {
        'import/resolver': {
            webpack: {
                config : 'build/webpack.config.dev.babel.js',
            },
        },
    },
};
