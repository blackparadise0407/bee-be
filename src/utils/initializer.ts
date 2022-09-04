import fs from 'fs';
import path from 'path';

import { CookieJar } from 'tough-cookie';

export const init = async (
  jar: CookieJar,
  url: string,
  callback: () => Promise<void>
) => {
  // Init logs dir
  if (process.env.NODE_ENV === 'production') {
    const logsPath = path.join(process.cwd(), '.logs');
    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath);
      console.log('.logs directory successfully created at root level');
    }
  }

  // Init zing cookies
  const cookies = await jar.getSetCookieStrings(url);
  if (!cookies?.length) {
    callback();
  }
};
