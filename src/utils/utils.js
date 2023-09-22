// 预加载图像
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
//getGrid可以动态地计算网格的行/列，并用“奇数”或“偶数”行/列进一步细化这些行/列
const getGrid = selector => {
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
			let a = [],
				subsets = {},
				onlyEven = alternating === 'even',
				p
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position]
				subset || (subsets[position] = subset = [])
				subset.push(elements[i])
			})
			for (p in subsets) {
				a.push(subsets[p])
			}
			if (onlyEven || alternating === 'odd') {
				a = a.filter((el, i) => !(i % 2) === onlyEven)
			}
			if (merge) {
				const a2 = []
				a.forEach(subset => a2.push(...subset))
				return a2
			}
			return a
		}
	elements.refresh = () => (bounds = elements.map(el => el.getBoundingClientRect()))
	elements.columns = (alternating, merge) => getSubset('left', 'width', alternating, merge)
	elements.rows = (alternating, merge) => getSubset('top', 'height', alternating, merge)
	elements.refresh()
	return elements
}

gsap.registerPlugin(ScrollTrigger)
// 平滑滚动函数

const initSmoothScrolling = () => {
	const lenis = new Lenis({
		lerp: 0.1, // 值越小平滑效果越明显
		smoothWheel: true, // 为鼠标滚轮事件启用平滑滚动
	})
	// 每次用户滚动时更新ScrollTrigger
	lenis.on('scroll', () => ScrollTrigger.update())
	// 每一帧动画执行
	const scrollFn = time => {
		lenis.raf(time) // lenis中requestAnimationFrame方法
		requestAnimationFrame(scrollFn) // 递归调用
	}
	// 启用动画帧
	requestAnimationFrame(scrollFn)
}

