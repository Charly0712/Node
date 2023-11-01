
  //decirle al servidor  que agregue a las rutas

import { Application } from "express";
import UsersNetwork from "./users"
import Routes from "../utils/constants/routes.json"

//
function routes(server: Application){
    server.use(Routes.userV1, UsersNetwork)
}

export default routes;
