import { Router } from "express";
import mideaRoutes from "./mideas.routes";
import userRoutes from "./users.routes";
import playlistRoutes from "./playlists.routes";

const routes = Router();

routes.use("/mideas", mideaRoutes);
routes.use("/users", userRoutes);
routes.use("/playlists", playlistRoutes);

export default routes;
