import { CookieJar } from "tough-cookie";

export const init = async (
  jar: CookieJar,
  path: string,
  callback: () => Promise<void>
) => {
  const cookies = await jar.getSetCookieStrings(path);
  if (!cookies?.length) {
    callback();
  }
};
