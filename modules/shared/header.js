import React, { useState, useRef } from 'react';
import { m } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { useIntersection } from 'use-intersection';
import { useRect } from '@reach/rect';
import Link from 'next/link';
import cx from 'classnames';

import { isBrowser } from '@lib/helpers';

import Menu from '@blocks/navigation/menu';
import Icon from '@components/icon';

// Context helpers
import { useToggleCart, useCartCount } from '@lib/context';

const Header = ({ data = {}, isTransparent }) => {
  // expand our header data
  const { navItems, socialMedia } = data;

  // setup states
  const [isNavOpen, setNavOpen] = useState(false);
  const observerRef = useRef();
  const observerIsVisible = useIntersection(observerRef);
  const headerRef = useRef();
  const headerRect = useRect(headerRef);

  // setup menu toggle event
  const toggleNav = (state) => {
    setNavOpen(state);

    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state);
    }
  };

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <header
        className={cx('header', {
          'is-overlay': isTransparent,
          'is-white': isTransparent && observerIsVisible,
          'has-bg': !observerIsVisible,
          'menu-active': isNavOpen,
        })}
      >
        <div ref={headerRef} className="header--outer">
          <div className="header--inner">
            <div className="header--content">
              <div className="logo">
                <Link href="/" scroll={false}>
                  <a className="logo--link" aria-label="Go Home">
                    <Icon
                      name="AmfLogo"
                      id="header"
                      viewBox="0 0 207.377 60.07"
                    />
                  </a>
                </Link>
              </div>

              <nav className="main-navigation" role="navigation" id="mainNav">
                <FocusTrap active={isNavOpen}>
                  <div>
                    <button
                      onClick={() => toggleNav(!isNavOpen)}
                      className={cx('menu-toggle', {
                        'is-open': isNavOpen,
                      })}
                      aria-expanded={isNavOpen ? 'true' : 'false'}
                      aria-controls="mainNav-nav"
                      aria-label="Toggle Menu"
                    >
                      <span className="hamburger">
                        <span className="hamburger--icon"></span>
                      </span>
                    </button>
                    <m.div
                      initial="hide"
                      animate={isNavOpen ? 'show' : 'hide'}
                      variants={{
                        show: {
                          y: '0%',
                          opacity: 1,
                        },
                        hide: {
                          y: '-100%',
                          opacity: 0,
                        },
                      }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="menu"
                    >
                      <div
                        className="menu--inner"
                        style={
                          headerRect?.height
                            ? { '--headerHeight': `${headerRect.height}px` }
                            : null
                        }
                      >
                        <div className="menu--primary">
                          {navItems && (
                            <Menu
                              items={navItems}
                              onClick={() => toggleNav(false)}
                            />
                          )}
                        </div>

                        {socialMedia && (
                          <ul className="menu--social">
                            {socialMedia.map((link, key) => {
                              return (
                                <li key={key}>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Icon name={link.icon} />
                                    <span className="sr-only">{link.name}</span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </m.div>

                    <div
                      className={cx('menu--backdrop', {
                        'is-active': isNavOpen,
                      })}
                      onClick={() => toggleNav(false)}
                    />
                  </div>
                </FocusTrap>

                <CartToggle />
              </nav>
            </div>

            <div className="header--border" />
          </div>
        </div>
      </header>

      <span ref={observerRef} className="header--observer" />
    </>
  );
};

const CartToggle = () => {
  const toggleCart = useToggleCart();
  const cartCount = useCartCount();

  return (
    <button className="cart-toggle" onClick={() => toggleCart()}>
      <Icon name="Basket" id="basket" viewBox="0 0 29.605 36.673" />
      <span
        className={cx('cart-toggle--count', {
          'is-active': cartCount > 0,
        })}
      >
        {cartCount}
      </span>
    </button>
  );
};

export default Header;
