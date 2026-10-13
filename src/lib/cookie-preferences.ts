export const CONSENT_KEY = "ebooks:consent:v1";
export const CONSENT_EVENT = "ebooks:consent-changed";
export const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000;

export function readPreferences(): { reading: boolean; savedAt: number } | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (typeof value.reading !== "boolean" || typeof value.savedAt !== "number" || value.savedAt > Date.now() || Date.now() - value.savedAt >= CONSENT_DURATION) return null;
    return value;
  } catch {
    return null;
  }
}

export function savePreferences(reading: boolean): boolean {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ reading, savedAt: Date.now() }));
    if (!reading) {
      for (const key of Object.keys(window.localStorage)) {
        if (key.startsWith("ebooks:page:")) window.localStorage.removeItem(key);
      }
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    return true;
  } catch {
    return false;
  }
}