import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    "Unit": "Units",
                    fat: "Fat",
                    carbohydrate: "Carbohydrate",
                    protein: "Protein",
                    calorie: "Calorie"
                }
            },
            es: {
                translations: {
                    "Home": "Inicio",
                    "Users": "Usuarios",
                    "My account": "Mi cuenta",
                    "Recipes": "Recetas",
                    "Cooklists": "Listas de cocina",
                    "Ingredients": "Ingredientes",
                    "Recently cooked": "Cocinado recientemente",
                    "Favourite recipes": "Recetas favoritas",
                    "Statistics": "Estadísticas",
                    "Log Out": "Cerrar sesión",
                    "Log In": "Iniciar sesión",
                    "Filters": "Filtros",
                    "Sort by": "Ordenar por",
                    "Confirm": "Confirmar",
                    "General rating": "Calificación general",
                    "Your rating": "Tu calificación",
                    "Categories": "Categorías",
                    "Approximated nutritional value": "Valor nutricional aproximado",
                    "Instructions": "Instrucciones",
                    "Grams": "Gramos",
                    "Unit": "Unidades",
                    fat: "Grasas",
                    carbohydrate: "Carbohidratos",
                    protein: "Proteinas",
                    calorie: "Calorías"
                }
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
