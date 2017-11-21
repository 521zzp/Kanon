import React from 'react';
import { connect } from 'dva';
import styles from './WithdrawApply.css';

function WithdrawApply() {
  return (
    <div className={styles.normal}>
      Route Component: WithdrawApply
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(WithdrawApply);
