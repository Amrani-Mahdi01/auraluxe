export type Family = "Floral" | "Woody" | "Amber" | "Fresh" | "Spicy";

export type Product = {
  id: string;
  name: string;
  notes: string;
  price: number;
  img: string;
  cat: "Femme" | "Homme" | "Unisexe";
  family: Family;
  tag?: string;
  description: string;
  top: string;
  heart: string;
  base: string;
};

export const CATALOG: Product[] = [
  {
    id: "obsidienne",
    name: "Obsidienne",
    notes: "Oud · Amber · Incense",
    price: 14900,
    img: "/products/obsidienne.jpg",
    cat: "Homme",
    family: "Woody",
    tag: "Bestseller",
    description:
      "A nocturnal oud built on smouldering amber and incense, lifted by a whisper of saffron. Dark, resinous, and impossibly long-lasting.",
    top: "Bergamot · Pink Pepper",
    heart: "Oud · Saffron · Orris",
    base: "Amber · Tonka · Incense",
  },
  {
    id: "soleil",
    name: "Soleil d'Or",
    notes: "Amber · Honey · Vanilla",
    price: 12900,
    img: "/products/soleil.jpg",
    cat: "Femme",
    family: "Amber",
    tag: "Bestseller",
    description:
      "Liquid sunlight — golden honey and orange blossom melting into a warm amber-vanilla glow that lingers on skin for hours.",
    top: "Mandarin · Honey",
    heart: "Orange Blossom · Mimosa",
    base: "Amber · Vanilla · Benzoin",
  },
  {
    id: "rose",
    name: "Rose Mémoire",
    notes: "Rose · Peony · White Musk",
    price: 9900,
    img: "/products/rose.jpg",
    cat: "Femme",
    family: "Floral",
    description:
      "A dewy, modern rose wrapped in peony and clean white musk — luminous, weightless, and quietly addictive.",
    top: "Lychee · Pink Pepper",
    heart: "Rose · Peony",
    base: "White Musk · Cedar",
  },
  {
    id: "ecarlate",
    name: "Écarlate",
    notes: "Saffron · Red Fruits · Leather",
    price: 13900,
    img: "/products/ecarlate.jpg",
    cat: "Unisexe",
    family: "Spicy",
    tag: "New",
    description:
      "Crimson and daring — saffron and red fruits draped over a supple leather base. A fragrance worn like a statement.",
    top: "Saffron · Red Berries",
    heart: "Rose · Plum",
    base: "Leather · Amberwood",
  },
  {
    id: "vetiver",
    name: "Vétiver Blanc",
    notes: "Vetiver · Citrus · Cedar",
    price: 11500,
    img: "/products/vetiver.jpg",
    cat: "Homme",
    family: "Fresh",
    description:
      "Crisp and earthy — bright citrus snapping over smoky vetiver and dry cedar. Effortless, and made for every day.",
    top: "Bergamot · Grapefruit",
    heart: "Vetiver · Geranium",
    base: "Cedar · Vetiver Root",
  },
  {
    id: "fleur",
    name: "Fleur de Verre",
    notes: "Neroli · Jasmine · White Tea",
    price: 8900,
    img: "/products/fleur.jpg",
    cat: "Femme",
    family: "Floral",
    tag: "New",
    description:
      "Translucent white flowers and steamed tea — soft, airy, and impeccably refined. Like light through glass.",
    top: "Neroli · Bergamot",
    heart: "Jasmine · Orange Blossom",
    base: "White Tea · Musk",
  },
  {
    id: "lumiere",
    name: "Lumière",
    notes: "Pear · Freesia · White Amber",
    price: 9500,
    img: "/products/lumiere.jpg",
    cat: "Femme",
    family: "Fresh",
    description:
      "Sparkling pear and freesia drifting into a soft white amber. Light as morning, and just as fleeting to resist.",
    top: "Pear · Bergamot",
    heart: "Freesia · Magnolia",
    base: "White Amber · Musk",
  },
  {
    id: "ambre",
    name: "Ambre Fauve",
    notes: "Amber · Tobacco · Sandalwood",
    price: 13500,
    img: "/products/ambre.jpg",
    cat: "Unisexe",
    family: "Amber",
    tag: "Bestseller",
    description:
      "A glowing amber wrapped in sweet tobacco and creamy sandalwood. Enveloping, warm, and impossible to forget.",
    top: "Cinnamon · Bay Leaf",
    heart: "Tobacco · Amber",
    base: "Sandalwood · Vanilla",
  },
];

export const getProduct = (id: string) =>
  CATALOG.find((p) => p.id === id);
