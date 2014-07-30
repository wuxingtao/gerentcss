var window_width = $(window).width();
var window_height = $(window).height();
var window_proportion = window_width / window_height;

$(function () {
    if (window_proportion > 1.8)
        $("#main").height(window_height * 0.6);
    else {
        $("#main").height(window_height * 0.52);
        $(".i_btn").css({marginTop:-window_height*0.06});
    }
    $(".logo img").width(window_width * 0.12);
    $(".title img").width(window_width * 0.27);

    $(".logo").animate({ top: "5%", opacity: 1 }, 2000, function () {
        $(".title").fadeIn(1000, function () {
            $(".i_btn img").animate({ width: "180px", opacity: "1" }, 2000, function () {
                $(".i_btn img").animate({ width: "145px" }, 1000);
            });
        });
    });
    $(".main_bg").fadeIn(4000);



})


