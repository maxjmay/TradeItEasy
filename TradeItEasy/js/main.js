$(function(){

	/* vars */
	var initCodeline = 1554;
	var finalCodeline = 1582;
	var numCodelines = finalCodeline - initCodeline;

	var target = $(".numbers");
	var heightTarget = target.height();
	var element = '';

	element += '<ul>';
	for(var i = initCodeline; i < finalCodeline; i++){
		element += '<li class="number">'+i+'</li>';
	}
	element += '</ul>';

	// Append the whole element
	target.append(element);

})
