$(document).ready(function() {
    $('#caracteristics').selectize({
        valueField: 'ID',
        labelField: 'NAME',
        searchField: 'NAME',
        options: [],
        create: false,
        render: {
            option: function(item, escape) {
                return '<div>' +
                    '<span class="title">' +
                    '<span class="name">' + escape(item.NAME) + '</span>' +
                    '</span>' +
                    '</div>';
            }
        },
        load: function(query, callback) {
            if (!query.length>3) return callback();
            $.ajax({
                url: '/ajax/get_characteristics/?query='+ encodeURIComponent(query),
                type: 'GET',
                dataType: "json",
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.slice(0, 40));
                }
            });
        }
    });
});