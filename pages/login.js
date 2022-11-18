import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import styles from '../styles/Login.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { magic } from '../lib/magic-client'

const Login = () => {

    const [emailInput, setEmailInput] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const router = useRouter();

    useEffect(()=> {
        const handleComplete = () => {
            setIsLoading(false);
        }

        router.events.on('routeChangeComplete', handleComplete);

        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);

        }
    }, [router]);

    const validateMagicToken = async () => {
        try {
            setIsLoading(true);
            const didToken = await magic.auth.loginWithMagicLink({ email: emailInput });
            if (didToken) {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${didToken}`,
                        'Content-Type': 'application/json'
                    }
                })

                const loggedInResponse = await response.json();
                if (loggedInResponse.done) {
                    return true;
                } else {
                    throw new Error('Something went wrong when logging in')
                }
            }

        } catch (e) {
            console.error('Failed to login: ', e)
            return false;
        }
    }

    const validateEmail = () => {
        if (!emailValidator.test(emailInput)) {
            setShowError(true);
            return false;
        } else {
            setShowError(false);
            return true;
        }
    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        if (validateEmail()) {
            if (await validateMagicToken()) {
                router.push('/');
            }
        } else {
            console.error('Invalid email')
        }
    }

    const handleEmailInput = (e) => {
        e.preventDefault();
        setEmailInput(e.target.value);
        validateEmail();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Notflix Sign In</title>
            </Head>

        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <Link href='/'>
                    <Image
                        src="/static/netflix.png"
                        alt="Netflix logo"
                        width="128"
                        height="34"
                    />
                </Link>
            </div>
        </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign in</h1>
                    <input onChange={handleEmailInput} className={styles.emailInput} type='text' placeholder='Email Address'></input>
                    { 
                     showError && <p className={styles.userMsg}>Invalid email</p>
                    }
                    <button className={styles.loginBtn} onClick={handleLoginWithEmail} type='submit'>
                    {
                        isLoading ? 'Logging in...' : 'Sign in' 
                    }
                    </button>
                </div>
            </main>


        </div>
    )   
}

export default Login