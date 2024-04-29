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

function cycleContainers (objs, timer) {
    objs.style.display = 'none';

    for (let i in objs) {
        let obj = objs[i]
        obj.style.display = '';
        setTimeout(_=> obj.style.display = 'none', timer)
        if (objs.length == i -1)
            i = 0
    }

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
    
    const containers = document.getElementsByClassName("flex-container");
    var app = qlik.openApp( '5bcf0d11-0e62-4e55-8942-8edea5c1c15c', config );
    var app2 = qlik.openApp( '7c98b376-3b4d-451d-ac92-7d549ec9e5e0', config );
    
    app2.visualization.get('PZZwr').then((vis)=>{
        vis.show("QV00");
    });
    app.visualization.get('b349a54a-28c2-4806-8380-1b4153e047ba').then((vis)=>{
        vis.show("QV01");
    } );
    app.visualization.get('65abf815-1035-4a4f-9562-29a5ad2e76ef').then((vis)=>{
        vis.show("QV02");
    } );
    app.visualization.get('a47efe3b-0f14-4318-aa8a-711faf5f714a').then((vis)=>{
        vis.show("QV03");
    } );
    app.visualization.get('b5370f15-a1e0-4507-b788-257db35c8993').then((vis)=>{
        vis.show("QV04");
    } );
    app.visualization.get('vRcprF').then((vis)=>{
        vis.show("QV05");
    } );
    app.visualization.get('921f6a3e-24e8-40bb-9152-621d5e232fac').then((vis)=>{
        vis.show("QV06");
    } );
    
    } );

    cycleContainers (containers, 15000);
    
});

