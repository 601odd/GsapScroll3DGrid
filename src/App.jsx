import { useEffect, useState } from 'react'
import initSmoothScrolling from './utils/initSmoothScrolling'
import useImagePreloader from './utils/imgPreLoad'
import supportsCssVars from './utils/check'
import GridAnimation from './component/GridAnimation'
import gridAnimationConfig from './const'
import './style/index.less'
function App() {
	const [loading, setLoading] = useState(true)
	const images = useImagePreloader()

	useEffect(() => {
		setTimeout(() => {
			supportsCssVars() || alert('请在支持CSS变量的现代浏览器中查看此演示')
			initSmoothScrolling()
			setLoading(false)
		}, 1000)
	}, [])

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
				{gridAnimationConfig.map((item, index) => (
					<GridAnimation key={index} {...item} images={images} />
				))}
			</main>
		</div>
	)
}
export default App
