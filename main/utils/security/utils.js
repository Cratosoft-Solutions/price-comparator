const crypto = require("crypto");
const fs = require("fs");
import path from "path";

const directoryPath = path.resolve('./utils/security/private-key.pem'); 

const privateKey = fs.readFileSync(directoryPath, "utf-8");

export const decryptData = (base64EncryptedText) => {
  // Decode base64
  try {
    const encryptedBuffer = Buffer.from(base64EncryptedText, "base64");

    // Decrypt using cratosoft private key
    const decryptedText = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      encryptedBuffer
    );
    return { decrypted: true, value: decryptedText.toString().split(" ")[1] };
  } catch (error) {
    return { decrypted: false, value: "unauthorized" };
  }
};
