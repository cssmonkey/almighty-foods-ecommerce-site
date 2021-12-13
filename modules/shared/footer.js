import React from 'react';

import Menu from '@blocks/navigation/menu';
import Icon from '@components/icon';
import Photo from '@components/photo';

const Footer = ({ data = {} }) => {
  const { headquartersAddress, navItems, accreditationLogos } = data;

  const renderAccreditationLogos = () => {
    return (
      <ul className="accreditation-logo-list">
        {accreditationLogos.map(({ accreditationURL, image, alt }, i) => {
          return (
            <li key={i}>
              {accreditationURL ? (
                <a href={accreditationURL} target="_blank">
                  <img
                    src={image}
                    className="accreditation-logo-list__image"
                    alt={alt}
                  />
                </a>
              ) : (
                <img
                  src={image}
                  className="accreditation-logo-list__image"
                  alt={alt}
                />
              )}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__logo">
        <Icon name="AmfLogo" id="header" viewBox="0 0 207.377 60.07" />
      </div>
      <div className="footer__block">
        {accreditationLogos && renderAccreditationLogos()}

        {navItems && <Menu items={navItems} className="menu-footer" />}

        {/* <ThemeSwitch /> */}

        <div className="footer__disclaimer">
          {headquartersAddress && <address>{headquartersAddress}</address>}
          <p className="copyright">
            Website Copyright Almighty Foods ltd. {new Date().getFullYear()}.
            Designed by Agency of None.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
