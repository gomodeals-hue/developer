const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/components/layout/Navbar/NavMain.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const isCRLF = content.includes('\r\n');
let normalized = content.replace(/\r\n/g, '\n');

// 1. Add import LanguageSelector
if (!normalized.includes('import LanguageSelector')) {
  normalized = normalized.replace(
    'import AllDepartmentsDrawer from "./AllDepartmentsDrawer";',
    'import AllDepartmentsDrawer from "./AllDepartmentsDrawer";\nimport LanguageSelector from "./LanguageSelector";'
  );
  console.log("Added import LanguageSelector");
}

// 2. Wrap search bar with LanguageSelector aside it
const oldSearchBlock = `          {/* 2. Center: Amazon-Style Integrated Search Bar (Desktop) */}
          <div
            ref={searchRef}
            className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl relative mx-2"
          >`;

const newSearchBlock = `          {/* 2. Center: Search Bar with Language Selector Aside (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl relative mx-2 gap-2">
            <div
              ref={searchRef}
              className="flex-1 relative"
            >`;

if (normalized.includes(oldSearchBlock)) {
  normalized = normalized.replace(oldSearchBlock, newSearchBlock);
  console.log("Replaced start of search bar");
} else {
  console.warn("Could not find oldSearchBlock directly, checking regex");
  normalized = normalized.replace(
    /\{\/\* 2\. Center: Amazon-Style Integrated Search Bar \(Desktop\) \*\/\}\n\s*<div\n\s*ref=\{searchRef\}\n\s*className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl relative mx-2"\n\s*>/,
    newSearchBlock
  );
}

// Close the inner searchRef div and place LanguageSelector
const oldSearchEnd = `              )}
            </AnimatePresence>
          </div>

          {/* 3. Right: Essential E-Commerce Actions */}`;

const newSearchEnd = `              )}
            </AnimatePresence>
            </div>

            {/* Language Selector Aside Search Bar */}
            <LanguageSelector isTransparent={isTransparent} />
          </div>

          {/* 3. Right: Essential E-Commerce Actions */}`;

if (normalized.includes(oldSearchEnd)) {
  normalized = normalized.replace(oldSearchEnd, newSearchEnd);
  console.log("Replaced end of search bar with LanguageSelector");
} else {
  console.warn("Could not find oldSearchEnd directly, checking regex");
  normalized = normalized.replace(
    /\s*\)\}\n\s*<\/AnimatePresence>\n\s*<\/div>\n\n\s*\{\/\* 3\. Right: Essential E-Commerce Actions \*\/\}/,
    newSearchEnd
  );
}

// 3. Search placeholder and button text
normalized = normalized.replace(
  'placeholder="Search products, brands, deals & essentials..."',
  'placeholder={t("search_placeholder_full", "Search products, brands, deals & essentials...")}'
);

normalized = normalized.replace(
  '<span className="hidden lg:inline">Search</span>',
  '<span className="hidden lg:inline">{t("search", "Search")}</span>'
);

// 4. Mobile search row with LanguageSelector
const oldMobileSearch = `            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-stone-50 border border-stone-200 focus-within:border-orange-500 focus-within:bg-white rounded-full px-3.5 py-1.5 gap-2 transition-all duration-120 shadow-2xs"
            >
              <Search size={15} className="text-orange-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, essentials..."
                className="bg-transparent text-xs text-stone-900 placeholder-stone-400 w-full focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-stone-400 hover:text-stone-600 active:scale-90"
                >
                  <X size={13} />
                </button>
              )}
              <button
                type="submit"
                className="px-3.5 py-1 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-95 text-white text-[11px] font-bold uppercase rounded-full tracking-wider shadow-xs cursor-pointer shrink-0 transition-all duration-100"
              >
                Search
              </button>
            </form>`;

const newMobileSearch = `            <div className="flex items-center gap-2">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center flex-1 bg-stone-50 border border-stone-200 focus-within:border-orange-500 focus-within:bg-white rounded-full px-3.5 py-1.5 gap-2 transition-all duration-120 shadow-2xs"
              >
                <Search size={15} className="text-orange-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_placeholder_full", "Search products, brands, essentials...")}
                  className="bg-transparent text-xs text-stone-900 placeholder-stone-400 w-full focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-stone-400 hover:text-stone-600 active:scale-90"
                  >
                    <X size={13} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3.5 py-1 bg-[#f76e28] hover:bg-[#de5713] active:bg-[#c44908] active:scale-95 text-white text-[11px] font-bold uppercase rounded-full tracking-wider shadow-xs cursor-pointer shrink-0 transition-all duration-100"
                >
                  {t("search", "Search")}
                </button>
              </form>
              <LanguageSelector isMobile={true} />
            </div>`;

if (normalized.includes(oldMobileSearch)) {
  normalized = normalized.replace(oldMobileSearch, newMobileSearch);
  console.log("Updated mobile search with LanguageSelector");
}

