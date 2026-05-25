// jQuery(document).ready(function () {
// 	jQuery('#submit').on('click',document,function(){
// 			if(jQuery('#captcha_val').val()!=jQuery('#captcha_text').val()){
// 				$('#captcha_text').parent('div').append('<span class="error">Captch is not match</span>');
// 			}
// 			else{
// 				jQuery("#contactpage").validate({
// 					submitHandler : function (e) {
// 						submitSignupFormNow(jQuery("#contactpage"))
// 					},
// 					rules : {
// 						fname : {
// 							required : true
// 						},
// 						lname : {
// 							required : true
// 						},
// 						email : {
// 							required : true,
// 							email : true
// 						},
// 						phone : {
// 							required : true,
// 							number : true
// 						}
// 					},
// 					errorElement : "span",
// 					errorPlacement : function (e, t) {
// 						e.appendTo(t.parent())
// 					}
// 				});
// 				submitSignupFormNow = function (e) {
// 					var t = e.serialize();
// 					var n = "contact-form.php";
// 					jQuery.ajax({
// 						url : n,
// 						type : "POST",
// 						data : t,
// 						success : function (e) {
// 							var t = jQuery.parseJSON(e);
// 							if (t.status == "Success") {
// 								jQuery("#form_result").html('<span class="form-success alert alert-success d-block">' + t.msg + "</span>");
// 							} else {
// 								jQuery("#form_result").html('<span class="form-error alert alert-danger d-block">' + t.msg + "</span>")
// 							}
// 							jQuery("#form_result").show();
// 						}
// 					});
// 					return false
// 				}
// 		}
// 	});
	
// })





jQuery(document).ready(function () {

    jQuery("#contactpage").submit(function (e) {

        e.preventDefault();

        var formData = jQuery(this).serialize();

        jQuery.ajax({

            url: "./contact-form.php",

            type: "POST",

            data: formData,

            success: function (response) {

                console.log(response);

                if (response.status == "Success") {

                    alert(response.msg);

                    jQuery("#contactpage")[0].reset();

                } else {

                    alert(response.msg);

                }

            },

            error: function (xhr, status, error) {

              alert(xhr.responseText);

              console.log(xhr.responseText);

              console.log(status);

               console.log(error);

            }

        });

    });

});