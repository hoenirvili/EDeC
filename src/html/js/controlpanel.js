$(document).ready(function () {
    $('.caracteristics').selectize({
        valueField: 'ID',
        /*plugins: ['remove_button','restore_on_backspace'],*/
        plugins: ['remove_button'],
        labelField: 'NAME',
        searchField: 'NAME',
        delimiter: ';',
        persist: false,
        options: [],
        create: function (input) {
            return {
                NAME: input,
                ID: input
            }
        },
        render: {
            option: function (item, escape) {
                return '<div>' +
                    '<span class="title">' +
                    '<span class="name">' + escape(item.NAME) + '</span>' +
                    '</span>' +
                    '</div>';
            }
        },
        load: function (query, callback) {
            var category_id = this.$input.data('category_id');
            if(!category_id)return callback();
            if (!query.length > 3) return callback();
            $.ajax({
                url: '/ajax/get_characteristics/?category_id='+category_id+'&query=' + encodeURIComponent(query),
                type: 'GET',
                dataType: "json",
                error: function () {
                    callback();
                },
                success: function (res) {
                    callback(res.slice(0, 40));
                }
            });
        }
    });
});