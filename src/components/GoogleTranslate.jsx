import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi,ur,kn,ta,te,ml,or,pa,gu,bn,as,mr",
        },
        "google_translate_element"
      );
    };

    return () => {
      // Ensure the script and the Google Translate element are properly cleaned up
      if (document.body.contains(addScript)) {
        document.body.removeChild(addScript);
      }
      const translateElement = document.getElementById(
        "google_translate_element"
      );
      if (translateElement) {
        translateElement.innerHTML = ""; // Clear the content
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
