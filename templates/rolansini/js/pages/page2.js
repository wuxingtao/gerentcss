
(function() {
	function update(){
		//console.log('page.update()');
		//tcss.updateNodes(".btnMc-adp,.bg-adp","common");
	};	
	function init(){
		var tcss=window.tcss;
		$("#page2_btn1").click(function(){
			window.location.href="main.html#page2_1";
		});
		$("#page2_btn2").click(function(){
			window.location.href="main.html#page2_2";
		});
		$("#page2_btn3").click(function(){
			window.location.href="main.html#page2_3";
		});
        $(".YT_menu").fadeIn(500);
	};
    function destory(){
		console.log('page.destory()');
	};
	var page={
			init:init,
			update:update,
			destory:destory
	};
	return page;
})();