import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import YouTubeLinkInput from '../components/YouTubeLinkInput';
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
    <div className="p-2">
      <Head>
        <title>YouTube Notes</title>
        <meta
          name="description"
          content="Take notes while watching YouTube videos with ease"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <h1>YouTube Notes</h1>
        <p>Here you might some day find a useful application.</p>
        <p>For now, I&apos;m just playing around with stuff.</p>
        <button onClick={clickHandler}>Choose folder</button>
        <p>Current folder: {currentFolder || 'No folder selected.'}</p>
        <YouTubeLinkInput
          className="max-w-lg"
          onLinkDataChange={newData => console.log(newData)}
        />
      </main>
    </div>
  );
};

export default Home;
