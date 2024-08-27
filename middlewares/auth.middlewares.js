import { findStringKey } from "../models/session.models.js";

const authMiddleware = {
  authentication: async (req, res, next) => {
    const { apikey } = req.query
    const apiKey = apikey.split('$')[3]
    try {
      const isAuthenticated = await findStringKey({apiKey});
      if (isAuthenticated.apikey === apiKey){
        next()
      } else{
        throw new Error("Unauthorized");
      }
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  }
};
export default authMiddleware;
