export interface MenuCategory {
  id: string;
  label: string;
  menuImages: string[];
}

export const menuData: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgery",
    menuImages: [
      "https://cdn.website.dish.co/media/aa/fa/9394848/Menu-burger.jpg",
      "https://cdn.website.dish.co/media/15/e8/9394871/Menu-burgers-EN.jpg",
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    menuImages: [
      "https://cdn.website.dish.co/media/48/ca/9394872/Menu-lunch-EN.jpg",
      "https://cdn.website.dish.co/media/f0/db/9394879/Menu-lunch.jpg",
    ],
  },
  {
    id: "drinks",
    label: "Napoje & Kraft",
    menuImages: [
      "https://cdn.website.dish.co/media/18/68/9394854/Menu-pynne.jpg",
      "https://cdn.website.dish.co/media/9b/25/9394860/Menu-koktajle.jpg",
    ],
  },
];
