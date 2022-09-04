import crypto from 'crypto';

const SECRET =
  process.env.ZING_MP3_SECRET || 'acOrvUS15XRW2o9JksiK1KgQ6Vbds8ZW';

const keyPrior: Record<string, number> = {
  ctime: 0,
  id: 1,
  version: 2,
};

export const createSha256 = (s: string) => {
  return crypto.createHash('sha256').update(s).digest('hex');
};

export const createHmac512 = (str: string, key: string) => {
  return crypto
    .createHmac('sha512', key)
    .update(Buffer.from(str, 'utf8'))
    .digest('hex');
};

export const computeSignature = (
  path: string,
  params: Record<string, string>
) => {
  let hashStr = '';
  Object.keys(params)
    .sort((a, b) => keyPrior[a] - keyPrior[b])
    .forEach((key) => {
      hashStr += `${key}=${params[key]}`;
    });
  return createHmac512(path + createSha256(hashStr), SECRET);
};
