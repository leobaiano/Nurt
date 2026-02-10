import 'dotenv/config';
import { z } from 'zod';

/**
 * Environment variables schema
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .default(3000),

  MONGO_URI: z
    .string()
    .min(1, 'MONGO_URI is required')
    .refine(
      (uri) =>
        uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'),
      { message: 'MONGO_URI must be a valid MongoDB connection string' }
    ),

  MONGO_DB_NAME: z
    .string()
    .default('nurt_dev'),

  /**
   * 🔐 Security
   */
  API_TOKEN: z
    .string()
    .min(1, 'API_TOKEN is required'),

  ALLOWED_ORIGINS: z
    .string()
    .optional(),

  AUTH_STRATEGY: z.enum(['api-token', 'jwt']).default('api-token'),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  ADMIN_USERNAME: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('nurt123'),

  /**
   * 🔐 Send Email
   */
  RESEND_API_KEY: z
    .string()
    .min(1),

  EMAIL_FROM: z
    .string()
    .email(),

  EMAIL_PROVIDER: z.enum(['resend', 'fake']).default('fake'),
});

/**
 * Parse and validate process.env
 */
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables');

  parsedEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  });

  throw new Error('Invalid environment configuration');
}

/**
 * Typed and validated env object
 */
export const env = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  mongoUri: parsedEnv.data.MONGO_URI,
  mongoDbName: parsedEnv.data.MONGO_DB_NAME,
  apiToken: parsedEnv.data.API_TOKEN,
  allowedOrigins: parsedEnv.data.ALLOWED_ORIGINS,
  resendApiKey: parsedEnv.data.RESEND_API_KEY,
  emailFrom: parsedEnv.data.EMAIL_FROM,
  emailProvider: parsedEnv.data.EMAIL_PROVIDER,
  authStrategy: parsedEnv.data.AUTH_STRATEGY,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  jwtExpiresIn: parsedEnv.data.JWT_EXPIRES_IN,
  adminUserName: parsedEnv.data.ADMIN_USERNAME,
  adminPassword: parsedEnv.data.ADMIN_PASSWORD
} as const;
