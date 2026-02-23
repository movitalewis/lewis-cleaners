import { useTranslation } from "react-i18next";
function Services() {
    const { t } = useTranslation();
    return (
        <>  
            <section className="services-section bg-light">
                <div className="container">
                    <h2>{t("ourServices.title")}</h2>
                    <ul>
                        <li className="s1">{t("ourServices.service1")}</li>
                        <li className="s2">{t("ourServices.service2")}</li>
                        <li className="s3">{t("ourServices.service3")}</li>
                        <li className="s4">{t("ourServices.service4")}</li>
                        <li className="s5">{t("ourServices.service5")}</li>
                        <li className="s6">{t("ourServices.service6")}</li>
                        <li className="s7">{t("ourServices.service7")}</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Services;