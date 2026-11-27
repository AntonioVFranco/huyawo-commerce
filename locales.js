// Each translation supplies the same keys, in the order listed here.
(() => {
  const keys = [
    'language','searchHint','search','saved','skip','close','home','all','bath','kitchen','bed','living','smart',
    'ribbon','about','heroTag','heroA','heroB','heroBody','browse','catalogTag','catalog','catalogBody',
    'sort','featured','az','za','results','emptySearch','emptySaved','allProducts','collections','cozy','kitchenEdit','explore',
    'save','remove','added','removed','specs','view','soon','pending','affiliate','demo','aboutBody','footer','missing'
  ];
  const out = {};
  const specs = {};
  function add(code, name, short, labels, specLabels, productRows) {
    const strings = labels.split('|');
    const rows = productRows.trim().split('\n').map(row => row.trim().split('|'));
    if (strings.length !== keys.length || rows.length !== 6 || rows.some(row => row.length !== 5)) {
      throw new Error('Invalid localization: ' + code + ' (' + strings.length + ')');
    }
    out[code] = {
      name, short,
      ui: Object.fromEntries(keys.map((key,i) => [key,strings[i]])),
      products: rows.map(([title, info, ...values]) => ({title,info,values}))
    };
    specs[code] = specLabels.split('|');
  }

  add('en','English','EN',
    'Choose a language|Search Home & Living|Search|Saved|Skip to content|Close|Home|All finds|Bathroom|Kitchen|Bedroom|Living room|Smart home|Curated Home & Living finds|How shopping works|THE HOME & LIVING EDIT|Good finds.|Better living.|Clever little upgrades for every corner of home.|Explore the catalog|THE CATALOG|Home & Living finds|Discover practical picks for your space.|Sort products|Featured|Name A–Z|Name Z–A|Search results|No products match your search.|Save a product with the heart to find it here.|Browse all finds|Shop by collection|Cozy corners|Kitchen helpers|Explore collection|Save product|Remove saved product|Product saved.|Product removed from saved.|Sample specifications|View on AliExpress|Product link pending|This product is part of the preview catalog. Its AliExpress link is pending.|We may earn a commission from purchases made through affiliate links.|Images and specifications are for illustration. Check the seller’s listing for final details.|Huyawo Commerce curates Home & Living products. When a link is available, AliExpress handles payment, shipping and returns.|Home & Living finds from Huyawo.|This product could not be found.',
    'Design|Feature|Use',
    `Touchless sensor bin|A slim bin that fits beside a vanity, with a sensor lid for hands-free disposal.|Rounded rectangular body|Motion-sensor lid|Bathroom or vanity
    Automatic foam dispenser|A clean-lined countertop dispenser that foams compatible soap as you hold your hand under the nozzle.|Freestanding dispenser|Touchless foam nozzle|Bathroom or kitchen sink
    Mushroom table lamp|A softly glowing dome lamp to warm up a bedside table or reading nook.|Mushroom-shaped shade|Soft ambient light|Bedside table or shelf
    Under-cabinet light bar|A slim light that brightens the kitchen worktop from beneath a wall cabinet.|Slim bar format|LED task lighting|Under wall cabinets
    Two-tier pantry organizer|Clear spinning trays that keep small jars visible and within reach.|Two clear tiers|Rotating trays|Pantry or countertop
    Compact robot vacuum|A low-profile robot vacuum for everyday floor maintenance.|Round low-profile body|Automatic floor cleaning|Hard flooring`);

  add('zh-Hans','简体中文','简中',
    '选择语言|搜索家居好物|搜索|收藏|跳转到主要内容|关闭|首页|全部好物|浴室|厨房|卧室|客厅|智能家居|精选家居好物|购物指南|家居精选|发现好物|美好生活|为家里每个角落添一点巧思。|浏览商品|商品目录|家居好物|发现适合你家的实用好物。|商品排序|精选|名称升序|名称降序|搜索结果|没有找到符合条件的商品。|点击爱心收藏商品，就能在这里找到。|浏览全部好物|按主题选购|温馨角落|厨房帮手|浏览专题|收藏商品|取消收藏|已收藏商品。|已取消收藏。|示例规格|前往 AliExpress 查看|商品链接待添加|此商品属于预览目录，AliExpress 链接尚未添加。|通过推广链接购买，我们可能获得佣金。|图片和规格仅供参考，实际详情以卖家页面为准。|Huyawo Commerce 为你精选家居商品。商品链接上线后，付款、配送和退货由 AliExpress 处理。|Huyawo 精选家居好物。|找不到此商品。',
    '设计|特点|用途',
    `智能感应垃圾桶|纤细桶身可放在洗手台旁，感应盖方便免触投放。|圆角长方形桶身|动作感应开盖|浴室或洗手台旁
    自动泡沫洗手液机|简洁的台面款，手伸到喷嘴下即可将适配洗手液打成泡沫。|独立式机身|免触泡沫喷嘴|浴室或厨房水槽
    蘑菇台灯|柔和发光的圆顶台灯，为床头柜或阅读角增添暖意。|蘑菇形灯罩|柔和氛围光|床头柜或置物架
    橱柜下照明灯条|纤细灯条安装在吊柜下方，照亮厨房操作台。|纤细条形|LED 工作照明|厨房吊柜下方
    双层旋转收纳架|透明旋转托盘，方便看清并取用小罐。|双层透明结构|旋转托盘|食品柜或台面
    小型扫地机器人|低矮机身，方便日常清洁地面。|低矮圆形机身|自动地面清洁|硬质地面`);

  add('zh-Hant','繁體中文','繁中',
    '選擇語言|搜尋居家好物|搜尋|收藏|跳至主要內容|關閉|首頁|所有好物|浴室|廚房|臥室|客廳|智慧家居|精選居家好物|購物指南|居家精選|發現好物|美好生活|替家中每個角落添一點巧思。|瀏覽商品|商品目錄|居家好物|發現適合你家的實用好物。|商品排序|精選|名稱升冪|名稱降冪|搜尋結果|找不到符合條件的商品。|點選愛心收藏商品，就能在這裡找到。|瀏覽所有好物|依主題選購|溫馨角落|廚房幫手|瀏覽主題|收藏商品|取消收藏|商品已收藏。|已取消收藏。|示例規格|前往 AliExpress 查看|商品連結待補|這是預覽目錄的商品，AliExpress 連結尚未加入。|透過推廣連結購買，我們可能會獲得佣金。|圖片與規格僅供參考，實際詳情以賣家頁面為準。|Huyawo Commerce 為你精選居家用品。商品連結開放後，付款、配送與退貨由 AliExpress 處理。|Huyawo 精選居家好物。|找不到這項商品。',
    '設計|特色|用途',
    `感應式垃圾桶|窄版桶身適合放在洗手台旁，感應式桶蓋方便免接觸丟棄垃圾。|圓角長方形桶身|動作感應開蓋|浴室或洗手台旁
    自動泡沫給皂機|簡潔的桌上型給皂機，把手伸到出皂口下即可取得泡沫。|獨立式機身|免接觸泡沫出皂口|浴室或廚房水槽
    蘑菇桌燈|散發柔和光線的圓頂桌燈，適合床頭櫃或閱讀角。|蘑菇造型燈罩|柔和情境光|床頭櫃或層架
    櫥櫃下照明燈條|纖細的燈條裝在吊櫃下方，照亮廚房工作檯面。|纖細條狀|LED 工作照明|廚房吊櫃下方
    雙層旋轉收納架|透明旋轉托盤，方便看清和拿取小罐。|兩層透明結構|旋轉托盤|食品儲藏區或檯面
    小型掃地機器人|低矮機身適合日常清潔地板。|低矮圓形機身|自動清潔地面|硬質地板`);

  add('es','Español','ES',
    'Elegir idioma|Busca artículos para el hogar|Buscar|Favoritos|Saltar al contenido|Cerrar|Inicio|Todos los artículos|Baño|Cocina|Dormitorio|Sala|Hogar inteligente|Nuestra selección para el hogar|Cómo comprar|ESPECIAL HOGAR|Buenos hallazgos.|Mejor en casa.|Pequeñas ideas para renovar cada rincón de tu hogar.|Explorar catálogo|EL CATÁLOGO|Hallazgos para el hogar|Descubre artículos prácticos para tu casa.|Ordenar productos|Destacados|Nombre A–Z|Nombre Z–A|Resultados de búsqueda|Ningún producto coincide con tu búsqueda.|Pulsa el corazón para guardar un producto aquí.|Ver todos los artículos|Comprar por colección|Rincones acogedores|Aliados en la cocina|Explorar colección|Guardar producto|Quitar de favoritos|Producto guardado.|Producto eliminado de favoritos.|Especificaciones de ejemplo|Ver en AliExpress|Enlace de producto pendiente|Este producto forma parte del catálogo de muestra. Su enlace de AliExpress está pendiente.|Podemos recibir una comisión por las compras realizadas mediante enlaces de afiliado.|Las imágenes y especificaciones son ilustrativas. Consulta la ficha del vendedor.|Huyawo Commerce selecciona productos para el hogar. Cuando haya un enlace disponible, AliExpress gestiona el pago, el envío y las devoluciones.|Selección para el hogar de Huyawo.|No se encontró este producto.',
    'Diseño|Característica|Uso',
    `Cubo de basura con sensor|Un cubo estrecho que cabe junto al lavabo y se abre sin tocar la tapa.|Cuerpo rectangular redondeado|Tapa con sensor de movimiento|Baño o lavabo
    Dispensador automático de espuma|Dispensador de encimera que convierte un jabón compatible en espuma al acercar la mano.|Dispensador independiente|Boquilla de espuma sin contacto|Lavabo o fregadero
    Lámpara de mesa seta|Una lámpara de cúpula con luz suave para la mesita de noche o el rincón de lectura.|Pantalla en forma de seta|Luz ambiental suave|Mesita o estante
    Barra de luz bajo armario|Una barra fina que se instala bajo un armario alto para iluminar la encimera.|Formato de barra fina|Iluminación LED de trabajo|Debajo de armarios altos
    Organizador giratorio de dos niveles|Bandejas transparentes y giratorias que dejan los frascos a la vista y al alcance.|Dos niveles transparentes|Bandejas giratorias|Despensa o encimera
    Robot aspirador compacto|Robot de perfil bajo para mantener el suelo al día.|Cuerpo redondo y bajo|Limpieza automática de suelos|Suelos duros`);

  add('pt-BR','Português (Brasil)','PT-BR',
    'Escolher idioma|Buscar achados para casa|Buscar|Salvos|Pular para o conteúdo|Fechar|Início|Todos os achados|Banheiro|Cozinha|Quarto|Sala|Casa inteligente|Curadoria para casa|Como funciona a compra|SELEÇÃO PARA CASA|Bons achados.|Melhor em casa.|Pequenas melhorias para cada canto da sua casa.|Explorar catálogo|O CATÁLOGO|Achados para casa|Descubra itens práticos para o seu espaço.|Ordenar produtos|Destaques|Nome A–Z|Nome Z–A|Resultados da busca|Nenhum produto corresponde à sua busca.|Toque no coração para encontrar seus produtos salvos aqui.|Ver todos os achados|Explore as coleções|Cantos aconchegantes|Ajudantes na cozinha|Explorar coleção|Salvar produto|Remover dos salvos|Produto salvo.|Produto removido dos salvos.|Especificações ilustrativas|Ver no AliExpress|Link do produto pendente|Este produto faz parte do catálogo de demonstração. O link do AliExpress ainda está pendente.|Podemos receber comissão por compras feitas por links de afiliado.|Imagens e especificações são ilustrativas. Confira os detalhes finais no anúncio do vendedor.|A Huyawo Commerce seleciona produtos para casa. Quando o link estiver disponível, pagamento, entrega e devoluções serão tratados pelo AliExpress.|Achados para casa selecionados pela Huyawo.|Não encontramos este produto.',
    'Design|Recurso|Uso',
    `Lixeira com sensor|Lixeira estreita que cabe ao lado da pia, com tampa que abre sem precisar tocar.|Corpo retangular com cantos arredondados|Tampa com sensor de movimento|Banheiro ou lavabo
    Dispenser automático de espuma|Dispenser de bancada que transforma sabonete compatível em espuma quando você aproxima a mão.|Dispenser de bancada|Bico de espuma sem toque|Pia do banheiro ou da cozinha
    Luminária de mesa cogumelo|Luz suave para deixar mais aconchegante a mesa de cabeceira ou o cantinho de leitura.|Cúpula em formato de cogumelo|Luz ambiente suave|Mesa de cabeceira ou prateleira
    Barra de luz para armário|Barra fina instalada sob o armário aéreo para iluminar a bancada da cozinha.|Formato de barra fina|Luz LED para a bancada|Sob armário aéreo
    Organizador giratório de dois andares|Bandejas transparentes e giratórias deixam os potes à vista e ao alcance.|Dois andares transparentes|Bandejas giratórias|Despensa ou bancada
    Robô aspirador compacto|Robô de perfil baixo para a limpeza diária do piso.|Corpo redondo de perfil baixo|Limpeza automática do piso|Pisos rígidos`);

  add('hi','हिन्दी','हि',
    'भाषा चुनें|घर के लिए सामान खोजें|खोजें|सहेजे गए|मुख्य सामग्री पर जाएँ|बंद करें|होम|सभी उत्पाद|बाथरूम|रसोई|शयनकक्ष|बैठक|स्मार्ट होम|घर के लिए चुने हुए उत्पाद|खरीदारी कैसे करें|घर के लिए खास चयन|काम की चीज़ें।|बेहतर घर।|घर के हर कोने के लिए छोटे और उपयोगी बदलाव।|कैटलॉग देखें|उत्पाद सूची|घर के लिए उपयोगी सामान|अपने घर के लिए काम की चीज़ें खोजें।|उत्पाद क्रम|चुनिंदा|नाम: बढ़ते क्रम में|नाम: घटते क्रम में|खोज परिणाम|आपकी खोज से मेल खाने वाला कोई उत्पाद नहीं मिला।|दिल के निशान पर टैप करें। सहेजे गए उत्पाद यहाँ मिलेंगे।|सभी उत्पाद देखें|संग्रह के अनुसार खरीदारी|सुकून भरे कोने|रसोई के साथी|संग्रह देखें|उत्पाद सहेजें|सहेजा गया उत्पाद हटाएँ|उत्पाद सहेजा गया।|उत्पाद हटा दिया गया।|उदाहरण के तौर पर विवरण|AliExpress पर देखें|उत्पाद का लिंक अभी उपलब्ध नहीं है|यह उत्पाद डेमो कैटलॉग में है। इसका AliExpress लिंक अभी उपलब्ध नहीं है।|अफ़िलिएट लिंक से की गई खरीदारी पर हमें कमीशन मिल सकता है।|तस्वीरें और विवरण केवल उदाहरण हैं। सही जानकारी विक्रेता के पेज पर देखें।|Huyawo Commerce घर के लिए उत्पाद चुनता है। लिंक उपलब्ध होने पर भुगतान, डिलीवरी और वापसी AliExpress संभालता है।|Huyawo की ओर से घर के लिए चुने हुए उत्पाद।|यह उत्पाद नहीं मिला।',
    'डिज़ाइन|खासियत|उपयोग',
    `बिना छुए खुलने वाला कूड़ादान|पतला कूड़ादान जो बेसिन के पास रखा जा सकता है और सेंसर से खुलता है।|गोल कोनों वाला आयताकार डिब्बा|मोशन सेंसर वाला ढक्कन|बाथरूम या बेसिन के पास
    स्वचालित फोम डिस्पेंसर|नोज़ल के नीचे हाथ रखने पर उपयुक्त साबुन को झाग में बदलने वाला डिस्पेंसर।|सतह पर रखा जाने वाला डिस्पेंसर|बिना छुए झाग देने वाला नोज़ल|बाथरूम या रसोई का सिंक
    मशरूम टेबल लैंप|बिस्तर के पास या पढ़ने के कोने के लिए नरम रोशनी वाला गोल लैंप।|मशरूम आकार का शेड|नरम रोशनी|बेडसाइड टेबल या शेल्फ़
    कैबिनेट के नीचे की लाइट|दीवार के कैबिनेट के नीचे लगी पतली लाइट, जो रसोई की कार्यसतह को रोशन करती है।|पतली लाइट बार|काम के लिए एलईडी रोशनी|दीवार के कैबिनेट के नीचे
    दो स्तर वाला घूमने वाला ऑर्गनाइज़र|पारदर्शी घूमने वाली ट्रे में छोटे जार आसानी से दिखते और मिलते हैं।|दो पारदर्शी स्तर|घूमने वाली ट्रे|रसोई का भंडार या काउंटर
    छोटा रोबोट वैक्यूम|रोज़मर्रा में फ़र्श साफ़ रखने के लिए कम ऊँचाई वाला रोबोट।|गोल और कम ऊँचाई वाला ढाँचा|फ़र्श की स्वचालित सफ़ाई|सख़्त फ़र्श`);

  add('ar','العربية','ع',
    'اختر اللغة|ابحث عن أدوات للمنزل|بحث|المحفوظات|انتقل إلى المحتوى|إغلاق|الرئيسية|جميع المنتجات|الحمّام|المطبخ|غرفة النوم|غرفة المعيشة|المنزل الذكي|مختارات للمنزل|كيف تتسوّق|مختارات للبيت|خيارات ذكية.|بيت أجمل.|لمسات صغيرة تجعل كل زاوية من بيتك أفضل.|تصفّح الكتالوج|الكتالوج|منتجات للمنزل|اكتشف أدوات عملية تناسب بيتك.|ترتيب المنتجات|المختارة|الاسم تصاعديًا|الاسم تنازليًا|نتائج البحث|لم نجد منتجات مطابقة لبحثك.|اضغط على القلب لحفظ المنتج والعثور عليه هنا.|عرض جميع المنتجات|تسوّق حسب المجموعة|زوايا دافئة|أدوات المطبخ|تصفّح المجموعة|حفظ المنتج|إزالة المنتج من المحفوظات|تم حفظ المنتج.|تمت إزالة المنتج من المحفوظات.|مواصفات توضيحية|عرض على AliExpress|رابط المنتج قيد الإضافة|هذا المنتج ضمن الكتالوج التجريبي. لم يُضف رابط AliExpress بعد.|قد نحصل على عمولة عند الشراء من خلال روابط التسويق بالعمولة.|الصور والمواصفات توضيحية. راجع صفحة البائع للتفاصيل النهائية.|تختار Huyawo Commerce منتجات للمنزل. عند توفر الرابط، يتولى AliExpress الدفع والشحن والمرتجعات.|مختارات من Huyawo للمنزل.|لم نعثر على هذا المنتج.',
    'التصميم|الميزة|الاستخدام',
    `سلّة مهملات بمستشعر|سلّة نحيفة تناسب المكان بجوار المغسلة، بغطاء يفتح دون لمس.|هيكل مستطيل بحواف مستديرة|غطاء بمستشعر حركة|الحمّام أو المغسلة
    موزّع صابون رغوي آلي|موزّع يوضع على السطح ويحوّل الصابون المتوافق إلى رغوة عند تقريب اليد من الفوهة.|موزّع قائم بذاته|فوهة رغوة تعمل دون لمس|مغسلة الحمّام أو المطبخ
    مصباح طاولة بشكل فطر|مصباح بقبّة وضوء ناعم لطاولة السرير أو ركن القراءة.|غطاء على شكل فطر|إضاءة محيطية ناعمة|طاولة السرير أو الرف
    شريط إضاءة أسفل الخزانة|شريط نحيف أسفل الخزانة العلوية يضيء سطح العمل في المطبخ.|تصميم شريطي نحيف|إضاءة عمل بتقنية LED|أسفل خزائن الحائط
    منظّم مؤن دوّار بطابقين|صوانٍ شفافة ودوّارة تُبقي العلب الصغيرة على مرأى العين وفي متناول اليد.|طابقان شفّافان|صوانٍ دوّارة|خزانة المؤن أو سطح العمل
    مكنسة روبوتية صغيرة|مكنسة روبوتية منخفضة الارتفاع لتنظيف الأرضيات يوميًا.|هيكل دائري منخفض|تنظيف آلي للأرضيات|الأرضيات الصلبة`);

  add('fa','فارسی','فا',
    'انتخاب زبان|جست‌وجوی وسایل خانه|جست‌وجو|ذخیره‌شده‌ها|رفتن به محتوای اصلی|بستن|خانه|همه محصولات|حمام|آشپزخانه|اتاق خواب|نشیمن|خانه هوشمند|گزیده‌هایی برای خانه|راهنمای خرید|گزیده وسایل خانه|انتخاب‌های خوب.|خانه‌ای بهتر.|تغییرهای کوچک و کاربردی برای هر گوشه خانه.|دیدن کاتالوگ|کاتالوگ|گزیده وسایل خانه|وسایل کاربردی مناسب خانه‌تان را پیدا کنید.|مرتب‌سازی محصولات|برگزیده‌ها|نام به ترتیب صعودی|نام به ترتیب نزولی|نتایج جست‌وجو|محصولی مطابق با جست‌وجوی شما پیدا نشد.|روی قلب بزنید تا محصول را اینجا پیدا کنید.|دیدن همه محصولات|خرید از مجموعه‌ها|گوشه‌های دنج|دستیارهای آشپزخانه|دیدن مجموعه|ذخیره محصول|حذف از ذخیره‌شده‌ها|محصول ذخیره شد.|محصول از ذخیره‌شده‌ها حذف شد.|مشخصات نمونه|مشاهده در AliExpress|پیوند محصول در انتظار ثبت|این محصول در کاتالوگ نمایشی است. پیوند AliExpress هنوز وارد نشده است.|ممکن است از خریدهای انجام‌شده با پیوندهای همکاری در فروش کمیسیون بگیریم.|تصاویر و مشخصات نمونه هستند. جزئیات نهایی را در صفحه فروشنده بررسی کنید.|Huyawo Commerce محصولات خانه را گلچین می‌کند. پس از فعال شدن پیوند، پرداخت، ارسال و مرجوعی را AliExpress انجام می‌دهد.|وسایل خانه به انتخاب Huyawo.|این محصول پیدا نشد.',
    'طراحی|ویژگی|کاربرد',
    `سطل زباله حسگردار|سطل باریکی که کنار روشویی جا می‌شود و درپوش آن بدون لمس باز می‌شود.|بدنه مستطیلی با گوشه‌های گرد|درپوش با حسگر حرکت|حمام یا کنار روشویی
    فوم‌ساز خودکار صابون|وسیله‌ای رومیزی که وقتی دست را زیر خروجی می‌گیرید، صابون سازگار را به فوم تبدیل می‌کند.|دستگاه رومیزی|خروجی فوم بدون لمس|روشویی حمام یا سینک آشپزخانه
    چراغ رومیزی قارچی|چراغی گنبدی با نور ملایم برای پاتختی یا گوشه مطالعه.|کلاهک قارچی|نور محیطی ملایم|پاتختی یا قفسه
    چراغ نواری زیر کابینت|چراغ باریکی که زیر کابینت دیواری، سطح کار آشپزخانه را روشن می‌کند.|بدنه باریک نواری|نور کاری ال‌ای‌دی|زیر کابینت دیواری
    نظم‌دهنده گردان دوطبقه|سینی‌های شفاف و گردان دسترسی به شیشه‌های کوچک را آسان می‌کنند.|دو طبقه شفاف|سینی‌های گردان|کابینت مواد غذایی یا روی کابینت
    جاروبرقی رباتیک جمع‌وجور|جاروبرقی رباتیک کم‌ارتفاع برای نظافت روزمره کف.|بدنه گرد و کم‌ارتفاع|نظافت خودکار کف|کف‌پوش سخت`);

  add('tr','Türkçe','TR',
    'Dil seçin|Ev ürünlerinde arayın|Ara|Kaydedilenler|İçeriğe atla|Kapat|Ana sayfa|Tüm ürünler|Banyo|Mutfak|Yatak odası|Oturma odası|Akıllı ev|Ev için seçtiklerimiz|Alışveriş nasıl yapılır?|EV VE YAŞAM SEÇKİSİ|İyi keşifler.|Daha güzel bir ev.|Evin her köşesi için küçük ve kullanışlı yenilikler.|Kataloğu keşfet|KATALOG|Ev ve yaşam ürünleri|Evinize uygun pratik ürünleri keşfedin.|Ürünleri sırala|Öne çıkanlar|Ada göre A–Z|Ada göre Z–A|Arama sonuçları|Aramanızla eşleşen ürün bulunamadı.|Bir ürünü burada görmek için kalbe dokunarak kaydedin.|Tüm ürünleri gör|Koleksiyonlara göz at|Sıcacık köşeler|Mutfak yardımcıları|Koleksiyonu keşfet|Ürünü kaydet|Kayıtlı ürünü kaldır|Ürün kaydedildi.|Ürün kayıtlılardan kaldırıldı.|Örnek özellikler|AliExpress’te gör|Ürün bağlantısı bekleniyor|Bu ürün örnek katalogda yer alıyor. AliExpress bağlantısı henüz eklenmedi.|Satış ortaklığı bağlantıları üzerinden yapılan alışverişlerden komisyon alabiliriz.|Görseller ve özellikler örnek amaçlıdır. Güncel ayrıntıları satıcı sayfasından kontrol edin.|Huyawo Commerce ev ve yaşam ürünlerini seçer. Bağlantı etkin olduğunda ödeme, teslimat ve iadeler AliExpress üzerinden yürütülür.|Huyawo’nun ev ve yaşam seçkisi.|Bu ürün bulunamadı.',
    'Tasarım|Özellik|Kullanım',
    `Temassız sensörlü çöp kutusu|Lavabonun yanına sığan ince gövde ve temassız kullanım için sensörlü kapak.|Yuvarlatılmış dikdörtgen gövde|Hareket sensörlü kapak|Banyo veya lavabo yanı
    Otomatik köpük sabunluk|Elinizi ucuna yaklaştırdığınızda uyumlu sabunu köpürten tezgâh üstü sabunluk.|Bağımsız sabunluk|Temassız köpük ucu|Banyo veya mutfak lavabosu
    Mantar masa lambası|Komodin veya okuma köşesi için yumuşak ışıklı kubbe lamba.|Mantar biçimli başlık|Yumuşak ortam ışığı|Komodin veya raf
    Dolap altı ışık çubuğu|Mutfak tezgâhını üst dolabın altından aydınlatan ince çubuk.|İnce çubuk biçimi|LED çalışma aydınlatması|Üst dolapların altı
    İki katlı döner düzenleyici|Küçük kavanozları görünür ve erişilebilir tutan şeffaf döner tepsiler.|İki şeffaf kat|Döner tepsiler|Kiler veya tezgâh
    Kompakt robot süpürge|Günlük zemin temizliği için alçak gövdeli robot süpürge.|Yuvarlak ve alçak gövde|Otomatik zemin temizliği|Sert zemin`);

  add('it','Italiano','IT',
    'Scegli la lingua|Cerca articoli per la casa|Cerca|Salvati|Vai al contenuto|Chiudi|Home|Tutti gli articoli|Bagno|Cucina|Camera da letto|Soggiorno|Casa intelligente|Una selezione per la casa|Come acquistare|SPECIALE CASA|Ottime scoperte.|Meglio a casa.|Piccole idee per rinnovare ogni angolo di casa.|Esplora il catalogo|IL CATALOGO|Scoperte per la casa|Scopri gli articoli pratici per i tuoi spazi.|Ordina prodotti|In evidenza|Nome A–Z|Nome Z–A|Risultati di ricerca|Nessun prodotto corrisponde alla ricerca.|Tocca il cuore per ritrovare i prodotti qui.|Vedi tutti gli articoli|Scopri le collezioni|Angoli accoglienti|Aiutanti in cucina|Esplora la collezione|Salva il prodotto|Rimuovi dai salvati|Prodotto salvato.|Prodotto rimosso dai salvati.|Specifiche di esempio|Vedi su AliExpress|Link del prodotto in arrivo|Questo prodotto fa parte del catalogo dimostrativo. Il link AliExpress non è ancora disponibile.|Potremmo ricevere una commissione sugli acquisti effettuati tramite link di affiliazione.|Immagini e specifiche sono illustrative. Verifica i dettagli sulla pagina del venditore.|Huyawo Commerce seleziona articoli per la casa. Quando il link è disponibile, AliExpress gestisce pagamenti, spedizioni e resi.|Una selezione per la casa a cura di Huyawo.|Prodotto non trovato.',
    'Design|Caratteristica|Uso',
    `Pattumiera con sensore|Pattumiera sottile da mettere vicino al lavabo, con coperchio che si apre senza contatto.|Corpo rettangolare con angoli arrotondati|Coperchio con sensore di movimento|Bagno o lavabo
    Dispenser automatico di schiuma|Dispenser da appoggio che trasforma il sapone compatibile in schiuma avvicinando la mano al beccuccio.|Dispenser da appoggio|Beccuccio senza contatto|Lavabo o lavello
    Lampada da tavolo a fungo|Lampada a cupola con una luce delicata per il comodino o l’angolo lettura.|Paralume a fungo|Luce ambientale tenue|Comodino o mensola
    Barra luminosa sottopensile|Barra sottile da montare sotto il pensile per illuminare il piano di lavoro.|Formato a barra sottile|Illuminazione da lavoro a LED|Sotto i pensili
    Organizer girevole a due ripiani|Vassoi trasparenti e girevoli per tenere i vasetti in vista e a portata di mano.|Due ripiani trasparenti|Vassoi girevoli|Dispensa o piano di lavoro
    Robot aspirapolvere compatto|Robot aspirapolvere ribassato per la pulizia quotidiana dei pavimenti.|Corpo rotondo e ribassato|Pulizia automatica del pavimento|Pavimenti duri`);

  add('fr','Français','FR',
    'Choisir la langue|Rechercher des accessoires pour la maison|Rechercher|Favoris|Aller au contenu|Fermer|Accueil|Toutes les trouvailles|Salle de bain|Cuisine|Chambre|Salon|Maison connectée|Notre sélection pour la maison|Comment acheter|LA SÉLECTION MAISON|De belles trouvailles.|Mieux chez soi.|De petites idées pour améliorer chaque coin de la maison.|Explorer le catalogue|LE CATALOGUE|Trouvailles pour la maison|Découvrez des objets pratiques pour votre intérieur.|Trier les produits|À découvrir|Nom A–Z|Nom Z–A|Résultats de recherche|Aucun produit ne correspond à votre recherche.|Touchez le cœur pour retrouver un produit ici.|Voir toutes les trouvailles|Parcourir les collections|Coins douillets|Les aides en cuisine|Découvrir la collection|Enregistrer le produit|Retirer des favoris|Produit enregistré.|Produit retiré des favoris.|Exemples de caractéristiques|Voir sur AliExpress|Lien du produit en attente|Ce produit fait partie du catalogue de démonstration. Son lien AliExpress n’est pas encore disponible.|Nous pouvons percevoir une commission sur les achats effectués via des liens affiliés.|Les images et caractéristiques sont illustratives. Vérifiez les détails sur la page du vendeur.|Huyawo Commerce sélectionne des articles pour la maison. Lorsque le lien est disponible, AliExpress gère le paiement, la livraison et les retours.|Les trouvailles maison de Huyawo.|Ce produit est introuvable.',
    'Design|Fonction|Usage',
    `Poubelle à ouverture sans contact|Une poubelle étroite à placer près du lavabo, avec un couvercle à capteur.|Corps rectangulaire aux angles arrondis|Couvercle à capteur de mouvement|Salle de bain ou lavabo
    Distributeur automatique de mousse|Un distributeur à poser qui transforme le savon compatible en mousse quand on présente la main.|Distributeur à poser|Bec à mousse sans contact|Lavabo ou évier
    Lampe à poser champignon|Une lampe à dôme à la lumière douce pour la table de chevet ou le coin lecture.|Abat-jour en forme de champignon|Lumière d’ambiance douce|Table de chevet ou étagère
    Barre lumineuse sous meuble|Une barre fine à installer sous un meuble haut pour éclairer le plan de travail.|Barre fine|Éclairage de travail à LED|Sous les meubles hauts
    Rangement rotatif à deux étages|Des plateaux transparents et rotatifs pour garder les petits pots visibles et à portée de main.|Deux étages transparents|Plateaux rotatifs|Placard ou plan de travail
    Robot aspirateur compact|Un robot aspirateur bas pour l’entretien quotidien des sols.|Corps rond et bas|Nettoyage automatique des sols|Sols durs`);

  add('de','Deutsch','DE',
    'Sprache auswählen|Artikel fürs Zuhause suchen|Suchen|Merkliste|Zum Inhalt springen|Schließen|Startseite|Alle Produkte|Bad|Küche|Schlafzimmer|Wohnzimmer|Smart Home|Ausgewählte Artikel fürs Zuhause|So funktioniert der Einkauf|AUSWAHL FÜRS ZUHAUSE|Gute Fundstücke.|Schöner wohnen.|Kleine Verbesserungen für jede Ecke deines Zuhauses.|Katalog entdecken|DER KATALOG|Fundstücke fürs Zuhause|Entdecke praktische Artikel für dein Zuhause.|Produkte sortieren|Empfohlen|Name A–Z|Name Z–A|Suchergebnisse|Zu deiner Suche wurden keine Produkte gefunden.|Tippe auf das Herz, um ein Produkt hier zu finden.|Alle Produkte ansehen|Kollektionen entdecken|Gemütliche Ecken|Küchenhelfer|Kollektion entdecken|Produkt speichern|Produkt von der Merkliste entfernen|Produkt gespeichert.|Produkt von der Merkliste entfernt.|Beispielhafte Eigenschaften|Auf AliExpress ansehen|Produktlink folgt|Dieses Produkt gehört zum Vorschaukatalog. Der AliExpress-Link wurde noch nicht hinzugefügt.|Für Käufe über Affiliate-Links können wir eine Provision erhalten.|Bilder und Angaben dienen als Beispiel. Prüfe die endgültigen Details im Angebot des Verkäufers.|Huyawo Commerce stellt Artikel fürs Zuhause zusammen. Sobald ein Link verfügbar ist, übernimmt AliExpress Zahlung, Versand und Rückgabe.|Fundstücke fürs Zuhause von Huyawo.|Dieses Produkt wurde nicht gefunden.',
    'Ausführung|Merkmal|Verwendung',
    `Abfalleimer mit Sensor|Ein schmaler Eimer für neben das Waschbecken, mit berührungslos öffnendem Deckel.|Rechteckiges Gehäuse mit runden Ecken|Deckel mit Bewegungssensor|Bad oder am Waschbecken
    Automatischer Schaumspender|Ein freistehender Spender, der geeignete Seife aufschäumt, sobald du die Hand darunter hältst.|Freistehender Spender|Berührungslose Schaumdüse|Bad- oder Küchenspüle
    Pilz-Tischleuchte|Eine Kuppelleuchte mit sanftem Licht für den Nachttisch oder die Leseecke.|Pilzförmiger Lampenschirm|Sanftes Stimmungslicht|Nachttisch oder Regal
    Lichtleiste für Unterschrankmontage|Schmale Leiste, die die Arbeitsplatte von der Unterseite eines Hängeschranks beleuchtet.|Schmale Leistenform|LED-Arbeitslicht|Unter Hängeschränken
    Drehbarer Vorratsorganizer|Zwei durchsichtige Drehteller halten kleine Gläser sichtbar und griffbereit.|Zwei durchsichtige Ebenen|Drehbare Ablagen|Vorratsschrank oder Arbeitsplatte
    Kompakter Saugroboter|Ein flacher Saugroboter für die tägliche Bodenpflege.|Rundes, flaches Gehäuse|Automatische Bodenreinigung|Hartböden`);

  add('ru','Русский','РУ',
    'Выбрать язык|Поиск товаров для дома|Поиск|Избранное|Перейти к содержанию|Закрыть|Главная|Все товары|Ванная|Кухня|Спальня|Гостиная|Умный дом|Подборка товаров для дома|Как покупать|ПОДБОРКА ДЛЯ ДОМА|Удачные находки.|Уютнее дома.|Небольшие улучшения для каждого уголка дома.|Открыть каталог|КАТАЛОГ|Находки для дома|Выбирайте практичные вещи для своего дома.|Сортировать товары|Подборка|Название по возрастанию|Название по убыванию|Результаты поиска|По вашему запросу ничего не найдено.|Нажмите на сердечко, чтобы сохранить товар здесь.|Смотреть все товары|Подборки товаров|Уютные уголки|Помощники на кухне|Открыть подборку|Сохранить товар|Убрать из избранного|Товар сохранён.|Товар удалён из избранного.|Пример характеристик|Смотреть на AliExpress|Ссылка появится позже|Этот товар из демонстрационного каталога. Ссылка на AliExpress пока не добавлена.|Мы можем получить комиссию за покупки по партнёрским ссылкам.|Изображения и характеристики приведены для примера. Уточняйте детали на странице продавца.|Huyawo Commerce подбирает товары для дома. Когда ссылка доступна, оплатой, доставкой и возвратами занимается AliExpress.|Товары для дома от Huyawo.|Этот товар не найден.',
    'Дизайн|Особенность|Применение',
    `Сенсорное мусорное ведро|Узкое ведро помещается рядом с раковиной и открывается без прикосновения.|Прямоугольный корпус со скруглёнными углами|Крышка с датчиком движения|Ванная или зона у раковины
    Автоматический дозатор пены|Настольный дозатор превращает подходящее мыло в пену, когда под носик подносят руку.|Отдельно стоящий дозатор|Бесконтактный носик для пены|Раковина в ванной или на кухне
    Настольная лампа «Гриб»|Лампа с куполом даёт мягкий свет для тумбочки или уголка для чтения.|Абажур в форме гриба|Мягкое рассеянное освещение|Тумбочка или полка
    Светильник под кухонный шкаф|Тонкая планка под навесным шкафом освещает рабочую поверхность.|Тонкий линейный корпус|Рабочее светодиодное освещение|Под навесными шкафами
    Двухъярусный вращающийся органайзер|Прозрачные вращающиеся лотки помогают держать маленькие банки на виду и под рукой.|Два прозрачных яруса|Вращающиеся лотки|Шкаф для продуктов или столешница
    Компактный робот-пылесос|Низкий робот-пылесос для повседневной уборки пола.|Круглый низкий корпус|Автоматическая уборка пола|Твёрдые напольные покрытия`);

  add('uk','Українська','УК',
    'Обрати мову|Шукати товари для дому|Пошук|Збережене|Перейти до вмісту|Закрити|Головна|Усі товари|Ванна кімната|Кухня|Спальня|Вітальня|Розумний дім|Добірка товарів для дому|Як купувати|ДОБІРКА ДЛЯ ДОМУ|Вдалі знахідки.|Затишніше вдома.|Невеликі зміни для кожного куточка дому.|Переглянути каталог|КАТАЛОГ|Знахідки для дому|Знаходьте практичні речі для свого дому.|Сортувати товари|Рекомендовані|Назва за зростанням|Назва за спаданням|Результати пошуку|За вашим запитом нічого не знайдено.|Натисніть на серце, щоб зберегти товар тут.|Переглянути всі товари|Колекції товарів|Затишні куточки|Кухонні помічники|Переглянути колекцію|Зберегти товар|Видалити зі збереженого|Товар збережено.|Товар видалено зі збереженого.|Зразок характеристик|Переглянути на AliExpress|Посилання з’явиться пізніше|Цей товар з демонстраційного каталогу. Посилання на AliExpress ще не додано.|Ми можемо отримати комісію за покупки за партнерськими посиланнями.|Зображення й характеристики наведено для прикладу. Уточнюйте деталі в оголошенні продавця.|Huyawo Commerce добирає товари для дому. Коли посилання доступне, оплату, доставку й повернення обробляє AliExpress.|Знахідки для дому від Huyawo.|Цей товар не знайдено.',
    'Дизайн|Особливість|Використання',
    `Сенсорне відро для сміття|Вузьке відро стає поруч з умивальником і відкривається без дотику.|Прямокутний корпус із заокругленими кутами|Кришка з датчиком руху|Ванна або зона умивальника
    Автоматичний дозатор піни|Настільний дозатор спінює сумісне мило, коли під носик піднести руку.|Окремий настільний дозатор|Безконтактний носик для піни|Умивальник або кухонна мийка
    Настільна лампа «Гриб»|Лампа з куполом дає м’яке світло на тумбочці чи в куточку для читання.|Абажур у формі гриба|М’яке розсіяне світло|Приліжкова тумбочка або полиця
    Світлова планка під шафу|Тонка планка під навісною шафою освітлює кухонну стільницю.|Тонкий лінійний корпус|Робоче світлодіодне освітлення|Під навісними шафами
    Двоярусний обертовий органайзер|Прозорі обертові лотки допомагають тримати невеликі баночки на видноті та під рукою.|Два прозорі яруси|Обертові лотки|Комора або стільниця
    Компактний робот-пилосос|Низький робот-пилосос для щоденного догляду за підлогою.|Круглий плаский корпус|Автоматичне прибирання підлоги|Тверді покриття підлоги`);

  add('ja','日本語','日',
    '言語を選択|暮らしのアイテムを検索|検索|お気に入り|本文へ移動|閉じる|ホーム|すべての商品|バスルーム|キッチン|寝室|リビング|スマートホーム|暮らしのセレクト|購入方法|暮らしのセレクト|いいもの発見。|暮らしが変わる。|家のあちこちに、小さな工夫を。|カタログを見る|カタログ|暮らしの便利アイテム|あなたの家に合う実用的なアイテムが見つかります。|並び替え|おすすめ|商品名の昇順|商品名の降順|検索結果|条件に合う商品が見つかりませんでした。|ハートを押すと商品をここに保存できます。|すべての商品を見る|コレクションから探す|くつろぎの空間|キッチンの味方|コレクションを見る|商品を保存|お気に入りから削除|商品を保存しました。|お気に入りから削除しました。|参考仕様|AliExpressで見る|商品リンク準備中|この商品はプレビュー用です。AliExpressへのリンクは準備中です。|アフィリエイトリンク経由の購入により、当サイトが報酬を受け取る場合があります。|画像と仕様は参考例です。最終的な詳細は販売ページでご確認ください。|Huyawo Commerceは暮らしのアイテムを厳選しています。リンク先での購入、配送、返品はAliExpressが取り扱います。|Huyawoが選んだ暮らしのアイテム。|商品が見つかりませんでした。',
    'デザイン|機能|用途',
    `センサー式ゴミ箱|洗面台の横に置きやすいスリムなゴミ箱。センサーで蓋が開きます。|角の丸い長方形の本体|人感センサー付きの蓋|浴室や洗面台のそば
    自動泡ソープディスペンサー|ノズルに手をかざすと、対応するソープが泡になって出ます。|据え置き型|非接触の泡ノズル|洗面台やキッチンのシンク
    きのこ型テーブルランプ|柔らかな光を放つドーム型ランプ。ベッドサイドや読書スペースに。|きのこ型シェード|やさしい間接照明|サイドテーブルや棚
    吊り戸棚下のライトバー|吊り戸棚の下に取り付けて、調理台を明るく照らす薄型ライト。|スリムなバー型|作業用LED照明|吊り戸棚の下
    2段回転式収納ラック|透明な回転トレーで小瓶が見やすく、手に取りやすくなります。|透明な2段構造|回転トレー|食品庫や調理台
    コンパクトロボット掃除機|日々の床掃除に使える薄型ロボット掃除機。|円形の薄型ボディ|床の自動清掃|フローリングなどの硬い床`);

  add('ko','한국어','한',
    '언어 선택|생활용품 검색|검색|저장한 상품|본문으로 건너뛰기|닫기|홈|전체 상품|욕실|주방|침실|거실|스마트 홈|엄선한 생활용품|구매 방법|리빙 셀렉션|좋은 발견.|더 나은 일상.|집 안 곳곳에 작은 변화를 더해 보세요.|카탈로그 둘러보기|카탈로그|일상을 위한 생활용품|내 공간에 어울리는 실용적인 제품을 찾아보세요.|상품 정렬|추천순|이름 오름차순|이름 내림차순|검색 결과|검색과 일치하는 상품이 없습니다.|하트를 눌러 상품을 저장하면 여기에 나타납니다.|전체 상품 보기|컬렉션 둘러보기|아늑한 공간|주방 도우미|컬렉션 보기|상품 저장|저장한 상품에서 제거|상품을 저장했습니다.|저장한 상품에서 제거했습니다.|예시 사양|AliExpress에서 보기|상품 링크 준비 중|이 상품은 미리보기용입니다. AliExpress 링크는 아직 준비 중입니다.|제휴 링크를 통한 구매로 수수료를 받을 수 있습니다.|이미지와 사양은 예시입니다. 정확한 정보는 판매 페이지에서 확인하세요.|Huyawo Commerce는 생활용품을 엄선합니다. 링크가 연결되면 결제, 배송 및 반품은 AliExpress에서 처리합니다.|Huyawo가 고른 생활용품.|상품을 찾을 수 없습니다.',
    '디자인|기능|용도',
    `센서형 쓰레기통|세면대 옆에 놓기 좋은 슬림한 쓰레기통으로, 뚜껑이 센서로 열립니다.|모서리가 둥근 직사각형 본체|동작 감지 뚜껑|욕실 또는 세면대 옆
    자동 거품 디스펜서|손을 노즐 아래에 대면 호환 비누가 거품으로 나오는 디스펜서입니다.|탁상형 디스펜서|비접촉식 거품 노즐|욕실 세면대 또는 주방 싱크대
    버섯 모양 테이블 조명|협탁이나 독서 공간에 부드러운 빛을 더하는 돔형 조명입니다.|버섯 모양 갓|은은한 간접 조명|협탁 또는 선반
    상부장 하단 조명 바|주방 상부장 아래에 설치해 조리대를 비추는 슬림 조명입니다.|슬림한 바 형태|작업용 LED 조명|상부장 아래
    2단 회전 수납 트레이|투명하고 회전하는 트레이로 작은 병을 쉽게 보고 꺼낼 수 있습니다.|투명한 2단 구조|회전 트레이|식료품장 또는 조리대
    소형 로봇청소기|매일 바닥 청소에 쓰기 좋은 낮은 높이의 로봇청소기입니다.|낮은 원형 본체|자동 바닥 청소|단단한 바닥재`);

  window.LOCALES = out;
  window.SPEC_LABELS = specs;
})();
