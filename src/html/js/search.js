function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    if(sPageURL =='') return '';
    var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }

    return '';
}


$(document).ready(function() {
    if($('body').hasClass('search')) {
        searched_text = getUrlParameter('s')
        if (searched_text != '') {
            $('body #products-search').highlight(searched_text, {
                caseSensitive: false
            });
        }
    }

});