import { NextFunction } from "express";
import { Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";

/**
 * Validate middleware.
 *
 * @param validations validation rules
 * @returns
 */
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    console.log({ errors : errors.array()});

    res.status(400).json({ error: errors.array() });
  };
};

export default validate;
