import { useLayoutEffect, useState } from 'react'
import { initSmoothScrolling, useImagePreloader, supportsCssVars, chooseAnimation } from './utils'
import gridAnimationConfig from './const'
import './style/index.less'
function GridAnimation() {
	const [loading, setLoading] = useState(true)
	const images = useImagePreloader()
	useLayoutEffect(() => {
		const animateGrids = async () => {
			supportsCssVars() || alert('请在支持CSS变量的现代浏览器中查看此演示')
			initSmoothScrolling()
			const grids = document.querySelectorAll('.grid')
			const promises = Array.from(grids).map((grid, i) => chooseAnimation(`grid--${i + 1}`, grid))
			await Promise.all(promises)
			setLoading(false)
		}
		animateGrids()
	}, [images])
	if (loading || !images.length) return <div className="loading"></div>
	return (
		<div>
			<main>
				<div className="intro">
					<h1 className="intro__title">
						<span className="intro__title-pre">On-Scroll</span>
						<span className="intro__title-sub">Perspective Grid Animations</span>
					</h1>
					<span className="intro__info">Scroll moderately to fully experience the animations</span>
				</div>

				{gridAnimationConfig.map(({ sectionClassName, h3ClassName, children }, index) => (
					<section key={index} className={'content ' + sectionClassName}>
						<div className={'grid'}>
							<div className="grid-wrap">
								{images.map((item, index) => (
									<div className="grid__item" key={index}>
										<img className="grid__item-inner" src={item.src} />
									</div>
								))}
							</div>
						</div>
						<h3 className={'content__title ' + h3ClassName}>{children}</h3>
					</section>
				))}
			</main>
		</div>
	)
}
export default GridAnimation
