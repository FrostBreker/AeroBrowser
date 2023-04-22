import React from 'react'

export const LeftTriangleCarretIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" id="Left" points="15.5 5 8.5 12 15.5 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
    </svg>
);

export const RightTriangleCarretIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
    </svg>
);

export const AddTabIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="12" x2="12" y1="19" y2="5" />
        <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="5" x2="19" y1="12" y2="12" />
    </svg>
);

export const DownloadIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <polyline data-name="Right" fill="none" id="Right-2" points="7.9 12.3 12 16.3 16.1 12.3" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" x1="12" x2="12" y1="2.7" y2="14.2" />
    </svg>
);

export const LockIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10V7C5.5 5.27609 6.18482 3.62279 7.40381 2.40381C8.62279 1.18482 10.2761 0.5 12 0.5C13.7239 0.5 15.3772 1.18482 16.5962 2.40381C17.8152 3.62279 18.5 5.27609 18.5 7V10H19C20.6569 10 22 11.3431 22 13V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V13C2 11.3431 3.34315 10 5 10H5.5ZM9.52513 4.52513C10.1815 3.86875 11.0717 3.5 12 3.5C12.9283 3.5 13.8185 3.86875 14.4749 4.52513C15.1313 5.1815 15.5 6.07174 15.5 7V10H8.5V7C8.5 6.07174 8.86875 5.1815 9.52513 4.52513Z" fill="#000000" />
    </svg>
);

export const AlertIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="8" y2="12" />
        <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16" y2="16" />
        <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
);

export const RefreshIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" />
    </svg>
);

export const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
);

export const BookmarkFilledIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
        <path strokeWidth="5" d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z" />
    </svg>
);

export const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px" >
        <path
            d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z" />
    </svg>
);

export const DownTriangleCarret = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px"
        height="50px">
        <path
            d="M 44.988281 13.984375 C 44.726563 13.992188 44.476563 14.101563 44.292969 14.292969 L 25 33.585938 L 5.707031 14.292969 C 5.519531 14.097656 5.261719 13.992188 4.992188 13.988281 C 4.582031 13.992188 4.21875 14.238281 4.0625 14.613281 C 3.910156 14.992188 4 15.421875 4.292969 15.707031 L 24.292969 35.707031 C 24.683594 36.097656 25.316406 36.097656 25.707031 35.707031 L 45.707031 15.707031 C 46.003906 15.421875 46.09375 14.980469 45.9375 14.601563 C 45.777344 14.222656 45.402344 13.976563 44.988281 13.984375 Z" />
    </svg>
);

export const SearchIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z" fill="#000000" />
    </svg>
);

export const SoundMuteIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.0849493,-1.42108547e-14 L298.668,251.583611 L304.101001,257.015597 L304.101,257.016 L353.573532,306.488791 C353.573732,306.488458 353.573933,306.488124 353.574133,306.48779 L384.435257,337.348961 L384.434,337.349 L409.751616,362.666662 L379.581717,392.836561 L191.749,205.003 L191.749973,369.105851 L81.0208,283.647505 L7.10542736e-15,283.647505 L7.10542736e-15,112.980838 L80.8957867,112.980838 L91.433,104.688 L16.9150553,30.169894 L47.0849493,-1.42108547e-14 Z M361.298133,28.0146513 C429.037729,103.653701 443.797162,209.394226 405.578884,298.151284 L372.628394,265.201173 C396.498256,194.197542 381.626623,113.228555 328.013013,54.642278 L361.298133,28.0146513 Z M276.912853,95.5237713 C305.539387,127.448193 318.4688,168.293162 315.701304,208.275874 L266.464558,159.040303 C261.641821,146.125608 254.316511,133.919279 244.488548,123.156461 L243.588693,122.182545 L276.912853,95.5237713 Z M191.749973,25.7516113 L191.749,84.3256113 L158.969,51.5456113 L191.749973,25.7516113 Z" id="Combined-Shape">
        </path>
    </svg>
);

export const SoundIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M276.914133,274.101547 L243.589973,247.442773 C283.38304,204.875093 283.38432,138.998827 243.588693,96.4311467 L276.912853,69.77216 C329.118507,127.992107 329.118507,215.880107 276.914133,274.101547 Z M191.749973,1.42108547e-14 L80.8957867,87.2292267 L7.10542736e-15,87.2292267 L7.10542736e-15,257.895893 L81.0208,257.895893 L191.749973,343.35424 L191.749973,1.42108547e-14 L191.749973,1.42108547e-14 Z" id="Shape">
        </path>
    </svg >
);