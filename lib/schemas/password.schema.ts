import { z } from 'zod';

export const passwordFieldSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(100, 'La contraseña no puede tener más de 100 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial');

// Schema más simple si no quieres tantas validaciones
export const passwordFieldSchemaSimple = z
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .max(100, 'La contraseña no puede tener más de 100 caracteres');

// Schema para confirmar contraseña
export const passwordConfirmSchema = z.object({
  password: passwordFieldSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});