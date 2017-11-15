import React from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd'
import styles from './GoodsDetails.css';

function GoodsDetails() {
  return (
    <div className={styles.normal}>
      Route Component: GoodsDetails
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(GoodsDetails));
