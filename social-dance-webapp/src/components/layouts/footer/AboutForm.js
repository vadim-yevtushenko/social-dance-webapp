import React from "react";

const AboutForm = () => {
    return (
        <div>
            <p className="text-2xl px-8 py-5">
                Social Dance is a web application. Created for the dance community.
                Here you can create school or event for easy search for dancers,
                or just looking for school or event in any city. Dancers can leave
                a review and rate one of them. Maps with geolocation will help dancers
                quickly find the location. When a school or event is posted,
                all registered dancers in that city will receive a notification<br/><br/>
                If you find a bug or want to leave a wish, what would you like to add to this app,
                for example add dance to list dances, write to <a href='#' className='font-bold hover:text-indigo-700'>support</a> in footer, please!
            </p>
        </div>
    )
}

export default AboutForm