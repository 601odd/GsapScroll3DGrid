import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
export default initSmoothScrolling
