var config = {
    host: 'keon.us.qlikcloud.com', 
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'GcaBlu6BWQRBL9t_DYw8Z7me6_o9su54'
};

async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+
            "/login?qlik-web-integration-id=" + config.webIntegrationId +
            "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}

login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host +
        (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
    
    var app = qlik.openApp( '90becbaf-b1cd-4bbd-9054-4621f076b30a', config );
    
    app.visualization.get('hJpbnN').then((vis)=>{
        vis.show("QV01");
    } );
    app.visualization.get('wMds').then((vis)=>{
        vis.show("QV02");
    } );
    app.visualization.get('rVWkeP').then((vis)=>{
        vis.show("QV03");
    } );
    app.visualization.get('PscKGAnd').then((vis)=>{
        vis.show("QV04");
    } );
    app.visualization.get('KjbgkTB').then((vis)=>{
        vis.show("QV05");
    } );
    app.visualization.get('mhTTMJ').then((vis)=>{
        vis.show("QV06");
    } );
    
    } );
});