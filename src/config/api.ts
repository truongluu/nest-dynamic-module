import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  apiKey: process.env.API_KEY,
  apiUrl: process.env.API_URL,
}));
