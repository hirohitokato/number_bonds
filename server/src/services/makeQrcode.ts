import QRCode from "qrcode";

export async function makeQrcode(data: string, size: number): Promise<Uint8Array> {

    // QRCode.toBufferは指定したデータとオプション（ここではwidth）でPNG画像のバッファを返す
    const pngBuffer = await QRCode.toBuffer(data, { width: size });

    return pngBuffer;

}
