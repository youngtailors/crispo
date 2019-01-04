import { ValidationError } from 'class-validator'

export const formatError = (errors: ValidationError[]) => {
  const errs: Array<{ path: string; message: string }> = []
  errors.forEach(error => {
    const { property, constraints } = error
    Object.keys(constraints).forEach(key => {
      errs.push({
        path: property,
        message: constraints[key],
      })
    })
  })

  return errs
}
