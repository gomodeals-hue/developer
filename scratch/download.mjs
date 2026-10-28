import fs from 'fs';
import path from 'path';

const groups = {
  'kids_boys_ethnic': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-8Kt8yhHB9M37UEakUCtdy9_ArDM2egjkBcFn-MRAQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNTaXdv9kGsxelkW3mgwpY2kISaxvTKFZAyLjHufk4w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYN9NAdW7KuXR1UwwL3pHGrgYdfVpqaKwLqH3W4mr9A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd7S7hp7U04WbQj6varQOE6HBZHTZR6cP3yIGytb8_2A&s=10'
  ],
  'staples_and_cooking': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ZMgGh-4dUj9bc7gPDDBJkEBZ4H8ZYPqUW_dl3Yciow&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN0aELD9zjhdg1mCTVEID1FeC_3Lw_UmA7RV99CDiAHw&s=10'
  ],
  'snacks_and_breakfast': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQ2QZT2sdl5wsxTYENWiubKuCmcCp6u_N7iVB13A3aA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU9VrbHpwsbr9uQDBhza52zpDMRr_uxM1rG9-8L7QKtg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcveXP8zUMGJG8GRcurQsMoSlXu3Z0b9vjxdlG6-3dw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI5sPsna0JzaWapaMETqDXv5xm2uV3MlIENy16GIUSYg&s'
  ],
  'beverages_and_dairy': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBVwNP7tNgw7ylNCd6JAoTpn3GwdJwyKcwQx0Fbw_3WA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaujHIHuO4nq0tjV79GGxrbaMQ1q18gktNm3-8JijCZQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw1XDxVpFh_VCnEMI4a7gerr89U0E9DR7iYGcsNhBTqw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYM_dkA67QmYs9Y0iIsPlC0YhiGJ1z4Qpt-yuRW-58oQ&s=10'
  ],
  'instant_and_frozen': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_Qxa8Um_H9C3GQz_M8KuMG2WXUqQUOhcHZ-KjPmIHA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbqWdrj6NOOUb8IMXBLxGJLxoU23F0Ior6-UW285yrw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbZD-WTEm_v5D21H0gIPlAz5mlaU2pQrHd_3B5jhfYA&s=10'
  ],
  'staples_grains': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2TDhydCWLy4ngi6hplLkEzQuzo8o5slFYMytVERR_A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlgRTOWLy8yYAmZ2xh-wgazubBdHZ_pxJ1zuupsvGLXA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gEB4Jburr7ZFvviYofZFYY9tXGZ0XMhqVuSHpmlWGg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jH2_lzYFEbelo4gpKfy1C7y9N4uJMjVCTxragx_q_g&s'
  ],
  'dals_pulses': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qSPXl84YWRpM6hHJ-YHimn4FXGduOfuyx78lG4R8EA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyoTiRpS4XCdvpVhf2rx78IX8Xs_JjpCCz9wcFHrtSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SIdzu0JU92OKqvEKsn1J_bNnNGcwxVFx2VBYPcYItA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas3yqjTDvdgmxXMp17hpi9vJiYlJ6y5CM5DeZBCP-Aw&s=10'
  ],
  'edible_oils_ghee': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0EuwPPYth-adrUWatv0uFX0hLR_hTF9QDKXtVv4IFg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnEXLYwdi2SZNAI1xLBaIahj3DY1RWLdvrKp9htnTAfg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSd_brYhwzCRc4rlk6xvZhm7TrGD_A6tf2ikP9G6f_sg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CpLOfybS9swQIhXinrsfhKcCt0Wk85qc9vpUVUlBfA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y5v0GJtmJANl2X22FJk-gU0BDwv0TTtVdm5amw9p5g&s=10'
  ],
  'spices_masalas': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhC_hvaocnTlrRPaTcHoB01CrDYgkWhp1nCF-8VQI3Q&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtiOwsrH0gsyVKWvXTfayx2KXlkBhPA951JFvr5DDig&s=10'
  ],
  'salt_sugar_jaggery': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglUr_1if_0cKtu1PFdMCdbSMBjdvsfKayIDP5iZwZiA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2oT3omhhd5Rh2Gjr93r4GpOmlJN9CrjoeUIuGrFR5g&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo6BirO12__BwtsmBRrR3zl8Iv1lxXSdsrqxOyGVmDcA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_XcYQDiQU8hhHGBKA0FqkrI4gjUDqTmeI0kgeW8IAzQ&s=10'
  ],
  'dry_fruits_nuts': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARMtXO-K30qixv2xKPizw8_p_jli3YXb2gNtlHpV-wQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2AGit2IKXLPprFPzkrndgPz_O9pLRS5IA7eH8uJXlg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhZupYaf66Qq6OOnZOXn33BmKHfHBzeChC_yGVMI9Vw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUZZe-uxEpR59-cVZb7qOwvvRjRZgLsqceT0lXkbhFA&s'
  ],
  'breakfast_cereals': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RJp7ImK_x5zPFOqpMDb8YJ_m7QUVVX1XIeQ-WCwRew&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb_Ku_IU2j3V2TtVvQCAp543MZTwuadwrmxlJlLq62oA&s=10'
  ],
  'biscuits_cookies': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjNcXQoMVbjwRXQQmjReVdesk33HNaqzW2DYQFE8_2Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDNGiaWH17_1nDENmztmZN4JhDltiTOxcKp-4VUurwdA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgk-uvyT15qbJMSzGYTTvWv3Tz05CBHC58yiVL74vkQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXJA8mWtOpNBILKeql57s9gJFdkm6k_DgQJYm6ABDwA&s=10'
  ],
  'snacks_namkeen': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe6JCnc0n0snVLg3mxCaqgaUY_exbWuLwU0hhFdOjCDw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmP8CfzqDo0qdEeyfhkZQnzoDHQvQuzNIUa8PmfnSrFg&s=10'
  ],
  'bakery_products': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqRowV1pXt4dq5C0f02FVnMgE1IHBVqoG01W1A8kxdQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIDNDTImd2rxVHJLJh195Is-eQyjRuXm3cOyqAsZlFMQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WMbFoP4tso-pbrFpTjAMCZfs4NihXLXXe80LA1qFdA&s=10'
  ],
  'beverages_juices': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-CcH0jwSMT-ig0JI098Q4ugPEure59MisXlHyBVPQg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmM1RRfBqBBNEoFMAVrqEqMrz9FAy4xlYzi1ULNjr-A&s=10'
  ],
  'dairy_eggs': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpe26bFKtBAwD_MAP8OdDqJ4g9w_HRmHe-qZ_LUfVtA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8v_9wzITb8Ni545KsbdyKpxZcnsj_mNsbYfzlntDaQ&s=10'
  ],
  'fresh_fruits': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwthx6TizewijR0PNAR87StwR29ZzNJfgmVmDbPjy1pg&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkQFBLVW6NdjnCinVsY_f5s5Twq2Agu0qz3YjMqOurA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4MHAD7YBbrseoDzJO8fxya363K2eahuYLribKvxCCw&s=10'
  ],
  'fresh_vegetables': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18SWZuqAq82SrSWBlolQzjFq5NHTExoaMkwk4tiTu1g&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYUSjEiS1NGLK11lrIHweN7zbn-iEF8pmS20AJ8YDiQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbfbQt7FrqeoKlO1GjPqIMRzcXiJ7Tue9KDz-iLpaqw&s=10'
  ],
  'instant_ready_to_eat': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqTV8G1187FEghCQhYmrpErcDHZFcEYgrM-wKeCWUYWA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1a78z_wF8M9RvtV38cTetxL5xIytkS8LYwaYaDwwDA&s'
  ],
  'sauces_spreads': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmx9mfiHcfaGtiyNeviOVtLr-5mc8NQyU8B5M2Kw2ozg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5Ga7VhL4-vuLg0UVVLAKRuQBNtueUDbZrVwLl9JeeQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCO5OhXSnqtsNUajpl6x5Y0H5aYk5xTNoCgCl1TOnpCQ&s=10'
  ],
  'frozen_foods': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFA19Q__v44ov-PQjDXIMZ0pIHpiaXipxHZZvs2douQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZzlDOojIesGa40O2DRJYbtsLgc8ps3REccsGIfqmGQ&s=10'
  ],
  'meat_seafood': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMrJAYb49_avW4XhqLw1k3BWYBnYvB2LFay5mzJC76RA&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQkdOpj0oN3KkAen48vWPTYrwVOS5USHejNkR3GW35w&s'
  ],
  'baby_food': [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRETXhCZtecRtI07wV6MihAS23Xp0g4d9KhsFZOLedLMw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeDjGgq3k5SmJ3pjmjZL3sjXh5A40iBhf4t72kvQDXg&s=10'
  ]
};

const outDir = path.resolve('scratch/downloaded_images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  let total = 0;
  for (const [group, urls] of Object.entries(groups)) {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        const fname = `${group}_${i + 1}.jpg`;
        fs.writeFileSync(path.join(outDir, fname), Buffer.from(buf));
        total++;
      } catch (err) {
        console.error(`Failed ${group} ${i}:`, err.message);
      }
    }
  }
  console.log(`Saved ${total} images to scratch/downloaded_images`);
}

run();
