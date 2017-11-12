import React from 'react';
import { connect } from 'dva';
import styles from './MerchantRegister.css';

function MerchantRegister() {
  return (
    <div className={styles.normal}>
      Route Component: MerchantRegister
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MerchantRegister);
