import React from 'react'
import ReactDOM from 'react-dom/client'
import GridAnimation from './GridAnimation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GridAnimation />
	</React.StrictMode>
)
