

const listeners = new Set();

export function onSessionExpired(callback) {
  listeners.add(callback);
  // return an unsubscribe function for use in useEffect cleanup
  return () => listeners.delete(callback);
}

export function emitSessionExpired(reason = "expired") {
  for (const cb of listeners) {
    try {
      cb(reason);
    } catch (err) {
      console.error("sessionExpired listener error:", err);
    }
  }
}