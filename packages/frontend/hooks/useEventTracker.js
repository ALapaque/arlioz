import { useEffect } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

const useEventTracker = () => {
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
            !process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID &&
            process.env.NODE_ENV !== 'production') {
            return;
        }

        ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
        TagManager.initialize({
            gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
        });
    }, []);
};

export default useEventTracker;
