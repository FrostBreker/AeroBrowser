import React, { useEffect, useState } from 'react';

export default function Home() {
    // const [date, setDate] = useState(dayjs());

    // useEffect(() => {
    //     setDate(dayjs());
    // }, []);

    return (
        <div className='home'>
            <div className="header">
                <div className='left-panel'>
                    <div className="stats">
                        <p>1000</p>
                        <p>102</p>
                        <p>110H</p>
                    </div>
                    <div className="last-visited">
                        <p>Google</p>
                        <p>Facebook</p>
                        <p>Youtube</p>
                    </div>
                </div>

                <div className="right-panel">
                    {/* <h1 className='time'>{date.format("hh:mm:ss")}</h1> */}
                </div>
            </div>
        </div>
    )
}
