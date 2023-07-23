window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "../openapi.yml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    // requestInterceptor: function (req) {
    //   var key = localStorage.getItem("authKey");

    //   if (key && key.trim() !== "") {
    //     console.log(req.headers);
    //       req.headers.Authorization = 'Bearer ' + key;
    //       console.log('Authorized from authKey');
    //   }

    //   var apiKey = localStorage.getItem("apiKey");
    //   if (apiKey && apiKey.trim() !== "") {
    //       console.log(req.headers);
    //       req.headers['X-API-KEY'] = apiKey;
    //       console.log('X-API-KEY from apiKey');
    //   }

    //   return req;
    // },
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>
};
