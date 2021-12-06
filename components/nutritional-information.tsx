import React, { FC } from 'react';
import cx from 'classnames';
import { titleCase } from 'title-case';

interface Rows {
  nutrientName: string;
  per100g: string;
  gramsPerServing: string;
  perServing: string;
}

interface NutritionalInformationProps {
  className?: string;
  title?: string;
  gramsPerServing: string;
  rows: Rows[];
}

const NutritionalInformation: FC<NutritionalInformationProps> = ({
  title,
  className,
  gramsPerServing,
  rows,
}) => {
  return (
    <div className={cx('nutritional-information', className)}>
      {title && (
        <h3 className="nutritional-information__title">{titleCase(title)}</h3>
      )}

      <table className="nutritional-information__table">
        <thead>
          <tr>
            <th>Typical Values</th>
            <th>Per 100g</th>
            <th>Per {gramsPerServing} Serving</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ nutrientName, per100g, perServing }, i) => {
            return (
              <tr key={i}>
                <td>{nutrientName}</td>
                <td>{per100g}</td>
                <td>{perServing}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionalInformation;
