import {useEffect, useState} from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(true);

    const handleResize = () => {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        setIsMobile(screenWidth < 768); // Adjust the threshold based on your design
    };

    useEffect(() => {
        // Initial check on mount
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {isMobile};
};

export default useIsMobile;
