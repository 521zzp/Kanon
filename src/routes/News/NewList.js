import React from 'react';
import { connect } from 'dva';
import styles from './NewList.css';

function NewList() {
  return (
    <div className={styles.normal}>
      Route Component: NewList
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(NewList);
