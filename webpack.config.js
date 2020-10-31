const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
    entry: "./src/index.tsx",
    watch: true,
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: []
};

const browserSyncConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: {
        baseDir: ['build']
    },
    open: false,
    snippetOptions: {
        rule: {
            match: /<\/body>/i,
            fn(snippet, match) {
                return snippet + match;
            }
        }
    }
});

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.plugins.push(browserSyncConfig);
    }

    if (argv.mode === 'production') {
        config.devtool = 'source-map';
        config.output.filename = '[name].min.js';
        config.output.sourceMapFilename = '[name].min.js.map';
    }

    return config;
};

