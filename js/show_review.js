/**
 * @author Yiqi Wang
 */


 $(document).ready(function(){
 	//should add load food inf here
 	//load review inf according to menu_id
 	$.ajax("./app17.php/review/1",
	       {   type: "GET",
		       dataType: "json",
		       success: function(return_obj, status, jqXHR) {
		      	// console.log(return_obj);
		      	var menu_id = 1;
		      	var review_ids = return_obj.review_id_list;
		      	var food_info = return_obj.food_info;
		      	load_menu_item(food_info);
		      	// console.log(review_ids);
		        for (var i=0; i<review_ids.length; i++) {
		       		// console.log(review_ids[i]);
			   		load_review_item(menu_id,review_ids[i]);
		       }
		   }
	});

});
var load_menu_item = function(food_info){
	var food_name = food_info.food_name;
  	var food_image = food_info.item_thumb_image;
  	var rest_name = food_info.restaurant_name;
  	var food_price = food_info.price;
  	// console.log(food_name);
  	// console.log(food_price);
  	// console.log(rest_name);
  	var food_info_display = $("table");
  	var food_display = $("<tr></tr>")
  	var food_image_display = $("<td>"+food_image+"</td>");
  	var food_name_display = $("<td>"+food_name+"</td>");
  	var rest_name_display = $("<td>"+rest_name+"</td>");
  	var food_price_display = $("<td>"+food_price+"</td>");
  	food_display.append(food_image_display);
  	food_display.append(food_name_display);
  	food_display.append(rest_name_display);
  	food_display.append(food_price_display);
  	food_info_display.append(food_display);
}
var load_review_item = function (menu_id,review_id) {
    var review_all_display = $("div.review_all_display");
    $.ajax("./app17.php/review/1/" + review_id,
		{	type: "GET",
			dataType: "json",
			success: function(review_json, status, jqXHR) {
				console.log(review_json);
				var r = new Review(review_json);
				
				review_all_display.append(r.makeReview_infDiv());
			    }
		});
}

var check_input = function (form_content){
	var title = form_content[1].value;
	var comment = form_content[2].value;
	if (title.length ==0){
        	$("#error").html("Title is required!");
        	// console.log("title");
        	return false;
        }else if (comment.length ==0){
        	$("#error").html("Comment is required!");
        	return false;
        	// console.log("comment");
        }
}


