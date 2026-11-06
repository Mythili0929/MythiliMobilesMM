/* ============================================================
   MythiliMobiles — Data Layer
   Brands + Product Catalog (demo data, Indian pricing in ₹)
   ============================================================ */

const BRANDS = [
  { id: "apple",    name: "Apple",       tagline: "Think Different",           color: "#8e8e93", finish: "linear-gradient(145deg,#e8e8ea,#b9b9be)" },
  { id: "samsung",  name: "Samsung",     tagline: "Do What You Can't",         color: "#1428a0", finish: "linear-gradient(145deg,#1428a0,#0a1657)" },
  { id: "oneplus",  name: "OnePlus",     tagline: "Never Settle",              color: "#eb0029", finish: "linear-gradient(145deg,#2b2b2b,#0a0a0a)" },
  { id: "xiaomi",   name: "Xiaomi",      tagline: "Innovation For Everyone",   color: "#ff6900", finish: "linear-gradient(145deg,#ff8a3d,#ff6900)" },
  { id: "redmi",    name: "Redmi",       tagline: "Designed For Fans",         color: "#e02020", finish: "linear-gradient(145deg,#f2f2f2,#cfcfcf)" },
  { id: "realme",   name: "Realme",      tagline: "Dare To Leap",              color: "#ffce00", finish: "linear-gradient(145deg,#ffe27a,#ffce00)" },
  { id: "vivo",     name: "Vivo",        tagline: "Camera. Design. Trend.",    color: "#4b7bec", finish: "linear-gradient(145deg,#89b4ff,#3a5ecb)" },
  { id: "oppo",     name: "Oppo",        tagline: "Inspiration Ahead",         color: "#1ba784", finish: "linear-gradient(145deg,#38c9a3,#0f7d63)" },
  { id: "motorola", name: "Motorola",    tagline: "Hello Moto",                color: "#5b2a86", finish: "linear-gradient(145deg,#7a45ad,#3c1a5c)" },
  { id: "pixel",    name: "Google Pixel",tagline: "Ambient Computing",         color: "#4285f4", finish: "linear-gradient(145deg,#8ab4f8,#4285f4)" },
  { id: "nothing",  name: "Nothing",     tagline: "Feel The Future",           color: "#000000", finish: "linear-gradient(145deg,#3a3a3a,#000000)" },
  { id: "iqoo",     name: "iQOO",        tagline: "Monster Inside",            color: "#111111", finish: "linear-gradient(145deg,#2f2f2f,#050505)" },
  { id: "poco",     name: "Poco",        tagline: "Everything You Need",       color: "#ffd11a",  finish: "linear-gradient(145deg,#fff1a8,#ffd11a)" },
  { id: "honor",    name: "Honor",       tagline: "Stand Out",                 color: "#2a6df4",  finish: "linear-gradient(145deg,#6f9dff,#2a6df4)" },
  { id: "nokia",    name: "Nokia",       tagline: "Connecting People",         color: "#124191",  finish: "linear-gradient(145deg,#3a63b8,#0c2c66)" },
];

/* helper to build a product record */
function P(o){ return Object.assign({
  colors: ["Midnight Black","Ocean Blue"],
  ram: [6,8],
  storage: [128,256],
  fiveG: true,
  fastCharging: true,
  amoled: true,
  highRefresh: true,
  dualSim: true,
  nfc: true,
  rating: 4.3,
  reviews: 128,
  stock: 24,
  featured: false,
  isNew: false,
  preBooking: false,
}, o); }

