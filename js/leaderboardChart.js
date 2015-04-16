$(function () { 
    
    $('#saaTop5').highcharts({
        chart: {
            type: 'bar'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Marshall', 'Jonathan', 'Adam', 'Kristina']
        },
        yAxis: {
            title: {
                text: 'Miles'
            }
        },
        series: [{
            name: 'Miles',
            data: [135,83,63,100]
        }]
    });

    $('#paeTop5').highcharts({
        chart: {
            type: 'bar'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['PAE 1', 'PAE 2', 'PAE 3', 'PAE 4']
        },
        yAxis: {
            title: {
                text: 'Miles'
            }
        },
        series: [{
            name: 'Miles',
            data: [23,50,90,120]
        }]
    });


    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
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
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
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
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#saaParticipation').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Participation %'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Participation',
            data: [80],
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

});
