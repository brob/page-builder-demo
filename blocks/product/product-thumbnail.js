import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { hasObject } from '@lib/helpers'

import Photo from '@components/photo'

const thumbAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'linear',
      when: 'afterChildren',
    },
  },
}

const ProductThumbnail = ({ thumbnails = [], activeVariant }) => {
  const { options } = activeVariant

  const defaultThumbnails = thumbnails.find((set) => !set.forOption)
  const variantThumbnails = thumbnails.find((set) => {
    const option = set.forOption
      ? {
          name: set.forOption.split(':')[0],
          value: set.forOption.split(':')[1],
        }
      : {}
    return option.value && hasObject(options, option)
  })

  const photos = variantThumbnails ? variantThumbnails : defaultThumbnails

  const id = photos.default.id + photos.hover?.id

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={id}
        initial="hide"
        animate="show"
        exit="hide"
        variants={thumbAnim}
        className="product-card--photo"
      >
        <Photo
          photo={photos?.default}
          srcsetSizes={[500, 800, 1200]}
          sizes="(min-width: 768px) 50vw, 100vw"
          width={1200}
          className="is-defualt"
        />

        {photos?.hover && (
          <Photo
            photo={photos.hover}
            srcsetSizes={[500, 800, 1200]}
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1200}
            className="is-hover"
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductThumbnail
