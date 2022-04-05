import translate from "@vitalets/google-translate-api";

const translateGreeting = (language) => {
  return translate("Hello World", { to: language });
};

export default translateGreeting;
