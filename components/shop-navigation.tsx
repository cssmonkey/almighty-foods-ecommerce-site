import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';

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
  const options = [{ value: '', label: shopPageTitle }].concat(
    collections.map((item) => ({
      value: item.slug,
      label: item.title,
    }))
  );
  const defaultValue =
    options.find((item) => item.value === router.query.slug) || options[0];

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

      <Select
        className="shop-navigation__mobile-select"
        options={options}
        defaultValue={defaultValue}
        onChange={({ value }) => {
          const url = `${shopUrl}/${value}`;
          router.push(url);
        }}
        classNamePrefix="shop-navigation-select"
        isSearchable={false}
      />
    </nav>
  );
};

export default ShopNavigation;
