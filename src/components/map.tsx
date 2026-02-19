import "../styles/map.less";

function Map() {
    return (
        <>  
            <section className="container map-section py-3">
                <h2>Locate Us Here</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0464089082457!2d72.85759587520609!3d19.105619882105096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c849cd9785bb%3A0x747424befe0eb6c9!2sLewis%20Cleaners!5e0!3m2!1sen!2sin!4v1771493775592!5m2!1sen!2sin" className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lewis Cleaners Location">
                </iframe>
            </section>
        </>
    )
}

export default Map;