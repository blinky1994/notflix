import Image from "next/image";
import { useState } from "react";
import styles from './card.module.css'
import { motion } from "framer-motion";
import cls from "classnames";

const Card = (props) => {
    const { size = 'medium', 
    imgUrl='https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80', 
    id
    } = props;

    const [ imgSrc, setImgSrc ] = useState(imgUrl);

    const classMap = {
        'large': styles.lgItem,
        'medium': styles.mdItem,
        'small': styles.smItem,
    }

    const handleOnError = () => {
        console.log('handle erorr');
        setImgSrc('/static/clifford.webp')
    }

    const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }
    
    return (
        <div className={ styles.container }>
            <motion.div 
            className={ cls(styles.imgMotionWrapper, classMap[`${size}`]) }
            whileHover={{...scale}}
            >
                <Image 
                alt='card image' 
                src={imgSrc}
                layout='fill'
                onError={handleOnError}
                className={styles.cardImg}
                ></Image>
            </motion.div>

        </div>
    )
}

export default Card