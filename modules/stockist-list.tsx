import React, { FC } from 'react';

interface StockistListItem {
  title: string;
  location: string;
  url?: string;
}

interface StockistListProps {
  title: string;
  listItems: StockistListItem[];
}

const StockistList: FC<StockistListProps> = ({ title, listItems }) => {
  return (
    <div className="stockist-listing">
      <div className="stockist-listing__inner mb-12">
        <h3 className="stockist-listing__title mb-2 text-center">{title}</h3>
        <ul className="stockist-listing__list text-center">
          {listItems.map((item, i) => (
            <li className="stockist-listing__list text-lg" key={i}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockistList;
