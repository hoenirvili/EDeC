/**
 * config option of Chart
 * @type {CanvasRenderingContext2D}
 */
//enable the responsive of charts
Chart.defaults.global.responsive = true;


//Get the context of the canvas element that we want to select
var ctx = document.getElementById("MostLovedCaract").getContext("2d"); // select our id

// now e add data to our chart that we want to represent
var data = {
    labels  : ["rosii","castraveti","zahar","orez","paste"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [110, 95, 80, 60, 43]
        },

        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86]
        }
    ]
};
//we call call a method name of class Chart that we want to use
var MostLovedCaracteristics = new Chart(ctx).PolarArea(data); // make a new object of chart

