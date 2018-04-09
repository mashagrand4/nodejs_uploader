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
        "import/no-unresolved": "off",
        "import/extensions": ["error", "never", { "scss": "always", "hbs": "always",  }],
    },
};
