import { useEffect, useState } from 'react'

export const useImagePreloader = () => {
	const [images, setImages] = useState([])
	useEffect(() => {
		async function preloadImages() {
			const imageModules = import.meta.globEager('../img/*.jpg')
			const imagePromises = Object.values(imageModules).map(module => {
				const image = new Image()
				image.src = module.default
				return image
			})

			const loadedImages = await Promise.all(imagePromises)
			setImages(loadedImages)
		}

		// 调用预加载图片函数
		preloadImages()
	}, [])

	return images
}
