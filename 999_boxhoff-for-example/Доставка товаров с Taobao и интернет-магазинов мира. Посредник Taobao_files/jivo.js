function jivo_onOpen() {
    jivo_bhclient.jivo_onOpen();
}


var jivo_bhclient = {


    /*
    function jivo_onLoadCallback(){
    var sUN = <%= UserName  %>;
    var sUEMail = <%= UserEMail  %>;
    if (sUN != null){
    console.log('jivo', sUN, sUEMail, jivo_api.getContactInfo());
    jivo_api.setContactInfo(
    {
    name: sUN,
    email: sUEMail
    }
    );
    }

    console.log('contacts:', jivo_api.getContactInfo());
    }
    */

    gnJivositeAttemptCounter: 0,
    userName: null,
    email: null,
    jivo_init: function (user, email) {
        this.userName = user;
        this.email = email;
        console.log(this.userName, this.email);
    },
    jivo_onOpen: function () {
        var sUN = this.userName; //<%= UserName  %>;
        var sUEMail = this.email; //<%= UserEMail  %>;
        if (sUN != null) {
            console.log('jivo', sUN, sUEMail, jivo_api.getContactInfo());
            jivo_api.setContactInfo(
                    {
                        name: sUN,
                        email: sUEMail
                    }
                );
        }

        console.log('contacts:', jivo_api.getContactInfo());

        jivo_bhclient.gnJivositeAttemptCounter = 0;
        jivo_bhclient.TryToSetJivositeText();
    },

    TryToSetJivositeText: function () {
        var jivformoff = $("#jivo_container").contents().find("#offline-form .description");
        if (jivformoff.length == 0) {
            if (jivo_bhclient.gnJivositeAttemptCounter++ > 25)
                return;
            setTimeout(function () { jivo_bhclient.TryToSetJivositeText(); }, 200);
        }
        else {
            $("#jivo-iframe-container").height(450);
            jivformoff.html("Операторы online:<br/>- с 08:00 до 20:00 пн-пт<br/>- с 09:00 до 15:00 сб<br/>- выходной воскресенье.<br/>Оставьте свое сообщение в этой форме, и мы получим его на e-mail и обязательно ответим!");
        }
    }
}

