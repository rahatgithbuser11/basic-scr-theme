<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^="AllProductsSection-"]').forEach((section) => {
    const btn = section.querySelector('.load-more-btn');
    if (!btn) return;

    const grid = section.querySelector('.grid');
    const limit = parseInt(section.dataset.productsLimit || '0', 10);
    const sectionId = section.dataset.sectionId;
    const total = parseInt(section.dataset.collectionTotal || '0', 10);
    const sectionName = 'all-products'; // must match filename

    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page || '2', 10);
      btn.textContent = 'Loading...';
      btn.disabled = true;

      const url = `${window.location.pathname}?sections=${sectionName}&page=${page}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const html = data[sectionName]?.html;
          if (!html) throw new Error('Invalid section response');

          // ✅ Clean out <script> tags before parsing
          const cleanHTML = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

          const temp = document.createElement('div');
          temp.innerHTML = cleanHTML;

          const newItems = temp.querySelectorAll(`#AllProductsSection-${sectionId} .grid__item`);
          if (!newItems.length) throw new Error('No grid items found');

          newItems.forEach(item => grid.appendChild(item));

          const currentCount = grid.querySelectorAll('.grid__item').length;
          if (total && currentCount >= total) {
            btn.style.display = 'none';
          } else if (newItems.length < limit) {
            btn.style.display = 'none';
          } else {
            btn.dataset.page = page + 1;
            btn.textContent = 'Load More';
            btn.disabled = false;
          }
        })
        .catch((err) => {
          console.error('Load more failed:', err);
          btn.textContent = 'Load More';
          btn.disabled = false;
        });
    });
  });
});
</script>