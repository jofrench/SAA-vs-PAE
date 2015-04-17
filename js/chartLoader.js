$(function () { 
    
    renderAngularGraph('#saaParticipation', 89);
    renderAngularGraph('#paeParticipation', 65);
    renderLeaderBoardChart('#paeMilesLeaderboard', '#0078FF', 'Miles', ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8', 'Test 9', 'Test 10'], [160,110,90,80,65,55,43,23,10,9]);
    renderLeaderBoardChart('#paeTripsLeaderboard', '#0078FF', 'Trips', ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8', 'Test 9', 'Test 10'], [23,23,19,16,16,14,11,7,6,4]);

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