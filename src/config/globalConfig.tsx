export const limit = 8;
export const radius = 500;
export const defaultQuery = "";
export const baseApiUrl = "https://liveapi-sandbox.yext.com/v2/accounts/me";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const entityTypes = "location";
export function slugify(slugString: any) {
    slugString.toLowerCase().toString();
    slugString = slugString.replace(/[&/\\#^+()$~%.'":*?<>{}!@]/, "");
    slugString = slugString.replaceAll("  ", "-");
    slugString = slugString.replaceAll(" ", "-");
    slugString = slugString.replaceAll("---", "-");
    slugString = slugString.replaceAll("--", "-");
    slugString = slugString.replaceAll("'", "");
    return slugString.toLowerCase();
}
export function slugify1(slugString: any) {
    slugString.charAt(0, 9).toUpperCase() + slugString.slice(1).toLowerCase().toString();
    slugString = slugString.replace(/[&/\\#^+()$~%.'":*?<>{}!@_]/, " ");
    slugString = slugString.replaceAll("_", " ");
    return slugString.charAt(0, 9).toUpperCase() + slugString.slice(1).toLowerCase().toString();
}
export const defaultTimeZone = "Europe/London";
export const AnalyticsEnableDebugging = true;
export const AnalyticsEnableTrackingCookie = true;
export const googleMapsConfig = {
    centerLatitude: 51.509865,
    centerLongitude: -0.118092,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
};

export const cookieText = `Our site and our partners collect data and use cookies in accordance with our`;
export const cookieText1 = `to enhance your experience, analyze traffic and for ad personalization and measurement. For more information on this and how to manage your cookies, please click cookie settings below.`
export const cookieUrl = "https://www.byredo.com/eu_en/cookie-policy"
export const ByredoSocialMediaUrls = {
    facebook: "https://www.facebook.com/byredo/",
    instagram: "https://www.instagram.com/officialbyredo/"
}

export const GoogleSearchConsole = {
    name: "google-site-verification",
    content: "WIqhwAw2ugRAKEYRRqis1ZfUBbnWe_AXSoDltHceCbI"
}
export const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const BaseUrl = "https://cosily-sparkling-gar.sbx.pgsdemo.com"
export const AnswerExperienceConfig = {
    experienceKey: "reactbyredo",
    locale: "en_GB",
    apiKey: "a62e04fba3a14cfcf6ccd755a65cd2a8",
    verticalKey: "locations",
    experienceVersion: "STAGING",
    sessionTrackingEnabled: true,
    endpoints: {
        universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
        verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
        questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
        universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
        verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
        filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
    }
};

export const defualtMapStyle = [
    {
        featureType: "administrative",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

export const silverMapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
]
