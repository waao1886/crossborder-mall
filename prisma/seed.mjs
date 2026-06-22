import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const products = [
  // ===== JD (35 products) =====
  { platform: "JD", platformId: "jd-001", title: "小米14 Ultra 5G手机 骁龙8Gen3 徕卡光学 120W秒充", titleEn: "Xiaomi 14 Ultra 5G Smartphone Snapdragon 8 Gen 3 Leica Optics 120W Fast Charging", description: "搭载第三代骁龙8移动平台，徕卡光学Summilux镜头，120W有线秒充+50W无线秒充", price: 5999, imageUrl: "https://placehold.co/600x600/2563eb/white?text=Xiaomi+14+Ultra", productUrl: "https://item.jd.com/100000000001.html", category: "手机数码", rating: 4.8, salesCount: 50000 },
  { platform: "JD", platformId: "jd-002", title: "华为Mate 60 Pro 5G手机 麒麟9000S 卫星通话", titleEn: "Huawei Mate 60 Pro 5G Kirin 9000S Satellite Calling", description: "搭载麒麟9000S芯片，支持卫星通话，5000万像素超感知主摄", price: 6999, imageUrl: "https://placehold.co/600x600/dc2626/white?text=Huawei+Mate+60+Pro", productUrl: "https://item.jd.com/100000000002.html", category: "手机数码", rating: 4.9, salesCount: 80000 },
  { platform: "JD", platformId: "jd-003", title: "iPhone 16 Pro Max 256GB 原色钛金属", titleEn: "iPhone 16 Pro Max 256GB Natural Titanium", description: "A18 Pro芯片，全新Camera Control按键，4800万像素Fusion相机", price: 9999, imageUrl: "https://placehold.co/600x600/6b7280/white?text=iPhone+16+Pro+Max", productUrl: "https://item.jd.com/100000000003.html", category: "手机数码", rating: 4.7, salesCount: 35000 },
  { platform: "JD", platformId: "jd-004", title: "OPPO Find X8 Pro 5G AI手机 天玑9400", titleEn: "OPPO Find X8 Pro 5G AI Phone Dimensity 9400", description: "天玑9400旗舰芯片，AI智能消除，哈苏人像，四摄旗舰影像系统", price: 5299, imageUrl: "https://placehold.co/600x600/059669/white?text=OPPO+Find+X8+Pro", productUrl: "https://item.jd.com/100000000004.html", category: "手机数码", rating: 4.6, salesCount: 25000 },
  { platform: "JD", platformId: "jd-005", title: "Apple iPad Pro M4 11英寸 256GB", titleEn: "Apple iPad Pro M4 11-inch 256GB", description: "M4芯片，Ultra Retina XDR显示屏，支持Apple Pencil Pro，超轻薄设计", price: 8999, imageUrl: "https://placehold.co/600x600/4f46e5/white?text=iPad+Pro+M4", productUrl: "https://item.jd.com/100000000005.html", category: "手机数码", rating: 4.8, salesCount: 18000 },
  { platform: "JD", platformId: "jd-006", title: "Sony WH-1000XM5 无线降噪头戴式耳机", titleEn: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", description: "行业领先降噪，30小时续航，高解析度音频，多点连接", price: 2399, imageUrl: "https://placehold.co/600x600/d97706/white?text=Sony+WH-1000XM5", productUrl: "https://item.jd.com/100000000006.html", category: "手机数码", rating: 4.9, salesCount: 60000 },
  { platform: "JD", platformId: "jd-007", title: "DJI Mini 4 Pro 无人机 4K/60fps 34分钟续航", titleEn: "DJI Mini 4 Pro Drone 4K/60fps 34min Flight", description: "249克超轻机身，全向避障，4K 60fps HDR视频，34分钟续航", price: 4788, imageUrl: "https://placehold.co/600x600/1e40af/white?text=DJI+Mini+4+Pro", productUrl: "https://item.jd.com/100000000007.html", category: "手机数码", rating: 4.8, salesCount: 12000 },
  { platform: "JD", platformId: "jd-008", title: "三星 Galaxy S25 Ultra 12+256GB", titleEn: "Samsung Galaxy S25 Ultra 12+256GB", description: "骁龙8 Elite处理器，2亿像素主摄，钛金属框架，S Pen内置", price: 9699, imageUrl: "https://placehold.co/600x600/7c3aed/white?text=Galaxy+S25+Ultra", productUrl: "https://item.jd.com/100000000008.html", category: "手机数码", rating: 4.7, salesCount: 15000 },
  { platform: "JD", platformId: "jd-009", title: "海尔冰箱 十字对开门 500L 风冷无霜", titleEn: "Haier French Door Refrigerator 500L Frost-Free", description: "500升大容量，风冷无霜，双变频节能，DEO净味养鲜", price: 3999, imageUrl: "https://placehold.co/600x600/0891b2/white?text=Haier+Fridge", productUrl: "https://item.jd.com/100000000009.html", category: "家用电器", rating: 4.6, salesCount: 22000 },
  { platform: "JD", platformId: "jd-010", title: "美的空调 1.5匹 新一级能效 变频冷暖", titleEn: "Midea AC 1.5HP Inverter Cooling & Heating", description: "新一级能效，全直流变频，自清洁，智能WiFi控制，低噪音18分贝", price: 2799, imageUrl: "https://placehold.co/600x600/0284c7/white?text=Midea+AC", productUrl: "https://item.jd.com/100000000010.html", category: "家用电器", rating: 4.5, salesCount: 35000 },
  { platform: "JD", platformId: "jd-011", title: "戴森V15 Detect无绳吸尘器", titleEn: "Dyson V15 Detect Cordless Vacuum Cleaner", description: "激光探测微尘，LCD屏实时显示，防缠绕科技，60分钟续航", price: 4990, imageUrl: "https://placehold.co/600x600/7c2d12/white?text=Dyson+V15", productUrl: "https://item.jd.com/100000000011.html", category: "家用电器", rating: 4.8, salesCount: 18000 },
  { platform: "JD", platformId: "jd-012", title: "西门子洗碗机 13套 嵌入式 热交换烘干", titleEn: "Siemens Dishwasher 13 Sets Built-in Heat Exchange", description: "13套大容量，热交换+冷凝烘干，72度高温除菌，24小时预约", price: 5499, imageUrl: "https://placehold.co/600x600/374151/white?text=Siemens+Dishwasher", productUrl: "https://item.jd.com/100000000012.html", category: "家用电器", rating: 4.7, salesCount: 9000 },
  { platform: "JD", platformId: "jd-013", title: "松下洗衣机 10公斤 滚筒 光动银除菌", titleEn: "Panasonic 10KG Front-Load Washer Silver Ion Sterilization", description: "10公斤大容量，光动银除菌，泡沫净技术，变频静音", price: 4199, imageUrl: "https://placehold.co/600x600/047857/white?text=Panasonic+Washer", productUrl: "https://item.jd.com/100000000013.html", category: "家用电器", rating: 4.6, salesCount: 11000 },
  { platform: "JD", platformId: "jd-014", title: "追觅X40 Pro扫拖机器人 自清洁", titleEn: "Dreame X40 Pro Robot Vacuum Self-Cleaning", description: "11000Pa吸力，热水洗拖布，自动集尘，AI避障，180天免倒垃圾", price: 4599, imageUrl: "https://placehold.co/600x600/a855f7/white?text=Dreame+X40", productUrl: "https://item.jd.com/100000000014.html", category: "家用电器", rating: 4.7, salesCount: 15000 },
  { platform: "JD", platformId: "jd-015", title: "格力电风扇 塔扇 无叶 遥控静音", titleEn: "Gree Tower Fan Leafless Remote Control Silent", description: "无叶安全设计，80度广角送风，8档风速，遥控/触控双控", price: 599, imageUrl: "https://placehold.co/600x600/16a34a/white?text=Gree+Fan", productUrl: "https://item.jd.com/100000000015.html", category: "家用电器", rating: 4.4, salesCount: 28000 },
  { platform: "JD", platformId: "jd-016", title: "联想ThinkPad X1 Carbon Gen12 14英寸商务本", titleEn: "Lenovo ThinkPad X1 Carbon Gen12 14-inch Laptop", description: "Intel Core Ultra 7，32GB内存，1TB SSD，2.8K OLED屏", price: 12999, imageUrl: "https://placehold.co/600x600/1e293b/white?text=ThinkPad+X1", productUrl: "https://item.jd.com/100000000016.html", category: "电脑办公", rating: 4.8, salesCount: 8000 },
  { platform: "JD", platformId: "jd-017", title: "MacBook Pro 16 M4 Pro 48GB 1TB", titleEn: "MacBook Pro 16 M4 Pro 48GB 1TB", description: "M4 Pro芯片，16英寸Liquid Retina XDR，48GB统一内存", price: 24999, imageUrl: "https://placehold.co/600x600/9ca3af/white?text=MacBook+Pro+16", productUrl: "https://item.jd.com/100000000017.html", category: "电脑办公", rating: 4.9, salesCount: 5000 },
  { platform: "JD", platformId: "jd-018", title: "华硕ROG 魔霸新锐 16英寸游戏本 i9 RTX4060", titleEn: "ASUS ROG Strix G16 Gaming Laptop i9 RTX4060", description: "i9-14900HX处理器，RTX4060显卡，2.5K 240Hz电竞屏", price: 9999, imageUrl: "https://placehold.co/600x600/dc2626/white?text=ROG+G16", productUrl: "https://item.jd.com/100000000018.html", category: "电脑办公", rating: 4.7, salesCount: 10000 },
  { platform: "JD", platformId: "jd-019", title: "AMD Ryzen 9 9950X 盒装CPU 16核32线程", titleEn: "AMD Ryzen 9 9950X CPU 16-Core 32-Thread", description: "Zen 5架构，5.7GHz最大加速频率，AM5接口", price: 4899, imageUrl: "https://placehold.co/600x600/ea580c/white?text=Ryzen+9950X", productUrl: "https://item.jd.com/100000000019.html", category: "电脑办公", rating: 4.8, salesCount: 6000 },
  { platform: "JD", platformId: "jd-020", title: "三星 990 Pro 2TB NVMe M.2 SSD", titleEn: "Samsung 990 Pro 2TB NVMe M.2 SSD", description: "读取7450MB/s，写入6900MB/s，PCIe 4.0，三星V-NAND", price: 1299, imageUrl: "https://placehold.co/600x600/6366f1/white?text=990+Pro+2TB", productUrl: "https://item.jd.com/100000000020.html", category: "电脑办公", rating: 4.9, salesCount: 25000 },
  { platform: "JD", platformId: "jd-021", title: "罗技MX Master 3S 无线鼠标 8K DPI", titleEn: "Logitech MX Master 3S Wireless Mouse 8K DPI", description: "8K DPI，静音按键，MagSpeed电磁滚轮，支持3台设备切换", price: 699, imageUrl: "https://placehold.co/600x600/a3a3a3/white?text=MX+Master+3S", productUrl: "https://item.jd.com/100000000021.html", category: "电脑办公", rating: 4.8, salesCount: 40000 },
  { platform: "JD", platformId: "jd-022", title: "兄弟DCP-T725DW 彩色喷墨一体机", titleEn: "Brother DCP-T725DW Color Inkjet All-in-One", description: "打印/复印/扫描，无线连接，大容量墨仓，单张成本1分钱", price: 1199, imageUrl: "https://placehold.co/600x600/1e40af/white?text=Brother+Printer", productUrl: "https://item.jd.com/100000000022.html", category: "电脑办公", rating: 4.5, salesCount: 7000 },
];

async function main() {
  console.log("Seeding database...");
  await prisma.productTranslation.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
