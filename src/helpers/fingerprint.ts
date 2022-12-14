import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const fingerprint = async() => {
  // Get the visitor identifier when you need it.
  if (window !== undefined) {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    // This is the visitor identifier:
    const visitorId = result.visitorId;
    return visitorId;
  }
}
