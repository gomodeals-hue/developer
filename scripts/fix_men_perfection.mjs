import fs from 'fs';

// Accurate image map for all 68 Men products
const MEN_PERFECT_IMAGES = {
  // Shirts
  'gmd-men-shirts-1': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
  'gmd-men-shirts-2': 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80',
  'gmd-men-shirts-3': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
  'gmd-men-shirts-4': 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',

  // T-shirts
  'gmd-men-tshirts-1': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  'gmd-men-tshirts-2': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
  'gmd-men-tshirts-3': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80',
  'gmd-men-tshirts-4': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',

  // Jeans
  'gmd-men-jeans-1': 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
  'gmd-men-jeans-2': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
  'gmd-men-jeans-3': 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80',
  'gmd-men-jeans-4': 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',

  // Trousers
  'gmd-men-trousers-1': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  'gmd-men-trousers-2': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
  'gmd-men-trousers-3': 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&q=80',
  'gmd-men-trousers-4': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',

  // Trackpants
  'gmd-men-trackpants-1': 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
  'gmd-men-trackpants-2': 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
  'gmd-men-trackpants-3': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
  'gmd-men-trackpants-4': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',

  // Jackets
  'gmd-men-jackets-1': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
  'gmd-men-jackets-2': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
  'gmd-men-jackets-3': 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80',
  'gmd-men-jackets-4': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80',

  // Ethnic Kurtas
  'gmd-eth-men-kurtas-1': 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
  'gmd-eth-men-kurtas-2': 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&q=80',
  'gmd-eth-men-kurtas-3': 'https://images.unsplash.com/photo-1621335829175-95f437344321?w=800&q=80',
  'gmd-eth-men-kurtas-4': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',

  // Ethnic Nehru Jackets
  'gmd-eth-men-jackets-1': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
  'gmd-eth-men-jackets-2': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
  'gmd-eth-men-jackets-3': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
  'gmd-eth-men-jackets-4': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',

  // Ethnic Sherwanis
  'gmd-eth-men-sherwani-1': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80',
  'gmd-eth-men-sherwani-2': 'https://images.unsplash.com/photo-1590076241940-02a8b29e64e5?w=800&q=80',
  'gmd-eth-men-sherwani-3': 'https://images.unsplash.com/photo-1610030469668-932d0b674488?w=800&q=80',
  'gmd-eth-men-sherwani-4': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',

  // Footwear - Sneakers
  'gmd-men-footwear-snk-1': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'gmd-men-footwear-snk-2': 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
  'gmd-men-footwear-snk-3': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
  'gmd-men-footwear-snk-4': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',

  // Footwear - Casual
  'gmd-men-footwear-cas-1': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
  'gmd-men-footwear-cas-2': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
  'gmd-men-footwear-cas-3': 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80',
  'gmd-men-footwear-cas-4': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',

  // Footwear - Formal
  'gmd-men-footwear-form-1': 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
  'gmd-men-footwear-form-2': 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=80',
  'gmd-men-footwear-form-3': 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
  'gmd-men-footwear-form-4': 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',

  // Footwear - Sandals
  'gmd-men-footwear-san-1': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
  'gmd-men-footwear-san-2': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
  'gmd-men-footwear-san-3': 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80',
  'gmd-men-footwear-san-4': 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80',

  // Accessories - Watches
  'gmd-acc-watches-men-1': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
  'gmd-acc-watches-men-2': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
  'gmd-acc-watches-men-3': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  'gmd-acc-watches-men-4': 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80',

  // Accessories - Sunglasses
  'gmd-acc-sunglasses-men-1': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
  'gmd-acc-sunglasses-men-2': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
  'gmd-acc-sunglasses-men-3': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80',
  'gmd-acc-sunglasses-men-4': 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80',

  // Accessories - Wallets
  'gmd-acc-wallets-men-1': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  'gmd-acc-wallets-men-2': 'https://images.unsplash.com/photo-1606503825008-909a67e63c22?w=800&q=80',
  'gmd-acc-wallets-men-3': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
  'gmd-acc-wallets-men-4': 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&q=80',

  // Accessories - Backpacks
  'gmd-acc-backpacks-1': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  'gmd-acc-backpacks-2': 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80',
  'gmd-acc-backpacks-3': 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&q=80',
  'gmd-acc-backpacks-4': 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&q=80'
};

async function updateMen() {
  const targetFiles = [
    './catalog/men_clothing.mjs',
    './catalog/ethnic_wear.mjs',
    './catalog/footwear.mjs',
    './catalog/accessories_and_beauty.mjs'
  ];

  for (const filePath of targetFiles) {
    const mod = await import(filePath);
    const varName = Object.keys(mod)[0];
    const items = mod[varName];

    let count = 0;
    items.forEach(it => {
      if (MEN_PERFECT_IMAGES[it.id]) {
        it.thumbnail = MEN_PERFECT_IMAGES[it.id];
        it.pi_images = [{ image_url: MEN_PERFECT_IMAGES[it.id].replace('w=800', 'w=1000') }];
        count++;
      }
    });

    const out = 'export const ' + varName + ' = ' + JSON.stringify(items, null, 2) + ';\n';
    const writePath = filePath.replace('./catalog/', './scripts/catalog/');
    fs.writeFileSync(writePath, out, 'utf8');
    console.log(`Updated ${count} items in ${writePath}`);
  }
}

updateMen();
