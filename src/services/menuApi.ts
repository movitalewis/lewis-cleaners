export interface MenuItem {
  id: number;
  label: string;
  path: string;
}

export const fetchMenu = (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, label: "Home", path: "/" },
        { id: 2, label: "About Us", path: "/about-us" },
        { id: 3, label: "Services", path: "/services" },
        { id: 4, label: "Products", path: "/products" },
        { id: 5, label: "Contact Us", path: "/contact-us" }
      ]);
    }, 800); // simulates network delay
  });
};
