import React from 'react';
import { connect } from 'dva';
import styles from './ClerkPromote.css';

function ClerkPromote() {
  return (
    <div className={styles.normal}>
      Route Component:/ClerkPromote
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ClerkPromote);
