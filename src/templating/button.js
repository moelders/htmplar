// button

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setMedium, slugify, createID } from './utils';

const Button = (props) => {
  const { href, children, id, isBlock, className, allCaps, medium } = props;
  const availableIn = setMedium(medium);

  let items = children;
  let icon = null;
  let text;

  if (typeof children === 'string') {
    items = [ items ];
  }

  items.forEach((child, index) => {
    if (typeof child === 'string') {
      text = child;
    }
    if (typeof child === 'object') {
      icon = {
        component: child,
        index
      };
    }
  });

  const _id = id === '' ? slugify(text || createID(props)) : id;

  return (
    <table className={
          classNames(
            'htmplar-button',
            className,
            availableIn,
            {
              'htmplar-all-caps': allCaps,
              'htmplar-button-block': isBlock
            }
          )
        }
        border="0"
        cellPadding={ 0 }
        cellSpacing={ 0 }
        id={ _id }>
      <tr>
        <td className="htmplar-button-container htmplar-cell">
          <table className={ classNames('htmplar-button-inner') }
              border="0"
              cellPadding={ 0 }
              cellSpacing={ 0 }>
            <tr>
              <td className="htmplar-button-content htmplar-cell">
                <a href={ href } className="htmplar-button-cta">
                  {
                    icon && icon.index === 0 ? (
                      <Fragment>
                        <span className="htmplar-button-icon">{ icon.component }</span>
                        <span className="htmplar-button-spacer">&nbsp;</span>
                      </Fragment>
                    ) : ''
                  }
                  <span className="htmplar-button-text">
                    { text }
                  </span>
                  {
                    icon && icon.index === 1 ? (
                      <Fragment>
                        <span className="htmplar-button-spacer">&nbsp;</span>
                        <span className="htmplar-button-icon">{ icon.component }</span>
                      </Fragment>
                    ) : ''
                  }
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
};

Button.defaultProps = {
  isBlock: false,
  allCaps: false,
  medium: 'both'
};

Button.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  id: PropTypes.string,
  medium: PropTypes.string,
  isBlock: PropTypes.bool,
  allCaps: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};

export default Button;
