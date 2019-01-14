<template>
	<div class="tree-table">
		<div class="tree-head">
			<table>
				<tr>
					<td class="td1">职位名称</td>
					<td class="td2">负责人</td>
					<td class="td3" @click="isDesc=!isDesc">
						创建时间
						<div class="arrow">
							<span class="up-arrow" :class="{'sort':isDesc}"></span>
							<span class="down-arrow" :class="{'sort':!isDesc}"></span>
						</div>
					</td>
					<td class="td4">工作经验</td>
					<td class="td5">发布时间</td>
					<td class="td6">操作</td>
				</tr>
			</table>
		</div>
		<div id="scrollWrap" class="tree-wrap">
			<div class="tree-body">
				<table v-if='treeDataSource.length>0'>
					<tbody>
						<tr>
							<td>
								<tree-item
									v-for="(model,i) in treeDataSource"
                  :key="'root_node_'+i"
									:root="0"
									:num="i"
									@actionFunc="actionFunc"
									@deleteFunc="deleteFunc"
									:nodes="treeDataSource.length"
									:trees.sync="treeDataSource"
									:model.sync="model">
								</tree-item>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'treeTable',
		props: ['list'],
		data() {
			return {
				isDesc: false,
				treeDataSource: []
			}
		},

		watch: {
			'list': {
				handler() {
					console.log('ddddd')
					this.initTreeData()
				},
				deep: true
			},
			isDesc(nelVal, oldVal) {
				this.$emit('orderByFunc', nelVal)
			}
		},
		computed: {
		},
		methods: {
			initTreeData() {
				console.log('处理前的:', JSON.parse(JSON.stringify(this.list)))
				// 这里一定要转化，要不然他们的值监听不到变化
				let tempData = JSON.parse(JSON.stringify(this.list))
				let reduceDataFunc = (data, level) => {
					data.map((m, i) => {
						m.isExpand = false
						m.children = m.children || []
						m.level = level
						m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34
						m.Experience = m.Experience || '无'
						if (m.children.length > 0) {
							reduceDataFunc(m.children, level + 1)
						}
					})
				}
				reduceDataFunc(tempData, 1)
				console.log('处理后的:', tempData)
				this.treeDataSource = tempData
			},
			getMore() {
				alert('滚动到底部加载更多')
				// 滚动到最后
				$('#scrollWrap').mCustomScrollbar('scrollTo', 'top', {
					scrollInertia: 0
				})
			},
			actionFunc(m) {
				this.$emit('actionFunc', m)
			},
			deleteFunc(m) {
				this.$emit('deleteFunc', m)
			}
		},
		components: {
			treeItem: {
				name: 'treeItem',
				props: ['model', 'num', 'nodes', 'root', 'trees'],
				data() {
					return {
						parentNodeModel: null
					}
				},
				computed: {
					colSpan() {
						return this.root === 0 ? '' : 6
					},
					tdClass() {
						return this.root === 0 ? 'td-border' : 'not-border'
					},
					levelClass() {
						return this.model ? 'leve-' + this.model.level : ''
					},
					childNodeClass() {
						return this.root === 0 ? '' : 'child-node'
					},
					otherNodeClass() {
						return this.model ? 'other-node-' + this.model.level : ''
					}
				},
				watch: {
					'model': {
						handler() {
							console.log('对象变化', this.model.isExpand)
						},
						deep: true
					}
				},
				methods: {
					getParentNode(m) {
						// 查找点击的子节点
						var recurFunc = (data, list) => {
							data.forEach((l) => {
								if (l.id === m.id) this.parentNodeModel = list
								if (l.children) {
									recurFunc(l.children, l)
								}
							})
						}
						recurFunc(this.trees, this.trees)
					},
					open(m) {
						m.isExpand = !m.isExpand
					},
					deleteFunc(m) {
						this.$emit('deleteFunc', m)
						// this.getParentNode(m)
						// console.log(this.parentNodeModel)
						// if (this.parentNodeModel.hasOwnProperty('children')) {
						// 	console.log('父级是跟节点', this.parentNodeModel)
						// 	this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(m), 1)
						// } else if (this.parentNodeModel instanceof Array) {
						// 	console.log('跟节点', this.parentNodeModel)
						// 	this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1)
						// }
					},
					actionFunc(m) {
						this.$emit('actionFunc', m)
					}
				},
				filters: {
					formatDate: function(date) {
            // 后期自己格式化
						return date //Utility.formatDate(date, 'yyyy/MM/dd')
					}
				},
				template: `
					<div :class="tdClass">
					<span class="before-line" v-if="root !== 0 && nodes !== 1" :style="{'left':model.bLeft + 'px'}"></span>
					<table>
					<tr>
						<td :colspan="colSpan">
							<table>
									<tr class="leve" :class="levelClass">
										<td class="td1">
											<div class="td-title" @dblclick="open(model)">
												<span v-if="model.children.length > 0" class="tree-close" :class="{'tree-open':model.isExpand}" @click="open(model)"></span>
												<a class="ellipsis">
													<i class="t-icon m-dep"></i>
													<span :title="model.ObjectName">{{model.ObjectName}}</span>
												</a>
											</div>
										</td>
										<td class="td2">
											{{model.ResponsibleName}}
										</td>
										<td class="td3">{{model.CreateTime|formatDate}}</td>
										<td class="td4">
											<span :title="model.Experience" class="ellipsis">{{model.Experience}}</span>
										</td>
										<td class="td5">{{model.BelongTo}}天</td>
										<td class="td6">
											<a class="reset" href="javascript:;" @click="actionFunc(model)">编辑</a>
											<i class="line"></i>
											<a class="delete" href="javascript:;" @click="deleteFunc(model)">删除</a>
										</td>
									</tr>
							</table>
						</td>
					</tr>
					</table>
					<div v-show="model.isExpand" class="other-node" :class="otherNodeClass">
						<tree-item
							v-for="(m, i) in model.children"
							:key="String('child_node'+i)"
							:num='i'
							:root="1"
							@actionFunc="actionFunc"
							@deleteFunc="deleteFunc"
							:nodes.sync='model.children.length'
							:trees.sync='trees'
							:model.sync="m">
						</tree-item>
					</div>
					</div>
				`
			}
		},
		mounted() {
			const vm = this
			vm.$nextTick(() => {
				vm.initTreeData()
				// $('#scrollWrap').mCustomScrollbar({
				// 	scrollInertia: 200, // 滚动延迟 0位没有
				// 	autoHideScrollbar: true,
				// 	scrollbarPosition: 'outside',
				// 	axis: 'y',
				// 	mouseWheel: {
				// 		preventDefault: true,
				// 		disableOver: ['div.leftDialog', 'div.rightDialog', 'div.transferDia', 'div.el-dialog__wrapper', 'div.initPopBox', 'div.calPopBox', 'div.ql-editor:focus', 'input:focus', 'textarea:focus']
				// 	},
				// 	advanced: {
				// 		autoScrollOnFocus: false
				// 	},
				// 	autoExpandScrollbar: false,
				// 	theme: 'minimal-dark', // minimal-dark dark
				// 	mouseWheelPixels: 800,
				// 	callbacks: {
				// 		onTotalScroll: function() {
				// 			vm.getMore()
				// 		}
				// 	}
				// })
			})
		}
	}
