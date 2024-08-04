import express, { NextFunction, Request, Response } from "express";

export const changeHeaderToOctet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.headers["content-type"] = "application/octet-stream";
  next();
};

export const decode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decoder = new TextDecoder("utf-8");
  const decodedString = decoder.decode(req.body);
  const body = base64Decode(decodedString);
  req.body = body;
  req.headers["content-type"] = "application/json";
  next();
};

export function base64Decode(payload: string) {
  const bufferBody = Buffer.from(payload, "base64");
  const stringBody = bufferBody.toString("utf-8");
  return stringBody;
}
