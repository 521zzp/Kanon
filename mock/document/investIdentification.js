获取列表条数
params:
{
	type: 1,  //1, 2, 3,  4, 
	time: [ 'start', 'end' ],
}


返回
{
	total: 100
}



获取集合
params:
{
	type: 1,
	time: [ 'start', 'end' ],
	current: 1,
	pageSize: 10,
}


返回集合
{
	list: [
		{
			account: '',
			name: '',
			registerTime: '',
			id: '', //用户id
		}
	]
}



查询投资情况集合
params:
{
	id: '',
}


返回:
[
	{
		producr: '', //投资标的
		money: '', //金额
		time: '', 投资时间
		status: 0, //是否过期  0: 已过期 1: 持有中
	}
]
