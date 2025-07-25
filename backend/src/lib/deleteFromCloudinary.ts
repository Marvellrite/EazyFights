import { v2 as cloudinary } from 'cloudinary';

/**
 * Deletes a media asset from Cloudinary along with its cached versions.
 * @param publicId The Cloudinary public_id of the media.
 */
export default async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true // This clears cached copies on CDN (e.g., Cloudinary CDN, Akamai, etc.)
    });

    if (result.result !== 'ok' && result.result !== 'not found') {
      console.warn('Cloudinary deletion failed:', result);
    }
  } catch (err) {
    console.error('Error deleting from Cloudinary:', err);
    throw err;
  }
}
