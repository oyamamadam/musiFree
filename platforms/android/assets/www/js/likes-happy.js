var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		$(document).ready(function(){
	
			$(document).delegate(".image-picker","change",function(){
			if($(".image-picker option:selected").length){
			$('#checkout').addClass("confirmed");
			$('#checkout').css("background-color","rgb(77, 224, 123)");
			}
			else{
			$('#checkout').removeClass("confirmed");
			$('#checkout').css("background-color","rgb(249, 196, 51)");
			}
			});
			$("#overlay1").click(function(){
			$(this).hide();
			});
			
			$("#user_id").bind("keypress change",function (e) {

			jQuery('#userId').val('');
			if (e.which == 13 || e.type=='change') {
				if(DisableServices!=''){
				swal('',DisableServices);
				return false;
			}
			$(".username_validations").hide();
			$('#user_id').css("border", "");
				$('#user_id').val($('#user_id').val().trim());
				var searchText = $('#user_id').val().trim();
				if (searchText.trim().length === 0){
					$('#user_id').css("border", "1px solid red");
					$(".username_validations").show();
					return false;
				}
				
				
				
				if($.inArray(searchText.toLowerCase(),ban_list) !== -1){	
					
					swal({
					title: "",
					text: ban_alert_message,
					type: "info",
					showCancelButton: false,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Ok!",
					closeOnConfirm: true
					},
					function(){
						window.location = 'http://musicallyfame.com';
					});
					
					//swal('',ban_alert_message);
					$(".not_found_error").hide();
					$('.found_user').hide();
					$('#finddetails').show();
					$(".findAccountProcess").hide();
					$('#checkout').removeClass("confirmed");
					$('#checkout').css("background-color","rgb(249, 196, 51)");
					$('#confirmbtn').attr("disabled", false);
					return false;
				}
				
				$("#user_id").prop('disabled',true);
				$(".not_found_error").hide();
				$('.found_user').hide();
				$('#finddetails').hide();
				$(".findAccountProcess").show();
				$('#checkout').removeClass("confirmed");
				$('#checkout').css("background-color","rgb(249, 196, 51)");
				$('#confirmbtn').attr("disabled", false);
				$('#overlay1').hide();
				$.ajax({
				  url: '../PI37aDwn.php',
				  data: 'secure_key=' + searchText,
				  success: function(data){
				  	$("#user_id").prop('disabled',false);
					$(".findAccountProcess").hide();
					if(data!='' && data!='10' && data.indexOf('Warning')=='-1'){
					$("#user_id").blur();
					$("#checkout").focus();
					$(".not_found_error").hide();
					$(".image-picker").html(data);
					$(".image-picker").imagepicker();
					$('#overlay1').show();
					$('#userId').val($(".image-picker option").data('user_id'));
					$('.found_user').show();
					$('#confirmbtn').show();
					$('#confirmbtn').text("Click if this is you.");
					$("ul.image_picker_selector").width($("ul.image_picker_selector li:nth-child(1)").width()*15);
					}else if(data=='5'){
						jQuery('#finddetails').show();
						jQuery('.found_user').hide();
						jQuery('#userId').val('');
						$('#confirmbtn').hide();
						swal('',"You currently have 5 orders processing. Please wait until these are completed before placing anymore.");
					} else {
					$(".findAccountProcess").hide();
					$('#dataImage').hide();
					$(".not_found_error").show();
					$('.found_user').hide();
					$('#userId').val('');
					$('#confirmbtn').hide();
					}
				  },
				  error:function(){
					$("#user_id").prop('disabled',false);
					$('#dataImage').hide();
					$(".not_found_error").show();
					$('.found_user').hide();
					$('#userId').val('');
					$('#confirmbtn').hide();
				  }
				});
			}
		});
		
		

		$("#followersTag").change(function(){
			$('#ppamount').val($(this).val());
			$('#a3').val($(this).val());
			$("#current_price").text($(this).val());
		});
		
		$('#checkout').click(function() {
			
			if(DisableServices!=''){
				swal('',DisableServices);
				return false;
			}
			$(".email_validations").hide();
			$('#user_email').css("border", "");
			if($(this).hasClass('confirmed') && $("#user_email").val().trim()!="" && filter.test($("#user_email").val().trim())){
				
				confirm1 = 1;
				if($.inArray(parseInt($("#followersTag option:selected ").text()),plans) === -1){
					swal("","Something went wrong! please try again.");
					return false;
				}
				if(parseInt($("#followersTag option:selected ").text()) >= 20000){
					confirm1 = 0;
					swal({
					title: "",
					text: "It will take "+$("#followersTag option:selected ").data("days")+" days to deliver "+(parseInt($("#followersTag option:selected ").text())/1000)+"K likes. - You will receive "+$("#followersTag option:selected ").data("perday")+" each day",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Ok! fine.",
					closeOnConfirm: false
					},
					function(){
						
					
				$("#ppemail").val($("#user_email").val().trim());
				
				if($("#plan_type").val()=='once')
				$("#ppname").val($("#followersTag option:selected ").text()+" Musically Likes");
				else
				$("#ppname").val($("#followersTag option:selected ").text()+" Musically Daily Likes");
				var a = [];
				c = 0;
				$('.image-picker option:selected').each(function(){
					a[c++] = $(this).data('liked');
				});
				
				var total_counter_to_like = parseInt($("#followersTag option:selected ").text());
					swal({
					title: "",
					text: "Ordering "+total_counter_to_like+" total likes.\n\nYou have selected "+c+" musicals, each musical will receive "+Math.floor(total_counter_to_like/c)+" likes.\n\nClick OK to proceed to PayPal.",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Ok! fine.",
					closeOnConfirm: true
					},
					function(){
						
				$("#overlay").show();
				$.ajax({
					url:"../process.php",
					type:"POST",
					data:{service:$('#service_type').val(),newfollow:$("#followersTag option:selected ").text(),email:$("#user_email").val(),username:$("#user_id").val(),userId:$("#userId").val(),fans:$(".image-picker").val().join(',')+':'+a.join(','),plan_type:$("#plan_type").val(),pay_amount:$("#followersTag").val(),mobile:1,page:"likes"},
					success:function(response){
						if(response!=''){
							$("#ppcustom").val(response);
							setTimeout(function(){
								$("#checkout_form").submit();
							},1000);
						}
						
					}
				});
				
					});
				
				
					});
					
				}
				if(confirm1){
					
				$("#ppemail").val($("#user_email").val().trim());
				
				if($("#plan_type").val()=='once')
				$("#ppname").val($("#followersTag option:selected ").text()+" Musically Likes");
				else
				$("#ppname").val($("#followersTag option:selected ").text()+" Musically Daily Likes");
				var a = [];
				c = 0;
				$('.image-picker option:selected').each(function(){
					a[c++] = $(this).data('liked');
				});
				
				var total_counter_to_like = parseInt($("#followersTag option:selected ").text());
				
				swal({
					title: "",
					text: "Ordering "+total_counter_to_like+" total likes.\n\nYou have selected "+c+" musicals, each musical will receive "+Math.floor(total_counter_to_like/c)+" likes.\n\nClick OK to proceed to PayPal.",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Ok! fine.",
					closeOnConfirm: true
					},
					function(){
						
				$("#overlay").show();
				$.ajax({
					url:"../process.php",
					type:"POST",
					data:{service:$('#service_type').val(),newfollow:$("#followersTag option:selected ").text(),email:$("#user_email").val(),username:$("#user_id").val(),userId:$("#userId").val(),fans:$(".image-picker").val().join(',')+':'+a.join(','),plan_type:$("#plan_type").val(),pay_amount:$("#followersTag").val(),mobile:1,page:"likes",manual:1},
					success:function(response){
						if(response!=''){
							$("#ppcustom").val(response);
							setTimeout(function(){
								$("#checkout_form").submit();
							},1000);
						}
						
					}
				});
				
					});
				}
			}else if($(this).hasClass('confirmed') && $("#user_email").val().trim()!="" && !filter.test($("#user_email").val().trim())){
				swal("","Please enter a valid email address to recieve an order confirmation.");
				return false;
			}else if($(this).hasClass('confirmed') && $("#user_email").val().trim()==""){
				swal("","Please enter your email address to get updates on your order.");
				return false;
			}else if(!$(this).hasClass('confirmed')){
				swal('',"Please find your account first or select at least one musical.ly video.");
				return false;
			}
		});	
	$("#followersTag").trigger('change');
	});
	