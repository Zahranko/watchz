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