import multer from "multer";
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import crypto from 'crypto';

const storageTypes = {
    s3: multerS3({
        s3: new AWS.S3(),
        bucket: 'petcare-bucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    })
};

module.exports = {
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024
    }
};