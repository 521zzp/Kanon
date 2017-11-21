import React from 'react';
import { connect } from 'dva';
import styles from './Junior.css';
import BaseInfoFilter from '../../components/user/junior/BaseInfoFilter';
import BaseUserInfo from '../../components/user/junior/BaseUserInfo';
import BaseTotalJunior from '../../components/user/junior/BaseTotalJunior';
import BaseJuniorInvest from '../../components/user/junior/BaseJuniorInvest';


function Junior({
	dispatch,
}) {
	
	const baseSearch = (params) => {
		dispatch({
			type: 'baseSearch',
			payload: params
		})
	}
	
	
	
  return (
    <div className={styles.normal}>
      <BaseInfoFilter search={ baseSearch }/>
      <BaseUserInfo/>
      <BaseTotalJunior/>
      <BaseJuniorInvest/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Junior);
