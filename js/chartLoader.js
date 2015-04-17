$(function () { 
    
    renderAngularGraph('#saaParticipation', 95);
    renderAngularGraph('#paeParticipation', 65);
    renderLeaderBoardChart('#saaTop5', ['Marshall', 'Jonathan', 'Adam', 'Kristina', 'Carl'], [135,83,63,100,120]);
    renderLeaderBoardChart('#paeTop5', ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'], [20,80,15,43,110]);

});


function renderLeaderBoardChart(className, riders, miles){
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
                text: 'Miles'
            }
        },
        series: [{
            name: 'Miles',
            data: miles,
            animation: false
        }]
    });
}

function renderAngularGraph(className, percentage) {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
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