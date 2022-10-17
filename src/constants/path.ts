import path from "path";

export const TMP_DIR = path.resolve(__dirname, "../../tmp");
export const PUBLIC_DIR = path.resolve(__dirname, "../../public");
export const PUBLIC_IMG_DIR = `${PUBLIC_DIR}/img`;
export const SERVER_ROOT = `http://127.0.0.1:${process.env.PORT || 3000}`;
