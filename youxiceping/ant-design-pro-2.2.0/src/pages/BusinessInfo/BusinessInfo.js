import React, { Component } from 'react';
import { Card, Avatar, Divider, Progress, Radio, Upload, Button } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

class BusinessInfo extends Component {
	state = {
		radioValue: 'a',
		avatarUrl: '',
		available: [
			{
				id: 1,
				name: '钓鱼小游戏',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 57,
				enable: true,
			},
			{
				id: 2,
				name: '钓鱼小游戏',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 32,
				enable: true,
			},
			{
				id: 3,
				name: '星球大战',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 57,
				enable: true,
			},
			{
				id: 14,
				name: '巨魔与精灵',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 86,
				enable: true,
			},
		],
		Overdue: [
			{
				id: 4,
				name: '神界危机',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 31,
				enable: false,
			},
			{
				id: 5,
				name: '魔兽争霸',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 57,
				enable: false,
			},
			{
				id: 6,
				name: '钓鱼小游戏',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 20,
				enable: false,
			},
			{
				id: 7,
				name: '钓鱼小游戏',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 75,
				enable: false,
			},
			{
				id: 8,
				name: '英雄联盟',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 57,
				enable: false,
			},
			{
				id: 9,
				name: '地下城与勇士',
				deadline: '2019-12-31',
				allNum: 100,
				restNum: 57,
				enable: false,
			},
		],
	}

	handleStatusChange = (e) => {
		this.setState({
			radioValue: e.target.value
		})
	}

	render() {
		const { radioValue, available, Overdue, avatarUrl = '' } = this.state
		let statusValue = null
		statusValue = radioValue === 'a' ? available : Overdue
		return (
			/* eslint-disable */
			<PageHeaderWrapper>
				<Card>
					<div>
						<div style={{ display: 'flex' }}>
							<div style={{ width: 120, textAlign: 'center', borderRight: '1px solid #ddd', paddingRight: 40, boxSizing: 'content-box' }}>
								<Avatar size={84} icon="user" src={avatarUrl} />
								<div style={{ marginTop: 20 }}>
									<Upload>
										<Button>修改头像</Button>
									</Upload>
								</div>
							</div>
							<div style={{ marginLeft: 40, display: 'table', flex: 1, transform: 'translateY(50%)' }}>
								<h2>
									扶摇职上教育科技有限公司
									</h2>
								<div>
									hz-career666@163.com
								</div>
							</div>
						</div>
						<Divider />
						<h2>短信计费信息</h2>
						<div style={{ color: '#aaa' }}>
							<span>剩余数量</span><span style={{ fontSize: 32, color: '#6F00FF' }}>&nbsp;36&nbsp;</span><span>&nbsp;/&nbsp;购买总数</span><span style={{ fontSize: 32, color: '#111' }}>&nbsp;86&nbsp;</span>
						</div>
						<div style={{ width: 300 }}>
							<Progress percent={(36 / 86).toFixed(3) * 100} status="active" showInfo={false} strokeWidth={14} strokeColor='#6F00FF' />
						</div>
						<Divider />
						<h2>游戏化测评工具计费信息</h2>
						<Radio.Group defaultValue="a" onChange={this.handleStatusChange}>
							<Radio.Button value="a">使用中</Radio.Button>
							<Radio.Button value="b">往期</Radio.Button>
						</Radio.Group>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{
								statusValue && statusValue.map((item, index) => {
									const boxStyle = index % 4 === 0 ? { marginLeft: 0 } : {}
									const enableStyle = item.enable ? {} : { backgroundColor: '#f2f2f2' }
									return (
										<div style={{ padding: 12, border: '1px solid', minWidth: 300, margin: 10, ...boxStyle, ...enableStyle }}>
											<h3>{item.name}</h3>
											{
												item.enable ? <div>有效期至：{item.deadline}</div> : <div></div>
											}
											<Divider />
											<div style={{ color: '#aaa' }}>
												<span>剩余数量</span><span style={{ fontSize: 26, color: '#6F00FF' }}>&nbsp;{item.restNum}&nbsp;</span><span>&nbsp;/&nbsp;购买总数</span><span style={{ fontSize: 26, color: '#111' }}>&nbsp;{item.allNum}&nbsp;</span>
											</div>
											<Progress percent={(item.restNum / item.allNum).toFixed(3) * 100} status="active" showInfo={false} strokeColor='#6F00FF' />
										</div>
									)
								})
							}
						</div>
					</div>
				</Card>
			</PageHeaderWrapper>
			/* eslint-disable */
		);
	}
}

export default BusinessInfo;