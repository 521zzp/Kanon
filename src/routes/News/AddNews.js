import React from 'react';
import { connect } from 'dva';
import styles from './AddNews.css';

function AddNews() {
  return (
    <div className={styles.normal}>
      Route Component: AddNews
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AddNews);
