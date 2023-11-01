const express = require('express');
import routes from "./src/network"

//esta variable tiene el servidor
const server = express();
routes(server)

const example = function () {
  console.log("estoy a la escucha");
};

routes(server);

server.listen(900, example);
