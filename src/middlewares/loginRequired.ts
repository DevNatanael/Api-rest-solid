/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPlayload {
  _id: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("É preciso fazer login!");
  }

  const [,token] = authorization.split(" ");


  try {
    const secret: any = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(token, secret);
    const { _id } = decoded as TokenPlayload;

    req.userId = _id;

    return next();
  } catch (error) {
    return res.status(401).send("Token espirado ou inválido!");
  }
};