const PRODUCTS = [
  // ---------------- APPLE ----------------
  P({ id:"apl-iphone-15", brand:"apple", model:"iPhone 15", short:"6.1\" Super Retina XDR, A16 Bionic, 48MP camera",
      mrp:79900, price:71900, ram:[6], storage:[128,256,512], colors:["Black","Blue","Pink","Yellow"],
      processor:"A16 Bionic", display:"6.1\" OLED, 60Hz", camera:"48MP + 12MP Ultra Wide", battery:"3349 mAh",
      os:"iOS 17", warranty:"1 Year Apple India Warranty", featured:true, highRefresh:false, rating:4.6, reviews:842 }),
  P({ id:"apl-iphone-15-pro", brand:"apple", model:"iPhone 15 Pro", short:"Titanium design, A17 Pro chip, Pro camera system",
      mrp:134900, price:126900, ram:[8], storage:[128,256,512,1024], colors:["Natural Titanium","Blue Titanium","White Titanium"],
      processor:"A17 Pro", display:"6.1\" Super Retina XDR, 120Hz ProMotion", camera:"48MP + 12MP + 12MP Telephoto",
      battery:"3274 mAh", os:"iOS 17", warranty:"1 Year Apple India Warranty", featured:true, isNew:true, rating:4.8, reviews:511 }),
  P({ id:"apl-iphone-14", brand:"apple", model:"iPhone 14", short:"Reliable all-rounder with A15 Bionic",
      mrp:69900, price:59900, ram:[6], storage:[128,256], colors:["Midnight","Starlight","Red"],
      processor:"A15 Bionic", display:"6.1\" OLED, 60Hz", camera:"12MP Dual", battery:"3279 mAh",
      os:"iOS 17", warranty:"1 Year Apple India Warranty", highRefresh:false, rating:4.5, reviews:1204 }),

  // ---------------- SAMSUNG ----------------
  P({ id:"sam-s24-ultra", brand:"samsung", model:"Galaxy S24 Ultra", short:"Titanium frame, S Pen, 200MP camera, Galaxy AI",
      mrp:134999, price:119999, ram:[12], storage:[256,512,1024], colors:["Titanium Black","Titanium Violet","Titanium Yellow"],
      processor:"Snapdragon 8 Gen 3 for Galaxy", display:"6.8\" QHD+ Dynamic AMOLED 2X, 120Hz", camera:"200MP + 50MP + 12MP + 10MP",
      battery:"5000 mAh", os:"Android 14, One UI 6.1", warranty:"1 Year Samsung India Warranty", featured:true, isNew:true, rating:4.7, reviews:389 }),
  P({ id:"sam-s24", brand:"samsung", model:"Galaxy S24", short:"Compact flagship with Galaxy AI",
      mrp:79999, price:69999, ram:[8], storage:[128,256], colors:["Onyx Black","Marble Grey","Cobalt Violet"],
      processor:"Exynos 2400", display:"6.2\" FHD+ Dynamic AMOLED 2X, 120Hz", camera:"50MP + 12MP + 10MP",
      battery:"4000 mAh", os:"Android 14, One UI 6.1", warranty:"1 Year Samsung India Warranty", rating:4.5, reviews:276 }),
  P({ id:"sam-m35", brand:"samsung", model:"Galaxy M35 5G", short:"Big battery mid-ranger with AMOLED display",
      mrp:22999, price:18499, ram:[6,8], storage:[128,256], colors:["Moonlight Blue","Midnight Blue","Thunder Grey"],
      processor:"Exynos 1380", display:"6.6\" Super AMOLED, 120Hz", camera:"50MP + 8MP + 2MP",
      battery:"6000 mAh", os:"Android 14, One UI 6.1", warranty:"1 Year Samsung India Warranty", rating:4.3, reviews:964 }),

  // ---------------- ONEPLUS ----------------
  P({ id:"op-12", brand:"oneplus", model:"OnePlus 12", short:"Hasselblad camera, Snapdragon 8 Gen 3, 100W charging",
      mrp:69999, price:64999, ram:[12,16], storage:[256,512], colors:["Flowy Emerald","Silky Black"],
      processor:"Snapdragon 8 Gen 3", display:"6.82\" QHD+ LTPO AMOLED, 120Hz", camera:"50MP + 64MP + 48MP",
      battery:"5400 mAh", os:"Android 14, OxygenOS 14", warranty:"1 Year Manufacturer Warranty", featured:true, rating:4.6, reviews:432 }),
  P({ id:"op-12r", brand:"oneplus", model:"OnePlus 12R", short:"Flagship-grade performance at a mid-range price",
      mrp:45999, price:39999, ram:[8,16], storage:[128,256], colors:["Cool Blue","Iron Grey"],
      processor:"Snapdragon 8 Gen 2", display:"6.78\" LTPO AMOLED, 120Hz", camera:"50MP + 8MP + 2MP",
      battery:"5500 mAh", os:"Android 14, OxygenOS 14", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.5, reviews:601 }),
  P({ id:"op-nord-4", brand:"oneplus", model:"OnePlus Nord 4", short:"Metal unibody design with clean OxygenOS",
      mrp:32999, price:29999, ram:[8,12], storage:[128,256], colors:["Obsidian Walnut","Mercurial Silver"],
      processor:"Snapdragon 7+ Gen 3", display:"6.74\" AMOLED, 120Hz", camera:"50MP + 8MP",
      battery:"5500 mAh", os:"Android 14, OxygenOS 14", warranty:"1 Year Manufacturer Warranty", rating:4.4, reviews:288 }),

  // ---------------- XIAOMI ----------------
  P({ id:"xia-14", brand:"xiaomi", model:"Xiaomi 14", short:"Leica optics in a compact flagship body",
      mrp:69999, price:64999, ram:[12], storage:[256,512], colors:["Black","White","Jade Green"],
      processor:"Snapdragon 8 Gen 3", display:"6.36\" LTPO AMOLED, 120Hz", camera:"50MP Leica Triple",
      battery:"4610 mAh", os:"Android 14, HyperOS", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.5, reviews:198 }),
  P({ id:"xia-13-5g", brand:"xiaomi", model:"Xiaomi 13 5G", short:"Snappy performance with a fluid AMOLED display",
      mrp:52999, price:44999, ram:[8], storage:[128,256], colors:["Graphite Black","Alpine Blue"],
      processor:"Snapdragon 8 Gen 2", display:"6.36\" AMOLED, 120Hz", camera:"50MP Triple",
      battery:"4500 mAh", os:"Android 14, HyperOS", warranty:"1 Year Manufacturer Warranty", rating:4.4, reviews:355 }),

  // ---------------- REDMI ----------------
  P({ id:"rmi-note-13-pro", brand:"redmi", model:"Redmi Note 13 Pro+ 5G", short:"Curved AMOLED with 200MP OIS camera",
      mrp:31999, price:26999, ram:[8,12], storage:[128,256], colors:["Fusion Black","Fusion Purple","Fusion White"],
      processor:"Dimensity 7200 Ultra", display:"6.67\" Curved AMOLED, 120Hz", camera:"200MP OIS + 8MP + 2MP",
      battery:"5000 mAh", os:"Android 13, HyperOS", warranty:"1 Year Manufacturer Warranty", featured:true, rating:4.4, reviews:1532 }),
  P({ id:"rmi-13c", brand:"redmi", model:"Redmi 13C", short:"Budget-friendly big-screen entry phone",
      mrp:11999, price:9499, ram:[4,6], storage:[64,128], colors:["Midnight Black","Ocean Blue","Glacier White"],
      processor:"MediaTek Helio G85", display:"6.74\" HD+, 90Hz", camera:"50MP AI Dual",
      battery:"5000 mAh", os:"Android 13", warranty:"1 Year Manufacturer Warranty", amoled:false, highRefresh:false, rating:4.1, reviews:2210 }),

  // ---------------- REALME ----------------
  P({ id:"rlm-gt6", brand:"realme", model:"Realme GT 6", short:"Flagship power for enthusiasts, 120W SuperVOOC",
      mrp:45999, price:39999, ram:[8,12], storage:[128,256], colors:["Fluid Silver","Razor Green"],
      processor:"Snapdragon 8s Gen 3", display:"6.78\" LTPO AMOLED, 144Hz", camera:"50MP OIS + 50MP + 8MP",
      battery:"5500 mAh", os:"Android 14, Realme UI 5.0", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.5, reviews:143 }),
  P({ id:"rlm-12-pro", brand:"realme", model:"Realme 12 Pro+ 5G", short:"Periscope telephoto camera at a mid-range price",
      mrp:29999, price:25999, ram:[8,12], storage:[128,256], colors:["Submarine Blue","Navigator Beige"],
      processor:"Snapdragon 7s Gen 2", display:"6.7\" Curved AMOLED, 120Hz", camera:"50MP OIS + 64MP Periscope + 8MP",
      battery:"5000 mAh", os:"Android 14, Realme UI 5.0", warranty:"1 Year Manufacturer Warranty", rating:4.4, reviews:512 }),

  // ---------------- VIVO ----------------
  P({ id:"vivo-x100", brand:"vivo", model:"Vivo X100", short:"ZEISS optics with Dimensity 9300 flagship chip",
      mrp:63999, price:57999, ram:[12,16], storage:[256,512], colors:["Asteroid Black","Sunrise Orange"],
      processor:"Dimensity 9300", display:"6.78\" AMOLED, 120Hz", camera:"50MP ZEISS OIS + 50MP + 64MP",
      battery:"5000 mAh", os:"Android 14, Funtouch OS 14", warranty:"1 Year Manufacturer Warranty", rating:4.5, reviews:167 }),
  P({ id:"vivo-v30", brand:"vivo", model:"Vivo V30", short:"Portrait-focused camera phone with slim design",
      mrp:33999, price:28999, ram:[8,12], storage:[128,256], colors:["Peacock Green","Andaman Blue"],
      processor:"Snapdragon 7 Gen 3", display:"6.78\" Curved AMOLED, 120Hz", camera:"50MP OIS + 50MP Portrait",
      battery:"5000 mAh", os:"Android 14, Funtouch OS 14", warranty:"1 Year Manufacturer Warranty", rating:4.3, reviews:298 }),

  // ---------------- OPPO ----------------
  P({ id:"oppo-find-x7", brand:"oppo", model:"Oppo Find X7", short:"Hasselblad-tuned cameras with periscope zoom",
      mrp:59999, price:54999, ram:[12], storage:[256,512], colors:["Ocean Blue","Desert Silver"],
      processor:"Dimensity 9300", display:"6.78\" LTPO AMOLED, 120Hz", camera:"50MP Hasselblad + 50MP + 50MP Periscope",
      battery:"5000 mAh", os:"Android 14, ColorOS 14", warranty:"1 Year Manufacturer Warranty", rating:4.4, reviews:91 }),
  P({ id:"oppo-reno-12", brand:"oppo", model:"Oppo Reno 12 5G", short:"AI-powered portraits with a sleek curved body",
      mrp:32999, price:28999, ram:[8,12], storage:[128,256], colors:["Amber Orange","Matte Grey"],
      processor:"Dimensity 7300 Energy", display:"6.7\" Curved AMOLED, 120Hz", camera:"50MP OIS + 8MP + 2MP",
      battery:"5000 mAh", os:"Android 14, ColorOS 14", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.3, reviews:78 }),

  // ---------------- MOTOROLA ----------------
  P({ id:"moto-edge-50-pro", brand:"motorola", model:"Motorola Edge 50 Pro", short:"Curved pOLED display with premium vegan-leather finish",
      mrp:31999, price:27999, ram:[8,12], storage:[256,512], colors:["Black Beauty","Luxe Lavender"],
      processor:"Snapdragon 7 Gen 3", display:"6.7\" pOLED, 144Hz", camera:"50MP OIS + 13MP + 10MP",
      battery:"4500 mAh", os:"Android 14, Near-Stock", warranty:"1 Year Manufacturer Warranty", rating:4.4, reviews:112 }),
  P({ id:"moto-g85", brand:"motorola", model:"Moto G85 5G", short:"Clean Android experience with curved pOLED display",
      mrp:19999, price:16999, ram:[8,12], storage:[128,256], colors:["Cobalt Blue","Olive Green"],
      processor:"Snapdragon 6s Gen 3", display:"6.67\" pOLED, 120Hz", camera:"50MP OIS + 8MP",
      battery:"5000 mAh", os:"Android 14, Near-Stock", warranty:"1 Year Manufacturer Warranty", rating:4.3, reviews:203 }),

  // ---------------- GOOGLE PIXEL ----------------
  P({ id:"pixel-8", brand:"pixel", model:"Google Pixel 8", short:"Pure Android with best-in-class computational photography",
      mrp:75999, price:63999, ram:[8], storage:[128,256], colors:["Obsidian","Hazel","Rose"],
      processor:"Google Tensor G3", display:"6.2\" OLED, 120Hz", camera:"50MP + 12MP Ultra Wide",
      battery:"4575 mAh", os:"Android 14, Stock", warranty:"1 Year Manufacturer Warranty", featured:true, rating:4.6, reviews:245 }),
  P({ id:"pixel-8-pro", brand:"pixel", model:"Google Pixel 8 Pro", short:"Pro-grade cameras with Gemini AI features built in",
      mrp:106999, price:94999, ram:[12], storage:[128,256,512], colors:["Obsidian","Porcelain","Bay"],
      processor:"Google Tensor G3", display:"6.7\" LTPO OLED, 120Hz", camera:"50MP + 48MP + 48MP Telephoto",
      battery:"5050 mAh", os:"Android 14, Stock", warranty:"1 Year Manufacturer Warranty", rating:4.7, reviews:134 }),

  // ---------------- NOTHING ----------------
  P({ id:"nothing-2a", brand:"nothing", model:"Nothing Phone (2a)", short:"Transparent Glyph design with distinct light interface",
      mrp:23999, price:21999, ram:[8,12], storage:[128,256], colors:["Milk White","Black"],
      processor:"Dimensity 7200 Pro", display:"6.7\" AMOLED, 120Hz", camera:"50MP OIS + 50MP",
      battery:"5000 mAh", os:"Android 14, Nothing OS 2.5", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.4, reviews:322 }),
  P({ id:"nothing-2", brand:"nothing", model:"Nothing Phone (2)", short:"Iconic Glyph interface with flagship performance",
      mrp:44999, price:39999, ram:[8,12], storage:[128,256,512], colors:["White","Dark Grey"],
      processor:"Snapdragon 8+ Gen 1", display:"6.7\" LTPO AMOLED, 120Hz", camera:"50MP OIS + 50MP",
      battery:"4700 mAh", os:"Android 14, Nothing OS 2.5", warranty:"1 Year Manufacturer Warranty", rating:4.5, reviews:198 }),

  // ---------------- IQOO ----------------
  P({ id:"iqoo-12", brand:"iqoo", model:"iQOO 12", short:"Gaming-first flagship with Snapdragon 8 Gen 3",
      mrp:52999, price:47999, ram:[12,16], storage:[256,512], colors:["Legend","Alpha"],
      processor:"Snapdragon 8 Gen 3", display:"6.78\" LTPO AMOLED, 144Hz", camera:"50MP OIS + 64MP + 8MP",
      battery:"5000 mAh", os:"Android 14, Funtouch OS 14", warranty:"1 Year Manufacturer Warranty", rating:4.5, reviews:154 }),
  P({ id:"iqoo-z9", brand:"iqoo", model:"iQOO Z9 5G", short:"Balanced performance phone for daily gaming",
      mrp:19999, price:16999, ram:[6,8], storage:[128,256], colors:["Phantom Blue","Graphite Green"],
      processor:"Snapdragon 7s Gen 2", display:"6.67\" AMOLED, 120Hz", camera:"50MP OIS + 2MP",
      battery:"5000 mAh", os:"Android 14, Funtouch OS 14", warranty:"1 Year Manufacturer Warranty", rating:4.3, reviews:410 }),

  // ---------------- POCO ----------------
  P({ id:"poco-x6-pro", brand:"poco", model:"Poco X6 Pro 5G", short:"Flagship-grade Dimensity chip at a budget price",
      mrp:26999, price:22999, ram:[8,12], storage:[256,512], colors:["Grey","Yellow","Black"],
      processor:"Dimensity 8300 Ultra", display:"6.67\" AMOLED, 120Hz", camera:"64MP OIS + 8MP + 2MP",
      battery:"5000 mAh", os:"Android 14, HyperOS", warranty:"1 Year Manufacturer Warranty", featured:true, rating:4.4, reviews:1876 }),
  P({ id:"poco-m6-pro", brand:"poco", model:"Poco M6 Pro 5G", short:"Reliable everyday 5G phone with a large display",
      mrp:16999, price:13999, ram:[6,8], storage:[128,256], colors:["Forest Green","Power Black"],
      processor:"Snapdragon 4 Gen 2", display:"6.67\" AMOLED, 120Hz", camera:"64MP + 2MP",
      battery:"5000 mAh", os:"Android 13, HyperOS", warranty:"1 Year Manufacturer Warranty", rating:4.2, reviews:983 }),

  // ---------------- HONOR ----------------
  P({ id:"honor-200-pro", brand:"honor", model:"Honor 200 Pro", short:"Portrait camera phone co-engineered with Studio Harcourt",
      mrp:52999, price:47999, ram:[12], storage:[256,512], colors:["Black","Sunrise Orange"],
      processor:"Snapdragon 8s Gen 3", display:"6.78\" Curved OLED, 120Hz", camera:"50MP OIS + 50MP Portrait + 12MP",
      battery:"5200 mAh", os:"Android 14, MagicOS 8.0", warranty:"1 Year Manufacturer Warranty", isNew:true, rating:4.5, reviews:64 }),
  P({ id:"honor-x9b", brand:"honor", model:"Honor X9b 5G", short:"Drop-resistant display with a curved AMOLED screen",
      mrp:26999, price:22999, ram:[8,12], storage:[256], colors:["Titanium Silver","Emerald Green"],
      processor:"Snapdragon 6 Gen 1", display:"6.78\" Curved AMOLED, 120Hz", camera:"108MP OIS + 5MP",
      battery:"5800 mAh", os:"Android 14, MagicOS 8.0", warranty:"1 Year Manufacturer Warranty", rating:4.3, reviews:221 }),

  // ---------------- NOKIA ----------------
  P({ id:"nokia-g42", brand:"nokia", model:"Nokia G42 5G", short:"Durable, repairable design with clean Android",
      mrp:16999, price:13999, ram:[6,8], storage:[128,256], colors:["So Grey","So Purple"],
      processor:"Snapdragon 480+", display:"6.56\" HD+, 90Hz", camera:"50MP AI Dual",
      battery:"5000 mAh", os:"Android 13, Stock", warranty:"2 Year Manufacturer Warranty", amoled:false, rating:4.1, reviews:187 }),
  P({ id:"nokia-c32", brand:"nokia", model:"Nokia C32", short:"Dependable entry-level phone built to last",
      mrp:9999, price:8499, ram:[4], storage:[64,128], colors:["Charcoal","Beach Pink"],
      processor:"Unisoc T606", display:"6.5\" HD+, 60Hz", camera:"50MP AI Dual",
      battery:"5000 mAh", os:"Android 13 Go Edition", warranty:"2 Year Manufacturer Warranty", amoled:false, highRefresh:false, fiveG:false, rating:3.9, reviews:412, stock:6 }),
];

