
(function() {
	function update(){
		//console.log('page.update()');
		//tcss.updateNodes(".btnMc-adp,.bg-adp","common");
	};	

	function getContnet(url, content, callback) {
        if (url == "" || url == undefined) {
            return false;
        }
        $.ajax({
            url: url,
            type: "get",
            timeout: 60000,
            aType: "text",
            beforeSend: function () {
                content.html('<img class="loading" src="/templates/rolansini/img/syxbg.gif" />');
            },
            success: function (data, type) {
                content.html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("×´Ì¬£º" + textStatus + "£»³ö´íÌáÊ¾£º" + errorThrown);
            },
            complete: function () {
                if (callback != undefined)
                    callback();
            }
        });

    }

	   function listBind() {
        $(".honor").click(function () {
            var _this = $(this);
            var url = _this.attr("url");
						
            getContnet(url, $("#page1_info"), function () {
				
                cloasebtn($("#YT_zxf_5_closeBtn img"));
                cloasebtn($(".contactLink"));
            });
        });
        $("#news_close").click(function () {
            $("#news_show").animate({ opacity: "1" }).css("display", "none");
        });
    }

	    function cloasebtn(e) {
        e.click(function () {
           location.reload();
			
        });
    }

/*  附件链接  */
	function init(){
		var tcss=window.tcss;
		$("#page1_btn1").click(function(){
			window.location.href="main.html#page1_1";
		});
		$("#page1_btn2").click(function(){
			window.location.href="main.html#page1_2";
		});
		$("#page1_btn3").click(function(){
			window.location.href="main.html#page1_3";
		});
		$("#page1_btn4").click(function(){
		    window.location.href = "main.html#page1_4";
		});
			listBind();
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