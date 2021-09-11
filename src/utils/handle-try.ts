export async function handleTry<T = unknown>(
  promise: Promise<T>,
): Promise<[T | null, any | null]> {
  try {
    const data = (await promise) as T;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
