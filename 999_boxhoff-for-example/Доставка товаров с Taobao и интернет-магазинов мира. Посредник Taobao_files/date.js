var RdDate = {
    ToDate: function (sortableDate) {
        var dt = sortableDate.split('T');

        var d = dt[0].split('-');
        var result = d[2] + '.' + d[1] + '.' + d[0] + ' ' + dt[1];

        return result;
    }
};