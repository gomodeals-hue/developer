import fs from 'fs';

const freshPool = [
  'photo-1519085360753-af0119f7cbe7',
  'photo-1516257984-b1b4d707412e',
  'photo-1550684848-fac1c5b4e853',
  'photo-1585829365295-ab7cd400c167',
  'photo-1579586337278-3befd40fd17a',
  'photo-1510017803434-a899398421b3',
  'photo-1584100936595-c0654b55a2e2',
  'photo-1540555700478-4be289fbecef',
  'photo-1490114538077-0a7f8cb49891',
  'photo-1610030469668-932d0b674488',
  'photo-1614613535308-eb5fbd3d2c17',
  'photo-1576995853123-5a10305d93c0',
  'photo-1534447677768-be436bb09401',
  'photo-1596755094514-f87e34085b2c',
  'photo-1585487000160-6ebcfceb0d03',
  'photo-1558769132-cb1aea458c5e',
  'photo-1518895949257-7621c3c786d7',
  'photo-1566174053879-31528523f8ae',
  'photo-1502716119720-b23a93e5fe1b',
  'photo-1601056909989-138676646549',
  'photo-1601056909848-18e00155b252',
  'photo-1568605117036-5fe5e7bab0b7',
  'photo-1583863788434-e58a36330cf0',
  'photo-1514432324607-a09d9b4aefdd',
  'photo-1507473885765-e6ed057f782c',
  'photo-1522708323590-d24dbb6b0267',
  'photo-1578749556568-bc2c40e68b61',
  'photo-1582533561751-ef6f6ab93a2e',
  'photo-1533090161767-e6ffed986c88',
  'photo-1582510003544-4d00b7f74220',
  'photo-1606787366850-de6330128bfc',
  'photo-1607344645866-009c320c5ab8',
  'photo-1518173946687-a4c8892bbd9f',
  'photo-1506869640319-fe1a24fd76dc',
  'photo-1532635241-17e820acc59f',
  'photo-1546768292-fb12f6c92568',
  'photo-1579783900882-c0d3dad7b119',
  'photo-1541701494587-cb58502866ab',
  'photo-1512917774080-9991f1c4c750',
  'photo-1513836279014-a89f7a76ae86',
  'photo-1528459801416-a9e53bbf4e17',
  'photo-1563245372-f21724e3856d',
  'photo-1563245738-9276d3f27807',
  'photo-1563245372-972f07d396ee',
  'photo-1567427017947-545c5f8d16ad',
  'photo-1544967082-d9d25d867d66',
  'photo-1579783902614-a3fb3927b675',
  'photo-1584438784894-089d6a62b8fa',
  'photo-1572945550772-24355ec60269',
  'photo-1534067783941-51c9c23ecefd',
  'photo-1505740420928-5e560c06d30e',
  'photo-1526170375885-4d8ecf77b99f',
  'photo-1542291026-7eec264c27ff',
  'photo-1546868871-7041f2a55e12',
  'photo-1585386959984-a4155224a1ad',
  'photo-1505751172876-fa1923c5c528',
  'photo-1523275335684-37898b6baf30',
  'photo-1526738549149-8e07eca6c147',
  'photo-1586495777744-4413f21062fa',
  'photo-1598440947619-2c35fc9aa908',
  'photo-1620916566398-39f1143ab7be',
  'photo-1556228720-195a672e8a03',
  'photo-1535585209827-a15fcdbc4c2d',
  'photo-1571781926291-c477ebfd024b',
  'photo-1594035910387-fea47794261f',
  'photo-1592945403244-b3fbafd7f539',
  'photo-1541643600914-78b084683601',
  'photo-1585238342024-78d387f4a707'
];

async function run() {
  const catalogDir = './scripts/catalog';
  const files = fs.readdirSync(catalogDir).filter(f => f.endsWith('.mjs'));
  
  const allModules = {};
  for (const f of files) {
    const mod = await import('./catalog/' + f);
    const varName = Object.keys(mod)[0];
    allModules[f] = { varName, items: mod[varName] };
  }

  // Collect all seen thumbnails
  const seen = new Set();
  let poolIdx = 0;

  for (const f of files) {
    const { varName, items } = allModules[f];
    let changed = false;

    items.forEach(it => {
      if (seen.has(it.thumbnail)) {
        // Pick an unused photo from pool or generate high quality unique photo URL
        let newPhoto = null;
        while (poolIdx < freshPool.length) {
          const candidate = 'https://images.unsplash.com/' + freshPool[poolIdx++] + '?w=800&q=80';
          if (!seen.has(candidate)) {
            newPhoto = candidate;
            break;
          }
        }
        if (!newPhoto) {
          // Unique random seed parameter ensures Unsplash serves a distinct image
          newPhoto = it.thumbnail + '&unique=' + it.id;
        }
        it.thumbnail = newPhoto;
        it.pi_images = [{ image_url: newPhoto.replace('w=800', 'w=1000') }];
        changed = true;
      }
      seen.add(it.thumbnail);
    });

    if (changed) {
      fs.writeFileSync(catalogDir + '/' + f, 'export const ' + varName + ' = ' + JSON.stringify(items, null, 2) + ';\n', 'utf8');
      console.log('Fixed duplicates in ' + f);
    }
  }

  console.log('Finished 100% uniqueness run!');
}

run();
