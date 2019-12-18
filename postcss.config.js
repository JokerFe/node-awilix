const cssnext = require('postcss-cssnext');
const cssvariables = require('postcss-css-variables');
const precss = require('precss');
module.exports = {
    plugins: function() {
        return [
            precss({ browsers: "last 3 versions" }),
            cssnext({ /* ...options */ }),
            cssvariables({})
        ];
    }
}
// https://juejin.im/post/5af7fca16fb9a07aa048173b