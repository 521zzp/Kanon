import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './Forbidden.css';

function Forbidden() {
  return (
    <div className={styles.normal}>
    	  <div className={ styles.wrap }>
  				<Icon type="frown-o" className={ styles.icon }/>
  				<span className={ styles.span }>权限不足,禁止访问!</span>
  			</div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Forbidden);
