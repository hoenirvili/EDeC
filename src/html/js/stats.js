/**
 *  Chart option config
 *  @type {boolean}
 */
// Make our chart responsive


Chart.defaults.global.responsive = true;



var data1 = {
    labels: ["Rosii", "Castraveti", "Zahar", "Orez", "Paste"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [110, 95, 80, 60, 43]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 21]
        }
    ]
};


if($('body').hasClass('stats')) {
// Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#MostLovedCaract").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
    var mostLovedCaract = new Chart(ctx).Bar(data1);
}




var data2 = {
    labels: ["Gluten", "Brocoli", "Amidon", "Paine", "Pastarnac"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [180, 125, 88, 62, 48]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 21]
        }
    ]
};
if($('body').hasClass('stats')) {
    var dtx = $("#MostHatedCaract").get(0).getContext("2d");
    var mostHatedCaract = new Chart(dtx).Bar(data2);
}
