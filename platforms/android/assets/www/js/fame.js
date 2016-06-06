var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function finalProcess(){
								$("#ppemail").val($("#user_email").val().trim());
							if($("#plan_type").val()=='once')
							$("#ppname").val($("#followersTag option:selected ").text()+" Musically Fans");
							else
							$("#ppname").val($("#followersTag option:selected ").text()+" Musically Daily Fans");
							$("#overlay").show();
							$.ajax({
							url:"../process.php",
							type:"POST",
							data:{service:$('#service_type').val(),newfollow:$("#followersTag option:selected ").text(),email:$("#user_email").val(),username:$("#user_id").val(),userId:$("#userId").val(),fans:jQuery('#fans').val(),plan_type:$("#plan_type").val(),pay_amount:$("#followersTag").val(),mobile:1,page:"fans"},
							success:function(response){
							if(response!=''){
							$("#ppcustom").val(response + "__" + $("#followersTag").val());
							setTimeout(function(){
							$("#checkout_form").submit();
							},1000);
							//$("#checkout_form").submit();
							}

							}
							});

}
		$(document).ready(function(){
		
		$("#user_id").bind("keypress change",function (e) {
			jQuery('#userId').val('');
			if (e.which == 13 || e.type=='change') {
			if(DisableServices!=''){
				//swal('',DisableServices);
				swal({
				title: '',
				text: DisableServices,
				type: "input",
				showCancelButton: false,
				closeOnConfirm: false,
				animation: "slide-from-top",
				inputPlaceholder: "your@email.com"
				},
				function(inputValue){
				if(inputValue==''){
				swal.showInputError("Please Enter your Email");
				return false;
				}
				if(!filter.test(inputValue.trim())){
				swal.showInputError("Email address is not valid!");
				return false;
				}
				$.ajax({
				url:'/ajaxCalls.php',
				data:{action:"email_submit",email_submit:inputValue},
				type:"POST",
				success: function (response){
					swal("Thanks!", "We will send you update on "+inputValue, "success");
				}
				});
				
				});
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
					confirmButtonText: "Okay :(",
					closeOnConfirm: true
					},
					function(){
						window.location = 'http://musicallyfame.com';
					});
					jQuery(".not_found_error").hide();
					jQuery('.found_user').hide();
					jQuery('#finddetails').show();
					$(".findAccountProcess").hide();
					$('#checkout').removeClass("confirmed");
					$('#checkout').css("background-color","rgb(249, 196, 51)");
					$('#confirmbtn').attr("disabled", false);
					return false;
				}
				
				 $("#user_id").prop('disabled',true);
				jQuery(".not_found_error").hide();
				jQuery('.found_user').hide();
				jQuery('#finddetails').hide();
				$(".findAccountProcess").show();
				$('#checkout').removeClass("confirmed");
				$('#checkout').css("background-color","rgb(249, 196, 51)");
				$('#confirmbtn').attr("disabled", false);
				jQuery.ajax({
				  url: '../Pd328Aj.php',
				  data: 'secure_key=' + searchText,
				  dataType: 'json',
				  success: function(data){
					$("#user_id").prop('disabled',false);
					$(".findAccountProcess").hide();
					if(data.success){
					$("#user_id").blur();
					$("#checkout").focus();
					jQuery(".not_found_error").hide();
					jQuery('#userId').val(data.result.userId);
					jQuery('#fans').val(data.result.fansNum);
					jQuery('#ig-name').text(data.result.nickName);
					jQuery('#ig-count').text(data.result.fansNum);
					jQuery('#ig-pic').attr('src', data.result.icon );
					jQuery('.found_user').show();
					$('#confirmbtn').show();
					$('#confirmbtn').text("Is this your account?");
					}else if(data.success===false){
						jQuery('#finddetails').show();
						jQuery('.found_user').hide();
						jQuery('#userId').val('');
						jQuery('#fans').val('');
						$('#confirmbtn').hide();
						swal('',"You currently have 5 orders processing. Please wait until these are completed before placing anymore.");
					} else {
					jQuery('#dataImage').hide();
					jQuery(".not_found_error").show();
					jQuery('.found_user').hide();
					jQuery('#userId').val('');
					jQuery('#fans').val('');
					$('#confirmbtn').hide();
					}
				  },
				  error:function(){
					  $("#user_id").prop('disabled',false);
					$(".findAccountProcess").hide();
					  jQuery('#dataImage').hide();
					jQuery(".not_found_error").show();
					jQuery('.found_user').hide();
					jQuery('#userId').val('');
					jQuery('#fans').val('');
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
				swal({
				title: '',
				text: DisableServices,
				type: "input",
				showCancelButton: false,
				closeOnConfirm: false,
				animation: "slide-from-top",
				inputPlaceholder: "your@email.com"
				},
				function(inputValue){
				if(inputValue==''){
				swal.showInputError("Please Enter your Email");
				return false;
				}
				if(!filter.test(inputValue.trim())){
				swal.showInputError("Email address is not valid!");
				return false;
				}
				$.ajax({
				url:'/ajaxCalls.php',
				data:{action:"email_submit",email_submit:inputValue},
				type:"POST",
				success: function (response){
					swal("Thanks!", "We will send you update on "+inputValue, "success");
				}
				});
				
				});
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
					text: "It will take "+$("#followersTag option:selected ").data("days")+" days to deliver "+(parseInt($("#followersTag option:selected ").text())/1000)+"K fans. - You will receive "+$("#followersTag option:selected ").data("perday")+" each day",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Ok! fine.",
					closeOnConfirm: true
					},
					function(){
						finalProcess();
					});
					
				}
				if(confirm1){
					finalProcess();
				}
			}else if($(this).hasClass('confirmed') && $("#user_email").val().trim()!="" && !filter.test($("#user_email").val().trim())){
				swal("","Please enter a valid email address to recieve order updates.");
				return false;
			}else if($(this).hasClass('confirmed') && $("#user_email").val().trim()==""){
				swal("","Please enter a valid email address to recieve order updates.");
				return false;
			}else if($('#userId').val()!=''){
					swal({
					title: "",
					text: "Please confirm, is this the correct account?",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#8cd4f5",
					confirmButtonText: "Yes, it's me",
					closeOnConfirm: true
					},
					function(){
						$('#confirmbtn').attr("disabled", true);
						$('#checkout').addClass("confirmed");
						$('#checkout').css("background-color","rgb(77, 224, 123)");
						$(this).text("Account Confirmed.");
						return false;
					});
			}else if(!$(this).hasClass('confirmed')){
				swal('',"Please find or confirm your account to purchase.");
				return false;
			}
		});	
	$("#followersTag").trigger('change');
	});
	