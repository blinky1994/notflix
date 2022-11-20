import React from 'react'
import Card from './card';
import styles from './section-cards.module.css'
import Link from 'next/link';
import cls from 'classnames';

const SectionCards = (props) => {

  const { title, videos = [], size, shouldWrap = false } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{ title }</h2>
      <div className={cls(shouldWrap && styles.wrap, styles.cardWrapper)}>
        {
          videos.map((video, index) => (
            <Link href={`/video/${video.id}`} key={index}>
              <Card 
                id={index}
                imgUrl={video.imgUrl}
                size={size}
              />
            </Link>
          ))
        }

      </div>
      
      </section>
  )
}

export default SectionCards