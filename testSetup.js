const enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const {
    JSDOM
} = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://finanzen.check24.de/accounts/daf-frontend/'
});
const {
    window
} = jsdom;
const testUtils = require('./testUtils');
testUtils.initJSDOM();

enzyme.configure({
    adapter: new EnzymeAdapter()
});

window.matchMedia = window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop)
        }), {});
    Object.defineProperties(target, props);
}

window.scrollTo = options => options;

global.window = window;
global.document = window.document;
global.dom = jsdom;
global.navigator = {
    userAgent: 'node.js'
};

copyProps(window, global);
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});