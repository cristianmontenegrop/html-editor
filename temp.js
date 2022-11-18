let input = <img class='size-1' src='./src/img/Untitled_Artwork67copy2.jpg' />;

let output = (
  <picture class='size-1'>
    <source
      type='image/avif'
      sizes='(max-width: 480px) 480w, (max-width: 768px) 768w,(max-width: 1279px) 1279w, (min-width: 1280px) 1280w'
      srcset='
              ./src/imgTest/output/Untitled_Artwork67copy2-xs.avif  480w,
              ./src/imgTest/output/Untitled_Artwork67copy2-sm.avif  768w,
              ./src/imgTest/output/Untitled_Artwork67copy2-md.avif 1279w,
              ./src/imgTest/output/Untitled_Artwork67copy2-lg.avif 1280w
            '
    />
    <source
      type='image/webp'
      sizes='(max-width: 480px) 480px, (max-width: 768px) 768px,(max-width: 1279px) 1279px, (min-width: 1280px) 1280px'
      srcset='
              ./src/imgTest/output/Untitled_Artwork67copy2-xs.webp  480w,
              ./src/imgTest/output/Untitled_Artwork67copy2-sm.webp  768w,
              ./src/imgTest/output/Untitled_Artwork67copy2-md.webp 1279w,
              ./src/imgTest/output/Untitled_Artwork67copy2-lg.webp 1280w
            '
    />
    <source
      type='image/jpg'
      sizes='(max-width: 480px) 480px, (max-width: 768px) 768px,(max-width: 1279px) 1279px, (min-width: 1280px) 1280px'
      srcset='
              ./src/imgTest/output/Untitled_Artwork67copy2-xs.jpg  480w,
              ./src/imgTest/output/Untitled_Artwork67copy2-sm.jpg  768w,
              ./src/imgTest/output/Untitled_Artwork67copy2-md.jpg 1279w,
              ./src/imgTest/output/Untitled_Artwork67copy2-lg.jpg 1280w
            '
    />
    <img class='size-1' src='./src/img/Untitled_Artwork67copy2.jpg' />
  </picture>
);
