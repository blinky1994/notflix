import { useRouter } from "next/router"
import Modal from 'react-modal'
import styles from '../../styles/Video.module.css'
import cls from 'classnames'
import NavBar from '../../components/nav/navbar'
Modal.setAppElement('#__next');

const VideoPage = () => {
  const router = useRouter();

  const video = {
    title: 'Some title',
    publishTime: '1994-03-26',
    description: "Some description that describes what this video is abSome description that describes what this video is about.Some description that describes what this video is about.ouSome description that describes what this video is about.t Some description that describes what this video is about.Some description that describes what this video is about." ,
    channelTitle: 'Paramount Pictures',
    viewCount: 10000
  }

  const { title, publishTime, description, channelTitle, viewCount } = video;

  const { videoId } = router.query;
  console.log(videoId);
  return (
    
    <div>
    <NavBar />
    <Modal
      className={styles.modal}
      isOpen={true}
      contentLabel="Watch video page"
      onRequestClose={() => { router.back() }}
      overlayClassName={styles.overlay}
    > 

    <div className={styles.videoPlayer}>
      <iframe 
        id="player" 
        type="text/html" 
        width="100%"
        height="480"
        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=1`}
        frameborder="0"
        >
        </iframe>
    </div>

      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>

          <div className={styles.col1}>
            <p className={styles.title}>{title}</p>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.col2}>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>{ channelTitle } </span>
            </p>

            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count: </span>
              <span className={styles.viewCount}>{ viewCount }</span>
            </p>

          </div>
        </div>
      </div>
    </Modal>
  </div>
  )
}

export default VideoPage