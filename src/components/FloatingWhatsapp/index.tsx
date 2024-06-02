import { useEffect, useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "./style.css"; // Import your CSS file for styling

export const FloatingWhatsapp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button when the user scrolls beyond a certain point
      setIsVisible(window.scrollY > 200);
    };

    // Add an event listener for the scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // E

  const openWhatsappp = () => {
    let whatsappUrl = `https://wa.me/9871773053?text=Hi there! Need a loan. Let's talk on WhatsApp and make it easy.`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <button
        className={`scroll-to-top-button-whatsapp visible`}
        onClick={openWhatsappp}
        style={{
          backgroundColor: "#57b967",
          right: isVisible ? "100px" : "20px",
        }}
        aria-label="whatsapp"
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
};