// 5. Replace other texts: Deliver to, Popular Searches, Returns & Orders, Cart
normalized = normalized.replace(
  '<span\n                    className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? "text-white/70" : "text-stone-400"}`}\n                  >\n                    Deliver to\n                  </span>',
  '<span\n                    className={`text-[9px] uppercase tracking-wider font-extrabold ${isTransparent ? "text-white/70" : "text-stone-400"}`}\n                  >\n                    {t("deliver_to", "Deliver to")}\n                  </span>'
);

normalized = normalized.replace(
  'Select Delivery Region',
  '{t("select_delivery_region", "Select Delivery Region")}'
);

normalized = normalized.replace(
  '<span>Popular Searches</span>',
  '<span>{t("popular_searches", "Popular Searches")}</span>'
);

normalized = normalized.replace(
  '<span>View all results in {activeCategoryMatch.categoryLabel} &rarr;</span>',
  '<span>{t("view_all_results_in", { category: activeCategoryMatch.categoryLabel })}</span>'
);

normalized = normalized.replace(
  '<span>View all search results &rarr;</span>',
  '<span>{t("view_all_search_results", "View all search results →")}</span>'
);

// Returns & Orders
normalized = normalized.replace(
  `                <span
                  className={\`text-[9px] uppercase tracking-wider font-extrabold \${isTransparent ? "text-white/70" : "text-stone-400"}\`}
                >
                  Returns
                </span>
                <span
                  className={\`text-xs font-bold group-hover:text-orange-500 transition-colors \${isTransparent ? "text-white" : "text-stone-800"}\`}
                >
                  &amp; Orders
                </span>`,
  `                <span
                  className={\`text-[9px] uppercase tracking-wider font-extrabold \${isTransparent ? "text-white/70" : "text-stone-400"}\`}
                >
                  {t("returns_orders", "Returns")}
                </span>
                <span
                  className={\`text-xs font-bold group-hover:text-orange-500 transition-colors \${isTransparent ? "text-white" : "text-stone-800"}\`}
                >
                  {t("orders_and_returns", "& Orders")}
                </span>`
);

// Cart label
normalized = normalized.replace(
  `<span
                className={\`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors \${isTransparent ? "text-white" : "text-orange-950 group-hover:text-white"}\`}
              >
                Cart
              </span>`,
  `<span
                className={\`hidden sm:inline text-xs font-bold uppercase tracking-wider transition-colors \${isTransparent ? "text-white" : "text-orange-950 group-hover:text-white"}\`}
              >
                {t("shopping_cart", "Cart")}
              </span>`
);

// Secondary bar: "All" button
normalized = normalized.replace(
  '<span className="transition-colors duration-150">All</span>',
  '<span className="transition-colors duration-150">{t("all_departments_btn", "All")}</span>'
);

// Secondary bar: department labels
normalized = normalized.replace(
  '<span>{dept.label}</span>',
  '<span>{t(dept.key.replace(/-/g, "_"), dept.label)}</span>'
);

// Account menu text
normalized = normalized.replace(
  '<span>Sign Out</span>',
  '<span>{t("sign_out", "Sign Out")}</span>'
);

normalized = normalized.replace(
  '<span>Become a Seller / Seller Hub</span>',
  '<span>{t("become_seller", "Become a Seller / Seller Hub")}</span>'
);

normalized = normalized.replace(
  '<span>My Profile & Address</span>',
  '<span>{t("my_profile_address", "My Profile & Address")}</span>'
);

normalized = normalized.replace(
  '<span>Orders & Returns</span>',
  '<span>{t("orders_returns", "Orders & Returns")}</span>'
);

normalized = normalized.replace(
  '<span>GoMo VIP Membership</span>',
  '<span>{t("vip_membership", "GoMo VIP Membership")}</span>'
);

normalized = normalized.replace(
  '<span>24x7 Customer Care</span>',
  '<span>{t("customer_care_247", "24x7 Customer Care")}</span>'
);

normalized = normalized.replace(
  '<span>Orders & Tracking</span>',
  '<span>{t("orders_tracking", "Orders & Tracking")}</span>'
);

normalized = normalized.replace(
  '<span>GoMo VIP Club</span>',
  '<span>{t("vip_club", "GoMo VIP Club")}</span>'
);

normalized = normalized.replace(
  '<span>Seller Hub (Vendor Portal)</span>',
  '<span>{t("seller_hub_vendor", "Seller Hub (Vendor Portal)")}</span>'
);

normalized = normalized.replace(
  '<span>Notification Center</span>',
  '<span>{t("notification_center", "Notification Center")}</span>'
);

normalized = normalized.replace(
  'Mark all read',
  '{t("mark_all_read", "Mark all read")}'
);

// Restore CRLF if needed
const finalOutput = isCRLF ? normalized.replace(/\n/g, '\r\n') : normalized;
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log("Successfully updated NavMain.jsx!");
