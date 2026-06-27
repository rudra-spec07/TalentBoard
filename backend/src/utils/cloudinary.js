import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigured = cloudName && apiKey && apiSecret;

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
  console.log('[CLOUDINARY] Cloudinary initialized successfully');
} else {
  console.warn('[CLOUDINARY] Warning: Credentials not configured in .env. Running in Mock Upload mode.');
}

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer The file buffer from Multer memoryStorage
 * @param {string} folder The destination folder in Cloudinary
 * @returns {Promise<string>} The secure_url of the uploaded file
 */
export const uploadBuffer = (fileBuffer, folder = 'talentboardx/resumes') => {
  return new Promise((resolve, reject) => {
    // If not configured, fall back to returning a mock URL for testing
    if (!isConfigured) {
      console.log('[CLOUDINARY] (Mock) Mocking upload of buffer file to folder:', folder);
      return resolve('https://res.cloudinary.com/demo/image/upload/sample.pdf');
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw', // Allow non-image files like PDFs
        format: 'pdf'
      },
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY] Upload stream error:', error);
          return reject(new Error('Cloudinary upload failed'));
        }
        resolve(result.secure_url);
      }
    );

    // End stream with file buffer
    uploadStream.end(fileBuffer);
  });
};
