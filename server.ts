import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = express.Router();

router.post(
  "/receive",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jsonBody = JSON.parse(req.body);
      console.log("Received" + jsonBody);
      res.status(200).send({ message: `${jsonBody.message} :server` });
    } catch (error) {
      next(error);
    }
  }
);

export = router;
