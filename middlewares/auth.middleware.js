import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "SECRETKEY";

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(StatusCodes.UNAUTHORIZED);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(StatusCodes.UNAUTHORIZED);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(StatusCodes.UNAUTHORIZED);
    }

    jwt.verify(token, SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Token inválido!" });
      }

      if (!decoded.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Token inválido!" });
      }

      const user = JSON.parse(decoded.user);

      req.user = user;

      return next();
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};