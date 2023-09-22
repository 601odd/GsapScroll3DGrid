import PropTypes from 'prop-types' // 导入prop-types
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import chooseAnimation from '../utils/chooseAnimation'
gsap.registerPlugin(ScrollTrigger)

GridAnimation.propTypes = {
	animationType: PropTypes.any,
	images: PropTypes.array,
	AnimationRef: PropTypes.any,
	children: PropTypes.any,
	sectionClassName: PropTypes.any,
	h3ClassName: PropTypes.any,
}

export default function GridAnimation({
	animationType,
	images,
	children,
	sectionClassName,
	h3ClassName,
}) {
	const gridRef = useRef(null)
	useEffect(() => {
		const grids = document.querySelectorAll('.grid')
		grids.forEach(grid => {
			chooseAnimation(animationType, grid, gridRef)
		})
	}, [])
	return (
		<section className={'content ' + sectionClassName}>
			<div ref={gridRef} className={'grid ' + animationType}>
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
	)
}
