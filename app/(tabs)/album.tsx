import { AlbumSongs, AlbumTitles, BackgroundWrapper } from '@components';
import { setupAudio } from '@utils';
import { useEffect } from 'react';
import { useAlbumStore } from 'src/store';

const Album = () => {
  useEffect(() => {
    setupAudio();
    useAlbumStore.getState().fetchMusicAssets();
  }, []);

  return (
    <BackgroundWrapper>
      <AlbumTitles />
      <AlbumSongs />
    </BackgroundWrapper>
  );
};

export default Album;
