import { z } from "zod";

export const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
