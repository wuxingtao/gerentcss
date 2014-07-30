$(document).ready(function() {
	$('.sh_tip').show();
	$(".p_num").each(function() {
		$(this).val("1");
	});
	//$("#area1").val('-1');
	$("#verify").val("");
	//查询市级地址
	$("#area1").change(function() {
		if($("#area1").val() == '-1') {
			$("#area2").html('<option value="-1">请选择</option>');
			$("#area3").html('<option value="-1">请选择</option>');
		} else {
			var value = $(this).val();
			$.post(
				"./ajax.jfw.php",
				{area:value,id:1},
				function(area2) {
					var moptions2 = "";
					moptions2 = "<option value='-1'>请选择</option>";
					var moptions3 = "";
					moptions3 = "<option value='-1'>请选择</option>";
					for(i=0; i<area2.length; i++) {
						moptions2 +=  "<option value='"+area2[i]['value']+"'>"+area2[i]['value']+"</option>";
					}
					$("#area2").html(moptions2);
					$("#area3").html(moptions3);
					$(".send_day_msg").html("");
				},
				'json'
			);
		}
	});
	
	//查询县级地址
	$("#area2").change(function() {
		if($("#area2").val() == '-1') {
			$("#area3").html('<option value="-1">请选择</option>');
		} else {
			var value = $(this).val();
			$.post(
				"./ajax.jfw.php",
				{area2:value,id:2},
				function(area3) {
					var moptions3 = "";
					moptions3 = "<option value='-1'>请选择</option>";
					for(i=0; i<area3.length; i++) {
						moptions3 +=  "<option value='"+area3[i]['value']+"'>"+area3[i]['value']+"</option>";
					}
					$("#area3").html(moptions3);
					$(".send_day_msg").html("");
				},
				'json'
			);
		}
	});
	
	//查询县级地址
	$("#area3").change(function() {
		if($("#area3").val() == '-1') {
			$(".sh_tip").html("");
		} else {
			var value1 = $("#area1").val();
			var value2 = $("#area2").val();
			var value3 = $("#area3").val();
			$.post(
				"./ajax.jfw.php",
				{area1:value1,area2:value2,area3:value3,id:3},
				function(area) {
					$(".sh_tip").html(area[0]['value']);
				},
				'json'
			);
		}
	});
	
	//立即购买点击判断
	$(".gm_t").live('click',function() {
		var prod_no = $(this).attr("name");
		//var prod_name = $(this).prev().prev().prev().prev().prev().prev().attr("title");
		prod_name = $(this).prev().prev().prev().attr("title");
		//var prod_num = 0;
		var prod_num = 1;
		var prod_send_money = 0;
		//var prod_safe_num = 0;
		var prod_safe_num = $(this).prev().val();
		var prod_send_money= $(this).prev().prev().val();
		var prod_price = $(this).children("span").attr("title");
		
		/* $(".p_num").each(function() {
			if($(this).attr("name") == prod_no) {
				prod_num = $(this).val();
				prod_safe_num = $(this).next().next().next().val();
				prod_send_money= $(this).next().next().val();
			}
		}); */
		var prod_money = parseFloat(parseFloat(prod_price) * parseInt(prod_num)).toFixed(2);
		var prod_have = 0;
		$(".p_num2").each(function() {
			if(($(this).attr("name")) == prod_no) {
				prod_have = 1;
			}
		});
		if(prod_have == 1) {
			alert("所选产品列表中已经存在！");
		} else {
			var list_tr = '<tr class="cart_record"><td>&nbsp;&nbsp;&nbsp;&nbsp;'+prod_name+'</td><td align="center"><span class="shop_c_list">-</span><input type="text" name="'+prod_no+'" value="'+prod_num+'" class="p_num2" style="font-size:11px;"><span class="shop_a_list">+</span><input type="hidden" name="'+prod_no+'_send" class="p_send_money" value="'+prod_send_money+'"><input type="hidden" name="'+prod_no+'_safe" class="p_safe_num" value="'+prod_safe_num+'"></td><td align="center"><a href="javascript:void(0)" class="e_delete">删 除</a><b class="e_price">'+prod_money+'</b><b>元</b> </td></tr>';
			$(".cart_total").before(list_tr);
			var all_price = 0;
			//计算总计金额
			$(".e_price").each(function() {
				all_price += parseFloat($(this).html());
			});
			//计算运费
			var send_money = 0;
			$(".p_num2").each(function() {
				//按选择产品的最大运费作为运费
				if($(this).val() > 0 &&　$(this).next().next(".p_send_money").val() > send_money) {
					send_money = $(this).next().next(".p_send_money").val();
				}
			});
			all_price = (parseFloat(all_price) + parseFloat(send_money)).toFixed(2);
			send_money = parseFloat(send_money).toFixed(2);
			$(".all_send").html(send_money+"元");
			$(".cart_total").html('<td colspan="3">运费：<span>'+send_money+'元</span>   <span>总金额：'+all_price+'元</span></td>');
		}
	});
	
	/* //购买数量减-1
	$(".shop_c").live('click',function() {
		var num = parseInt($(this).next(".p_num").val());
		if(num <= 1) {
			num = 1;
			$(this).next(".p_num").val(num);
		} else {
			num -= 1;
			$(this).next(".p_num").val(num);
		}
		p_num_change($(this).next(".p_num"), num, 1);
	}); */
	
	//购买数量减-2
	$(".shop_c_list").live('click',function() {
		var num = parseInt($(this).next(".p_num2").val());
		if(num <= 1) {
			num = 1;
			$(this).next(".p_num2").val(num);
		} else {
			num -= 1;
			$(this).next(".p_num2").val(num);
		}
		p_num_change($(this).next(".p_num2"), num, 2);
	});
	
	/* //购买数量加-1
	$(".shop_a").live('click',function() {
		var num = parseInt($(this).prev(".p_num").val());
		if(num < 1) {
			num = 1;
			$(this).prev(".p_num").val(num);
		} else {
			num += 1;
			$(this).prev(".p_num").val(num);
		}
		p_num_change($(this).prev(".p_num"), num, 1);
	}); */
	
	//购买数量加-2
	$(".shop_a_list").live('click',function() {
		var num = parseInt($(this).prev(".p_num2").val());
		if(num < 1) {
			num = 1;
			$(this).prev(".p_num2").val(num);
		} else {
			num += 1;
			$(this).prev(".p_num2").val(num);
		}
		p_num_change($(this).prev(".p_num2"), num, 2);
	});
	
	$(".p_num").blur(function() {
		var num = $(this).val();
		if(num < 1) {
			num = 1;
			$(this).val(num);
		}
		p_num_change($(this), num, 1);
	});
	
	$(".p_num2").live('blur', function() {
		var num = $(this).val();
		if(num < 1) {
			num = 1;
			$(this).val(num);
		}
		p_num_change($(this), num, 2);
	});
	
	//删除某个产品行
	$(".e_delete").live('click', function() {
		$(this).parents().parents("tr").empty();
		var send_money = 0;
		$(".p_num2").each(function() {
			//按选择产品的最大运费作为运费
			if($(this).val() > 0 &&　$(this).next().next(".p_send_money").val() > send_money) {
				send_money = $(this).next().next(".p_send_money").val();
			}
		});
		var all_price = 0;
		//计算总计金额
		$(".e_price").each(function() {
			all_price += parseFloat($(this).html());
		});
		all_price += parseFloat(send_money);
		all_price = parseFloat(all_price).toFixed(2);
		send_money = parseFloat(send_money).toFixed(2);
		$(".all_send").html(send_money+"元");
		$(".cart_total").html('<td colspan="3">运费：<span>'+send_money+'元</span>   <span>总金额：'+all_price+'元</span></td>');
		
	});

	//验证手机号码
	$("#ord_tel").blur(function() {
		var ord_tel = $(this).val();
		if(ord_tel != '') {
			if(!ord_tel.match(/^1[3|4|5|8][0-9]\d{8}$/)){
				$(".sh_tip").html("<font color='red'>手机号码格式不正确！</font>");
				$("#ord_tel").val("");
				$("#ord_tel").focus();
			} else {
				$(".sh_tip").html("");
			}
		} else {
			$(".sh_tip").html("<font color='red'>手机号码必填！</font>");
		}
	});
	
	//验证姓名填写
	$("#ord_name").blur(function() {
		var ord_name = $(this).val();
		if(ord_name.length > 13) {
			$(".sh_tip").html("<font color='red'>收货人姓名过长，请重新填写！</font>");
		} else if(ord_name.length <= 0) {
			$(".sh_tip").html("<font color='red'>收货人姓名不能为空！</font>");
		} else {
			$(".sh_tip").html("");
		}
	});
	
	//验证地址填写
	$("#ord_send").focus(function() {
		var ord_name = $(this).val();
		if(ord_name.length > 30) {
			$(".sh_tip").html("<font color='red'>收货地址过长，请重新填写！</font>");
		} else {
			if($("#area1").val() != '-1' && $("#area2").val() != '-1' && $("#area3").val() != '-1') {
				var value1 = $("#area1").val();
				var value2 = $("#area2").val();
				var value3 = $("#area3").val();
				$.post(
					"./ajax.jfw.php",
					{area1:value1,area2:value2,area3:value3,id:3},
					function(area) {
						$(".sh_tip").html(area[0]['value']);
					},
					'json'
				);
			} else {
				$(".sh_tip").html("");
			}
		}
	});
	
	//显示发票title输入页面
	$(".invoice").change(function() {
		if($(this).val() == '0') {
			$(".invoice_title").attr('style', 'display:none');
			$(".sh_tip").html("");
		} else {
			$(".invoice_title").attr('style', 'display:block');
		}
	});
	
	//发票抬头输入
	$("#invoice_title").blur(function() {
		if($(this).val().length <= 0) {
			$(".sh_tip").html("<font color='red'>请输入发票抬头！</font>");
		} else if($(this).val().length > 30) {
			$(".sh_tip").html("<font color='red'>发票抬头过长，请重新输入</font>");
		} else {
			$(".sh_tip").html("");
		}
	});
	
	//页面提交
	$("input[name=submit1]").click(function() {
		var ord_name = $("#ord_name").val();
		var ord_tel = $("#ord_tel").val();
		var area1 = $("#area1").val();
		var area2 = $("#area2").val();
		var area3 = $("#area3").val();
		var ord_send = $("#ord_send").val();
		var ord_invoice = 0;
		$(".fb_select").each(function() {
			if($(this).is(":checked")) {
				ord_invoice = $(this).val();
			}
		});
		var ord_invoice_item = $("#item").val();
		var ord_invoice_title = $("#invoice_title").val();
		var verify = $("#verify").val();
		var fw = 0;
		var num = 0;
		var big_num = 0;
		var big_prod = '';
		$(".p_num2").each(function() {
			if($(this).val() > 0) {
				num += 1;
			}
			if(parseInt($(this).val()) > parseInt($(this).next().next().next().val()) && parseInt($(this).next().next().next().val()) > 0) {
				big_num = $(this).next().next().next().val();
				big_prod = $(this).parents().prev().prev().prev().html();
			}
		});
		if(num <= 0) {
			alert("请选择产品，点击立即购买！");
			return false;
		}
		if(big_num > 0) {
			alert(big_prod+'单张订单购买数量不能超过'+big_num+'，请修改购买列表中相应产品的数量!');
			return false;
		}
		if(verify.length <= 0) {
			alert("请填写验证码");
			return false;
		}
		
		//验证姓名
		if(ord_name.length > 13) {
			$(".sh_tip").html("<font color='red'>收货人姓名过长，请重新填写！</font>");
			return false;
		} else if(ord_name.length <= 0) {
			$(".sh_tip").html("<font color='red'>收货人姓名不能为空！</font>");
			return false;
		} else {
			$(".sh_tip").html("&nbsp;");
		}
		//验证手机号码
		if(ord_tel != '') {
			if(!ord_tel.match(/^1[3|4|5|8][0-9]\d{8}$/)){
				$(".sh_tip").html("<font color='red'>手机号码格式不正确！请重新输入！</font>");
				$("#ord_tel").val("");
				$("#ord_tel").focus();
				return false;
			} else {
				$(".sh_tip").html("&nbsp;");
			}
		} else {
			$(".sh_tip").html("<font color='red'>手机号码必填！</font>");
			return false;
		}
		//验证地址
		if(area1 == '-1' || area2 == '-1' || area3 == '-1' || ord_send.length <= 0) {
			$(".sh_tip").html("<font color='red'>请填写收货地址！</font>");
			return false;
		} else {
			if(ord_send.length > 30) {
				$(".sh_tip").html("<font color='red'>收货地址过长，请重新填写</font>");
				return false;
			} else {
				$(".sh_tip").html("&nbsp;");
			}
		}
		if(ord_invoice == '1' && ord_invoice_item == '单位' && ord_invoice_title.length <= 0) {
			$(".sh_tip").html("<font color='red'>请输入发票抬头！</font>");
			return false;
		} else if(ord_invoice == '1' && ord_invoice_item == '单位' && ord_invoice_title.length > 30) {
			$(".sh_tip").html("<font color='red'>发票抬头过长，请重新填写！</font>");
			return false;
		}
		//检查是否选择需要专人服务
		$(".iagree").each(function() {
			if($(this).is(":checked")) {
				fw = parseInt(fw) + 1;
			}
		});
		if(fw <= 0) {
			alert('请选择是否需要专人服务！');
			return false;
		}
		//if(confirm("确认提交吗？")) {
			$("#index_sub").submit();
			//$("form[name=index_sub]").submit();
		//}
	});
	
	$("#user_login").live("click", function() {
		var login_tel = $("#login_tel").val();
		var login_pwd = $("#login_pwd").val();
		var verify = $("#verify").val();
		if(!login_tel.match(/^1[3|4|5|8][0-9]\d{8}$/)) {
			alert("请输入正确的手机号！");
			return false;
		}
		if(login_pwd.length <= 0) {
			alert("请输入查询密码！");
			return false;
		}
		if(verify.length <= 0) {
			alert("请输入正确的验证码！");
			return false;
		}
		$("form[name=user_login]").submit();
	});
	
	
	//发送短信及提示
	$(".tel_repeat").click(function() {
		var login_tel = $("#login_tel").val();
		if(login_tel.match(/^1[3|4|5|8][0-9]\d{8}$/)) {
			$.post(
				"./send_sms.php",
				{login_tel:login_tel},
				function(send) {
					if(send.split('_')[0] == 'yes') {
						alert("您的查询密码已经发送至您的手机，请您查收！");
					} else if(send == 'not_tel') {
						alert("您的手机号码错误，请填写正确的手机号！");
					} else if(send == 'no_record') {
						alert("对不起，您还没有提交订单，系统无记录！");
					} else if(send == 'over_num') {
						alert("您的短信提示已超上限，请通过客服人员进行查询！");
					}
				},
				'html'
			);
		} else {
			alert("请输入正确的手机号！");
		}
	});
	
	//当修改产品数量时调用该方法1
	function p_num_change() {
		var source = arguments[0];
		var num = arguments[1];
		var kind = arguments[2];
		
		//toFixed(2)保留两位小数
		
		var big_num = source.next().next().next(".p_safe_num").val();
		if(isNaN(num)) {
			num = 1;
			source.val(num);
		}
		num = parseInt(num);
		source.val(num);
		if(num > big_num && big_num > 0) {
			num = big_num;
			source.val(num);
			alert("该产品每张订单限购"+num+"个");
		}
		if(kind == 2) {
			var chage_name = source.attr("name");
			//计算小计金额
			var my_price = parseFloat(parseInt(num) * parseFloat($("a[name="+chage_name+"]").children("span").attr("title"))).toFixed(2);
			source.parents().next().children(".e_price").html(my_price);
			var send_money = 0;
			$(".p_num2").each(function() {
				//按选择产品的最大运费作为运费
				if($(this).val() > 0 &&　$(this).next().next(".p_send_money").val() > send_money) {
					send_money = $(this).next().next(".p_send_money").val();
				}
			});
			var all_price = 0;
			//计算总计金额
			$(".e_price").each(function() {
				all_price += parseFloat($(this).html());
			});
			all_price += parseFloat(send_money);
			all_price = parseFloat(all_price).toFixed(2);
			send_money = parseFloat(send_money).toFixed(2);
			$(".all_send").html(send_money+"元");
			$(".cart_total").html('<td colspan="3">运费：<span>'+send_money+'元</span>   <span>总金额：'+all_price+'元</span></td>');
		}
	}
	
	//验证码获取
	$(".my_verify").live('click', function() {
		$("#my_verify").attr("src", "./function/verify.class.php?thistime="+Math.random());
	});
	
	//验证验证码
	$("#verify").blur(function() {
		if($(this).val() != '' && $(this).val().length > 0) {
			var now_verify = $(this).val().toUpperCase();
			$.post(
				"./ajax.jfw.php",
				{getVerify:1},
				function(verify) {
					if(verify != now_verify) {
						$("#verify").val("");
						alert("验证码错误");
					}
				},
				'html'
			);
		}
	});
	
	
	
});