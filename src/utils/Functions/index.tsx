import { CONFIG, DEFAULT_FAIL_RESPONSE, DEFAULT_SUCCESS_RESPONSE, exclude401Urls, CustomResponse, DEFAULT_ABORT_RESPONSE } from "../../config";
import { FeatureType } from "../../store";
import { RequestType, Signal } from "..";
import { toast } from "react-toastify";

const CryptoJS = require("crypto-js");

export const CapitalizeAll = (value: string) =>
  value ? value.toString().toUpperCase() : value;

export const getById = (id: any) => document.getElementById(id);

export const getByClassName = (c: any) => document.getElementsByClassName(c);

export const scrollToView = (id: any) =>
  document?.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const scrollToTop = () =>
  window.scrollTo({ behavior: "smooth", left: 0, top: 0 });

export const isFeatureActive = (features: FeatureType[], id: number) => {
  const feature = features?.find((feature) => feature.id === id);
  return feature?.isActive ? Number(feature.isActive) : 1;
};

export const encryptData = (text: any) => {
  let data = CryptoJS.AES.encrypt(JSON.stringify(text), CONFIG.secretPass).toString();
  data = data.replaceAll("/", "frontSL");
  return data;
};

export const decryptData = (text: any) => {
  text = text.replaceAll("frontSL", "/");
  const bytes = CryptoJS.AES.decrypt(text, CONFIG.secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const navigate = (link: string) => (window.location.href = link);

export const navigateToNewTab = (link: string) => {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href = link;
  a.click();
};

export const scrollTo = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const activeLink = (isActive: any) => ({
  fontWeight: isActive ? "bold" : "",
  color: isActive ? "rgb(98, 75, 255)" : "black",
});

export const getError = (touched: any, msg: any) => {
    return touched ? msg : '';
};

export const getClass = (touched: any, msg: any) => {
    return touched && msg ? 'is-invalid' : '';
};

export const createSignal = () : Signal => {
  const abortController = new AbortController();
  return { controller: abortController, signal: abortController.signal };
}
export const getCurrentWidth = () => window.innerWidth;

export const callApi = async (method: RequestType, endPoint: string, signal: AbortSignal, body: any = {},  multipart: boolean = false, download: boolean = false): Promise<CustomResponse> => {
    const headers = new Headers();
    if (localStorage.getItem("quikk-token") || localStorage.getItem("quikk-admin")) {
        const token = window.location.href.includes('/admin') ? localStorage.getItem("quikk-admin") : localStorage.getItem("quikk-token")
        headers.append("Authorization", `Bearer ${token}`)
      }
      headers.append('device', getCurrentWidth() > 414 ? '1' : '2' )
    if (!multipart)
        headers.append("Content-Type", 'application/json');
    if (multipart)
        headers.append("enctype", 'multipart/form-data');

    const object: RequestInit = { method, headers, signal };
    if ([RequestType.POST, RequestType.PUT].includes(method) ) object.body = !multipart ? JSON.stringify(body) : body;

    try {
        let res: Response = await fetch(`${process.env.REACT_APP_BASE_URL}${endPoint}`, object);
        let finalResponse: CustomResponse;

        if (res.status === 401 && !exclude401Urls.includes(endPoint)) {
            localStorage.clear();
            window.location.href = "/"
        }

        if(download){
            window.open(window.URL.createObjectURL(await res.blob()), '_blank',`download=${endPoint.replace(/[^0-9]/g, "")}-Documents`);
            finalResponse = JSON.parse(JSON.stringify(DEFAULT_SUCCESS_RESPONSE));
        }
        else{
            finalResponse = await res.json();
        }

        return finalResponse;
    } catch (e: any) {
        if(e.name === "AbortError") {
          return DEFAULT_ABORT_RESPONSE;
        }
        return DEFAULT_FAIL_RESPONSE;
    }
}


export const copyToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Link Copied");
};

export const sspecialCharConversion = (char: string) =>{
  const spectalCharArray = [
    { char: '<', specialChar: '&lt;' },
    { char: '>', specialChar: '&gt;' },
    { char: '&', specialChar: '&amp;' },
    ]
  let newString = char
    spectalCharArray.forEach(speccial=>{
      newString = newString.replaceAll(speccial.specialChar,speccial.char)
    })
    return newString
}

export const shareInWhatsapp = (text: string) => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");