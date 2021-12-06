import { getSanityClient } from './sanity';

/*  ------------------------------ */
/*  Global Site Queries
/*  ------------------------------ */

// Construct our "menu items" GROQ
const link = `
  _key,
  _type,
  title,
  url,
  "page": page->{"type": _type, "slug": slug.current}
`;

// Construct our "image meta" GROQ
export const imageMeta = `
  alt,
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`;

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{"type": _type, "slug": slug.current}
    }
  },
  _type == "figure" => {
    ${imageMeta}
  }
`;

// Construct our "product" GROQ
const product = `
  {
    "slug": slug.current,
    "id": productID,
    title,
    price,
    comparePrice,
    mainImage {
      ${imageMeta}
    },
    productType,
    displayNewBadge,
    inStock,
    lowStock,
    options[]{
      name,
      position,
      values[]
    },
    optionSettings[]{
      forOption,
      color
    },
    "variants": *[_type == "productVariant" && productID == ^.productID && wasDeleted != true && isDraft != true]{
      "id": variantID,
      title,
      price,
      displayNewBadge,
      comparePrice,
      inStock,
      lowStock,
      options[]{
        name,
        position,
        value
      },
      seo
    },
  }
`;

// Construct our "blocks" GROQ
export const blocks = `
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${ptContent}
      }
    }
  },
  _type == 'productCard' => {
    _type,
    _key,
    product->${product}
  },
  _type == "figure" => {
    _type,
    _key,
    ${imageMeta}
  }
`;

// Construct our content "modules" GROQ
export const modules = `
  _type == 'grid' => {
    _type,
    _key,
    size,
    columns[]{
      sizes[]{
        breakpoint,
        width,
        justify,
        align,
        start
      },
      blocks[]{
        ${blocks}
      }
    }
  },
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'hero' => {
    _type,
    _key,
    footerContent{
      footerText,
      footerImage {
        "image": asset->url,
        alt
      }
    },
    content[]{
      ${ptContent}
    },
    bgType,
    photos{
      ...,
      mobilePhoto{
        ${imageMeta}
      },
      desktopPhoto{
        ${imageMeta}
      }
    },
    video{
      id,
      title
    }
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${imageMeta}
    }
  },
  _type == 'newsletter' => {
    _type,
    _key,
    title,
    subTitle,
    submit,
    successMsg[]{
      ${ptContent}
    },
    errorMsg[]{
      ${ptContent}
    }
  },
  _type == 'contactForm' => {
    _type,
    _key,
    formType
  },
  _type == 'assetDownload' => {
    _type,
    _key,
    title,
    submit,
    asset,
    "assetUrl": asset->url
  },
  _type == 'quote' => {
    _type,
    _key,
    text,
    author
  },
  _type == 'productsGrid' => {
    _type,
    _key,
    title,
    subtitle,
    showCta,
    products[wasDeleted != true && isDraft != true]->${product},
  },
  _type == 'productHero' => {
    _type,
    _key,
  },
  _type == 'collectionGrid' => {
    _type,
    _key,
  },
  _type == 'recipesList' => {
    _type,
    _key,
    title,
    subtitle,
    maxNumber,
    "recipes": *[_type == "recipePage"] | order(title asc)[]{
      title,
      image {
        ${imageMeta}
      },
      "slug": slug.current
    }
  },
  _type == 'ourTeam' => {
    _type,
    _key,
    title,
    teamMembers[]{
      name,
      content[]{
        ${ptContent}
      },
      image {
        ${imageMeta}
      },
    }
  },
  _type == 'productActions' => {
    _type,
    _key,
    textAlign,
  },
`;

// All Products
export const allProducts = (preview) => `
  *[_type == "product" && wasDeleted != true && isDraft != true${
    preview?.active ? ' && _id in path("drafts.**")' : ''
  }]${product} | order(title asc)
`;

// Construct our "site" GROQ
const site = `
  "site": {
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "cart": *[_type == "cartSettings"][0]{
      storeURL,
      message
    },
    "productCounts": [ {"slug": "all", "count": count(*[_type == "product"])} ] + *[_type == "collection"]{
      "slug": slug.current,
      "count": count(products)
    },
    "cookieConsent": *[_type == "cookieSettings"][0]{
      message,
      "link": link->{"type": _type, "slug": slug.current}
    },
    "header": *[_type == "headerSettings"][0]{
      "navItems": mainNavigationMenu[]{
        ${link}
      },
      socialMedia
    },
    "footer": *[_type == "footerSettings"][0]{
      headquartersAddress,
      "navItems": footerNavigation[]{
        ${link}
      },
      "accreditationLogos": accreditationLogos[]{
        accreditationURL,
        "image": accreditationImage.asset->url,
        "alt": accreditationImage.alt
      }
    },
    "seo": *[_type == "seoSettings"][0]{
      siteTitle,
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic
    },
  }
