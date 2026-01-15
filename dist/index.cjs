var $9428f4fe3a6834d1$exports = require("./plugin.79586a48.js");
var $fb711d182f36e127$exports = require("./plugin.7e7ae839.js");
var $kRSim$prettierpluginsbabeljs = require("prettier/plugins/babel.js");
var $kRSim$stripjsoncomments = require("strip-json-comments");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4d3edbca72c706e2$export$2e2bcd8739ae039);




const $4d3edbca72c706e2$var$regexpFilepath = /[/\\]?tsconfig\.(?:[\w-]+\.)?json/;
function $4d3edbca72c706e2$var$preprocess(text, options) {
    const { filepath: filepath } = options;
    return $4d3edbca72c706e2$var$regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"') ? (0, ($parcel$interopDefault($kRSim$stripjsoncomments)))(text, {
        whitespace: true,
        trailingCommas: true
    }).replaceAll(/[\n\r]+/g, "").replaceAll("\t", "").replaceAll(": ", ":").replaceAll(", ", ",").replaceAll("{ ", "{").replaceAll(" }", "}").replaceAll("[ ", "[").replaceAll(" ]", "]") : text;
}
function $4d3edbca72c706e2$var$parse(text, options) {
    const { filepath: filepath } = options;
    const ast = (0, ($parcel$interopDefault($kRSim$prettierpluginsbabeljs))).parsers.json.parse(text, options);
    if ($4d3edbca72c706e2$var$regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"')) {
        const allTopProperties = Object.fromEntries(ast.node.properties.map((topNode)=>[
                topNode.key.value,
                topNode
            ]));
        const topSorted = (0, $9428f4fe3a6834d1$exports.orderTop).map((topKey)=>{
            for (const topNode of ast.node.properties){
                const keyTopNode = topNode.key.value;
                if (keyTopNode === topKey) {
                    allTopProperties[topKey] = undefined;
                    if ((0, $fb711d182f36e127$exports.isKeyOf)(keyTopNode, (0, $9428f4fe3a6834d1$exports.orderGrouped))) {
                        const allGroupedProperties = Object.fromEntries(topNode.value.properties.map((groupedNode)=>[
                                groupedNode.key.value,
                                groupedNode
                            ]));
                        const groupedSorted = (0, $9428f4fe3a6834d1$exports.orderGrouped)[keyTopNode].map((groupedKey)=>{
                            for (const groupedNode of topNode.value.properties){
                                const keyGroupedNode = groupedNode.key.value;
                                if (keyGroupedNode === groupedKey) {
                                    allGroupedProperties[groupedKey] = undefined;
                                    return groupedNode;
                                }
                            }
                            return undefined;
                        }).filter((value)=>value !== undefined);
                        const groupedSortedRemainder = Object.values(allGroupedProperties).filter((value)=>value !== undefined);
                        topNode.value.properties = [
                            ...groupedSorted,
                            ...groupedSortedRemainder
                        ];
                    }
                    return topNode;
                }
            }
            return undefined;
        }).filter((value)=>value !== undefined);
        const topSortedRemainder = Object.values(allTopProperties).filter((value)=>value !== undefined);
        ast.node.properties = [
            ...topSorted,
            ...topSortedRemainder
        ];
    }
    return ast;
}
var $4d3edbca72c706e2$export$2e2bcd8739ae039 = {
    name: "prettier-plugin-tsconfig",
    parsers: {
        json: {
            ...(0, ($parcel$interopDefault($kRSim$prettierpluginsbabeljs))).parsers.json,
            preprocess: $4d3edbca72c706e2$var$preprocess,
            parse: $4d3edbca72c706e2$var$parse
        }
    }
};


