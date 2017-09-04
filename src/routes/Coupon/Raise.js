import React from 'react';
import { connect } from 'dva';
import styles from './Raise.css';

function Raise() {
  return (
    <div className={styles.normal}>
      Route Component: Raise
      	加息券加息券加息券加息券加息券加息券加息券加息券
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Raise);
