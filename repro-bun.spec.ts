import { describe, expect, it } from 'bun:test'
const crypto = require('crypto');

/**
 oneshot ssh-ed25519 crypto support PR - https://github.com/oven-sh/bun/pull/7256
 still-failing section within ssh2 library - https://github.com/mscdex/ssh2/blob/master/lib/protocol/constants.js#L23
 */
describe('ssh-ed25519', () => {
  // jest.setTimeout(25000);

  it('sign and verify work', async () => {

    const eddsaSupported = (() => {
      if (typeof crypto.sign === 'function'
          && typeof crypto.verify === 'function') {
        const key =
          '-----BEGIN PRIVATE KEY-----\r\nMC4CAQAwBQYDK2VwBCIEIHKj+sVa9WcD'
          + '/q2DJUJaf43Kptc8xYuUQA4bOFj9vC8T\r\n-----END PRIVATE KEY-----';
        const data = Buffer.from('a');
        let sig;
        let verified;
        try {
          sig = crypto.sign(null, data, key);
          verified = crypto.verify(null, data, key, sig);
        } catch {}
        return (Buffer.isBuffer(sig) && sig.length === 64 && verified === true);
      }

      return false;
    })();

    expect(eddsaSupported).toEqual(true)
  })
})