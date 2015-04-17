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

});
