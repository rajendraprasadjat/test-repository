/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * This is an GetDirection Component which returns the Store address in Google map.
 * @param entity 
 */
export default function getDirectionUrl(entity: any) {
  let address_string = "";
  address_string =
    `${entity.address?.line1},` +
    `${entity.address?.line2},` +
    `${entity.address?.city},` +
    `${entity.address?.region},` +
    `${entity.address?.postalCode},` +
    `${entity.address?.countryCode}`;
  address_string = address_string.replace("undefined,", "");
  let origin: string = '';
  if (entity.address?.city) {
    origin += entity.address?.city;
  }
  if (entity.address?.region) {
    origin += `${origin ? ',' :''}${entity.address?.region}`;
  } 
  if(entity.address?.countryCode) {
    origin += `${origin ? ',' :''}${entity.address?.countryCode}`;
  }
  if (navigator.geolocation) {
    const error = () => {
      const message_string =
        "Unable to determine your location. please share your location";
      if (confirm(message_string) != true) {
        const getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          address_string +
          "&origin=" +
          origin;
        window.open(getDirectionUrl, "_blank");
      } else {
        return false;
      }
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        const getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          address_string +
          "&origin=" +
          currentLatitude +
          "," +
          currentLongitude;
        window.open(getDirectionUrl, "_blank");
      },
      error,
      {
        timeout: 10000,
      }
    );
  }
}
