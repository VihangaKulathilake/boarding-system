export const getValidImageUrl = (images) => {
    if (images && images.length > 0) {
        const url = images[0];
        if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) {
            return url;
        }
    }
    return "https://images.unsplash.com/photo-1555854817-5b2260d50c63?w=800&auto=format&fit=crop&q=60";
};