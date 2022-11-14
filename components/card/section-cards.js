import React from 'react'
import Card from './card';
import styles from './section-cards.module.css'

const SectionCards = (props) => {

  const { title, videos = [], size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{ title }</h2>
      <div className={styles.cardWrapper}>
        {
          videos.map((video, index) => (
            <Card 
              id={index}
              key={index}
              imgUrl={video.imgUrl}
              size={size}
            />
          ))
        }

      </div>
      
      </section>
  )
}

export default SectionCards