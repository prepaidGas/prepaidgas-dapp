import React from 'react';
import Heading from '@/components/heading';

interface GalleryItem {
  name: string;
  img: string; 
  category: string;
}

interface GalleryCardsProps {
  item: GalleryItem;
}

const GalleryCards: React.FC<GalleryCardsProps> = ({ item }) => {
  const { name, img, category } = item;
  return (
    <div className="mb-[25px]">
      <figure className="bg-white dark:bg-white/10 rounded-10">
        <img style={{ width: '100%' }} src={`/hexadash-nextjs/${img}`} alt="" />
        <figcaption>
          <div className="px-6 py-5">
            <Heading className="text-15 font-medium mb-0.5 text-dark dark:text-white/60" as="h4">
              {name}
            </Heading>
            <p className="mb-0 text-light dark:text-white/60 text-13">{category}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default GalleryCards;
