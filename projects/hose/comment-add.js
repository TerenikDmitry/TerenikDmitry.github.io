function main() {
	// get data from services
	var skill_data = document.getElementsByClassName("services-value");
	var max = 0;
	var sum = 0;
	for (var i = 0; i < skill_data.length; i++) {
		var elem = parseInt(skill_data[i].textContent);
		max = Math.max(max, elem);
		sum += elem;
	}
	// set summ of skills
	document.getElementById("services-sum").textContent = sum;

	var skill_data_div = document.getElementsByClassName("services-scale");
	for (var i = 0; i < skill_data_div.length; i++) {
		var data = parseInt(skill_data[i].textContent);
		// scale painting
		if (data == max){
			skill_data_div[i].classList.add("services-scale_g");
		} else {
			skill_data_div[i].classList.add("services-scale_b");
		}
		// counting scale width
		skill_data_div[i].style.width = (data/max*100).toFixed(2)+"%";
	}
}


function addComment() {
	var new_comment_text = document.getElementById("comments-text").value;
	if (new_comment_text=='') {
		document.getElementById("comments-text").focus();
		return;
	}

	moment.locale('ru');
	var a = moment(); 
	var new_comment_date = a.format("DD MMMM YYYY");;
	var new_comment_name = "Unknown";

	var new_comment_html = `<div class="comments__list-item">
					<div class="comments__list-title">
						<div class="comments__list-title-name">`+new_comment_name+`</div>
						<div class="comments__list-title-date">`+new_comment_date+`</div>
					</div>
					<div class="comments__list-comment">`+new_comment_text+`</div>
				</div>`;

	document.getElementById("comments-data").appendChild(createElementFromHTML(new_comment_html));
	document.getElementById("comments-text").value = "";
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild; 
}