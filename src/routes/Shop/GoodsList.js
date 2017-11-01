import React from 'react';
import { connect } from 'dva';
import styles from './Shop/GoodsList.css';

function Shop/GoodsList() {
  return (
    <div className={styles.normal}>
      Route Component: Shop/GoodsList
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Shop/GoodsList);
