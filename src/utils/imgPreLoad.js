import { useEffect, useState } from 'react'

function useImagePreloader() {
	const [images, setImages] = useState([])

	useEffect(() => {
		async function preloadImages() {
			const imageModules = import.meta.globEager('../img/*.jpg')
			// 将模块路径转换为相对路径
			const imageSrcs = Object.values(imageModules).map(module => {
				// 获取模块路径
				const modulePath = module.default
				// 将路径中的'..'替换为'.'，实现路径的转换
				return modulePath.replace(/\.\.\//g, './')
			})
			// 创建Image对象并等待所有图片加载完成
			const imagePromises = imageSrcs.map(async imageUrl => {
				const image = new Image()
				image.src = imageUrl
				await image.decode()
				return image
			})

			// 等待所有图片加载完成后，设置状态以触发组件重新渲染
			const loadedImages = await Promise.all(imagePromises)
			setImages(loadedImages)
		}

		// 调用预加载图片函数
		preloadImages()
	}, [])

	return images
}

export default useImagePreloader
