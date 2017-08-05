import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style

export function Footer() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>&copy; 2017 &middot; <FormattedMessage id="designed" /> Ngô Anh Khoa.</p>
      <p><FormattedMessage id="power" /> React.</p>
    </div>
  );
}

export default Footer;
