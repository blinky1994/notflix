import styles from './navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

const NavBar = (props) => {
    const { username } = props;
    const router =  useRouter();

    const [ showDropdown, setShowDropdown ] = useState(false);
    
    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push('/')
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/my-list')
    }

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <Link className={styles.logoLink} href='/'>
                <Image 
                    alt='netflix logo' 
                    src='/static/netflix.png' 
                    width={128}
                    height={30}
                    />
            </Link>
        <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
            <li className={styles.navItem} onClick={handleOnClickMyList}>My List</li>
        </ul>


        <nav className={styles.navContainer}>
            <div>
                <button onClick={handleShowDropdown} className={styles.usernameBtn}>
                    <p className={styles.username}>{ username }</p>
                    <Image 
                        alt='sign out dropdown' 
                        src='/static/dropdown-arrow.svg' 
                        width={24}
                        height={24}
                        />
                </button>
            {
                showDropdown && 
                <div className={styles.navDropdown}>
                    <div>
                        <Link className={styles.linkName} href='/login'>Sign Out</Link>
                        <div className={styles.lineWrapper}></div>
                    </div>
                </div>
            }
            </div>
        </nav>
        </div>
    </div>

  )
}

export default NavBar