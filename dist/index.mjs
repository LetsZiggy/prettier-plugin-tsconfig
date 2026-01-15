import {orderTop as $6422d5c7c25045c4$export$acb82d2a2cee14d1, orderGrouped as $6422d5c7c25045c4$export$f26f8765515284a1} from "./plugin.c75acb79.js";
import {isKeyOf as $d4de2615035485a2$export$593c2aea212a54d2} from "./plugin.30b5e0ad.js";
import $bmXR4$prettierpluginsbabeljs from "prettier/plugins/babel.js";
import $bmXR4$stripjsoncomments from "strip-json-comments";





const $74a3580aa4356479$var$regexpFilepath = /[/\\]?tsconfig\.(?:[\w-]+\.)?json/;
function $74a3580aa4356479$var$preprocess(text, options) {
    const { filepath: filepath } = options;
    return $74a3580aa4356479$var$regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"') ? (0, $bmXR4$stripjsoncomments)(text, {
        whitespace: true,
        trailingCommas: true
    }).replaceAll(/[\n\r]+/g, "").replaceAll("\t", "").replaceAll(": ", ":").replaceAll(", ", ",").replaceAll("{ ", "{").replaceAll(" }", "}").replaceAll("[ ", "[").replaceAll(" ]", "]") : text;
}
function $74a3580aa4356479$var$parse(text, options) {
    const { filepath: filepath } = options;
    const ast = (0, $bmXR4$prettierpluginsbabeljs).parsers.json.parse(text, options);
    if ($74a3580aa4356479$var$regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"')) {
        const allTopProperties = Object.fromEntries(ast.node.properties.map((topNode)=>[
                topNode.key.value,
                topNode
            ]));
        const topSorted = (0, $6422d5c7c25045c4$export$acb82d2a2cee14d1).map((topKey)=>{
            for (const topNode of ast.node.properties){
                const keyTopNode = topNode.key.value;
                if (keyTopNode === topKey) {
                    allTopProperties[topKey] = undefined;
                    if ((0, $d4de2615035485a2$export$593c2aea212a54d2)(keyTopNode, (0, $6422d5c7c25045c4$export$f26f8765515284a1))) {
                        const allGroupedProperties = Object.fromEntries(topNode.value.properties.map((groupedNode)=>[
                                groupedNode.key.value,
                                groupedNode
                            ]));
                        const groupedSorted = (0, $6422d5c7c25045c4$export$f26f8765515284a1)[keyTopNode].map((groupedKey)=>{
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
var $74a3580aa4356479$export$2e2bcd8739ae039 = {
    name: "prettier-plugin-tsconfig",
    parsers: {
        json: {
            ...(0, $bmXR4$prettierpluginsbabeljs).parsers.json,
            preprocess: $74a3580aa4356479$var$preprocess,
            parse: $74a3580aa4356479$var$parse
        }
    }
};


export {$74a3580aa4356479$export$2e2bcd8739ae039 as default};
