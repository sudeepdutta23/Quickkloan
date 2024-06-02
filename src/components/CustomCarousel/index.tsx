import { IconButton } from "@mui/material";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

  export const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group d-flex justify-content-center">
        <IconButton className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} aria-label="right" size="large">
            <WestIcon />
        </IconButton>
        <IconButton onClick={() => next()} aria-label="left" size="large">
            <EastIcon />
        </IconButton>
      </div>
    );
  };