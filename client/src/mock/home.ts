import { MockMethod } from 'vite-plugin-mock'

interface MenuItem {
	name: string
	url: string
	children?: MenuItem[]
}
interface ResData {
	code: number
	message: string
	data: MenuItem[]
}

const mock: Array<MockMethod> = [
	{
		url: '/api/menu',
		method: 'get',
		response: () => {
			const data: MenuItem[] = [
				{
					name: '首页',
					url: '/home',
				},
				{
					name: '学习',
					url: '/study',
				},
				{
					name: '志愿活动',
					url: '/active',
				},
				{
					name: '志愿团队',
					url: '/team',
				},
				{
					name: '讨论',
					url: '/discuss',
				},
				{
					name: '商店',
					url: '/store',
					children: [
						{ name: 'item1', url: '/item1' },
						{ name: 'item2', url: '/item2' },
					],
				},
			]
			const ResData: ResData = {
				code: 200,
				message: 'success',
				data,
			}
			const rand = Math.random()
			if (rand < 0.2) {
				ResData.code = 500
				ResData.message = '服务器错误'
			} else if (rand < 0.4) {
				ResData.code = 404
				ResData.message = '接口不存在'
			}
			return ResData
		},
	},
]
export default mock
