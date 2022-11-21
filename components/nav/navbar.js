import styles from './navbar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { magic } from '../../lib/magic-client';
import { UserContext } from '../../context/user-context';
import { useContext } from 'react';

const NavBar = () => {
    const router =  useRouter();
    const { user, setUser } = useContext(UserContext);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ didToken, setDidToken ] = useState('');
    
    useEffect(() => {
        const getUserEmail = async () => {
            try {
                const { email } = await magic.user.getMetadata();  
                const didToken = await magic.user.getIdToken();
                if (email) {
                    setDidToken(didToken);
                    setUser(email);
                } 
            } catch (error) {
                console.error('Error retrieving email: ', error);
            }
        }   
        getUserEmail();
    }, [])

    const handleOnClickHome = async (e) => {
        e.preventDefault();
        router.push('/');
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/my-list')
    }

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/logout");
          await response.json();
        } catch (error) {
          console.error("Error logging out", error);
          router.push("/login");
        }
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
                    <p className={styles.username}>{ user }</p>
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
                        <Link onClick={handleSignOut} className={styles.linkName} href=''>Sign Out</Link>
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