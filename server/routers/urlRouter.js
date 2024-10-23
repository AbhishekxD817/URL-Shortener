import { Router } from "express";
import { createNewShortenUrl, getDestinationUrl } from "../controllers/url-controller.js";

const urlRouter = Router();

urlRouter.route("/")
    .post(createNewShortenUrl);

urlRouter.route("/:shortenUrl")
    .get(getDestinationUrl)

export default urlRouter;