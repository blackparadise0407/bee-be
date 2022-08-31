import { version } from "./../node_modules/@types/tough-cookie/index.d";
import { base } from "./../node_modules/acorn-walk/dist/walk.d";
import { config } from "dotenv";
config();

import express, { NextFunction, Response } from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { init } from "./utils/initializer";
import { computeSignature } from "./utils/crypto";
import qs from "qs";

const ZING_BASE_URL = process.env.ZING_MP3_BASE_URL || "https://zingmp3.vn";
const ZING_VERSION = process.env.ZING_MP3_VERSION || "1.7.28";
const ZING_API_KEY =
  process.env.ZING_MP3_API_KEY || "X5BM3w8N7MKozC0B85o4KMlzLZKhV00y";

const jar = new CookieJar();
const client = wrapper(
  axios.create({
    baseURL: ZING_BASE_URL,
    jar,
    paramsSerializer: (params) => qs.stringify(params),
    withCredentials: true,
  })
);

const app = express();

app.use(cookieParser());

init(jar, "/", async () => {
  const { config } = await client.get("/");
  const cookies = (await config.jar?.getCookies("/")) ?? [];
  cookies.forEach((it) => {
    jar.setCookieSync(it, "/");
  });
});

app.get("/", async (_, res: Response, next: NextFunction) => {
  try {
    const ctime = Math.floor(Date.now() / 1000).toString();

    const sig = computeSignature("/api/v2/song/get/streaming", {
      id: "ZZF0WU6O",
      ctime,
      version: ZING_VERSION,
    });

    const { data } = await client.get<ZingMp3Response>(
      `/api/v2/song/get/streaming`,
      {
        params: {
          id: "ZZF0WU6O",
          ctime,
          apiKey: ZING_API_KEY,
          sig,
          version: ZING_VERSION,
        },
      }
    );
    if (!data.err) {
      return res.json(data);
    }
    next(data);
  } catch (_) {}
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
