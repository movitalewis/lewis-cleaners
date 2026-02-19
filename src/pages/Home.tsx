import { useRef } from "react";
import Services from "../pages/Services";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import HistoryTimeline from '../components/HistoryTimeline';
import CustomerGrowthChart from "../components/CustomerGrowthChart";
import Map from "../components/map";
import Testimonials from "../components/Testimonials";
function Home() {
    const mapRef = useRef<HTMLDivElement | null>(null);

    const scrollToMap = () => {
        mapRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    };
    return (
        <>
            <HeroSection onCTAClick={scrollToMap}></HeroSection>
            <Services></Services>
            <Carousel></Carousel>
            <Testimonials></Testimonials>
            <HistoryTimeline></HistoryTimeline>
            <CustomerGrowthChart></CustomerGrowthChart>
            <div ref={mapRef}>
                <Map></Map>
            </div>
        </>
    )
}

export default Home;