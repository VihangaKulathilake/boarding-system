export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555854817-5b2260d50c63?w=800&auto=format&fit=crop&q=60";

export const getValidImageUrl = (images) => {
    if (images && images.length > 0) {
        const url = images[0];
        if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) {
            return url;
        }
    }
    return FALLBACK_IMAGE;
};

// Use this as the onError prop on any <img> to silently swap in the fallback
// when the primary URL fails (e.g. private S3, expired link, 404)
export const onImageError = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
        e.target.src = FALLBACK_IMAGE;
    }
};