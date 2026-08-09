const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. src/app/shop/page.tsx
replaceInFile('src/app/shop/page.tsx', [
  [
    `import { allProducts } from '@/data/home';`,
    `import { getAllProducts, getShopContent, WooProduct } from '@/services/api';\n\nconst shopContent = getShopContent();\nconst productsList = getAllProducts();`
  ],
  [
    `type Product = typeof allProducts.products[number];`,
    `type Product = WooProduct;`
  ],
  [
    `const RITUAL_FILTERS = allProducts.filterCategories;`,
    `const RITUAL_FILTERS = shopContent.filterCategories;`
  ],
  [
    `const PET_FILTERS = allProducts.filterPets;`,
    `const PET_FILTERS = shopContent.filterPets;`
  ],
  [
    `const TYPE_FILTERS = allProducts.filterTypes;`,
    `const TYPE_FILTERS = shopContent.filterTypes;`
  ],
  [
    `const baseFiltered = allProducts.products.filter((p) => {`,
    `const baseFiltered = productsList.filter((p) => {`
  ],
  [ `{allProducts.eyebrow}`, `{shopContent.eyebrow}` ],
  [ `{allProducts.heading}`, `{shopContent.heading}` ],
  [ `{allProducts.subheading}`, `{shopContent.subheading}` ]
]);

// 2. src/app/products/[id]/page.tsx
// It uses `allProducts.products.find`
replaceInFile('src/app/products/[id]/page.tsx', [
  [
    `import { allProducts } from '@/data/home';`,
    `import { getProductById, getAllProducts, WooProduct } from '@/services/api';`
  ],
  [
    `const product = allProducts.products.find((p) => p.id === id);`,
    `const product = getProductById(id);`
  ],
  [
    `export function generateStaticParams() {
  return allProducts.products.map((p) => ({`,
    `export function generateStaticParams() {
  return getAllProducts().map((p) => ({`
  ]
]);

// 3. src/app/about/page.tsx
// We will look at what it imports from '@/data/home'
// Usually it imports `brandStory`, `ingredientStories`, etc. Let's not assume, we'll check later.
