import React, { useRef, FC } from 'react';
import { useIntersection } from 'use-intersection';
import Link from 'next/link';
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
}

const RecipeListing: FC<RecipeListingProps> = ({
  title,
  subtitle,
  recipes,
  maxNumber,
}) => {
  const recipesListRef = useRef();
  const isIntersecting = useIntersection(recipesListRef, {
    once: true,
    threshold: 0.1,
  });

  return (
    <div className="recipe-listing">
      <div className="recipe-listing__inner">
        {title && <h3 className="recipe-listing__title">{title}</h3>}
        {subtitle && <h4 className="recipe-listing__subtitle">{subtitle}</h4>}
        <ul ref={recipesListRef} className="recipe-listing__list">
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
                        {recipe.title}
                      </span>
                    </a>
                  </Link>
                </li>
              ))
              .slice(0, maxNumber ? maxNumber : recipes.length)}
        </ul>
      </div>
    </div>
  );
};

export default RecipeListing;
