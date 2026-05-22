/** Extract a user-facing message from axios / express-validator errors */
export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  const data = error?.response?.data;
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors.map((e) => e.msg || e.message).filter(Boolean).join('. ');
  }
  if (typeof data?.message === 'string' && data.message) return data.message;
  if (typeof error?.message === 'string' && error.message) return error.message;
  return fallback;
}
