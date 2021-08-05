import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Collection {
  title: string;
  slug: string;
}

interface ShopNavigationProps {
  shopPageTitle: string;
  collections: Collection[];
}

const ShopNavigation: FC<ShopNavigationProps> = ({
  shopPageTitle,
  collections,
}) => {
  const router = useRouter();
  const shopUrl = '/shop';
  if (!collections || collections.length === 0) {
    return null;
  }
  return (
    <nav className="shop-navigation">
      <ul>
        <li>
          <Link href={shopUrl}>
            <a className={router.pathname == shopUrl ? 'active' : ''}>
              <span className="link__text">{shopPageTitle}</span>
            </a>
          </Link>
        </li>
        {collections.map(({ title, slug }, i) => (
          <li key={i}>
            <Link href={`${shopUrl}/${slug}`}>
              <a className={router.query.slug == slug ? 'active' : ''}>
                <span className="link__text">{title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ShopNavigation;
