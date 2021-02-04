const App = getApp();
Component({
	options: {
		multipleSlots: true, // 在组建定义时的选项中启用多slot支持
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		refreshPosition:{ //刷新位置 1-导航栏上方 2-导航栏下面
      type: Number,
      value: 2,
    },
		haveloadMore: { //是否有加载更多功能
			type: Boolean,
			value: false
		},
		loadMore: { //是否还有更多数据可以加载
			type: Boolean,
			value: true
		},
		refresh: {
			type: Boolean,
			value: false
		},
		pull: {
			type: Object,
			value: {
				isLoading: false,
				loading: '../../image/pull_refresh.gif',
				pullText: '正在加载'
			}
		},
		push: {
			type: Object,
			value: {
				isLoading: false,
				loading: '../../image/pull_refresh.gif',
				pullText: '上拉加载更多'
			}
		},
	},
	pageLifetimes: {
		show() {},
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		slideStart: [],
		moveTime: 0,
	},
	created() {

	},
	ready() {

	},
	attached() {
		this.setData({
			navHeight: App.globalData.navHeight,
			navTop: App.globalData.navTop,
		});
	},
	methods: {
		setHaveLoadMore(flag) { //设置加载更多toggle
			this.setData({
				haveloadMore: flag
			});
		},
		setLoadMore(flag) { //设置加载更多toggle
			console.log(22222);
			console.log(flag);
			this.setData({
				loadMore: flag
			});
		},
		touchstart(e) {
			this.setData({
				slideStart: e.touches[0]
			})
		},
		touchmove(e) {
			let moveTime = new Date().getTime();
			if (moveTime - this.data.moveTime <= 2000) {
				return
			} else {
				this.setData({
					moveTime: moveTime
				})
			}
			let slideStart = this.data.slideStart;
			let slideMove = e.touches[0];
			let startX = slideStart.pageX;
			let startY = slideStart.pageY;
			let moveEndX = slideMove.pageX;
			let moveEndY = slideMove.pageY;
			let X = moveEndX - startX;
			let Y = moveEndY - startY;
			if (Math.abs(Y) > Math.abs(X) && Y > 0) {
				console.log("top 2 bottom");
				this.pullRefresh()
			} else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
				console.log("bottom 2 top");
				this.loadMore()
			}
		},
		/**下拉刷新 */
		pullRefresh(e) {
			if (!this.data.refresh) return false;
			this.setData({
				'pull.isLoading': true,
				'pull.loading': '/image/pull_refresh.gif',
				'pull.pullText': '正在加载',
			})
			setTimeout(() => {
				this.setData({
					'pull.loading': '/image/finish.png',
					'pull.pullText': '刷新完成'
				})
				this.triggerEvent('refresh', {
					refresh: true
				}) // 将num通过参数的形式传递给父组件
			}, 4000)
			setTimeout(() => {
				this.setData({
					'pull.isLoading': false,
				})
				console.log('+++++ 刷新完成 +++++')
			}, 6000)

		},
		/**上拉加载更多 */
		loadMore(e) {
			if (!this.data.haveloadMore) return false;
			this.setData({
				'push.isLoading': true,
				'push.pullText': '正在加载',
				'push.loading': '/image/pull_refresh.gif',
			})
			setTimeout(() => {
				this.setData({
					'push.isLoading': false,
					'push.pullText': '上拉加载更多',
					'push.loading': '/image/finish.png',
				})
				this.triggerEvent('loadmore', {
					loadmore: true
				}) // 将num通过参数的形式传递给父组件
				console.log('===== 加载完成 =====')
			}, 2000)
		}
	}
})