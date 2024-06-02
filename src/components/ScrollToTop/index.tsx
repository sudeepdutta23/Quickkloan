import { useEffect, useState } from 'react';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { STYLES } from '../../config';
import './style.css'; // Import your CSS file for styling

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the user scrolls beyond a certain point
      setIsVisible(window.scrollY > 200);
    };

    // Add an event listener for the scroll event
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scrolling
    });
  };

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{ backgroundColor: STYLES.primaryBackground }}
      aria-label="scrolltotop"
    >
      <UpgradeIcon />
    </button>
  );
};
