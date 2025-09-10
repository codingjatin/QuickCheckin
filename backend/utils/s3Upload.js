const { S3Client, DeleteObjectCommand, HeadObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Generate a unique file name
const generateFileName = (originalName, prefix = '') => {
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  const uniqueSuffix = uuidv4();
  
  return `${prefix}${baseName}-${uniqueSuffix}${extension}`.replace(/\s+/g, '-');
};

// Configure multer for S3 uploads
const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = generateFileName(file.originalname, 'uploads/');
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Delete file from S3
const deleteFromS3 = async (fileUrl) => {
  try {
    const url = new URL(fileUrl);
    const key = url.pathname.substring(1); // Remove leading slash
    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    };
    
    await s3.send(new DeleteObjectCommand(params));
    return { success: true };
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    return { success: false, error: error.message };
  }
};

// Generate pre-signed URL for temporary access
const generatePresignedUrl = async (fileKey, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey
    };
    
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn });
    return { success: true, url };
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return { success: false, error: error.message };
  }
};

// Check if file exists in S3
const checkFileExists = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey
    };
    
    await s3.send(new HeadObjectCommand(params));
    return { success: true, exists: true };
  } catch (error) {
    if (error.name === 'NotFound') {
      return { success: true, exists: false };
    }
    console.error('Error checking file existence:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  uploadToS3,
  deleteFromS3,
  generatePresignedUrl,
  checkFileExists,
  generateFileName
};