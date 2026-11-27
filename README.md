# Huyawo Commerce

Static Home & Living affiliate storefront. English is the default. It includes 15 additional translations, right-to-left Arabic and Persian, six product pages, collections, search, category filtering, sorting and locally saved products.

## Preview

The separate standalone `index.html` opens offline in a browser. The ZIP is the editable, deployment-ready source. Its product pages and navigation use relative URLs and work from a GitHub Pages project subdirectory.

## Products and affiliate links

- `catalog.js` defines product order, categories and the `affiliateUrl` field. Fill in the approved HTTPS URL for each exact product. An empty field opens a preview notice.
- `locales.js` contains UI labels, collection copy, names, descriptions and example specifications in all 16 languages.
- Replace example specifications and imagery with material that matches the exact listing before launch. The supplied catalog illustrations depict sample products.
- Before launch, update the affiliate disclosure and preview wording in `locales.js` to match the live catalog. Clicks with configured URLs go directly to the respective AliExpress link.
- The website stores language and saved products in the browser. It requires no external fonts, CDNs, analytics or server.

## GitHub Pages

When ready to publish, extract the ZIP contents at the repository root. In **Settings → Pages**, choose **Deploy from a branch**, then the desired branch and **/(root)**. Include `.nojekyll` and keep the file structure. No build step is required.

[GitHub Pages publishing documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
