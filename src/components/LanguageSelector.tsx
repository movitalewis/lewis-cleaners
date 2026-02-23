import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);          
    localStorage.setItem("lang", lang); 
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => handleLanguageChange(e.target.value)}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
    </select>
  );
};

export default LanguageSelector;