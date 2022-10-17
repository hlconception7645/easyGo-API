import busboy from "busboy";
import { contentType, extension } from "mime-types";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { TMP_DIR } from "../constants/path";
import { remove } from "fs-extra";

export interface BusboyMwOptions {
  destination: string;
  baseName?: string;
  maxSize?: number; // in kilo-bytes;
  mimes: string[];
}

export interface BusboyMwFile {
  path: string;
  dest: string;
  field: string;
  safeSuffix: string;
}

/**
 * TODO:
 * Add Options for
 *  - Configure mimesTypes
 *  - Max size of file
 *  - Max File numbers...
 */
export default function busboyMw(options: BusboyMwOptions) {
  const bbOptions: BusboyMwOptions = {
    ...{
      maxSize: 2e6, // 2 mb
    },
    ...options,
  };

  return (req: Request, res: Response, next: NextFunction) => {
    console.log({body: req.body, headers: req.headers});
    
    try {
      const bb = busboy({
        headers: req.headers,
        limits: {
          fileSize: options.maxSize || 2e6,
        },
      });

      // Parsing url-encoded form-data.
      bb.on("field", function (name, val, info) {
        console.log(`Field [${name}]: value: %j`, val);
        req.body[name] = val;
      });

      // parsing multipart-form data.
      bb.on("file", function (name, file, info) {
        const { filename, encoding, mimeType } = info;

        let fileCType = contentType(mimeType);
        fileCType = fileCType ? fileCType.split(";")[0] : "";

        if (filename && bbOptions.mimes.indexOf(fileCType) !== -1) {
          // the sanitized fileName.
          const safeSuffix = `${
            bbOptions.baseName || "file"
          }-${uuidV4()}.${extension(mimeType)}`;

          const saveTo = `${TMP_DIR}/${safeSuffix}`;

          // save the file into tmp dir.
          const stream = fs
            .createWriteStream(saveTo, { flags: "a+" })
            .setMaxListeners(0);

          file.pipe(stream);

          // storing the files in req object.
          req.body.files = req.body.files ? req.body.files : {};
          req.body.files[name] = {
            path: saveTo,
            dest: `${bbOptions.destination}/${safeSuffix}`,
            field: name,
            safeSuffix: safeSuffix,
          };
        } else {
          file.resume();
        }
      });

      bb.on("close", async function () {
        next();
      });

      req.pipe(bb);
    } catch (error) {
      next(error);
    }
  };
}