</script>

<style lang="scss">
	.tree-table {
  width: 100%;
  position: relative;
}
.tree-table .center {
  text-align: center;
}
.tree-table table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
}
.tree-table table td {
  word-break: break-all;
  word-wrap: break-word;
  font-size: 12px;
}
.tree-table .td-border {
  border-bottom: 1px solid #E8E8E8;
}
.tree-table .td-border .leve {
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.tree-table .td-border .leve:hover {
  background-color: #f7f9ff;
}
.tree-table th,
.tree-table td {
  font-weight: 400;
  text-align: left;
}
.tree-table .td1 {
  width: 260px;
  padding-left: 30px;
}
.tree-table .td2 {
  width: 100px;
}
.tree-table .td3 {
  width: 120px;
}
.tree-table .td4 {
  width: 220px;
}
.tree-table .td5 {
  width: 100px;
}
.tree-table .td6 {
  width: 140px;
}
.tree-table .p20 {
  padding-left: 20px;
}
.tree-table .leve-1 .td1 {
  padding-left: 30px;
}
.tree-table .leve-2 .td1 {
  padding-left: 46px;
}
.tree-table .leve-3 .td1 {
  padding-left: 62px;
}
.tree-table .leve-4 .td1 {
  padding-left: 78px;
}
.tree-table .leve-5 .td1 {
  padding-left: 90px;
}
.tree-table .leve-6 .td1 {
  padding-left: 106px;
}
.tree-table .leve-7 .td1 {
  padding-left: 122px;
}
.tree-table .leve-8 .td1 {
  padding-left: 138px;
}
.tree-table .leve-9 .td1 {
  padding-left: 154px;
}
.tree-table .td4 .unvisibie {
  visibility: hidden;
}
.tree-table .td4 .ellipsis {
  display: block;
  max-width: 200px;
}
.tree-table .td4 .iconfont {
  color: #414959;
  position: relative;
  top: 0px;
  left: 5px;
  font-size: 14px;
}
.tree-table > div {
  position: absolute;
  width: 100%;
}
.tree-table .line-height {
  height: 40px;
  line-height: 40px;
}
.tree-table .tree-head {
  height: 40px;
  line-height: 40px;
}
.tree-table .tree-head td {
  color: rgba(0,0,0,0.45);
  border-bottom: 2px solid #E8E8E8;
}
.tree-table .tree-head .arrow {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #fff;
}
.tree-table .tree-head .arrow span {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  left: 0;
  border-style: solid;
  border-width: 4px;
}
.tree-table .tree-head .arrow .up-arrow {
  top: 3px;
  border-color: transparent transparent #ddd transparent;
}
.tree-table .tree-head .arrow .up-arrow.sort {
  border-bottom-color: #3C4454;
}
.tree-table .tree-head .arrow .down-arrow {
  top: 12px;
  border-color: #ddd transparent transparent transparent;
}
.tree-table .tree-head .arrow .down-arrow.sort {
  border-top-color: #3C4454;
}
.tree-table .ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tree-table .tree-wrap {
  top: 40px;
}
.tree-table .tree-body table {
  table-layout: fixed;
}
.tree-table .tree-body td {
  height: 40px;
  line-height: 40px;
  color: rgba(0,0,0,0.85);
  font-size: 14px;
}
.tree-table .tree-body td .reset {
  color: #1890FF;
}
.tree-table .tree-body td .delete {
  color: #F5222D;
}
.tree-table .tree-body td .line {
  display: inline-block;
  width: 1px;
  background: rgba(0,0,0,0.09);
  margin: 0 11px;
  height: 14px;
}
.tree-table .tree-body .td-title {
  position: relative;
}
.tree-table .tree-body .td-title a {
  display: block;
}
.tree-table .tree-body .td-title .tree-close,
.tree-table .tree-body .td-title .tree-open {
  position: absolute;
  width: 0;
  height: 0;
  border-color: #999;
  border-style: solid;
  cursor: pointer;
  border-width: 5px;
  z-index: 2;
}
.tree-table .tree-body .td-title .tree-close {
  left: -12px;
  top: 14px;
  border-color: transparent transparent transparent #AAAAAA;
}
.tree-table .tree-body .td-title .tree-open {
  left: -17px;
  top: 17px;
  border-color: #AAAAAA transparent transparent;
}
.tree-table .tree-body .leve-1 .td-title a {
  width: 230px;
}
.tree-table .tree-body .leve-2 .td-title a {
  width: 200px;
}
.tree-table .tree-body .leve-3 .td-title a {
  width: 170px;
}
.tree-table .tree-body .leve-4 .td-title a {
  width: 140px;
}
.tree-table .tree-body .leve-5 .td-title a {
  width: 110px;
}
.tree-table .tree-body .leve-6 .td-title a {
  width: 80px;
}
.tree-table .tree-body .leve-7 .td-title a {
  width: 50px;
}
.tree-table .tree-body .leve-8 .td-title a {
  width: 20px;
}
.tree-table .tree-body .other-node {
  position: relative;
}
.tree-table .tree-body .other-node > .not-border:not(:last-child) {
  position: relative;
}
.tree-table .tree-body .other-node > .not-border:not(:last-child) .before-line {
  content: '';
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #E8E8E8;
  border: none;
  top: -20px;
  z-index: 1;
  left: 34px;
}
.tree-table .tree-body .not-border .td-title::before {
  content: '';
  position: absolute;
  width: 1px;
  height: 40px;
  background-color: #E8E8E8;
  border: none;
  left: -12px;
  top: -20px;
  z-index: 1;
}
.tree-table .tree-body .not-border .td-title::after {
  content: '';
  left: -11px;
  position: absolute;
  right: auto;
  background-color: #E8E8E8;
  height: 1px;
  top: 19px;
  width: 16px;
  z-index: 1;
}
.tree-table .t-icon {
  display: inline-block;
  width: 14px;
  height: 18px;
  background-size: 100% 100% !important;
  vertical-align: middle;
  margin: -3px 4px 0 0;
}
.tree-table .t-icon.m-dep {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZEQUMxRDA0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZEQUMxRDE0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkRBQzFDRTRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkRBQzFDRjRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8y8UsAAAIjSURBVHjanJPPa9RQEMe/85Jss7v9RVO0UtqDVbR2FbEXEQQP3qTgyX9AEG89KagHRfDi3yAIvfai3qRYUbH0sNJakUV6KOyWLii2btNkNz9enpPEddkfVPALj8mbzGdm3ryElFLwtu4qqjVsre6VKVKboj/3GX2Zj5DqG4jK6NSZp9CTh9FhqCPRQOgFM/hhz1B177puahC5LKD4PQmXE+xDGHNsizEiErAhAddPd1PjXCiC3LMZIF7si2QOMhyDkg+bRVMwScsKI8BvgOKtECnYrq0OsENaDFArYQ/1BJNwats19der41+SDWZ5kRGHMxgd0mqzZHTAsSZgXgaMSfbL9cMrCoaUA2TGGbjBOXji6jRPf3NekfGMuiryxwCdc2W4LVVj6BJDv3ja5dTS0QIiZ7C7VUNLbY2raSJujZf4MxMzOS8Fy9V2ML4CQ0e0tAERBDCs4xz4hv3bUJn4RByvLbMdybWDcVIvYIdEZmQY6BdQuyuo6BdBUQFfdqZRP+B2R323q1UV01kdZPpQZoBbb2/j0QoPZsdDsWTj2MJVfK8MhT2uQ4PulbjF13hRvIIgP42Tzie8Kq1D16qYPzuEO+/ODbaug1Ch0J8gkvAvPF8jZ99YfLlamLA8DCCLpdCErOcxa7nQAmrdIwljklR4X6mfT5z8qaqj9117fHPqQc3era9+Lbn3Tmyct6zq3Nr27PuyO/YhYeIf+X/0W4ABAGLgy0VZgovSAAAAAElFTkSuQmCC) no-repeat;
}

</style>

