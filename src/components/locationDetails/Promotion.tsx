import * as React from "react";

/**
 * For promotion section with image,title,description & CTA
 * @param props 
 * @returns 
 */

const Promotion = (props: any) => {

 let links;
  if(props.promo.moreProducts?.link && props.promo.moreProducts?.label)
  {
  if (props.promo.moreProducts?.linkType == "OTHER" && props.promo.moreProducts?.link!="#") {
     links = 
    <a href={props.promo.moreProducts.link} target="_blank"
    rel="noopener noreferrer">{props.promo.moreProducts.label}</a>

  }
  else if (props.promo.moreProducts?.linkType == "URL") {
     links =  <a href={props.promo.moreProducts.link} >{props.promo.moreProducts.label}</a>

  }
  else if(props.promo.moreProducts?.linkType == "OTHER" && props.promo.moreProducts?.link=="#")
  {
    links =  <a href={props.promo.moreProducts.link} >{props.promo.moreProducts.label}</a>
  }
}
 return (
    <>
    {props?.promo?.image?.url && props.promo.title &&
   <div className="relative mt-[60px]">
        <img className="h-[600px] w-full" src={props?.promo?.image?.url} alt=""/>
        <div className="absolute top-0 max-w-[500px] text-white lg:ml-[291px] lg:mt-[50px] sm:ml-5 sm:mt-10">
            <h3 className="sm:text-xl lg:text-[34px] font-medium lg:pb-10 sm:pb-5">{props.promo.title}</h3>
            {props.promo.description &&
            <p className="lg:pb-10 sm:pb-5 sm:text-sm lg:text-base">
              {props.promo.description}</p>
}
              {props.promo.moreProducts?.link && props.promo.moreProducts?.label && (
            <button className="lg:px-5 lg:py-2 sm:px-3 sm:py-1 bg-black text-white border border-white">
              {links}</button>
              )}
        </div>
    </div>
}
    </>
  );
};

export default Promotion;

  