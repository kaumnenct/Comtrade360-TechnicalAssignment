import mongoose from "mongoose";
import connect from "./config/database.js";
import hwLanguage from "./models/languageModel.js";

const addLanguage = (language, greeting) => {
    return new Promise((resolve, reject) => {
        connect();
    
        let newLanguage = new hwLanguage({
            language: language,
            greeting: greeting,
        });
    
        newLanguage
            .save()
            .then((result) => {
            resolve(result);
            })
            .catch((error) => {
            reject(error);
            });
    });
}

export default addLanguage;