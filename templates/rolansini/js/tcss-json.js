/**
 * CSS-JSON Converter for JavaScript
 * Converts CSS to JSON and back.
 * Version 2.1
 *
 * Released under the MIT license.
 * 
 * Copyright (c) 2013 Aram Kocharyan, http://aramk.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions
 of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ------------------------------------------------------
 wiyiflash 修改
 去掉了children 和 attributes 容器，直接将值赋到对象上
 删除单行注释。也就是说可以在css里使用单行注释了。
 单行脚本支持。可以在CSS里写简单表达式。
 多行脚本支持。可以在CSS里写复杂的脚本，如定义变量、对象、数组和函数等。
 */

var CSSJSON = new function () {

    var base = this;

    base.init = function () {
        // String functions
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };

        String.prototype.repeat = function (n) {
            return new Array(1 + n).join(this);
        };
    };
    base.init();

    var selX = /([^\s\;\{\}][^\;\{\}]*)\{/g;
    var endX = /\}/g;
    var lineX = /([^\;\{\}]*)\;/g;
    var commentX = /\/\*[\s\S]*?\*\//g;
    var lineAttrX = /([^\:]+):([^\;]*);/;
    // This is used, a concatenation of all above. We use alternation to
    // capture.
    var altX = /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gmi;

    // Capture groups
    var capComment = 1;
    var capSelector = 2;
    var capEnd = 3;
    var capAttr = 4;

    var isEmpty = function (x) {
        return typeof x == 'undefined' || x.length == 0 || x == null;
    };
    /**
     * Input is css string and current pos, returns JSON object
     *
     * @param cssString
     *            The CSS string.
     * @param args
     *            An optional argument object. ordered: Whether order of
     *            comments and other nodes should be kept in the output. This
     *            will return an object where all the keys are numbers and the
     *            values are objects containing "name" and "value" keys for each
     *            node. comments: Whether to capture comments. split: Whether to
     *            split each comma separated list of selectors.
     */
    base.toJSON = function (cssString, args) {
        var node = {
        };
        var match = null;
        var count = 0;

        if (typeof args == 'undefined') {
            var args = {
                ordered: false,
                comments: false,
                stripComments: false,
                split: false
            };
        }
        if (args.stripComments) {
            args.comments = false;
            cssString = cssString.replace(commentX, '');
        }

        while ((match = altX.exec(cssString)) != null) {
            if (!isEmpty(match[capComment]) && args.comments) {
                // Comment
                var add = match[capComment].trim();
				
                node[count++] = add;
            } else if (!isEmpty(match[capSelector])) {
                // New node, we recurse
                var name = match[capSelector].trim();
                // This will return when we encounter a closing brace
                var newNode = base.toJSON(cssString, args);
                if (args.ordered) {
                    var obj = {};
                    obj['name'] = name;
                    obj['value'] = newNode;
                    // Since we must use key as index to keep order and not
                    // name, this will differentiate between a Rule Node and an
                    // Attribute, since both contain a name and value pair.
                    obj['type'] = 'rule';
                    node[count++] = obj;
                } else {
                    if (args.split) {
                        var bits = name.split(',');
                    } else {
                        var bits = [name];
                    }
                    for (i in bits) {
						if(i=="__class__"){
							continue;
						}
                        var sel = bits[i].trim();
						if(sel in node){
                            for (var att in newNode.attributes) {
                                node[sel][att] = newNode.attributes[att];
                            }
						}else{
							node[sel]=newNode;
						}
                    }
                }
            } else if (!isEmpty(match[capEnd])) {
                // Node has finished
                return node;
            } else if (!isEmpty(match[capAttr])) {
                var line = match[capAttr].trim();
                var attr = lineAttrX.exec(line);
                if (attr) {
                    // Attribute
                    var name = attr[1].trim();
                    var value = attr[2].trim();
                    if (args.ordered) {
                        var obj = {};
                        obj['name'] = name;
                        obj['value'] = value;
                        obj['type'] = 'attr';
                        node[count++] = obj;
                    } else {
                        if (name in node) {
                            var currVal = node[name];
                            if (!(currVal instanceof Array)) {
                                node[name] = [currVal];
                            }
                            node[name].push(value);
                        } else {
                            node[name] = value;
                        }
                    }
                } else {
                    // Semicolon terminated line
                    node[count++] = line;
                }
            }
        }

        return node;
    };

    /**
     * @param node
     *            A JSON node.
     * @param depth
     *            The depth of the current node; used for indentation and
     *            optional.
     * @param breaks
     *            Whether to add line breaks in the output.
     */
    base.toCSS = function (node, depth, breaks) {
        var cssString = '';
        if (typeof depth == 'undefined') {
            depth = 0;
        }
        if (typeof breaks == 'undefined') {
            breaks = false;
        }
        if (node.attributes) {
            for (i in node.attributes) {
                var att = node.attributes[i];
                if (att instanceof Array) {
                    for (var j = 0; j < att.length; j++) {
                        cssString += strAttr(i, att[j], depth);
                    }
                } else {
                    cssString += strAttr(i, att, depth);
                }
            }
        }
        if (node.children) {
            var first = true;
            for (i in node.children) {
                if (breaks && !first) {
                    cssString += '\n';
                } else {
                    first = false;
                }
                cssString += strNode(i, node.children[i], depth);
            }
        }
        return cssString;
    };
	//将css转换为json之前，先对脚本进行替换，避免其中的;和{}符号对css产生干扰
	//Google支持[^]写法，而IE不支持,只能用[\s\S]
	//var nameAndScriptX=/(\w+\-script|\w+\-start|\w+\-end)[\W]*(<!\[CDATA\[([^]*?)\]\]>\;)|(?:[^\s\;\{\}][^\;\{\}]*(?=\{))/g;
	
	//var nameAndScriptX= new RegExp('(\\w+\\-script|\\w+\\-start|\\w+\\-end)[\W]*(<!\\[CDATA\\[([^]*?)\\]\\]>\\;)|(?:[^\\s\\;\\{\\}][^\\;\\{\\}]*(?=\\{))','g');
	var nameAndScriptX=/(\w+\-script|\w+\-start|\w+\-end)[\W]*(<!\[CDATA\[([\s\S]*?)\]\]>\;)|(?:[^\s\;\{\}][^\;\{\}]*(?=\{))/g;
	var scriptX=/<!\[CDATA\[[\s\S]*?\]\]>/g;
	
	//var scriptX=new RegExp('<!\\[CDATA\\[[^]*?\\]>','g');
	var lineCommentX=/\/\/[^\r\n]*/g;
    base.trimScript=function(cssString){
		//先把注释干掉
		
		cssString=cssString.replace(commentX,"");
		cssString=cssString.replace(lineCommentX,"");
		//execReg(scriptX,cssString);
		var cssObj={};
		var matched=false;
		var result;
		var flag=0;
		var current;
		do{
			result=nameAndScriptX.exec(cssString);
			//console.log("result:"+result);
			if(result!=null){
				matched=true;
				//选择器
				//console.log('result:0:'+result[0]+',1:'+result[1]+',2:'+result[3]+',3:'+result[3]);
				//在Google里的null值字符串，在IE里是''
				if(result[2]==null||result[2]==''){
					current=cssObj[result[0]]={};
					//console.log('selector:'+result[0]+",result[2]:"+result[2]);
				}else{
					//脚本
					current[result[1]]=result[3];
					//console.log('attr:'+result[1]+",script:"+result[3]);
				}
			}else{
				matched=false;
			}
			flag++;
		}while(matched)
		cssObj.css=cssString.replace(scriptX,"script");
		//console.log("---------------------------------------------css------------------------------------------");
		return cssObj;
	}
	//var instanceNameAndTemplateX=/(\w+\-movie|\w+\-clip):([\S]*;)/g;
	//var templateX=/(?<=-(movie|clip):)([^\s\;]*)(?=\;)/;
	var templateX=/-(movie|clip):([^\s\;@]*)(?=;)/;
	base.trimTemplate=function(cssString){
		//先把注释干掉
		//execReg(scriptX,cssString);
		var cssObj={};
		var matched=false;
		var result;
		var flag=0;
		var current;
		var nString;
		do{
			result=templateX.exec(cssString);
			//console.log("result:"+result);
			if(result!=null){
				matched=true;
				//选择器
				//console.log('result:0:'+result[0]+',1:'+result[1]+',2:'+result[3]+',3:'+result[3]);
				//在Google里的null值字符串，在IE里是''
				cssObj['@'+flag]=result[2];
				nString="-"+result[1]+":"+'@'+flag;
				cssString=cssString.replace(templateX,nString);
			}else{
				matched=false;
			}
			flag++;
			/*if(flag==5){
				matched=false;
			}*/
			//
		}while(matched)
		//cssObj.css=cssString.replace(templateX,"template");
		cssObj.css=cssString;
		//console.log("---------------------------------------------css------------------------------------------");
		return cssObj;
	}/**/
    // Helpers

    var strAttr = function (name, value, depth) {
        return '\t'.repeat(depth) + name + ': ' + value + ';\n';
    };

    var strNode = function (name, value, depth) {
        var cssString = '\t'.repeat(depth) + name + ' {\n';
        cssString += base.toCSS(value, depth + 1);
        cssString += '\t'.repeat(depth) + '}\n';
        return cssString;
    };

};
