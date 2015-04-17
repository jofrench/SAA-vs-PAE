$.ajax({
	url:"https://www.kimonolabs.com/api/9q9225fm?apikey=9adbc380301d558ba05315f79fff2e31",
	crossDomain: true,
	dataType: "jsonp",
	success: function (response) {
		// these are stub numbers from a test API
		
		var saaTotal = 0;
		var paeTotal = -35;

		$.each(response.results.names, function(i, item) {
			if (item.topar == 'E') {
				string = '0'
			} else {
				string = item.topar;
			}
			saaTotal = saaTotal + Math.abs(parseInt(string));
			paeTotal = paeTotal + Math.abs(parseInt(string));
		});

		$( "#saaMiles" ).append(saaTotal),
		$( "#paeMiles" ).append(paeTotal),
		$( "#lastupdated" ).append(response.thisversionrun)

	},
	error: function (xhr, status) {
	//handle errors
	}
});