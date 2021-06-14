import React from 'react'

import ThemeSwitch from './theme-switch'

import Menu from '@blocks/navigation/menu'
import Icon from '@components/icon'

const Footer = ({ data = {} }) => {
  const { headquartersAddress, navItems } = data

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__logo">
        <Icon name="AmfLogo" id="header" viewBox="0 0 207.377 60.07" />
      </div>
      <div className="footer__block">
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
  )
}

export default Footer
