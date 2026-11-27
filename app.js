(() => {
  'use strict';
  const { CATALOG, LOCALES, SPEC_LABELS, EMBEDDED_ASSETS } = window;
  const $ = (id) => document.getElementById(id);
  const main = $('main');
  const modal = $('modal');
  const portable = document.body.dataset.mode === 'portable';
  const root = new URL(document.body.dataset.root, location.href);
  const productIds = new Set(CATALOG.map(product => product.id));
  const rooms = ['all','bath','kitchen','bed','living','smart'];
  const collections = { cozy: ['bed','living'], kitchenEdit: ['kitchen'] };
  const symbols = {
    sparkle: '<path d="M12 2c0 5-2 8-7 9 5 1 7 4 7 9 0-5 2-8 7-9-5-1-7-4-7-9ZM4 3v4m-2-2h4m14 11v5m-2.5-2.5h5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    search: '<circle cx="10.6" cy="10.6" r="6.5"/><path d="m15.4 15.4 4.5 4.5"/>',
    heart: '<path d="M20.8 8.8c0 4.3-8.8 9.3-8.8 9.3s-8.8-5-8.8-9.3c0-4.5 5.8-6 8.8-1.7 3-4.3 8.8-2.8 8.8 1.7Z"/>',
    down: '<path d="m5 9 7 7 7-7"/>',
    next: '<path d="m9 5 7 7-7 7"/>',
    all: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    bath: '<path d="M2.5 13h19m-17 0v-6a3 3 0 0 1 6 0v1m-6 5v2a4 4 0 0 0 4 4h7a4 4 0 0 0 4-4v-2m-13 6-1 2m12-2 1 2m-10-13h4"/>',
    kitchen: '<path d="M3 9h18v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V9ZM2 9h20M7 5h10m-5 0V3"/>',
    bed: '<path d="M3 19V6m18 13v-5a3 3 0 0 0-3-3h-7v5M3 16h18M6 13v-2a2 2 0 1 1 4 0v2H6Z"/>',
    living: '<path d="M6 13V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M5 17v2m14-2v2M5 17h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-4 0v1H7v-1a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2Z"/>',
    smart: '<path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z"/>',
    bag: '<path d="M5 8h14l2 13H3L5 8Zm4 0V6a3 3 0 0 1 6 0v2"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    external: '<path d="M13 4h7v7m0-7-9 9m6 0v6H5V7h6"/>'
  };
  function icon(name, classes = '') {
    return `<svg class="${classes}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${symbols[name]}</svg>`;
  }
  function escape(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }
  function storage(key, value) {
    try {
      if (value === undefined) return localStorage.getItem('huyawo-' + key);
      localStorage.setItem('huyawo-' + key, value);
    } catch {
      return null;
    }
    return null;
  }
  function readSaved() {
    try {
      const value = JSON.parse(storage('favorites') || '[]');
      return new Set(Array.isArray(value) ? value.filter(id => productIds.has(id)) : []);
    } catch {
      return new Set();
    }
  }
  function asset(name) {
    return EMBEDDED_ASSETS?.[name] || new URL('assets/' + name, root).href;
  }

  let saved = readSaved();
  let sort = 'featured';
  let locale = 'en';
  let copy = LOCALES.en.ui;
  let route;
  let opener;

  function parseRoute(url) {
    const params = portable ? new URLSearchParams(url.hash.slice(1)) : url.searchParams;
    const productPath = portable ? '' : url.pathname.slice(root.pathname.length);
    const product = portable ? params.get('product') : productPath.match(/^products\/([a-z-]+)\/(?:index\.html)?$/)?.[1];
    const category = params.get('room');
    const collection = params.get('collection');
    const language = params.get('lang');
    const query = params.get('q')?.trim().slice(0,120) || '';
    const s = params.get('saved') === '1';
    const room = rooms.includes(category) ? category : '';
    const edit = Object.hasOwn(collections, collection) ? collection : '';
    return {
      product: product || '',
      saved: s, query, room, collection: edit,
      catalog: !product && !s && !query && !room && !edit && params.get('view') === 'catalog',
      lang: Object.hasOwn(LOCALES, language) ? language : ''
    };
  }
  function urlFor(destination = {}, lang = locale) {
    const path = !portable && destination.product ? `products/${destination.product}/` : '';
    const url = portable ? new URL(location.href) : new URL(path, root);
    const params = new URLSearchParams();
    params.set('lang',lang);
    if (portable && destination.product) params.set('product',destination.product);
    if (destination.saved) params.set('saved','1');
    if (destination.query) params.set('q',destination.query);
    if (destination.room) params.set('room',destination.room);
    if (destination.collection) params.set('collection',destination.collection);
    if (destination.catalog && portable) params.set('view','catalog');
    if (portable) url.hash = params.toString();
    else {
      url.search = params.toString();
      if (destination.catalog) url.hash = 'catalog';
    }
    return url;
  }
  function href(destination) { return escape(urlFor(destination).href); }
  function itemCopy(product) { return LOCALES[locale].products[CATALOG.indexOf(product)]; }
  function linkedAffiliate(product) {
    try {
      const url = new URL(product.affiliateUrl);
      const host = url.hostname.toLowerCase();
      if (url.protocol === 'https:' && !url.username && !url.password &&
        (host === 'aliexpress.com' || host.endsWith('.aliexpress.com') ||
         host === 'aliexpress.us' || host.endsWith('.aliexpress.us'))) return url.href;
    } catch {
      return '';
    }
    return '';
  }
  function brand() {
    return `<a class="brand" data-nav href="${href()}" aria-label="Huyawo Commerce">
      <img src="${asset('brand.png')}" alt="" width="44" height="44">
      <img class="wordmark" src="${asset('wordmark.webp')}" alt="" width="100" height="27">
    </a>`;
  }
  function chrome() {
    $('skip').textContent = copy.skip;
    $('ribbon').innerHTML = `<div class="shell ribbon-inner"><p>${icon('sparkle')}${copy.ribbon}</p><button class="text-button" data-dialog="about">${copy.about}</button></div>`;
    $('header').innerHTML = `<div class="shell header-inner">
      ${brand()}
      <form class="search" role="search">
        ${icon('search')}
        <label class="sr-only" for="search-box">${copy.searchHint}</label>
        <input type="search" name="q" id="search-box" placeholder="${escape(copy.searchHint)}" maxlength="120" value="${escape(route.query)}">
        <button class="search-submit" type="submit">${copy.search}</button>
      </form>
      <div class="tools">
        <button class="tool" data-dialog="language" aria-haspopup="dialog" aria-label="${escape(copy.language)}">
          ${icon('globe')}<span class="language-name" dir="auto">${LOCALES[locale].short}</span>${icon('down','chevron')}
        </button>
        <a class="tool" id="saved-nav" data-nav href="${href({saved:true})}" aria-label="${escape(copy.saved)}"${route.saved ? ' aria-current="page"' : ''}>
          ${icon('heart')}<span class="saved-label">${copy.saved}</span><span class="saved-count" id="saved-count" aria-hidden="true">${saved.size || ''}</span>
        </a>
      </div>
    </div>`;
    $('footer').innerHTML = `<div class="shell footer-inner">
      <div class="footer-brand"><img src="${asset('brand.png')}" alt="" width="42" height="42"><div><strong>Huyawo Commerce</strong><p>${copy.footer}</p></div></div>
      <nav>
        <a data-nav href="${href({catalog:true})}">${copy.browse}</a>
        <button class="text-button" data-dialog="about">${copy.about}</button>
      </nav>
      <p class="disclosure">${copy.affiliate}</p>
    </div>`;
  }
  function roomNav() {
    return `<nav class="quick-nav" aria-label="${escape(copy.browse)}">${rooms.map(room => `
      <a class="quick" data-nav href="${href(room === 'all' ? {catalog:true} : {room})}"
        ${room === route.room ? 'aria-current="true"' : ''}>
        <span class="quick-icon">${icon(room)}</span><span>${copy[room]}</span>
      </a>`).join('')}</nav>`;
  }
  function heart(product, detail = false) {
    const active = saved.has(product.id);
    const label = active ? copy.remove : copy.save;
    return `<button type="button" class="${detail ? 'button button-secondary saved-action' : 'heart'}"
      data-save="${product.id}" aria-label="${escape(label + ': ' + itemCopy(product).title)}" aria-pressed="${active}">
      ${icon('heart')}${detail ? `<span>${label}</span>` : ''}
    </button>`;
  }
  function card(product) {
    const word = itemCopy(product);
    return `<article class="product">
      <a class="product-link" data-nav href="${href({product:product.id})}">
        <img src="${asset(product.id + '.webp')}" alt="" loading="lazy" width="448" height="560">
        <span class="product-copy"><span>${copy[product.room]}</span><strong>${escape(word.title)}</strong></span>
      </a>${heart(product)}
    </article>`;
  }
  function sectionHead(title, options = {}) {
    const {tag = '', note = '', sorted = false, heading = 'h2'} = options;
    const sortItems = ['featured','az','za'];
    return `<div class="section-head"><div>
      ${tag ? `<div class="eyebrow">${icon('sparkle')}${tag}</div>` : ''}
      <${heading}>${title}</${heading}>${note ? `<p>${note}</p>` : ''}
    </div>${sorted ? `<label class="sort"><span class="sr-only">${copy.sort}</span><select id="sort">
      ${sortItems.map(key => `<option value="${key}"${key === sort ? ' selected' : ''}>${copy[key]}</option>`).join('')}
    </select>${icon('down')}</label>` : ''}</div>`;
  }
  function normalize(word, code) {
    return word.toLocaleLowerCase(code).normalize('NFKD')
      .replace(/(\p{Script=Latin})\p{Mark}+/gu,'$1')
      .replace(/\u200c/gu,' ');
  }
  function catalogResults() {
    const terms = normalize(route.query,locale).split(/\s+/).filter(Boolean);
    const results = CATALOG.filter((product,i) => {
      if (route.saved) return saved.has(product.id);
      if (route.room === 'smart' && !product.smart) return false;
      if (route.room && route.room !== 'smart' && route.room !== 'all' && product.room !== route.room) return false;
      if (route.collection && !collections[route.collection].includes(product.room)) return false;
      if (!terms.length) return true;
      const current = itemCopy(product);
      const english = LOCALES.en.products[i];
      const haystack = normalize([
        current.title,current.info,...current.values,copy[product.room],
        english.title,english.info,LOCALES.en.ui[product.room],product.smart ? copy.smart : ''
      ].join(' '),locale);
      return terms.every(term => haystack.includes(term));
    });
    if (sort !== 'featured') {
      const collator = new Intl.Collator(locale);
      const direction = sort === 'az' ? 1 : -1;
      results.sort((a,b) => direction * collator.compare(itemCopy(a).title,itemCopy(b).title));
    }
    return results;
  }
  function empty(message) {
    return `<div class="empty"><p>${message}</p><a class="button button-primary" data-nav href="${href({catalog:true})}">${copy.allProducts}</a></div>`;
  }
  function renderResults() {
    const results = catalogResults();
    return results.length ? `<div class="grid">${results.map(card).join('')}</div>` :
      empty(route.saved ? copy.emptySaved : copy.emptySearch);
  }
  function collectionCard(key,id, tag) {
    return `<a class="collection" data-nav href="${href({collection:key})}">
      <img src="${asset(id + '.webp')}" width="800" height="800" alt="" loading="lazy">
      <div class="collection-copy"><div class="eyebrow">${copy[tag]}</div>
        <h3>${copy[key]}</h3><span class="collection-cta">${copy.explore}</span>
      </div>
    </a>`;
  }
  function home() {
    return `<div class="home"><section class="hero" aria-labelledby="hero-title">
      <img class="hero-picture" src="${asset('panda.webp')}" alt="" width="1440" height="810" fetchpriority="high">
      <div class="hero-copy">
        <div class="eyebrow">${icon('sparkle')}${copy.heroTag}</div>
        <h1 id="hero-title"><span>${copy.heroA}</span><span>${copy.heroB}</span></h1>
        <p>${copy.heroBody}</p>
        <a class="button button-cream" data-nav href="${href({catalog:true})}">${icon('all')}${copy.browse}</a>
      </div>
    </section>
    ${roomNav()}
    <section class="catalog" id="catalog" tabindex="-1">
      ${sectionHead(copy.catalog, {tag:copy.catalogTag,note:copy.catalogBody,sorted:true})}
      <div id="results">${renderResults()}</div>
    </section>
    <section class="collections">${sectionHead(copy.collections)}
      <div class="collection-grid">${collectionCard('cozy','snow-leopard','bed')}${collectionCard('kitchenEdit','golden-monkey','kitchen')}</div>
    </section></div>`;
  }
  function productPage(product) {
    const word = itemCopy(product);
    const url = linkedAffiliate(product);
    return `<div class="subpage">
      <nav class="breadcrumb">
        <a data-nav href="${href()}">${copy.home}</a>${icon('next')}
        <a data-nav href="${href({room:product.room})}">${copy[product.room]}</a>${icon('next')}
        <span aria-current="page">${escape(word.title)}</span>
      </nav>
      <article class="detail">
        <img class="detail-picture" src="${asset(product.id + '.webp')}" alt="${escape(word.title)}" width="448" height="560" fetchpriority="high">
        <div class="detail-copy">
          <div class="eyebrow">${icon(product.room)}${copy[product.room]}</div>
          <h1>${escape(word.title)}</h1>
          <p>${escape(word.info)}</p>
          <div class="detail-actions">
            ${url ? `<a class="button button-primary" href="${escape(url)}" rel="sponsored noopener">${icon('external')}${copy.view}</a>` :
              `<button class="button button-primary" data-dialog="pending" aria-describedby="product-note">${icon('external')}${copy.view}</button>`}
            ${heart(product,true)}
          </div>
          <p class="note" id="product-note">${url ? copy.affiliate : copy.soon}</p>
          <section class="specs">
            <h2>${copy.specs}</h2>
            <dl>${SPEC_LABELS[locale].map((label,i) => `<div><dt>${label}</dt><dd>${escape(word.values[i])}</dd></div>`).join('')}</dl>
          </section>
        </div>
      </article>
      <p class="listing-note">${copy.demo}</p>
    </div>`;
  }
  function render({ focus = false, animate = true } = {}) {
    route = parseRoute(new URL(location.href));
    locale = route.lang || (Object.hasOwn(LOCALES,storage('language')) ? storage('language') : 'en');
    copy = LOCALES[locale].ui;
    document.documentElement.lang = locale;
    document.documentElement.dir = ['ar','fa'].includes(locale) ? 'rtl' : 'ltr';
    const product = CATALOG.find(item => item.id === route.product);
    const title = product ? itemCopy(product).title : route.saved ? copy.saved :
      route.query ? copy.results : route.collection ? copy[route.collection] :
      route.room ? copy[route.room] : copy.catalog;
    document.title = `${title} | Huyawo Commerce`;
    document.querySelector('meta[name=description]').content = product ? itemCopy(product).info : copy.heroBody;
    chrome();

    if (product) main.innerHTML = productPage(product);
    else if (route.product) main.innerHTML = `<div class="subpage">${sectionHead(copy.missing,{heading:'h1'})}${empty(copy.catalogBody)}</div>`;
    else if (route.saved || route.query || route.room || route.collection) {
      const showRooms = !route.saved && !route.query;
      const note = route.query ? `<bdi>${escape(route.query)}</bdi>` : '';
      main.innerHTML = `<div class="subpage">${showRooms ? roomNav() : ''}
        ${sectionHead(title,{note,heading:'h1',sorted:true})}<div id="results">${renderResults()}</div>
      </div>`;
    } else main.innerHTML = home();

    if (animate) {
      main.classList.remove('view-enter');
      requestAnimationFrame(() => main.classList.add('view-enter'));
    }
    if ((route.catalog || location.hash === '#catalog') && $('catalog')) {
      if (focus) $('catalog').focus({preventScroll:true});
      $('catalog').scrollIntoView({behavior: 'instant'});
    } else if (focus) {
      window.scrollTo({top:0,behavior:'instant'});
      main.focus({preventScroll:true});
    }
  }
  function navigate(url, options = {}) {
    if (url.href !== location.href) history[options.replace ? 'replaceState' : 'pushState'](null,'',url);
    render({focus:true});
  }
  function dialog(type, trigger) {
    opener = trigger;
    let title = copy.about;
    let contents = `<p>${copy.aboutBody}</p><p>${copy.affiliate}</p><p>${copy.demo}</p>`;
    if (type === 'pending') {
      title = copy.soon;
      contents = `<p>${copy.pending}</p>`;
    } else if (type === 'language') {
      title = copy.language;
      contents = `<div class="languages">${Object.entries(LOCALES).map(([code,option]) =>
        `<button type="button" data-lang="${code}" lang="${code}" dir="auto" aria-pressed="${locale === code}">${option.name}</button>`
      ).join('')}</div>`;
    }
    modal.innerHTML = `<div class="modal-body"><div class="modal-head"><h2 id="modal-title">${title}</h2>
      <button type="button" class="tool" data-close aria-label="${escape(copy.close)}" autofocus>${icon('close')}</button>
      </div>${contents}</div>`;
    modal.showModal();
  }
  modal.addEventListener('close', () => {
    if (opener?.isConnected) opener.focus();
  });
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });
  function toggleSave(button) {
    const product = CATALOG.find(item => item.id === button.dataset.save);
    if (!product) return;
    const wasSaved = saved.delete(product.id);
    if (!wasSaved) saved.add(product.id);
    storage('favorites',JSON.stringify([...saved]));
    $('saved-count').textContent = saved.size || '';
    if (route.saved) {
      const oldButtons = [...document.querySelectorAll('[data-save]')];
      const index = oldButtons.indexOf(button);
      $('results').innerHTML = renderResults();
      const next = [...document.querySelectorAll('[data-save]')];
      (next[index] || next[index - 1] || $('results').querySelector('a'))?.focus();
    } else {
      const replacement = document.createElement('template');
      replacement.innerHTML = heart(product,button.classList.contains('saved-action'));
      const updated = replacement.content.firstElementChild;
      button.replaceWith(updated);
      updated.focus({preventScroll:true});
    }
    $('status').textContent = wasSaved ? copy.removed : copy.added;
  }
  document.addEventListener('click', event => {
    const element = event.target.closest('[data-nav],[data-dialog],[data-close],[data-lang],[data-save],#skip');
    if (!element) return;
    if (element.id === 'skip') {
      event.preventDefault();
      main.focus();
      main.scrollIntoView({block:'start'});
    } else if (element.matches('[data-nav]')) {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(new URL(element.href));
    } else if (element.matches('[data-dialog]')) dialog(element.dataset.dialog,element);
    else if (element.matches('[data-close]')) modal.close();
    else if (element.matches('[data-save]')) toggleSave(element);
    else if (element.matches('[data-lang]')) {
      const next = element.dataset.lang;
      storage('language',next);
      modal.close();
      navigate(urlFor({...route,catalog:route.catalog || location.hash === '#catalog'},next),{replace:true});
      document.querySelector('[data-dialog=language]').focus({preventScroll:true});
    }
  });
  document.addEventListener('submit', event => {
    if (!event.target.matches('.search')) return;
    event.preventDefault();
    const query = new FormData(event.target).get('q').trim().slice(0,120);
    navigate(urlFor(query ? {query} : {catalog:true}));
  });
  document.addEventListener('change',event => {
    if (event.target.id !== 'sort') return;
    sort = event.target.value;
    $('results').innerHTML = renderResults();
  });
  window.addEventListener('popstate', () => render({animate:false}));
  window.addEventListener('storage', event => {
    if (event.key !== 'huyawo-favorites') return;
    saved = readSaved();
    render({animate:false});
  });
  if (history.scrollRestoration) history.scrollRestoration = 'auto';
  render({animate:false});
})();
