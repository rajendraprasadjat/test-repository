/* eslint-disable react/jsx-key */
import * as React from "react";
import '@splidejs/react-splide/css';
/**
 * For category section with image, title & link
 * @param props 
 * @returns 
 */
const PhotoSlider = (props: any) => {
  const { photos, photoGalleryTitle } = props;
  const photo = photos?.map((element: any) => (

    <div className="relative inline-block">
      {element?.categoryURL ? (
          <a href={element?.categoryURL} target="_blank" rel="noopener noreferrer">
            {element?.categoryImage?.url &&
              <img className="max-h-[25.188rem] w-full" src={element?.categoryImage?.url} alt="" />
            }
            {element?.title &&
              <span className="absolute bottom-0 left-0 right-0 text-center text-[18px] pb-4">{element?.title}</span>
            }
          </a>

        ) :
        <div>
          {element?.categoryImage?.url && (<img className="max-h-[25.188rem] w-full" src={element?.categoryImage?.url} alt=""/>)}
          {element?.title && (<span className="absolute bottom-0 left-0 right-0 text-center text-[18px] pb-4"> {element?.title}</span>)}
        </div>
      }
    </div>
  ));
  return (
    <>
      <div className="Categories">
        <h2 className="text-[34px] text-center">{photoGalleryTitle}</h2>
        <div className="pt-[30px] grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-5">
          {photo}
        </div>
      </div>
    </>
  );
};

export default PhotoSlider;

