import { AlbumSongs, AlbumTitles, BackgroundWrapper } from '@components';

const Album = () => {
  return (
    <BackgroundWrapper>
      <AlbumTitles />
      <AlbumSongs />
    </BackgroundWrapper>
  );
};

export default Album;
