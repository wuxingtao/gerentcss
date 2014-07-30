(function () {
    function update() {
        //console.log('page.update()');
        //tcss.updateNodes(".btnMc-adp,.bg-adp","common");
    };
    function init() {
        var tcss = window.tcss;
        $("#page1_btn1").click(function () {
            window.location.href = "main.html#page4_1";
        });
        $("#page1_btn2").click(function () {
            window.location.href = "main.html#page4_2";
        });
        $("#page1_btn3").click(function () {
            window.location.href = "main.html#page4_3";
        });
        $("#page1_btn4").click(function () {
            window.location.href = "main.html#page4_4";
        });
        $(".YT_menu").fadeIn(500);
    };
    function destory() {
        console.log('page.destory()');
    };
    var page = {
        init: init,
        update: update,
        destory: destory
    };
    return page;
})();