//根据不同的动画类型，在网格（grid）元素上应用滚动触发的动画效果
const applyAnimation = (grid, animationType) => {
	// console.log(grid, animationType)
	const gridWrap = grid.querySelector('.grid-wrap')
	const gridItems = grid.querySelectorAll('.grid__item')
	const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'))

	// 给ScrollTrigger定义GSAP时间轴
	const timeline = gsap.timeline({
		defaults: { ease: 'none' }, //默认的缓动函数为"none"
		scrollTrigger: {
			trigger: gridWrap, //配置ScrollTrigger触发器，指定了何时触发动画，包括滚动触发的范围。
			start: 'top bottom+=5%',
			end: 'bottom top-=5%',
			scrub: true,
		},
	})

	// 定义不同动画 属性包括网格的宽度、透视效果、内部元素的缩放比例、网格项的宽高比、列数和间隙
	switch (animationType) {
		case 'type1':
			grid.style.setProperty('--perspective', '1000px')
			grid.style.setProperty('--grid-inner-scale', '0.5')
			timeline

				.set(gridWrap, {
					rotationY: 25,
				})
				.set(gridItems, {
					z: () => gsap.utils.random(-1600, 200),
				})
				.fromTo(
					gridItems,
					{
						xPercent: () => gsap.utils.random(-1000, -500),
					},
					{
						xPercent: () => gsap.utils.random(500, 1000),
					},
					0
				)
				.fromTo(
					gridItemsInner,
					{
						scale: 2,
					},
					{
						scale: 0.5,
					},
					0
				)
			break
		case 'type2':
			grid.style.setProperty('--grid-width', '160%')
			grid.style.setProperty('--perspective', '2000px')
			grid.style.setProperty('--grid-inner-scale', '0.5')
			grid.style.setProperty('--grid-item-ratio', '0.8')
			grid.style.setProperty('--grid-columns', '6')
			grid.style.setProperty('--grid-gap', '14vw')

			timeline
				.set(gridWrap, {
					rotationX: 20,
				})
				.set(gridItems, {
					z: () => gsap.utils.random(-3000, -1000),
				})
				.fromTo(
					gridItems,
					{
						yPercent: () => gsap.utils.random(100, 1000),
						rotationY: -45,
						filter: 'brightness(200%)', //filter 属性来控制亮度
					},
					{
						ease: 'power2',
						yPercent: () => gsap.utils.random(-1000, -100),
						rotationY: 45,
						filter: 'brightness(0%)',
					},
					0 //动画的起始时间
				)
				.fromTo(
					gridWrap,
					{
						rotationZ: -5,
					},
					{
						rotationX: -20,
						rotationZ: 10,
						scale: 1.2,
					},
					0
				)
				.fromTo(
					gridItemsInner,
					{
						scale: 2,
					},
					{
						scale: 0.5,
					},
					0
				)

			break
		case 'type3':
			grid.style.setProperty('--grid-width', '105%')
			grid.style.setProperty('--grid-columns', '8')
			grid.style.setProperty('--perspective', '1500px')
			grid.style.setProperty('--grid-inner-scale', '0.5')

			timeline
				.set(gridItems, {
					transformOrigin: '50% 0%',
					z: () => gsap.utils.random(-5000, -2000),
					rotationX: () => gsap.utils.random(-65, -25),
					filter: 'brightness(0%)',
				})
				.to(
					gridItems,
					{
						xPercent: () => gsap.utils.random(-150, 150),
						yPercent: () => gsap.utils.random(-300, 300),
						rotationX: 0,
						filter: 'brightness(200%)',
					},
					0
				)
				.to(
					gridWrap,
					{
						z: 6500,
					},
					0
				)
				.fromTo(
					gridItemsInner,
					{
						scale: 2,
					},
					{
						scale: 0.5,
					},
					0
				)

			break
		case 'type4':
			grid.style.setProperty('--grid-width', '50%')
			grid.style.setProperty('--perspective', '3000px')
			grid.style.setProperty('--grid-item-ratio', '0.8')
			grid.style.setProperty('--grid-columns', '3')
			grid.style.setProperty('--grid-gap', '1vw')

			timeline
				.set(gridWrap, {
					transformOrigin: '0% 50%',
					rotationY: 30,
					xPercent: -75,
				})
				.set(gridItems, {
					transformOrigin: '50% 0%',
				})
				.to(
					gridItems,
					{
						duration: 0.5,
						ease: 'power2',
						z: 500,
						stagger: 0.04,
					},
					0
				)
				.to(
					gridItems,
					{
						duration: 0.5,
						ease: 'power2.in',
						z: 0,
						stagger: 0.04,
					},
					0.5
				)
				.fromTo(
					gridItems,
					{
						rotationX: -70,
						filter: 'brightness(120%)',
					},
					{
						duration: 1,
						rotationX: 70,
						filter: 'brightness(0%)',
						stagger: 0.04,
					},
					0
				)

			break
		case 'type5':
			grid.style.setProperty('--grid-width', '120%')
			grid.style.setProperty('--grid-columns', '8')
			grid.style.setProperty('--grid-gap', '0')

			const gridObj = getGrid(gridItems)

			timeline
				.set(gridWrap, {
					rotationX: 50,
				})
				.to(gridWrap, {
					rotationX: 30,
				})
				.fromTo(
					gridItems,
					{
						filter: 'brightness(0%)',
					},
					{
						filter: 'brightness(100%)',
					},
					0
				)
				.to(
					gridObj.rows('even'),
					{
						xPercent: -100,
						ease: 'power1',
					},
					0
				)
				.to(
					gridObj.rows('odd'),
					{
						xPercent: 100,
						ease: 'power1',
					},
					0
				)
				.addLabel('rowsEnd', '>-=0.15')
				.to(
					gridItems,
					{
						ease: 'power1',
						yPercent: () => gsap.utils.random(-100, 200),
					},
					'rowsEnd'
				)
			break
		case 'type6':
			grid.style.setProperty('--perspective', '2500px')
			grid.style.setProperty('--grid-width', '100%')
			grid.style.setProperty('--grid-gap', '6')
			grid.style.setProperty('--grid-columns', '3')
			grid.style.setProperty('--grid-item-ratio', '1')

			timeline.fromTo(
				gridItems,
				{
					transformOrigin: '50% 200%',
					rotationX: 0,
					yPercent: 400,
				},
				{
					yPercent: 0,
					rotationY: 360,
					opacity: 0.2,
					scale: 0.8,
					stagger: 0.03,
				}
			)

			break
		default:
			console.error('Unknown animation type.')
			break
	}
}

// 给每个grid应用动画
const scroll = () => {
	const grids = document.querySelectorAll('.grid')
	console.log(grids)

	if (!grids) return
	grids.forEach((grid, i) => {
		// type1 ~ type6
		const animationType = `type${(i % 6) + 1}`
		applyAnimation(grid, animationType)
	})
}

export { initSmoothScrolling, scroll }
