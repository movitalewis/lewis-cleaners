import Services from "../pages/Services";
import HeroSection from "../components/heroSection";
import Carousel from "../components/Carousel";
import HistoryTimeline from '../components/HistoryTimeline';
import CustomerGrowthChart from "../components/CustomerGrowthChart";
import Map from "../components/map";
import Testimonials from "../components/Testimonials";
import { useRef } from "react";
function Home() {
    const locationRef = useRef<HTMLDivElement | null>(null);

    const scrollToLocation = () => {
        locationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    };
    return (
        <>
            <main>
                <HeroSection onCTAClick={scrollToLocation}></HeroSection>
                <Services></Services>
                <Carousel></Carousel>
                <Testimonials></Testimonials>
                <HistoryTimeline></HistoryTimeline>
                <CustomerGrowthChart></CustomerGrowthChart>
                <Map ref={locationRef}></Map>
            </main>
        </>
    )
}

export default Home;