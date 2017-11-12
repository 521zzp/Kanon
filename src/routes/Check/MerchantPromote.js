import React from 'react';
import { connect } from 'dva';
import styles from './MerchantPromote.css';

function MerchantPromote() {
  return (
    <div className={styles.normal}>
      Route Component: MerchantPromote
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MerchantPromote);
