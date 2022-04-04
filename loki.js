let helloWorldLanguages = {
  en: "Hello World",
  es: "Hola Mundo",
  de: "Hallo Welt",
  fr: "Bonjour le monde",
  it: "Ciao mondo",
  ja: "ハローワールド",
  ko: "안녕 세상",
  pt: "Olá Mundo",
  ru: "Привет мир",
  zh: "你好世界",
};

const returnLanguage = (language) => {
  if (language in helloWorldLanguages) {
    return helloWorldLanguages[language];
  }
  return helloWorldLanguages["en"];
};

export default returnLanguage;
