import { useEffect, useState } from 'react'
import { initSmoothScrolling, scroll } from './utils/utils'
import useImagePreloader from './utils/imgPreLoad'
import { supportsCssVars } from './utils/check'
import './style/index.less'
function App() {
	const [loading, setLoading] = useState(true)
	const images = useImagePreloader()

	useEffect(() => {
		setTimeout(() => {
			supportsCssVars() || alert('请在支持CSS变量的现代浏览器中查看此演示')
			initSmoothScrolling()

			scroll()
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
				<section className="content">
					<div className="grid grid--1">
						<div className="grid-wrap">
							{images.map((item, index) => (
								<div className="grid__item" key={index}>
									<img className="grid__item-inner" src={item.src} />
								</div>
							))}
						</div>
						<h3 className="content__title content__title--right content__title--top">
							{'Fleeting moments,'} <br />
							{`existence's dance.`}
						</h3>
					</div>
				</section>
			</main>
		</div>
	)
}

export default App
