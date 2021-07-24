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
      <div className="stockist-listing__inner">
        <h3 className="stockist-listing__title">{title}</h3>
        <ul className="stockist-listing__list">
          {listItems.map((item, i) => (
            <li className="stockist-listing__list-item" key={i}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockistList;
