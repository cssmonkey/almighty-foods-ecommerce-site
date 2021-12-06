import React, { useRef, FC } from 'react';
import { useIntersection } from 'use-intersection';
import { titleCase } from 'title-case';
import Link from 'next/link';
import cx from 'classnames';
import Photo, { PhotoImage } from '@components/photo';

interface Recipe {
  title: string;
  image: PhotoImage;
  slug: string;
}

interface RecipeListingProps {
  title?: string;
  subtitle?: string;
  maxNumber?: number;
  recipes: Recipe[];
  showCta: boolean;
}

const RecipeListing: FC<RecipeListingProps> = ({
  title,
  subtitle,
  recipes,
  maxNumber,
  showCta,
}) => {
  const recipesListRef = useRef();
  const isIntersecting = useIntersection(recipesListRef, {
    once: true,
    threshold: 0.1,
  });

  return (
    <div className="recipe-listing">
      <div className="recipe-listing__inner">
        {title && <h3 className="recipe-listing__title">{titleCase(title)}</h3>}
        {subtitle && (
          <h4 className="recipe-listing__subtitle">{titleCase(subtitle)}</h4>
        )}
        <ul
          ref={recipesListRef}
          className={cx('recipe-listing__list', {
            'recipe-listing__list--2-col': recipes && recipes.length == 2,
          })}
        >
          {recipes &&
            recipes
              .map((recipe, i) => (
                <li className="recipe-listing__list-item" key={i}>
                  <Link href={`/recipes/${recipe.slug}`}>
                    <a>
                      <div className="recipe-listing-item-image">
                        <Photo
                          photo={recipe.image}
                          hasPlaceholder={false}
                          forceLoad={isIntersecting}
                        />
                      </div>
                      <span className="recipe-listing-item-title">
                        {titleCase(recipe.title)}
                      </span>
                    </a>
                  </Link>
                </li>
              ))
              .slice(0, maxNumber ? maxNumber : recipes.length)}
        </ul>
        {showCta && (
          <div className="recipe-listing__cta-control">
            <Link href={`/recipes`}>
              <a className="cta-link">
                <span className="cta-link__text">
                  {titleCase('View all our recipes')}
                </span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeListing;
