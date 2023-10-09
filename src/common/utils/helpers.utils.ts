import { createDecipheriv, createHash } from "crypto";
import { deflate, deflateSync, gzipSync, inflate, inflateRawSync, inflateSync } from "zlib";

export const strRandom = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    return randomArray.join("");
};


export function generateRefIDnumber() {
    const timestamp = new Date().getTime().toString().substring(0, 8);
    //random from 1000 to 999999
    const randomNum = Math.floor(1000 + Math.random() * 9999);
    return `${timestamp}${randomNum}`;
}


export const groupBy: any = (array: any[], groupby: string) => {
    return array.reduce(function (rv, x) {
        (rv[x[groupby]] = rv[x[groupby]] || []).push(x);
        return rv;
    }, {});

}

/**
 * file_url()
 * provide url prefix for path in database
 * the prefix path in database values that identify storage usage
 * example:
 * gs: => for google storage
 * s3: => s3 aws
 * cl: => cloudinary
 * @return string
 */
export function file_url(path: string) {

    if(path == null) return 'https://files.intervest.io/statics/avatar-placeholder.png';

    const path_prefix = process.env.FILES_PUBLIC_URL;
    const pattern     = /\bhttps?:\/\/\S+/;
    const googleSign  = path.match(pattern);

    if(path == null) return path;

    if(googleSign != null) return path;
    
    const myString = path.replace(/gcs:|s3:/g, '');

    return `${path_prefix}${path}`;
}

export function static_url(path: string) {
    const path_prefix = process.env.FILES_STATIC_URL;

    return `${path_prefix}${path}`
}

function isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
}
  

// gzip compressed
export const jsoncompressed = (data: any) => {
    data = JSON.stringify(data);
    return deflateSync(data).toString('base64');
}

// gzip decompressed
export const jsondecompressed: any | null = (data: any) => {
    if(data == null) return null;

    const decompressed = inflateSync(Buffer.from(data, 'base64')).toString();
    return isJson(decompressed) ? JSON.parse(decompressed) : decompressed;
}


// format string parser example: "Hello ? , how are you ? do you like ?" => "Hello John, how are you? do you like pizza?
// or can be like this "hello :name , how are you :name do you like :name" => "hello John, how are you John do you like John"
export const formatString = (str: string, data: any) => {
    let result = str;
    Object.keys(data).forEach((key) => {
        result = result.replace(new RegExp(`:${key}`, 'g'), data[key]);
    });
    return result;
}



export function decryptString(encryptedText:any, key:string) {
    console.log(key);
    const md5 = (data: any) => createHash('md5').update(data).digest("hex")
    const iv = Buffer.alloc(16, 0);
    
    const decipher = createDecipheriv('aes-256-cbc', md5(key), iv);
    
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
    try {
    } catch (error) {
        return decrypted;
    }
  }
  