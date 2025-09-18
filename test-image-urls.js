// Test Instagram image URL logic
const mockPosts = [
  {
    id: "test1",
    image_url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDA...",
    thumbnail_url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDA...",
    local_image: "",
    caption: "Base64 SVG image",
    permalink: "https://instagram.com/p/test1/",
    timestamp: "2024-01-01T12:00:00Z",
    likes: 0
  },
  {
    id: "test2",
    image_url: "/images/pic05.jpg",
    thumbnail_url: "/images/pic05.jpg",
    local_image: "images/pic05.jpg",
    caption: "Local image with local_image field",
    permalink: "https://instagram.com/p/test2/",
    timestamp: "2024-01-01T12:00:00Z",
    likes: 0
  },
  {
    id: "test3",
    image_url: "/images/pic01.jpg",
    thumbnail_url: "/images/pic01.jpg",
    local_image: "",
    caption: "Image path without local_image",
    permalink: "https://instagram.com/p/test3/",
    timestamp: "2024-01-01T12:00:00Z",
    likes: 0
  }
];

const getImageUrl = (post) => {
  // For local images, use the path directly
  if (post.local_image && post.local_image.trim() !== '') {
    return `/${post.local_image}`;
  }
  // For base64 data URLs, use them directly
  if (post.image_url && post.image_url.startsWith('data:')) {
    return post.image_url;
  }
  // For external Instagram images, use them directly
  if (post.thumbnail_url && post.thumbnail_url.startsWith('http')) {
    return post.thumbnail_url;
  }
  if (post.image_url && post.image_url.startsWith('http')) {
    return post.image_url;
  }
  // For local paths without the local_image flag, add leading slash
  if (post.image_url && !post.image_url.startsWith('/')) {
    return `/${post.image_url}`;
  }
  return post.image_url || post.thumbnail_url || '/images/placeholder.jpg';
};

console.log("Instagram Image URL Test Results:");
console.log("=================================");

mockPosts.forEach(post => {
  const result = getImageUrl(post);
  console.log(`\nPost: ${post.id}`);
  console.log(`  Caption: ${post.caption}`);
  console.log(`  Original image_url: ${post.image_url}`);
  console.log(`  local_image: "${post.local_image}"`);
  console.log(`  Result URL: ${result}`);
  console.log(`  Expected: ${
    post.id === 'test1' ? 'Base64 data URL' :
    post.id === 'test2' ? '/images/pic05.jpg' :
    '/images/pic01.jpg'
  }`);
  console.log(`  ✓ ${result.includes('data:') || result.startsWith('/images/') ? 'PASS' : 'FAIL'}`);
});
