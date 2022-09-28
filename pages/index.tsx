import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
// cannot import fs and dialog directly, because under the hood this makes use of navigator, which is not avaiable to NextJS when using SSG
// import { fs, dialog } from '@tauri-apps/api';
// instead, we need to do this dynamically with import('path/to/module') syntax
// TS is luckily pretty smart and still able to infer the type of the dynamic import

const Home: NextPage = () => {
  // problem: would like to fetch in itial value from local storage here
  // however, it's not available to us during SSG, so we need useEffect as shown below
  const [currentFolder, setCurrentFolder] = useState('');
  // `useEffect` is only called during hydration, when. `window` is available.
  // By calling `setCurrentFolder` in `useEffect` a render is triggered after hydrating
  // this causes the "browser specific" value to be available.
  useEffect(
    () => setCurrentFolder(localStorage.getItem('current-folder') || ''),
    []
  );

  const clickHandler = async () => {
    const dialog = await import('@tauri-apps/api/dialog');
    const result = await dialog.open({
      directory: true,
      title: 'Select a folder for the learning material',
      defaultPath: '.',
    });
    if (typeof result == 'string') {
      setCurrentFolder(result);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YouTube Notes</title>
        <meta
          name="description"
          content="Take notes while watching YouTube videos with ease"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>YouTube Notes</h1>
        <p className={styles.description}>
          Here you might some day find a useful application.
        </p>
        <p>For now, I&apos;m just playing around with stuff.</p>
        <button onClick={clickHandler}>Choose folder</button>
        <p>Current folder: {currentFolder || 'No folder selected.'}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
