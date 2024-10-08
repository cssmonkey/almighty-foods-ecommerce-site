import S from '@sanity/desk-tool/structure-builder';

import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';

import {
  FiAnchor,
  FiHome,
  FiSettings,
  FiGlobe,
  FiAlertOctagon,
  FiNavigation,
  FiRepeat,
  FiShoppingCart,
  FiGift,
  FiCopy,
  FiTag,
  FiCheckSquare,
  FiBook,
  FiBookOpen,
  FiMap,
  FiMail
} from 'react-icons/fi';

import SeoPreview from './components/previews/seo/seo-preview';

const remoteURL = 'https://insane.codes';
const localURL = 'http://localhost:3000';
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL;

const hiddenDocTypes = listItem =>
  ![
    'homePage',
    'shopPage',
    'errorPage',
    'page',
    'product',
    'productVariant',
    'collection',
    'allRecipesPage',
    'recipePage',
    'recipeIngredients',
    'stockistsPage',
    'productType',

    'generalSettings',
    'cookieSettings',
    'promoSettings',
    'headerSettings',
    'footerSettings',
    'cartSettings',
    'seoSettings',

    'siteSettings',
    'redirect',
    'contactEnquiry',
    'wholesaleContactEnquiry'
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('General')
                .child(
                  S.editor()
                    .id('generalSettings')
                    .schemaType('generalSettings')
                    .documentId('generalSettings')
                )
                .icon(FiSettings),
              S.listItem()
                .title('Cookie Consent')
                .child(
                  S.editor()
                    .id('cookieSettings')
                    .schemaType('cookieSettings')
                    .documentId('cookieSettings')
                )
                .icon(FiCheckSquare),
              S.listItem()
                .title('Promo Bar')
                .child(
                  S.editor()
                    .id('promoSettings')
                    .schemaType('promoSettings')
                    .documentId('promoSettings')
                )
                .icon(FiTag),
              S.listItem()
                .title('Header')
                .child(
                  S.editor()
                    .id('headerSettings')
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                )
                .icon(FiNavigation),
              S.listItem()
                .title('Footer')
                .child(
                  S.editor()
                    .id('footerSettings')
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                )
                .icon(FiAnchor),
              S.listItem()
                .title('Cart')
                .child(
                  S.editor()
                    .id('cartSettings')
                    .schemaType('cartSettings')
                    .documentId('cartSettings')
                )
                .icon(FiShoppingCart),
              S.listItem()
                .title('Error Page')
                .child(
                  S.editor()
                    .id('errorPage')
                    .schemaType('errorPage')
                    .documentId('errorPage')
                )
                .icon(FiAlertOctagon),
              S.listItem()
                .title('Default SEO / Share')
                .child(
                  S.editor()
                    .id('seoSettings')
                    .schemaType('seoSettings')
                    .documentId('seoSettings')
                )
                .icon(FiGlobe),
              S.listItem()
                .title('Redirects')
                .child(S.documentTypeList('redirect').title('Redirects'))
                .icon(FiRepeat),
              S.listItem()
                .title('Customer contact enquiries')
                .child(
                  S.documentTypeList('contactEnquiry').title(
                    'Customer contact enquiries'
                  )
                )
                .icon(FiMail),
              S.listItem()
                .title('Wholesale contact enquiries')
                .child(
                  S.documentTypeList('wholesaleContactEnquiry').title(
                    'Wholesale contact enquiries'
                  )
                )
                .icon(FiMail)
            ])
        )
        .icon(FiSettings),
      S.divider(),
      S.listItem()
        .title('Home')
        .child(
          S.document()
            .title('Home Page')
            .id('homePage')
            .documentId('homePage')
            .schemaType('homePage')
            .views([
              S.view.form().icon(EditIcon),
              S.view
                .component(SeoPreview)
                .options({ previewURL })
                .icon(EyeIcon)
                .title('SEO Preview')
            ])
        )
        .icon(FiHome),
      S.divider(),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('page')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(SeoPreview)
                    .options({ previewURL })
                    .icon(EyeIcon)
                    .title('SEO Preview')
                ])
            )
        ),
      S.divider(),
      S.listItem()
        .title('Shop')
        .id('shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.listItem()
                .title('Products')
                .icon(FiGift)
                .child(
                  S.documentTypeList('product')
                    .title('Products')
                    .child(documentId =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                        .views([
                          S.view.form().icon(EditIcon),
                          S.view
                            .component(SeoPreview)
                            .options({ previewURL })
                            .icon(EyeIcon)
                            .title('SEO Preview')
                        ])
                    )
                ),
              S.listItem()
                .title('Product Variants')
                .icon(FiCopy)
                .child(
                  S.documentTypeList('product')
                    .title('By Product')
                    .menuItems(S.documentTypeList('product').getMenuItems())
                    .filter('_type == $type')
                    .params({ type: 'product' })
                    .child(productID =>
                      S.documentList()
                        .title('Variants')
                        .menuItems(
                          S.documentTypeList('productVariant').getMenuItems()
                        )
                        .filter('_type == $type && productID == $id')
                        .params({
                          type: 'productVariant',
                          id: Number(productID.replace('product-', ''))
                        })
                        .child(documentId =>
                          S.document()
                            .documentId(documentId)
                            .schemaType('productVariant')
                            .views([
                              S.view.form().icon(EditIcon),
                              S.view
                                .component(SeoPreview)
                                .options({ previewURL })
                                .icon(EyeIcon)
                                .title('SEO Preview')
                            ])
                        )
                    )
                ),
              S.listItem()
                .title('Product types')
                .child(
                  S.documentTypeList('productType')
                    .title('Product types')
                    .child(documentId =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('productType')
                        .views([S.view.form().icon(EditIcon)])
                    )
                ),
              S.listItem()
                .title('Collections')
                .schemaType('collection')
                .child(
                  S.documentTypeList('collection')
                    .title('Collections')
                    .child(documentId =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('collection')
                        .views([
                          S.view.form().icon(EditIcon),
                          S.view
                            .component(SeoPreview)
                            .options({ previewURL })
                            .icon(EyeIcon)
                            .title('SEO Preview')
                        ])
                    )
                ),
              S.listItem()
                .title('Shop All Page')
                .icon(FiShoppingCart)
                .child(
                  S.editor()
                    .title('Shop All Page')
                    .id('shopPage')
                    .schemaType('shopPage')
                    .documentId('shopPage')
                )
            ])
        )
        .icon(FiShoppingCart),
      S.divider(),
      S.listItem()
        .title('Recipes')
        .id('recipes')
        .child(
          S.list()
            .title('Recipes')
            .items([
              S.listItem()
                .title('Recipes')
                .icon(FiBook)
                .child(
                  S.documentTypeList('recipePage')
                    .title('Recipe pages')
                    .child(documentId =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipePage')
                        .views([
                          S.view.form().icon(EditIcon),
                          S.view
                            .component(SeoPreview)
                            .options({ previewURL })
                            .icon(EyeIcon)
                            .title('SEO Preview')
                        ])
                    )
                ),

              S.listItem()
                .title('All Recipes Page')
                .icon(FiBookOpen)
                .child(
                  S.editor()
                    .title('All Recipes Page')
                    .id('allRecipesPage')
                    .schemaType('allRecipesPage')
                    .documentId('allRecipesLandingPage')
                )
            ])
        )
        .icon(FiBookOpen),
      S.divider(),
      S.listItem()
        .title('Stockists')
        .schemaType('stockistsPage')
        .child(
          S.document()
            .title('Stockists Page')
            .id('stockistsPage')
            .documentId('stockistsPage')
            .schemaType('stockistsPage')
            .views([
              S.view.form().icon(EditIcon),
              S.view
                .component(SeoPreview)
                .options({ previewURL })
                .icon(EyeIcon)
                .title('SEO Preview')
            ])
        )
        .icon(FiMap),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
