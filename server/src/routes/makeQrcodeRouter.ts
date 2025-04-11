import { Context, Hono } from "hono";
import { makeQrcode } from "../services/makeQrcode.ts";

const router = new Hono();

router.get(
  "/",
  async (c: Context) => {
    // クエリパラメータから値を取得
    const data = c.req.query("data") || "dummy.text";
    const sizeParam = c.req.query("size") || "200";
    const size = parseInt(sizeParam, 10);

    // QRコードを生成
    const pngData = await makeQrcode(data, size);
    return c.body(pngData, 200, { "Content-Type": "image/png" });
  },
);

export default router;
