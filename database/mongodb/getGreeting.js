import mongoose from "mongoose";
import connect from "./config/database.js";
import hwLanguage from "./models/languageModel.js";

const getLanguage = (language) => {
    return new Promise((resolve, reject) => {
        connect();

        hwLanguage.findOne({ language: language })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default getLanguage;