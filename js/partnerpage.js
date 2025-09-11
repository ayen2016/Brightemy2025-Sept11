document.addEventListener("DOMContentLoaded", () => {

  // Fetch the partner page
  fetch('Partners.html')  // adjust if Partners.html is in a subfolder
    .then(response => response.text())
    .then(htmlString => {
      // Parse HTML string into a document
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      // Select all partner images
      const partnerImages = doc.querySelectorAll('.sample_partner .sample_patner_image');

      if (!partnerImages.length) {
        console.warn('No partner images found in Partners.html');
        return;
      }

      // Select homepage partners list
      const ul = document.querySelector('.partners-list');
      if (!ul) return;

      partnerImages.forEach(img => {
        let imgSrc = img.getAttribute('src');

        // Keep as relative path, just ensure it doesn't start with "./" or "../"
        if (imgSrc.startsWith('./') || imgSrc.startsWith('../')) {
          imgSrc = imgSrc.replace(/^(\.\/|\.\.\/)+/, '');
        }

        // Create <li> with partner image
        const li = document.createElement('li');
        li.className = 'partner-item';
        li.innerHTML = `<img src="${imgSrc}" alt="${img.alt}" loading="lazy">`;

        // Append to homepage partners list
        ul.appendChild(li);
      });

      // Re-observe newly added items for animation
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      }, { threshold: 0.2 });

      // Observe all partner items including dynamically added
      document.querySelectorAll(".partner-item").forEach(el => observer.observe(el));

    })
    .catch(err => console.error('Error fetching partners:', err));
});
