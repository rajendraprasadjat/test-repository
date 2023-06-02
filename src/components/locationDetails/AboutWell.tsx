/* eslint-disable no-var */
import * as React from "react";
import { Link } from "@yext/pages/components";
import RtfConverter from "@yext/rtf-converter";
type AboutSection = {
  storeDescriptionTitle: string;
  storeDescriptionImage: any;
  storeDescriptionText: string;
  storeDescriptionCTA: any;
};
const About = (props: AboutSection) => {
  const {
    storeDescriptionTitle,
    storeDescriptionImage,
    storeDescriptionText,
    storeDescriptionCTA,
  } = props;
  let linkss
  if (storeDescriptionText) {
    var Desc = RtfConverter.toHTML(storeDescriptionText);
  }
  if(storeDescriptionCTA?.link && storeDescriptionCTA?.label )
  {
  if (storeDescriptionCTA?.linkType === "OTHER" && storeDescriptionCTA?.link != "#") {
     linkss = <Link
      href={storeDescriptionCTA.link}
      className="button mt-5 lg:mt-10 !text-base"
      target="_blank"
      rel="noopener noreferrer"
    >
      {storeDescriptionCTA.label}
    </Link>

  }
  else if (storeDescriptionCTA?.linkType === "URL") {
     linkss = <Link
      href={storeDescriptionCTA.link}
      className="button mt-5 lg:mt-10 !text-base"

    >
      {storeDescriptionCTA.label}
    </Link>

  }
  else if (storeDescriptionCTA?.linkType === "OTHER" && storeDescriptionCTA?.link == "#") {
    linkss = <Link
     href={storeDescriptionCTA.link}
     className="button mt-5 lg:mt-10 !text-base"

   >
     {storeDescriptionCTA.label}
   </Link>

 }

}
  return (
    <>
      {storeDescriptionTitle && (
        <div className="about-sec">
          <h2 className="sec-title !mb-14 block lg:hidden text-center">
            {storeDescriptionTitle}
          </h2>

          <div className="flex flex-wrap">
            <div className={storeDescriptionImage ? "about-sec-content" : "w-full lg:w-1/2 xl:w-3/5 pt-0 lg:pl-10 only-content"
            }
            >
              <div className="ab-sec-inner">
                <h2 className="sec-title !mb-5 hidden lg:block">
                  {storeDescriptionTitle}
                </h2>
                <div className="leading-7 text-base text-gray-700 about-content"
                  dangerouslySetInnerHTML={{ __html: Desc ? Desc : "" }}
                ></div>

                <div className="space-x-5">
                  {storeDescriptionCTA?.link && storeDescriptionCTA?.label ? (

                    <div>{linkss}</div>

                  ) : <></>}
                </div>
              </div>
            </div>
            {storeDescriptionImage && (
              <div className="about-sec-img">
                <img
                  className="max-w-full  w-full h-full"
                  alt=""
                  src={storeDescriptionImage?.url}
                ></img>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default About;
