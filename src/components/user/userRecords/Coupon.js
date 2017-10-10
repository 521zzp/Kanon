import React from 'react';
import { Table,  } from 'antd';
import styles from './Coupon.css';

function Coupon({
	couponTotal,
	couponCurrent,
	couponList,
}) {
	
	
  return (
    <div className={styles.normal}>
      Component: Coupon
    </div>
  );
}

export default Coupon;
