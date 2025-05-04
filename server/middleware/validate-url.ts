import { body, validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateShortenRequest: ValidationChain[] = [
  body('original_url')
    .isURL({ require_protocol: true })
    .withMessage('Invalid URL. Must include http:// or https://'),

  body('slug')
    .optional()
    .isAlphanumeric()
    .isLength({ min: 4, max: 32 })
    .withMessage('Slug must be alphanumeric and between 4-32 characters.'),

  body('expires_at')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Expiration date must be a valid ISO 8601 date string.')
]

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation Failed',
      errors: errors.array()
    })
    return
  }

  next()
}
