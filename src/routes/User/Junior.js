import React from 'react';
import { connect } from 'dva';
import styles from './Junior.css';
import BaseInfoFilter from '../../components/user/junior/BaseInfoFilter';
import BaseUserInfo from '../../components/user/junior/BaseUserInfo';
import BaseTotalJunior from '../../components/user/junior/BaseTotalJunior';
import BaseJuniorInvest from '../../components/user/junior/BaseJuniorInvest';


function Junior({
	dispatch,
  	baseUserInfo,
  	juniorStatistics,
  	juniorInvestStatistics,
}) {
	
	const baseSearch = (params) => {
		dispatch({
			type: 'junior/getUserInfo',
			payload: params
		})
	}
	
	const baseJuniorStatistics = (params) => {
		dispatch({
			type: 'junior/getJuniorStatistics',
			payload: params
		})
	}
	
	const baseJuniorInvest = (params) => {
		dispatch({
			type: 'junior/getJuniorInvestStatistics',
			payload: params
		})
	}
	
	
	
  return (
    <div className={styles.normal}>
      <BaseInfoFilter search={ baseSearch }/>
      <BaseUserInfo list = { baseUserInfo }/>
      <BaseTotalJunior search={ baseJuniorStatistics } datas={ juniorStatistics }/>
      <BaseJuniorInvest search={ baseJuniorInvest } datas={ juniorInvestStatistics }/>
    </div>
  );
}

function mapStateToProps(state) {
  const { id, baseUserInfo, juniorStatistics, juniorInvestStatistics  } = state.junior
  return {
  	baseUserInfo,
  	juniorStatistics,
  	juniorInvestStatistics,
  };
}

export default connect(mapStateToProps)(Junior);
