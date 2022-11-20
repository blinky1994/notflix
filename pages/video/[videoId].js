import { useRouter } from "next/router"
import Modal from 'react-modal'
import styles from '../../styles/Video.module.css'
import cls from 'classnames'
import NavBar from '../../components/nav/navbar'
import { getVideoById } from '../../lib/videos'
import Like from '../../components/icons/like-icon'
import DisLike from '../../components/icons/dislike-icon'
import { useEffect, useState } from 'react'

Modal.setAppElement('#__next');

export async function getStaticProps(context) {

  const id = context.params.videoId;
  const video = await getVideoById(id);
  return {
    props: {
      video: video ? video : {}
    },
    revalidate: 10,
  }
}

export async function getStaticPaths(context) {

  const listOfVideos = [
  'bKh2G73gCCs',
  'oL9gbI4Iis8',
  'DY63dfyn7HQ',
  'dRuwjZJ-DQw',
  'j4fyrqoZddY',
  'NtoshD_J8nI',
  'eEgM2PCNUvA',
  '6Of1wKwGVPo',
  'da7BYWyvwO8',
  'K9Cj4yAbsRE',
  'T6hmdrsLQj8',
  'tQSKyvjsUuI',
  'ARO78kVIdOw',
  '33Ih4xgK-uw',
  '7M6bIeVbCqA',
  'VvnGToXfYv4',
  'V0wfhKLR5qg',
  'gG-9WC48QSc',
  'PozZ-OCXkjU',
  '8CqTvxXIQpw',
  'YLYRSVFN5go',
  'y3m2h9m-FkA',
  '1Bp_UmCadlA',
  'lBsbJjT2W2Q',
  '44hGCootHIU',
  'FRZNFhIfv7c',
  'Hmu4bQxfpDA',
  '71rW8ZNPnsI',
  'K07qA79CMdw',
  'i2YmEWaQn6U',
  'rO9YiNfuBfA',
  'VnOrDZzBGkY',
  'YNH7W7MuAck',
  'KYRcLUrUMpI',
  'Djgo_hMjjJ4',
  '457-jp4fi04',
  'gNtJ4HdMavo',
  '6Vs0k5GAySw',
  '9e1HvYKrAV0',
  'bldBqtgAX2o',
  'FtZAS9gtqcs',
  'QtFS9hHUIVQ',
  'mfujUuM8LiU',]

  const paths = listOfVideos.map(videoId => (
    {
      params: { videoId },
    }
  ))

  return { paths, fallback: 'blocking' }

}

const VideoPage = (props) => {
  const { video } = props;

  const [ toggleLike, setToggleLike ] = useState(false);
  const [ toggleDisLike, setToggleDisLike ] = useState(false);

  const router = useRouter();

  const { title, publishTime, description, channelTitle, viewCount } = video;

  const { videoId } = router.query;

  useEffect(() => {
    const updateRating = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: 'GET'
      })
      const data = await response.json();
      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
          setToggleDisLike(false);
        } else if (favourited === 0) {
          setToggleLike(false);
          setToggleDisLike(true);
        }
      }
    }
    
    updateRating();
  }, [])

  const handleToggleLike = (e) => {
    e.preventDefault();
    console.log('handleToggleLike');
    const val = !toggleLike;
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);

    runRatingService(val ? 1 : 0);
  }

  const handleToggleDislike = (e) => {
    e.preventDefault();
    console.log('handleToggleDislike');
    const val = !toggleDisLike;
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);

    runRatingService(val ? 0 : 1);
  }

  const runRatingService = async (favourited) => {
    const response = await fetch('/api/stats', {
      method: 'POST',
      body: JSON.stringify({ videoId, favourited }),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    console.log('data', await response.json());
  }

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

      <div className={styles.likeDislikeBtnWrapper}>
        <div className={styles.likeBtnWrapper}>
          <button onClick={handleToggleLike}>
            <div className={styles.btnWrapper}>
              <Like selected={toggleLike} />
            </div>
          </button>
      </div>
          <button onClick={handleToggleDislike}>
          <div className={styles.btnWrapper}>
            <DisLike selected = {toggleDisLike}/>
          </div>
          </button>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>

          <div className={styles.col1}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.col2}>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast:</span>
              <span className={styles.channelTitle}>{ channelTitle } </span>
            </p>

            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count:</span>
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