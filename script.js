const burgerBtn = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.hasAttribute('hidden');
    
    if (isHidden) {
      mobileMenu.removeAttribute('hidden');
    } else {
      mobileMenu.setAttribute('hidden', '');
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll('.journal-item');

  items.forEach(item => {
    const videoUrl = item.getAttribute('data-url');
    
    if (videoUrl) {
      // We use a CORS proxy (allorigins) to bypass TikTok's security block
      const oembedApi = `https://www.tiktok.com/oembed?url=${videoUrl}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(oembedApi)}`;

      fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
          // The proxy returns the data inside a "contents" string, so we parse it again
          const tiktokData = JSON.parse(data.contents);

          if (tiktokData) {
            // 1. SET IMAGE (Automatically fetched!)
            const img = item.querySelector('.journal-thumb');
            if (img) {
              img.src = tiktokData.thumbnail_url;
              img.style.display = "block"; // Show image now that it's ready
            }

            // 2. SET TITLE
            const title = item.querySelector('.dynamic-title');
            if (title) title.innerText = "Posted by " + tiktokData.author_name;

            // 3. SET DESCRIPTION (Truncated)
            const desc = item.querySelector('.dynamic-desc');
            if (desc) {
              // TikTok calls the description "title" in their API
              const text = tiktokData.title; 
              desc.innerText = text.length > 120 ? text.substring(0, 120) + "..." : text;
            }

            // 4. SET LINK
            const link = item.querySelector('.read-more');
            if (link) link.href = videoUrl;
          }
        })
        .catch(err => {
          console.error("Could not fetch TikTok data", err);
          item.querySelector('.dynamic-title').innerText = "Video Unavailable";
        });
    }
  });
});