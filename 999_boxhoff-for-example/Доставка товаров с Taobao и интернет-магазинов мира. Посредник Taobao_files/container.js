var Container = {
    _column: '',

    bindContainer: function (id) {
        $.ajax({
            type: 'POST',
            url: '/serv.aspx/GetContainersView',
            dataType: 'json',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id
            }),
            success: function (data, status) {
                var obj = data;
                if (data.d != undefined) obj = data.d;
                var response = eval('(' + obj + ')');

                var container = $('#container-form');
                $('.container-form-container-num').html(response.container.containerId);
                $('.package-form-num-field').val(response.container.containerId);
                $('.package-form-status-field').val(response.container.containerDate);
                $('.package-form-creating-date-field').val(response.container.status);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            }
        });
    },

    openContainer: function (id) {
        if (Container._column == '') {
            Container.bindContainer(id);
            $('#container-form').modal('show');
        } else {
            Container._column = '';
        }
    },

    closeContainer: function () {
        $('#container-form').modal('hide');
    },

    bindDeclar: function (id) {
        var jsonFilter = JSON.stringify({ id: id });
        $.ajax({
            type: 'POST',
            url: '/serv.aspx/GetContainerDeclar',
            dataType: 'json',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            data: jsonFilter,
            success: function (data, status) {
                var obj = data;
                if (data.d != undefined) obj = data.d;
                var response = eval('(' + obj + ')');
                $('.declar-form-block-num').html(id);

                $('.parcel-rows').html('');
                for (var p = 0; p < response.declars.length; p++) {
                    var declar = response.declars[p];
                    var container = $('.parcel-rows');
                    container.append("<div class='parcel-row'>" +
                        "<div class='box-column parcel-column'>" + declar.goods + "</div>" +
                        "<div class='box-column parcel-column-c'>" + declar.qty + "</div>" +
                        "<div class='box-column parcel-column-c'>" + declar.cost + "</div>" +
                        "<div class='box-column parcel-column-c'>" + declar.order + "</div>" +
                        "<div class='box-column parcel-column-c'>" + (declar.isgift ? 'Да' : 'Нет') + "</div>" +
                        "<div class='clear'></div>" +
                        "</div>");
                }
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            }
        });
    },

    openDeclar: function (id) {
        Container._column = 'decl';
        Container.bindDeclar(id);
        $('#declar-form-block').modal('show');
    },

    closeDeclar: function () {
        $('#declar-form-block').modal('hide');
    }
}