/* ---------------- Upcoming pre-booking products ---------------- */
const UPCOMING = [
  { id:"apl-iphone-16", brand:"apple", model:"iPhone 16 Pro", launch:"25 Sep 2026", expectedPrice:139900,
    bookingAmount:2000, slotsLeft:37, colors:["Desert Titanium","Black Titanium"],
    benefits:["Priority delivery on launch day","Free case worth ₹2,999","No-cost EMI available"] },
  { id:"sam-s25-ultra", brand:"samsung", model:"Galaxy S25 Ultra", launch:"10 Oct 2026", expectedPrice:129999,
    bookingAmount:2500, slotsLeft:52, colors:["Titanium Grey","Titanium Blue"],
    benefits:["Guaranteed launch-day delivery","Bonus Galaxy Buds offer","Extra exchange bonus"] },
  { id:"op-13", brand:"oneplus", model:"OnePlus 13", launch:"02 Nov 2026", expectedPrice:64999,
    bookingAmount:1000, slotsLeft:80, colors:["Midnight Ocean","Arctic Dawn"],
    benefits:["Early-bird price lock","Free 65W charger","Priority support"] },
];

/* ---------------- Offers ---------------- */
const OFFERS = [
  { type:"Flash Deal", productId:"rmi-note-13-pro", validity:"Ends in 6 hours", tag:"flash" },
  { type:"Weekend Offer", productId:"poco-x6-pro", validity:"Valid till Sunday", tag:"weekend" },
  { type:"Bank Offer", productId:"sam-s24-ultra", validity:"With HDFC Bank Cards", tag:"bank", note:"Flat ₹5,000 instant discount" },
  { type:"Exchange Offer", productId:"apl-iphone-15", validity:"On exchange of old smartphone", tag:"exchange", note:"Get up to ₹12,000 off" },
  { type:"Bundle Offer", productId:"pixel-8", validity:"Limited period", tag:"bundle", note:"Free earbuds worth ₹2,499" },
  { type:"Festival Offer", productId:"vivo-x100", validity:"Diwali Dhamaka", tag:"festival", note:"Extra ₹3,000 off" },
];

/* ---------------- Helpers ---------------- */
function getBrand(id){ return BRANDS.find(b => b.id === id); }
function getProduct(id){ return PRODUCTS.find(p => p.id === id); }
function discountPct(p){ return Math.round(((p.mrp - p.price) / p.mrp) * 100); }
function formatINR(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
