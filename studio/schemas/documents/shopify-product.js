import { FiGift } from 'react-icons/fi';

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  //__experimental_actions: ['update', 'publish', 'delete'], // disable for initial publish
  fieldsets: [
    {
      title: 'Shopify',
      name: 'shopify',
      description: 'Synced from Shopify',
      options: { columns: 2, collapsible: true }
    },
    {
      title: 'Product Cards',
      name: 'cards',
      description: 'These settings are for product listings and carts',
      options: { columns: 1 }
    }
  ],
  icon: FiGift,
  fields: [
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Product Title',
      name: 'productTitle',
      type: 'string',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Product ID',
      name: 'productID',
      type: 'number',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Price (cents)',
      name: 'price',
      type: 'number',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Compare Price (cents)',
      name: 'comparePrice',
      type: 'number',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'In Stock?',
      name: 'inStock',
      type: 'boolean',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Low Stock?',
      name: 'lowStock',
      type: 'boolean',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      of: [{ type: 'productOption' }],
      readOnly: true,
      fieldset: 'shopify'
    },
    {
      title: 'Draft Mode',
      name: 'isDraft',
      type: 'boolean',
      readOnly: true,
      hidden: true,
      fieldset: 'shopify'
    },
    {
      title: 'Deleted from Shopify?',
      name: 'wasDeleted',
      type: 'boolean',
      readOnly: true,
      hidden: true,
      fieldset: 'shopify'
    },
    {
      title: 'Display Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'freeform'
    },
    {
      title: 'Product image',
      name: 'mainImage',
      type: 'figure'
    },
    {
      name: 'nutritionInformation',
      title: 'Nutritional information',
      type: 'nutritionInformation'
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'grid' },
        { type: 'dividerPhoto' },
        { type: 'freeform' },
        { type: 'quote' },
        { type: 'productsGrid' }
      ]
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      isDraft: 'isDraft',
      wasDeleted: 'wasDeleted',
      title: 'title',
      productTitle: 'productTitle',
      slug: 'slug',
      mainImage: 'mainImage'
    },
    prepare({
      isDraft = false,
      wasDeleted = false,
      title,
      productTitle,
      slug = {},
      mainImage
    }) {
      const path = `/products/${slug.current}`;
      return {
        title:
          (title ? title : productTitle) +
          (wasDeleted ? ' (removed)' : '') +
          (isDraft ? ' (draft)' : ''),
        media: mainImage,
        subtitle: slug.current ? path : '(missing slug)'
      };
    }
  }
};
