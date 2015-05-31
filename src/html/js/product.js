$(document).ready(function() {




    if (jQuery('.add-ch').length) {
        jQuery('.add-ch').on('click touchstart', function (e) {
            e.preventDefault();
            ch_id = jQuery(this).data('chid');
            var t=jQuery(this);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: '/ajax/add_to_loves/',
                        data: {
                            ch_id: ch_id
                        },
                        success: function (data) {
                            if(data['status'])
                            {

                               var html='<a href="#" class=" btn btn-sm  btn-disabled button-menu-manage pull-right"><span class="glyphicon glyphicon-thumbs-up"></span></a>';
                                var parent=t.parent()
                                parent.find('a').remove();
                                parent.append(html);
                                alert('Succesfully added.');
                            }
                        }
                    });


        });
    }

    if (jQuery('.remove-ch').length) {
        jQuery('.remove-ch').on('click touchstart', function (e) {
            e.preventDefault();
            ch_id = jQuery(this).data('chid');
            var t=jQuery(this);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/ajax/add_to_hates/',
                data: {
                    ch_id: ch_id
                },
                success: function (data) {
                    if(data['status'])
                    {

                        var html='<a href="#" class=" btn btn-sm  btn-disabled button-menu-manage pull-right"><span class="glyphicon glyphicon-thumbs-down"></span></a>';
                        var parent=t.parent()
                        parent.find('a').remove();
                        parent.append(html);
                        alert('Succesfully added.');
                    }
                }
            });


        });
    }

});


function disable_buttons()
{
    if (jQuery('.btn-disabled').length) {
        jQuery('.btn-disabled').on('click touchstart', function (e) {
            e.preventDefault();
        });
    };
}