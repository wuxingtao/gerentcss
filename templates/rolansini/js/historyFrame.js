function HistoryManager() {
	console.log('HistoryManager()');
	this.listener = null;
    this.adapterIframe = null;
    this._initialize();
}

//~(function() {
(function() {
	var flag = false,
		isIE = !!window.ActiveXObject && /msie (\d)/i.test(navigator.userAgent) ? RegExp['$1'] : false,
		supportHash=window.Modernizr.testProp('hashchange');
		$pointer = this;
	
	this.makeIEHistory = function(url) {
		if (!url) {
			return ;
		}
		//console.log('makeIEHistory:url:'+url);
		var frameDoc = $pointer.adapterIframe.contentWindow.document;
		
		frameDoc.open();
		frameDoc.write([
			"<html>",
				"<head>",
					"<script type='text/javascript'>",
						"function pageLoaded() {",
							"try {top.window.historyManager.fireOnHashChange(\""+url+"\");} catch(ex) {}",
						"}",
					"</script>",
				"</head>",
				"<body onload='pageLoaded();'>",
					"<input type='value' value='"+url+"' id='history'/>",
				"</body>",
			"</html>"
		].join(""));
		frameDoc.title = document.title;
		frameDoc.close();
	}

	this.fireOnHashChange = function(url) {
		location.hash = "#" + url.replace(/^#/, "");
		//console.log('fireOnHashChange:hash:'+location.hash);
		if (window.onhashchange) {
			window.onhashchange();
		}
	}

	this.add = function(url) {
		flag = true;
		//console.log('add:url:'+url+",supportHash:"+supportHash);
		//if (isIE && isIE < 8) {
		if(!supportHash){
			$pointer.makeIEHistory(url);
		} else {
			location.hash = "#" + url;
		}
	}

	this.fire = function(url) {
		
		if (!url) {
			url = document.location.hash.slice(1);
		}
		//console.log('History:fire:url:'+url);
		$pointer.listener(url);
	}

	this.addListener = function(fn) {
		//console.log('History:addListener');
		$pointer.listener = typeof fn === 'function' ? fn : function() {};
	}

	this._initialize = function() {
		//console.log('History:_initialize');
		//if (isIE && isIE < 8) {
		if(!supportHash){
			console.log('不支持 Hash!');
			$pointer.adapterIframe = document.getElementById("HISTORY_ADAPTER");
			$pointer.makeIEHistory();
		}

		window.onhashchange = function() {
			//console.log('window.onhashchange:flag:'+flag);
			if (flag) {
				flag = false;
				//return ;
			}

			$pointer.fire();
		}
	}

}).call(HistoryManager.prototype);