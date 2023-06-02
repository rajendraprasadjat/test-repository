import * as React from "react";

type MapImage = {
  prop: any;
  coords: number;
  address: string;
  image: any;
  services: any;
  storeType: any;
  productCatagories: any;
  productCatagoriesTitle: string;
  storeTypesTitle: string;
  servicesTitle: string;
};


const MapImage = (props: any) => {
  return (
    <>
      <div className=" map-secion">
        <div className="product-img-sec">
          <img src={props?.image?.image?.url} alt="" />
        </div>
        <div className="Services-sec">
          
        <div className="service-item-main">
        {props.servicesTitle && props.services && ( 
        <div className="service-item">
            <h3>{props.servicesTitle}</h3>
            <ul>
              {props.services?.map((e: any) => (
                <li key={e.id}>{e}</li>
              ))}
            </ul>
          </div>
          )}
        {props.storeTypesTitle && props.storeType && (
          <div className="service-item">
            <h3>{props.storeTypesTitle}</h3>
            <ul>
              <li> {props.storeType}</li>
            </ul>
           
          </div>
)}
     {props.productCatagoriesTitle && props.productCatagories && (<div className="service-item">
            <h3>{props.productCatagoriesTitle}</h3>
            <ul>
              {props.productCatagories?.map((e: any) => (
                <li key={e.id}>{e}</li>
              ))}
            </ul>
          </div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapImage;
