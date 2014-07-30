
(function() {
	function update(){
		//console.log('page.update()');
		//tcss.updateNodes(".btnMc-adp,.bg-adp","common");
	};	
	function init(){
		var tcss=window.tcss;
		$("#page5_btn1").click(function(){
			window.location.href="main.html#page5_1";
		});
		$("#page5_btn2").click(function(){
			window.location.href="main.html#page5_2";

});

$(".kjjbtnMc").fadeIn(500);
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