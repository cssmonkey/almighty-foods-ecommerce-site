import React from 'react';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('./grid'));
const Hero = dynamic(() => import('./hero'));
const Marquee = dynamic(() => import('./marquee'));
const DividerPhoto = dynamic(() => import('./divider-photo'));
const ProductHero = dynamic(() => import('./shop/product-hero'));
const Collection = dynamic(() => import('./shop/collection'));
const Newsletter = dynamic(() => import('./newsletter'));
const Quote = dynamic(() => import('./quote'));
const ProductsGrid = dynamic(() => import('./products-grid'));
const RecipeListing = dynamic(() => import('./recipes-listing'));
const ContactForm = dynamic(() => import('./contact-form'));
const AssetDownload = dynamic(() => import('./asset-download'));
const Freeform = dynamic(() => import('../blocks/freeform'));

export const Module = ({
  module,
  product,
  activeVariant,
  onVariantChange,
  collectionProducts,
  featuredProducts,
}) => {
  const type = module._type;

  switch (type) {
    case 'grid':
      return <Grid data={module} />;
    case 'hero':
      return <Hero data={module} />;
    case 'marquee':
      return <Marquee data={module} />;
    case 'dividerPhoto':
      return <DividerPhoto data={module} />;
    case 'productHero':
      return (
        <ProductHero
          product={product}
          activeVariant={activeVariant}
          onVariantChange={onVariantChange}
        />
      );
    case 'collectionGrid':
      return (
        <Collection
          products={collectionProducts}
          featuredProducts={featuredProducts}
        />
      );
    case 'newsletter':
      return <Newsletter data={module} />;
    case 'contactForm':
      return <ContactForm type={module.formType} />;
    case 'quote':
      return <Quote data={module} />;
    case 'productsGrid':
      return <ProductsGrid data={module} />;
    case 'assetDownload':
      return <AssetDownload data={module} />;
    case 'recipesList':
      return (
        <RecipeListing
          title={module.title}
          subtitle={module.subtitle}
          maxNumber={module.maxNumber}
          recipes={module.recipes}
          showCta={true}
        />
      );
    case 'freeform':
      return (
        <div className="freeform-text">
          <Freeform data={module} />
        </div>
      );
    default:
      return null;
  }
};
