// Shared server-side input validation. Never trust client input:
// strip HTML, enforce length limits, and reject unexpected fields.

const TAG_PATTERN = /<[^>]*>/g;

export const stripTags = (value) =>
  String(value ?? '')
    .replace(TAG_PATTERN, '')
    .replace(/[<>]/g, '')
    .trim();

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[\d+()\-.\s]{7,30}$/;

/**
 * Validates a request body against a field schema.
 * schema: { fieldName: { required, maxLength, pattern } }
 * Returns { ok: true, data } with sanitized values, or { ok: false }.
 * Unknown fields cause rejection so payloads can't smuggle extra data.
 */
export function validateBody(body, schema) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false };
  }

  const allowed = Object.keys(schema);
  for (const key of Object.keys(body)) {
    if (!allowed.includes(key)) {
      return { ok: false };
    }
  }

  const data = {};
  for (const [key, rules] of Object.entries(schema)) {
    const raw = body[key];

    if (raw === undefined || raw === null || String(raw).trim() === '') {
      if (rules.required) {
        return { ok: false };
      }
      data[key] = '';
      continue;
    }

    if (typeof raw !== 'string') {
      return { ok: false };
    }

    const clean = stripTags(raw);
    if (rules.required && clean === '') {
      return { ok: false };
    }
    if (clean.length > rules.maxLength) {
      return { ok: false };
    }
    if (rules.pattern && clean !== '' && !rules.pattern.test(clean)) {
      return { ok: false };
    }

    data[key] = clean;
  }

  return { ok: true, data };
}
