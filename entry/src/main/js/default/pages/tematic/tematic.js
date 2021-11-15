import device from '@system.device';
import router from '@system.router';
import mediaquery from '@system.mediaquery';
import app from '@system.app';
import fetch from '@system.fetch';
import notification from '@system.notification';

export default {
    data: {
        title: 'World',
        webUrl: 'http://www.xxxxx.com',
        privacyprotocol: 'Privacy Policy',
        content: 'Please visit the following link on your phone',
        responseData: "",
        url: "https://opzz0lreh2.execute-api.us-east-1.amazonaws.com/prod/audioplayer/listado-podcast?categoriaId=deportes",
    },
    start() {
        var that = this;
        fetch.fetch({
            url: that.url,
            success: function(response) {
                console.info("fetch success");
                that.responseData = JSON.stringify(response);
                console.info(response.data);
                var unformatted_result  = JSON.stringify(response.data).replace(/\\/g, "");
                unformatted_result = unformatted_result.slice(1,-1);
                that.responseData = JSON.stringify(JSON.parse(unformatted_result).Response).slice(1,-1);
                console.info(that.responseData);

                notification.show({
                    contentTitle: 'Server Response',
                    contentText: that.responseData,
                    clickAction: {
                        bundleName: 'com.shuntar.ondemandapplication',
                        abilityName: 'MainAbility',
                        uri: '/path/to/notification',
                    },
                });
            },
            fail: function() {
                console.info("fetch fail");
            }
        });
    }

}