`;

/*  ------------------------------ */
/*  Sanity API Functions
/*  ------------------------------ */

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}"]{ "slug": slug.current }`
  );
  return data;
}

// Fetch all our page redirects
export async function getAllRedirects() {
  const data = await getSanityClient().fetch(
    `*[_type == "redirect"]{ from, to }`
  );
  return data;
}

// Fetch a static page with our global data
export async function getStaticPage(pageData, preview) {
  const query = `
  {
    "page": ${pageData},
    ${site}
  }
  `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}

// Fetch a specific dynamic page with our global data
export async function getPage(slug, preview) {
  const slugs = [`/${slug}`, slug, `/${slug}/`];

  const query = `
    {
      "page": *[_type == "page" && slug.current in ${JSON.stringify(
        slugs
      )}] | order(_updatedAt desc)[0]{
        hasTransparentHeader,
        title,
        subtitle,
        "introText": {
          "content": introText
        },
        image {
          ${imageMeta}
        },
        modules[]{
          ${modules}
        },
        seo
      },
      ${site}
    }
    `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}

// Fetch a specific product with our global data
export async function getProduct(slug, preview) {
  const query = `
    {
      "page": *[_type == "product" && slug.current == "${slug}" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)[0]{
        modules[]{
          ${modules}
        },
        description,
        nutritionInformation,
        "product": ${product},
        seo
      },
      ${site}
    }
  `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}

// Fetch a specific collection with our global data
export async function getCollection(slug, preview) {
  const query = `
    {
      "page": *[_type == "collection" && slug.current == "${slug}"] | order(_updatedAt desc)[0] {
        "shopPageTitle": *[_type == "shopPage"] | order(_updatedAt desc)[0].title,
        "collections": *[_type == "collection"] | order(_updatedAt desc){title, "slug": slug.current}, 
        modules[]{
          ${modules}
        },
        products[wasDeleted != true && isDraft != true${
          preview?.active ? ' && _id in path("drafts.**")' : ''
        }]->${product},
        seo
      },
      ${site}
    }
  `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}

// SendGrid Post function, used by our API route (so we don't expose our API key)
export async function postEmail(apiKey, data) {
  const {
    formName = 'Contact Form',
    fromAddress,
    notificationEmails,
    templateID,
    name,
    email,
    subject,
    message,
  } = data;

  const toAddresses = notificationEmails.map((email) => ({
    email: email,
  }));

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      personalizations: [
        {
          to: toAddresses,
          subject: subject,
          dynamic_template_data: {
            formName: formName,
            name: name,
            email: email,
            subject: subject,
            message: message,
          },
        },
      ],
      from: {
        email: fromAddress,
      },
      template_id: templateID,
    },
    url: 'https://api.sendgrid.com/v3/mail/send',
  };

  const post = await axios(options)
    .then((response) => {
      console.log('SendGrid Success');
      return response;
    })
    .catch((err) => {
      console.log('SendGrid Failed');
      return err.response;
    });

  return post;
}

// Fetch a specific recipe with our global data
export async function getRecipe(slug, preview) {
  const query = `
    {
      "page": *[_type == "recipePage" && slug.current == "${slug}"] | order(_updatedAt desc)[0]{
        title,
        instructions,
        ingredientLists[] {
          _key,
          title,
          "ingredients": ingredients,
          "ingredientProducts": ingredientProducts[] {
            beforeText,
            afterText,
            product->${product}
          },
        },
        "introText": {
          "content": introText
        },
        subtitle,
        image {
          ${imageMeta}
        },
        "otherRecipes": {
          "title": otherRecipes.title,
          "subtitle": otherRecipes.subtitle,
          "maxNumber": otherRecipes.maxNumber,
          "recipes": *[_type == "recipePage" && slug.current != "${slug}"] | order(title asc)[]{
            title,
            image {
              ${imageMeta}
            },
            "slug": slug.current
          }
        },
        seo
      },
      ${site}
    }
  `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}
