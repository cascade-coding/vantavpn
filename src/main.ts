import Alpine from 'alpinejs';
import { icons } from './icons';

declare global {
  interface Window {
    Alpine: typeof Alpine;
    iconComponent: (
      iconName?: string,
      tailwindClasses?: string
    ) => {
      iconName: string;
      tailwindClasses: string;
      readonly icon: string;
    };
  }
}

if (typeof window !== 'undefined') {
  window.Alpine = Alpine;

  window.iconComponent = (
    iconName = 'logo',
    tailwindClasses = ''
  ) => ({
    iconName,
    tailwindClasses,


    get icon() {
      const iconFn = icons[this.iconName];
      if (!iconFn) return '';
      return iconFn(this.tailwindClasses);
    }
  });

  Alpine.start();
}



// mobile nav

const trigger = document.querySelector(".menu_trigger") as HTMLElement | null;
const mobileMenu = document.querySelector(".mobile_menu") as HTMLElement | null;

function closeMenu(): void {
  mobileMenu?.classList.remove("open_menu");
}

trigger?.addEventListener("click", (e: MouseEvent) => {
  e.stopPropagation();
  mobileMenu?.classList.toggle("open_menu");
});

window.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as Node;

  if (
    mobileMenu?.classList.contains("open_menu") &&
    !mobileMenu.contains(target) &&
    !trigger?.contains(target)
  ) {
    closeMenu();
  }
});

// Close on menu link click
if (mobileMenu) {
  const links = mobileMenu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}



