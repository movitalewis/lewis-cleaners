import Services from "./Services";
import HeroSection from "../components/heroSection";
import Carousel from "../components/Carousel";
import HistoryTimeline from '../components/HistoryTimeline';
import CustomerGrowthChart from "../components/CustomerGrowthChart";
import Map from "../components/map";
import Testimonials from "../components/Testimonials";
import { useRef, useState } from "react";
import { apiFetch } from "../services/api";
function Home() {
    const locationRef = useRef<HTMLDivElement | null>(null);

    const scrollToLocation = () => {
        locationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    };

    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleCheckPrice = async () => {
        try {
            const data = await apiFetch("/api/ai/price", {
                method: "POST",
                body: JSON.stringify({ text: input }),
            });

            setResult(data.message);
        } catch (err: any) {
            console.error(err);
            setResult("Something went wrong");
        }
    };

    return (
        <>
            <main>
                <HeroSection onCTAClick={scrollToLocation}></HeroSection>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter order"/>

                <button onClick={handleCheckPrice}>
                Get Price
                </button>

                <p>{result}</p>
                
                <Services></Services>
                <Carousel></Carousel>
                <Testimonials></Testimonials>
                <HistoryTimeline></HistoryTimeline>
                <section className="container d-flex bottom-section">
                    <CustomerGrowthChart></CustomerGrowthChart>
                    <Map ref={locationRef}></Map>
                </section>
            </main>
        </>
    )
}

export default Home;