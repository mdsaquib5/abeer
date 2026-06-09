export default function imageLoader({ src, width, quality }) {
  // If it's a Cloudinary image, use Cloudinary's native optimization and sizing parameters
  if (src && src.includes('res.cloudinary.com')) {
    const params = ['f_auto', 'q_auto'];
    
    if (width) {
      params.push(`w_${width}`);
    }
    
    if (quality) {
      params.push(`q_${quality}`);
    }
    
    // Insert parameters right after '/image/upload/'
    if (src.includes('/image/upload/')) {
      return src.replace('/image/upload/', `/image/upload/${params.join(',')}/`);
    }
  }
  
  // Return the original URL for local assets or other domains
  return src;
}
