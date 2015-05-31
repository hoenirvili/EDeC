
var options = {
    seriesBarDistance: 10,
    scaleMinSpace:1,
        axisX: {
        offset: 60
    },
    axisY: {
        offset: 80,
        onlyInteger: true,
        scaleMinSpace: 15
    }
};
var data1 = {
    labels: jQuery("#MostLovedCaract").data('labels'),
    series: [jQuery("#MostLovedCaract").data('values')]
};
var data2 = {
    labels: jQuery("#MostHatedCaract").data('labels'),
    series: [jQuery("#MostHatedCaract").data('values')]
};
var data3 = {
    labels: jQuery("#MostLovedProducts").data('labels'),
    series: [jQuery("#MostLovedProducts").data('values')]
};
var data4 = {
    labels: jQuery("#MostHatedProducts").data('labels'),
    series: [jQuery("#MostHatedProducts").data('values')]
};
var data5 = {
    labels: jQuery("#MostLovedOrganizations").data('labels'),
    series: [jQuery("#MostLovedOrganizations").data('values')]
};

var data6 = {
    labels: jQuery("#MostHatedOrganizations").data('labels'),
    series: [jQuery("#MostHatedOrganizations").data('values')]
};


var data7 = {
    labels: jQuery("#MostLovedCities").data('labels'),
    series: [jQuery("#MostLovedCities").data('values')]
};

var data8 = {
    labels: jQuery("#MostHatedCities").data('labels'),
    series: [jQuery("#MostHatedCities").data('values')]
};


var data9 = {
    labels: jQuery("#MostLovedEdible").data('labels'),
    series: [jQuery("#MostLovedEdible").data('values')]
};

var data10 = {
    labels: jQuery("#MostHatedEdible").data('labels'),
    series: [jQuery("#MostHatedEdible").data('values')]
};


var data11 = {
    labels: jQuery("#MostLovedChemicals").data('labels'),
    series: [jQuery("#MostLovedChemicals").data('values')]
};

var data12 = {
    labels: jQuery("#MostHatedChemicals").data('labels'),
    series: [jQuery("#MostHatedChemicals").data('values')]
};




if($('body').hasClass('stats')) {
    new Chartist.Bar('#MostLovedCaract', data1,options);
    new Chartist.Bar('#MostHatedCaract', data2,options);
    new Chartist.Bar('#MostLovedProducts', data3,options);
    new Chartist.Bar('#MostHatedProducts', data4,options);
    new Chartist.Bar('#MostLovedOrganizations', data5,options);
    new Chartist.Bar('#MostHatedOrganizations', data6,options);
    new Chartist.Bar('#MostLovedCities', data7,options);
    new Chartist.Bar('#MostHatedCities', data8,options);
    new Chartist.Bar('#MostLovedEdible', data9,options);
    new Chartist.Bar('#MostHatedEdible', data10,options);
    new Chartist.Bar('#MostLovedChemicals', data11,options);
    new Chartist.Bar('#MostHatedChemicals', data12,options);
}



