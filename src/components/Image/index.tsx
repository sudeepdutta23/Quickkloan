import { CONFIG } from "../../config";

interface ImageInterface {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  width?: string;
  height?: string;
  loading?: 'eager' | 'lazy';
  onClick?: any;
  preload?: boolean;
}

export const Image = (props: ImageInterface) => (
  <img
    {...props}
    alt={CONFIG.alt}
    // width={props.width || "640"}
    // height={props.height || "360"}
    onError={(e: any) => {
      e.target.src = CONFIG.images.DEFAULT_IMAGE
      e.target.onerror = null;
    }}
  />
);
