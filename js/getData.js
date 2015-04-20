$.ajax({
	url:"https://www.kimonolabs.com/api/bdnxjpqa?apikey=9adbc380301d558ba05315f79fff2e31&authorization=G3GwZYmY1egVWJOekuI1ec6HrdI8lOOm",
	crossDomain: true,
	dataType: "jsonp",
	success: function (response) {
		// these are stub numbers from a test API
		
		var totalMiles = 0;
		var totalTrips = 0;
		var nameArray = [];
		var milesArray = [];
		var tripsArray = [];

		$.each(response.results.leaderboard, function(i, item) {
			totalMiles = totalMiles + Math.abs(parseInt(item.miles));
			totalTrips = totalTrips + Math.abs(parseInt(item.trips));
			milesArray.push(item.miles);
			nameArray.push(item.name.text);
			tripsArray.push(item.trips);
		});


		$( "#saaMiles" ).append(totalMiles);
		$( "#saaTrips" ).append(totalTrips);

		renderAngularGraph('#saaParticipation', 85);

		renderLeaderBoardChart('#saaMilesLeaderboard', '#BB0000', 'Miles', nameArray, milesArray);
		renderLeaderBoardChart('#saaTripsLeaderboard', '#BB0000', 'Trips', nameArray, tripsArray);

		$( "#lastupdated" ).append(response.thisversionrun);

	}
});

$.ajax({
	url:"https://www.kimonolabs.com/api/bdnxjpqa?apikey=9adbc380301d558ba05315f79fff2e31&authorization=G3GwZYmY1egVWJOekuI1ec6HrdI8lOOm",
	crossDomain: true,
	dataType: "jsonp",
	success: function (response) {
		// these are stub numbers from a test API
		
		var totalMiles = 0;
		var totalTrips = 0;
		var nameArray = [];
		var milesArray = [];
		var tripsArray = [];

		$.each(response.results.leaderboard, function(i, item) {
			totalMiles = totalMiles + Math.abs(parseInt(item.miles));
			totalTrips = totalTrips + Math.abs(parseInt(item.trips));
			milesArray.push(item.miles);
			nameArray.push(item.name.text);
			tripsArray.push(item.trips);
		});

		$( "#paeMiles" ).append(totalMiles);
		$( "#paeTrips" ).append(totalTrips);

		renderAngularGraph('#paeParticipation', 70);

		renderLeaderBoardChart('#paeMilesLeaderboard', '#0077D2', 'Miles', nameArray, milesArray );
		renderLeaderBoardChart('#paeTripsLeaderboard', '#0077D2', 'Trips', nameArray, tripsArray );
	}
});



function renderLeaderBoardChart(className, color, name, riders, miles){
    $(className).highcharts({
        chart: {
            type: 'bar',
            animation: false
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: riders
        },
        yAxis: {
            title: {
                text: name
            }
        },
        series: [{
            name: name,
            data: miles,
            animation: false,
            color: color
        }]
    });
}

function renderAngularGraph(className, percentage) {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            animation: false
        },

        title: '',

        pane: {
            center: ['50%', '70%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 15,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $(className).highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: ''
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            animation: false,
            name: 'Participation %',
            data: [percentage],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

}