import { z, ZodError } from "zod/v4";

export function handleZodError(err: ZodError) {
  const message = z.prettifyError(err);

  const error = err.issues.reduce(
    (e, i) => {
      e[i.path.join(".")] = i.message;
      return e;
    },
    {} as Record<string, string>,
  );
  return { message, error };
}
