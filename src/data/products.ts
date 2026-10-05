import { Product, Accessory } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'gulabi-embroidered-chanderi-kurta-set',
    title: 'Gulabi Embroidered Straight Kurta with Palazzo & Dupatta',
    tagline: 'Pure Chanderi Silk with Zari',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Straight Silks',
    fabric: 'Pure Chanderi Silk',
    type: 'Kurta, Pant & Dupatta',
    price: 4499,
    originalPrice: 6299,
    discountPct: 28,
    rating: 4.9,
    reviewCount: 48,
    badge: 'Bestseller',
    expressDispatch: true,
    artisanId: '#SAG-2025-GLB',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1V3Ck0wOzun39udK39E00oWgmxKHgwsN8FSIX77Q3tONUspgsaITDpkrFFJwvm1z9-O-9ykKybikeoixamT1g8yNcoczP38Ui65nM9h15fwxkJxnwD0naNYleC7uZZxXajTsw6OlqZTs5RqPB158mYcbi8mzSfKWbqkzdyk2KffGMTSY_84wwJeWlWjn3RIcLSGajPxQXnCoRzKHrQnuDii599FgNiLI0R_0pSmCUwCnaRrvkAjHY2NEg',
    detailImages: [
      {
        id: 'thumb-main',
        label: 'LOOK',
        url: 'https://lh3.googleusercontent.com/aida/AEtjO1V3Ck0wOzun39udK39E00oWgmxKHgwsN8FSIX77Q3tONUspgsaITDpkrFFJwvm1z9-O-9ykKybikeoixamT1g8yNcoczP38Ui65nM9h15fwxkJxnwD0naNYleC7uZZxXajTsw6OlqZTs5RqPB158mYcbi8mzSfKWbqkzdyk2KffGMTSY_84wwJeWlWjn3RIcLSGajPxQXnCoRzKHrQnuDii599FgNiLI0R_0pSmCUwCnaRrvkAjHY2NEg'
      },
      {
        id: 'thumb-detail-1',
        label: 'COLLAR',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4K6KWZwDK7aI8L2jmpMvIISGzKJoKbhvX5a87AyfCB0jATnpXMQawRn5xfZdFZYBw-th4oZMtr7SShcxDT_nowvsEJ4kazXMa3OZUHSlk-slGbZzFpoCWWj6Ymj40YMZ3BoGNJGXYMmAb5xvEVgmYIXHqgqV-2zHfVHWOUa2EpCQ408fp262TbM65WIyr9CUjI-9TiLSDXifmQ6BWZPUSgCHfjV7Wh1-YdovcQGmpOl4_ugjPDZH7'
      },
      {
        id: 'thumb-detail-2',
        label: 'DUPATTA',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQKdWNA82Qa1eQeQ7v-i_N90Tq3ZQfEnA2QJu8700I8hQJpCt2lTyQSJajq3WVuHmfadPmNnHE5HFucZxEZt7W5sdEc12c0xEpcEZDOOP9BxiHLted0bUUioWrITG-KffPswDixUXRWGeOyXuWz14nXYPLiaa5VjnbiJHqKZGTeYc3AmQscmUF9qw16smgp8F91BLDkvBQH-g9GGX6U4yxkjeAJlD8jNvg_tQEen_G7NO-sa7Ich9y'
      },
      {
        id: 'thumb-detail-3',
        label: 'BACK',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MMq-foZoQjikvK-zOsLmJmjUbqdCc-ope3y6klNHRMwwvnP_nYBBxLN4Q3WD-jPDqk3nwRHkk49RYvbsRlnnnjUaFSV2vc5cJBqbSpogT9BUgys2scpb3CXLK8VLhGaQIuIAsewukxOPWHHchelqkz3dfKe2J4yZsmqQn0Cf6G91PSLNRl-isQjYQ_8pb4SmN5dIR-IKn9LzwTmbQfn825LW8Obl1uGaeyJY7QrF12NGnZ-pGYEO'
      }
    ],
    colors: [
      { name: 'Gulabi Rose', hex: '#C88D7D' },
      { name: 'Ivory Cream', hex: '#E5D7BE' },
      { name: 'Pista Green', hex: '#4A665A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Three-piece rose pink handloom tunic rendered in pure Chanderi silk, framed with micro-zardozi neckwork and paired with relaxed straight palazzos and a diaphanous organza scarf.',
    craftDetails: {
      top: 'Calf-length straight tunic, 3/4 sleeves with scallop gota trim, cotton mulmul lining.',
      bottom: 'Structured wide-leg palazzo with semi-elasticated waist and concealed right pocket.',
      dupatta: '2.5-meter pure organza veil with hand-tasseled edges and gold wire border work.'
    },
    specs: {
      shell: '100% Handloom Chanderi Silk (70% Silk, 30% Fine Cotton)',
      lining: '100% Pure Pre-shrunk Cotton Mulmul for non-sheer comfort',
      bottom: 'Textured Handwoven Chanderi Cotton Blend',
      drape: 'Translucent Gossamer Organza Silk'
    }
  },
  {
    id: 'prod-2',
    slug: 'chandni-ivory-chikankari-anarkali',
    title: 'Chandni Ivory Chikankari Anarkali',
    tagline: 'Hand-embroidered Lucknowi',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Anarkalis',
    fabric: 'Pure Georgette & Chikankari',
    type: 'Full Flare Anarkali',
    price: 5899,
    originalPrice: 7999,
    discountPct: 26,
    rating: 4.8,
    reviewCount: 32,
    badge: 'Artisanal Weave',
    expressDispatch: false,
    artisanId: '#SAG-2025-CHK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwDeaDCpVjzOxJ-anXgE32WcYNTOAVI6Jgh1NytUl2FMgf-jfClqiRQ38iON9HkS5-lGWdlys_doCEl8znvRJvh0QGCPOU2ItsU-14L6KzZXSbRZSf6QwwMGMqMVuUkEud_ypqxcN5rHq2c3ihrfZh-LudFL0VjKm573PzhqQnWkEDlTnwvhtENqzEieb5eJw--iG9PSP4TLMBflS3iPp6NvmNsPq1veAQL7XkrGencuyJZ4kOxylT',
    colors: [
      { name: 'Chandni Ivory', hex: '#F4F1EA' },
      { name: 'Mint Fog', hex: '#D7E3D8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Ethereal ivory Chikankari pure georgette Anarkali suit set with heavy tonal sequin embroidery, flowing silhouette, and matching sheer dupatta with floral border.',
    craftDetails: {
      top: 'Floor-length flared kalidar Anarkali with intricate mukaish and bakhiya hand stitches.',
      bottom: 'Comfortable churidar leggings with elasticated waist.',
      dupatta: 'Fine georgette dupatta with Chikankari scalloped edging.'
    }
  },
  {
    id: 'prod-3',
    slug: 'neelam-royal-velvet-kurti-set',
    title: 'Neelam Royal Velvet Embroidered Kurta Set',
    tagline: 'Silk Velvet with Tilla',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Straight Silks',
    fabric: 'Mulberry Silk Velvet',
    type: 'Straight Fit Set',
    price: 3999,
    originalPrice: 5499,
    discountPct: 27,
    rating: 4.9,
    reviewCount: 29,
    badge: 'Winter Festive',
    expressDispatch: true,
    artisanId: '#SAG-2025-NLM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5YsUtYcGdeJiaAZwLQNVWCcmOUeVjh77NldHRb7kkpPwiM5Ij9M4lr-_4Zam1dl6f5lbcGexWHADGMt0YiABWtN99xdUdaiHV0yAPNMlFtN4qeetTf4HpwgUfmg5DvDOupcOSnQF3Rt1i8eb1ov-hQvxyHXmM7aITFd16BL97lVgUQm6VwMMzNFutuHsicMp7xaKtV31UjJhKDuuP5UQYNWYDO96Jgh9fO46U3_GkGS4VVINE3Nc7',
    colors: [
      { name: 'Neelam Blue', hex: '#182B49' },
      { name: 'Deep Plum', hex: '#39202E' },
      { name: 'Emerald Forest', hex: '#1A3326' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Regal navy midnight blue Neelam royal silk velvet kurta suit set with antique gold tilla zari work along the neckline and cuffs, paired with flared culottes.',
    craftDetails: {
      top: 'Kashmiri tilla hand-embroidered velvet tunic with satin lining.',
      bottom: 'Velvet straight pants with zari hem detailing.',
      dupatta: 'Woven organza dupatta with gold fringe tassels.'
    }
  },
  {
    id: 'prod-4',
    slug: 'kesar-ochre-festive-sharara-set',
    title: 'Kesar Ochre Festive Sharara Set',
    tagline: 'Crinkled Viscose & Gota',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Sharara Sets',
    fabric: 'Crinkled Viscose Georgette',
    type: '3-Piece Sharara',
    price: 4999,
    originalPrice: 6800,
    discountPct: 26,
    rating: 4.7,
    reviewCount: 21,
    badge: 'Haldi Edit',
    expressDispatch: false,
    artisanId: '#SAG-2025-KSR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWY63qcxl4fwmoBO6qmd8DyyQyqK46jdmDceto5OmG-mMFM1irYSsokBV5TC8Cw0iDEAVTz2DRKKrLvTEWibXxGVr3ZOJVfgHq9lO6KWBISDdRuTRGNdy368WSStA2jH1cMI-gNzH0truHH3dn5AlKVNg0IKZ4O3Qw0HShw8LV6gTScf4z0AhjGL21PJOYQT2Se76-EVdmP3dFD2LfB4ctqHHMDOLkLqoWk_Oa4KfGzR75IfhLP7Sh',
    colors: [
      { name: 'Kesar Ochre', hex: '#E5A823' },
      { name: 'Rust Coral', hex: '#DF714B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Warm saffron yellow and kesar mustard georgette sharara set with intricate gota patti border work, multi-tiered flared pants, and matching worked chiffon dupatta.',
    craftDetails: {
      top: 'Short tunic with sweet-heart neckline and heavy gota patti yoke.',
      bottom: 'Two-tiered multi-flared sharara pants with kiran laced borders.',
      dupatta: 'Soft crinkled chiffon dupatta with foil mirror work.'
    }
  },
  {
    id: 'prod-5',
    slug: 'maroon-zardozi-velvet-kurta-set',
    title: 'Maroon Zardozi Velvet Kurta Set',
    tagline: 'Dabka & Zardozi Velvet',
    category: 'festive-collection',
    subCategory: 'Straight Silks',
    fabric: 'Micro-Velvet & Zari',
    type: 'Bespoke Silhouette',
    price: 5499,
    originalPrice: 7500,
    discountPct: 27,
    rating: 4.9,
    reviewCount: 36,
    badge: 'Bridal Trousseau',
    expressDispatch: true,
    artisanId: '#SAG-2025-MRN',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhkC9F4MGI-1Ury4F_mlN6Em4NAtZnXFeb5FtJG6qX9ykJw9bgvfFUMMiEZexfAdo0C2BkMY8ZNIxkFNfRMxgvepe5W6ZQyOJnoZbCIQEBnuQKXO0iuIYD1VQDvosNG3kNfxvhCbrfbf3-4JL0FIN48HNDXcdCfFXz_ALfd7rMV9vaLw3-3XN-PKZInyxj1S0QDNH3gQTAnOtib8o7CgjiHB7UKjHS9duJSY4pqGb5JBpeEJyUA2RC',
    colors: [
      { name: 'Festive Maroon', hex: '#480F16' },
      { name: 'Emerald Night', hex: '#1F2D24' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Opulent deep festive maroon micro-velvet straight kurta set with intricate zardozi golden dabka handwork on collar and sleeve placket.',
    craftDetails: {
      top: 'Straight-cut rich micro-velvet tunic with real metallic dabka wirework.',
      bottom: 'Silk jacquard straight trousers with golden thread cuffs.',
      dupatta: 'Pure Chanderi silk tissue scarf with golden kiran border.'
    }
  },
  {
    id: 'prod-6',
    slug: 'noor-tissue-silk-saree-kurta-set',
    title: 'Noor Tissue Silk Saree & Kurta Set',
    tagline: 'Metallic Tissue Weave',
    category: 'sarees-and-lehengas',
    subCategory: 'Tissue Silks',
    fabric: 'Hand-woven Tissue Silk',
    type: 'Cocktail Luxury',
    price: 7299,
    originalPrice: 9999,
    discountPct: 27,
    rating: 5.0,
    reviewCount: 19,
    badge: 'Heirloom Edit',
    expressDispatch: false,
    artisanId: '#SAG-2025-NOR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyeSKsJAwyG7w7BWcueRbf6BztPKaq6Pc59ft2SYOhYMNcPFwaXqjCaSO1fSIgEdo40QRjQecWTZA6NKrBpejoX-ODh8BDnKJwYNIUC81tHMzW5DkRTBhnkdBPhuQ2lxlq2qNXmdZ0SWHBcgXcVdOWpJof0spL9VSHPPe36jr-NEnUGml7Y5iJ73My5RBkON2sPHy0sv9HjilCyD1skkuiPtgLZ8nstzqfYjxfqTXqworlpQjm548n',
    colors: [
      { name: 'Antique Champagne Gold', hex: '#E5CF98' },
      { name: 'Rose Quartz', hex: '#D4AFB9' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Luminous metallic gold tissue silk drape and tunic set with woven zari borders and scalloped organza dupatta with pearl drops.',
    craftDetails: {
      top: 'Structured tissue silk tunic with pearl neck embellishments.',
      bottom: 'Straight pants with scalloped gold lace.',
      dupatta: 'Scalloped organza dupatta with pearl drop tassels.'
    }
  },
  {
    id: 'prod-7',
    slug: 'zulfiya-chanderi-flute-kurti-set',
    title: 'Zulfiya Chanderi Flute Kurti Set',
    tagline: 'Emerald Kota & Zari',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Anarkalis',
    fabric: 'Chanderi Kota Silk',
    type: 'Kalidar Kurta Set',
    price: 4250,
    originalPrice: 5999,
    discountPct: 29,
    rating: 4.8,
    reviewCount: 15,
    badge: 'Trending',
    expressDispatch: true,
    artisanId: '#SAG-2025-ZLF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOqcdP1xfr0mDkSLaW9CtbOPIVyMZ69GfaFh9Xw50pWJg4JWVHqC-iyCVskqHvuIJgd67tGrYzEEd5tmOcwt4ekNlUUHJyEGpJ3EsUcgl15LpiNPWPTGsImpsWAUjii3Xe0BNe6RFkuhvMeduGVM7yQ8ptzi87Xezb7Yr_HsAlbL8sVFa04f0wBZsyw7LC1kGOfih-OUFPNfDNpsrgi-3GOjgFDx8x4DReOh8b4xhnSfni693wxWtf',
    colors: [
      { name: 'Emerald Forest', hex: '#184834' },
      { name: 'Berry Wine', hex: '#3B1E28' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Emerald green flared silk kurta with gold foil print motifs, matching cigarette trousers, and sheer doria dupatta.',
    craftDetails: {
      top: 'Kalidar tunic with hand-printed zari motifs and V-neck.',
      bottom: 'Slim fitted cigarette trousers.',
      dupatta: 'Kota doria sheer scarf.'
    }
  },
  {
    id: 'prod-8',
    slug: 'mehr-un-nisa-angrakha-suit-set',
    title: 'Mehr-Un-Nisa Angrakha Suit Set',
    tagline: 'Fine Mulmul Cotton',
    category: 'kurtas-and-suit-sets',
    subCategory: 'Anarkalis',
    fabric: 'Organic Mulmul Cotton',
    type: 'Angrakha Silhouette',
    price: 3450,
    originalPrice: 4800,
    discountPct: 28,
    rating: 4.7,
    reviewCount: 42,
    badge: 'Daily Luxe',
    expressDispatch: true,
    artisanId: '#SAG-2025-MHR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-zMRKZOXOt_1poJLYC6BVWk4MbXLrnSNUZODnJE3cdfTMWXKS2dUwGIIRo2FdMTQzvq1eUpZ0BhRyqoaCvqa5Zsjba99tYAaLQUFPgrW5Thh1f00QJFjdq4bD_aSCPPjQxWfLwrINsBum84qPvisGCXoAvjB3esK8LlQqBEWKoUDUeOGh7SAoRARyRGrNMAknt3Y4f-LyvH14-6DnPWH4CM8uQ7SfPjpe3rlAUJKVCuGTtmpV-svx',
    colors: [
      { name: 'Blush Peach', hex: '#E5B5A3' },
      { name: 'Sandstone Ivory', hex: '#E3E0D8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Traditional blush peach Angrakha style pure mulmul kurta set with handmade potli buttons, subtle foil work borders and matching dhoti pants.',
    craftDetails: {
      top: 'Overlapping Angrakha style tunic with handmade potli tassels.',
      bottom: 'Relaxed draped dhoti pants.',
      dupatta: 'Mulmul cotton crushed dupatta.'
    }
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'acc-1',
    title: 'Chandrika Pearl Chaandbalis',
    category: 'Fine Jewellery',
    price: 1499,
    badge: 'Handcrafted',
    description: '22kt gold dipped crescent earrings set with uncut jadau stones and tourmaline drops.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtY1sl-skmPAZCjO3We38-1EUlxzDx-Y9eFKgowrlxIcRehDnvGVsIU9sLGQpDMlgrhOljcOXd-OzX52EVVc5kbayFq4PL041XqhYV8x5GtNz_uPslGnAy1VJyJ4kCX8BLhEkp7usu5hZXN8ZnXUZ302iGSNn_PyAPdy20aiiGxahlYkxIqqDAl6Tq3u7hoIfTMvYwrS6woMwKRafUCEhzehhLfimWUCHeI9oBwY2d00YxP3e6pw2D'
  },
  {
    id: 'acc-2',
    title: 'Noor Zardozi Raw Silk Jutti',
    category: 'Handmade Footwear',
    price: 2199,
    badge: 'Comfort Sole',
    description: 'Padded memory-foam footbed encased in genuine leather with dabka needlework.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQdGw3sXCTWGxj1pi-4KnNl0mcWyosLa_BqWF-peO2quteMgVdmBiT2JsgrBm7IGt6VT2RnjNP1tWIgumhZDSkbnmPHM6oI7MTv8iaGzJ7aUD4OmDSmeug0sr18bMl5tecT_e-d80x6--S82IfTEMnVUOAHkNqL1PiKvAb_oNr1P112L4NFh5t4U1D5oiYzQptZCNSwcM-hepFH-FSb_nAq92PMiprx-oltovOT2EOpAfQOK3EUBHT'
  },
  {
    id: 'acc-3',
    title: 'Kundan Dupatta Safety Pins (Set of 4)',
    category: 'Drape Accessories',
    price: 499,
    badge: 'Essential',
    description: 'Antique gold finished heavy latkan tassels and ornate dupatta drape safety pins.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCjeH6dWG6vzJSnREEQsZNBZy1G-B0W83dyrQyHpfmwfW-bbtLVTWIwq45zHXN3XB7W4QKjNwHbuOogAiaFmACDULJFVhFKq9VSwqKKGatpQgtuP9kkzSDoNLxwlZLI3HhaAGmaiAqE31V0qNcTSy1ejU-xz6jIXCxywDrLPvOoGMi2wSlRUEcwcuRwKrbb9bLXoPLuLjYHRSnFAkW6dT7XT5ALnoGUcX52UhoyeiSthCuTZTpjVOI'
  },
  {
    id: 'acc-4',
    title: 'Moti Organza Festivity Potli',
    category: 'Bespoke Potli',
    price: 1299,
    badge: 'Festive Pick',
    description: 'Gathered silk pouch framed with handcrafted metallic latkan tassels and wrist loop.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTtVa2Gly8Oq8KLiE7IKR3cpZPg-hCtOeHwmmrDoys1QwJ4gW1ZYq7B1hZEfNqjdiDt8RrR0brHefeUY55wT6XHD83NL4Wd1P2pLPyN9D9ouWFhGjqzgGqqB4fxLKX74RHJ55r1za7sHF6SYXrB1ub93bs5DcS2RqA1h6JEvhhSaMDYhv5_sZbRqVGbTERo91U-mTTnNHrrxG6ZPhbWSCLQFDbzsA8Xq6YQqGcEbaEWSTL6IFj2nK6'
  }
];
