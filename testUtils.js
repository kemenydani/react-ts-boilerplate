const enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

module.exports = {
    initJSDOM() {
        const {
            JSDOM
        } = require('jsdom');
        const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
            url: 'http://finanzen.check24.de/accounts/daf-frontend/',
            features: {
                QuerySelector: true,
                QuerySelectorAll: true
            }
        });

        const {
            window
        } = jsdom;

        enzyme.configure({
            adapter: new EnzymeAdapter()
        });

        window.matchMedia = window.matchMedia ||
                function () {
                    return {
                        matches: false,
                        addListener() {
                        },
                        removeListener() {
                        }
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

        global.window = window;
        global.document = window.document;
        global.dom = jsdom;
        global.navigator = {
            userAgent: 'node.js'
        };
        copyProps(window, global);
    },

    setDOM(html) {
        if (html === undefined) {
            html = '';
        }

        document.body.innerHTML = html;
    },

    setCOOKIE(cookieString) {
        document.cookie = cookieString;
    },

    setURL(url) {
        global.dom.reconfigure({
            url
        });
    },

    resetDom() {
        document.body.innerHTML = 'html';
    },

    createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    },

    setWindow(window) {
        global.window = window;
    },

    getBody() {
        return window.document.body;
    },

    resetHead() {
        document.head.innerHTML = '';
    },

    requireUncached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    },

    mergeRecursive(target, source) {
        Object.keys(source).forEach((property) => {
            if (typeof source[property] === 'undefined') {
                delete target[property];
                return;
            }
            if (target[property] instanceof Object && !(target[property] instanceof Array)) {
                this.mergeRecursive(target[property], source[property]);
            } else {
                target[property] = source[property];
            }
        });
        return target;
    }
};
