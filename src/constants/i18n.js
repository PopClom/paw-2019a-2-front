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
                    "TODO": "TODO: TRADUCIR",
                    "User.name": "Name",
                    "User.surname": "Surname",
                    "User.password": "Password",
                    "User.repeatPassword": "Repeat password",
                    "User.email": "E-mail",
                    "User.username": "Username",
                    "user.ban": "Ban this user",
                    "user.banWarning": "Are you sure you want to ban {{0}}?",

                    "logOut": "Log Out",
                    "logIn": "Log In",
                    "BackToLogin": "Back to log in",

                    "forgotPassword": "Forgot Password?",
                    "signIn": "Sign In",
                    "signInError": "Invalid username or password",
                    "register": "Register",
                    "alreadyMember": "Already a member?",
                    "notAmember": "Not a member?",
                    "rememberMe": "Remember me",
                    "admin.Remove": "Remove admin permissions",
                    "admin.Grant": "Grant admin permissions",

                    "Register.signUp": "Sign up",

                    "goToSeeRecipes": "Look for new recipes!",
                    "emptyMyCooklist": "Your cooklist is empty, see some recipes in the main page to add them here!",
                    "emptyCooklist": "This cooklist is empty",
                    "emptyRecipes": "{{0}} doesn't have any recipes yet!",
                    "emptyMyRecipes": "You don't have any recipes, use the plus button to add your first recipe!",
                    "recipe.title": "{{0}}''s recipes",
                    "addNewRecipe": "Add New Recipe",
                    "Recipe.name": "Recipe Name",
                    "recipeName.title": "Be descriptive — but don't get crazy. Succinct titles with well-chosen adjectives and key ingredients are memorable and they catch our attention, like 'One-Pot Kale and Quinoa Pilaf', 'Aunt Mariah's Lemon Sponge Cups' or 'Tipsy Maple Corn'. (You want to go cook all three, don't you?)",
                    "recipeName.placeholder": "What's the name of your recipe?",
                    "Recipe.description": "Recipe description",
                    "description.title": "This will be your recipe's description! Briefly describe everything about your recipe.",
                    "description.placeholder": "Tell us about your recipe.",
                    "Recipe.instructions": "Recipe Instructions",
                    "instructions": "Instructions",
                    "instructions.title": "This will be your recipe's instructions! We love a good story behind a dish, along with helpful tips and variations.\nIf you've adapted from someone else's recipe, this is where you should give credit and tell us how you've made it your own. Not sure if your recipe is adapted enough?",
                    "instructions.placeholder": "Tell us about your recipe.",
                    "Recipe.addIngredient": "Add ingredient",
                    "Recipe.DeleteIngredient": "Delete ingredient",
                    "Recipe.addImage": "Add image",
                    "Recipe.selectedFile": "Selected file:",
                    "Recipe.image": "Choose an image for your recipe",
                    "recipe.deleteWarning": "Do you really want to delete this recipe?",
                    "userNotExist": "The user that created this recipe does not exist anymore",

                    "goMainPage": "Return to main page",
                    "pageNotExists": "Oops, it look's like the page you are trying to access does not exists.",
                    "close": "close",
                    "saveChangesButton": "Save changes",
                    "confirm": "Confirm",

                    "recentlyCooked.title": "Recently cooked recipes",
                    "recentlyCookedUser.title": "{{0}}''s recently cooked recipes",

                    "recentlyCooked.empty": "{{0}} didn't cook any recipe yet!",
                    "myRecentlyCooked.empty": "You didn't cook any recipe yet!",

                    "NoSuchUser": "This user does not exists",
                    "Home": "Home",
                    "Users": "Users",
                    "sortBy": "Sort by",
                    "otherUserAccount": "{{0}}'s account",
                    "myAccount": "My Account",
                    "recipes": "Recipes",
                    "myRecipes": "Recipes",
                    "myIngredients": "Ingredients",
                    "lists": "Cooklists",
                    "Filters": "Filters",
                    "searchFilters": "Apply filters",
                    "favouriteRecipes": "Favourite recipes",
                    "recipesExplanation": "See the recipes created by {{0}}",
                    "myRecipesExplanation": "See the recipes created by you",
                    "myListsExplanation": "Here you can find recipes of your own and from others, all chosen by you",
                    "listsExplanation": "Here you can find {{0}}''s cookLists",
                    "myIngredientsExplanation": "See and modify the ingredients you have in your fridge",
                    "myFavouriteRecipesExplanation": "Here you find  recipes that you rated with at least 4 stars",
                    "noIngredients": "You don't have any ingredients, add one now with the green button",
                    "recentlyCooked": "Recently cooked",
                    "tags.select": "Select your recipe tags",

                    "yourFavourites": "Favourite recipes",
                    "favourites.title": "{{0}} favourite recipes",
                    "emptyMyfavourites": "You don't have any favourite recipes yet, once you rate recipes with at least 4 stars, they will appear here. Go to the main page to rate recipes!",
                    "emptyFavourites": "{{0}} doesn't have any favourites recipes",

                    "NoRecipesYet": "There are no recipes yet, be the first to add one!",
                    "NoUsersYet": "There are no users yet",
                    "NoUsersMatchingFilter": "There are no users that match the selected filters",
                    "noCookLists": "{{0}} doesn't have any cooklists",
                    "noCookListsMy": "You don't have any cooklists",
                    "cooklist.editTitle": "Edit your cooklist name",
                    "cooklist.deleteWarning": "Are you sure you want to delete this cooklist?",
                    "cooklist.addRecipeTitle": "Add this recipe to your cooklist",
                    "cooklist.select": "Select your cooklist",
                    "cooklist.title": "{{0}}'s cooklists",
                    "cooklist.allHaveRecipe": "All your cooklists already have this recipe, you can create another cooklist and it will be added automatically!",
                    "cooklist.addNew": "You don't have cooklists to add this recipe. Create one and it will be added automatically!",
                    "cooklist.addTitle": "Add a new cooklist",
                    "cooklist.name": "Insert your cooklist name",
                    "cooklist.None": "You don't have cooklists yet, add at least one to add there your favorites recipes!",
                    "cooklist.add": "Add to cooklist",
                    "myCooklists": "Your cooklists",

                    "ingredientsFilter": "Ingredients",
                    "withMyIngredients": "Only show recipes I can cook with my ingredients",

                    "comment.Add": "Add your comment",
                    "comment.Size": "Between 4 and 500 characters",
                    "comment.Send": "Send your comment",
                    "comment.login": "You need to be logged to add a comment!",
                    "comment.delete": "Delete comment",
                    "comment.deleteWarning": "Are you sure you want to delete this comment?",

                    "rating.general": "General rating",
                    "rating.user": "Your rating",

                    "NoRecipesMatchingFilter": "There are no recipes that match the selected filters",
                    "Recipe.amount": "Submitted recipes: {{0}}",
                    "cookButton": "Cook!",

                    "MyrecentlyCookedExplanation": "Recently cooked recipes by you",
                    "recentlyCookedExplanation": "Recently cooked recipes by {{0}}",
                    "FavouriteRecipesExplanation": "Here you find recipes {{0}} rated above 4 stars",
                    "getStatistics": "Get Statistics!",
                    "search": "Search",

                    "AverageRate": "Average rating: {{0}}",

                    "ingredient.deleteWarning": "Are you sure you want to delete {{0}}?",
                    "ingredient.minimum.amount": "The amount must be greater than 0",
                    "ingredient.maximum.amount": "The amount can't be greater than 1,000,000,000",
                    "ingredient.select": "Select ingredient",
                    "ingredient.selectMulti": "Select ingredients",
                    "ingredient.editAmount": "Edit amount",
                    "ingredient.delete": "Delete ingredient",

                    "expiration.error": "The confirmation mail has expired",

                    "editIngredient": "Edit {{0}}",

                    "addIngredient": "Add",
                    "addIngredient.title": "Add ingredients",
                    "addIngredient.select": "Ingredient",
                    "addIngredient.amount": "Amount",
                    "addIngredient.type": "Serving type",
                    "addIngredient.add": "Add ingredient",
                    "delete": "Delete",
                    "ingredients": "Ingredients",
                    "categories": "Categories",

                    "Error.Ingredient.Repeated": "You can't add the same ingredient twice",
                    "Error.Ingredient.Invalid": "Invalid amount detected or duplicated ingredient found",
                    "Email": "The email is not valid",
                    "Size": "The field must have between {{2}} and {{1}} characters",
                    "ImageSize": "Image size exceeds limit (1MB)",
                    "ImageFormat": "The selected file is not an image",
                    "PasswordMatch": "Passwords don't match",
                    "AvailableUsername": "The username is not available",
                    "AvailableEmail": "The email is not available",

                    "ingredients.Filter.Group": "Filter by a group of ingredients",

                    "cuisineType": "Type of Cuisine",
                    "status": "Status",

                    "American": "American",
                    "Arab": "Arab",
                    "Argentinean": "Argentinean",
                    "Brazilian": "Brazilian",
                    "CentralAmerican": "Central American",
                    "Chinese": "Chinese",
                    "French": "French",
                    "German": "German",
                    "Indian": "Indian",
                    "Italian": "Italian",
                    "Japanese": "Japanese",
                    "Mexican": "Mexican",
                    "Vegan": "Vegan",
                    "Vegetarian": "Vegetarian",

                    "Units": "Units",
                    "Unit": "Units",
                    "Grams": "Grams",
                    "Kilograms": "Kilograms",
                    "Liters": "Liters",
                    "Milliliters": "Milliliters",
                    "Cup": "Cup",
                    "Teaspoon": "Teaspoon",
                    "Ounces": "Ounces",

                    "date.from": "Since",
                    "date.to": "To",
                    "date.range": "Select a date range",

                    "tagChart": "Tag chart",
                    "nutritionalChart": "Nutritional charts",

                    "apology": "We are sorry.",
                    "forbidden": "You do not have access to be in this page.",
                    "not_found": "What you are looking for was not found.",
                    "badRequest": "The request was invalid",
                    "error": "Internal error",
                    "error_explanation": "There has been an internal error.",
                    "details_error": "Technical details:",

                    "nutritionalValueAprox": "Approximate nutritional value",

                    "successFullyCooked": "Successfully cooked!",
                    "cantCooked": "You don't have enough ingredients to cook this recipe",

                    "editRecipe": "Edit Recipe",
                    "deleteRecipe": "Delete Recipe",

                    "Rising": "Rising",
                    "TopRated": "Top Rated",
                    "New": "New",
                    "Old": "Old",
                    "Any": "Username",
                    "Asc": "Ascending",
                    "Desc": "Descending",
                    "None": "None",

                    "REGULAR": "Active",
                    "DELETED": "Banned",

                    "mail.Sent": "Check you email to validate your account before logging in",
                    "mailConfirmation.Subject": "Mail confirmation",
                    "mailConfirmation.Body": "Press the link to confirm mail: \n{{0}}",
                    "confirmationError": "You must confirm your email to continue",
                    "resetPassword.Subject": "Restore password",
                    "resetPassword.Body": "Press the link to restore your password: \n{{0}}",
                    "resendEmail.header": "The verification token expired",
                    "resendEmail.resend": "Resend email",

                    "Salmon": "Salmon",
                    "ChickenBreast": "Chicken Breast",
                    "Tuna": "Tuna",
                    "Beef": "Beef",
                    "GroundBeef": "Ground Beef",
                    "Almond": "Almond",
                    "Tomato": "Tomato",
                    "RedBellPepper": "Red Bell Pepper",
                    "GreenBellPepper": "Green Bell Pepper",
                    "Onion": "Onion",
                    "Pumpkin": "Pumpkin",
                    "WhiteRice": "White Rice",
                    "BlackBeans": "Black Beans",
                    "Carrot": "Carrot",
                    "Cucumber": "Cucumber",
                    "Spinach": "Spinach",
                    "Lettuce": "Lettuce",
                    "Egg": "Egg",
                    "Banana": "Banana",
                    "Apple": "Apple",
                    "Peach": "Peach",
                    "Grapes": "Grapes",
                    "Pear": "Pear",
                    "Milk": "Milk",
                    "Chocolate": "Chocolate",

                    "Followers": "Followers: {{0}}",
                    "Following": "Following: {{0}}",
                    "allUsers": "All users",
                    "follow": "Follow",
                    "unfollow": "Unfollow",
                    "following": "Following",
                    "followers": "Followers",

                    "statistics.general": "General statistics",
                    "statistics.my": "My statistics",
                    "myStatistics": "Statistics",
                    "myStatisticsExplanation": "See statistics of what you cooked",
                    "charts.bar.title": "Top ingredients",
                    "charts.bar.description": "This chart shows the amount of times an ingredient has been used to cook a recipe",
                    "charts.tags.title": "Tags distribution",
                    "charts.tags.description": "This charts shows the tag distribution based on the cooked recipes",
                    "Chart.NoData": "This chart has no data for this period!",
                    "dateError": "Please select a valid date period",
                    "consumed.fem": "consumed",
                    "consumed.mas": "consumed",
                    "and": "and",
                    "percentagesCalculation": "Percentages calculated according to daily values ​​based on a diet of",
                    "percentagesVariation": "Your daily values ​​may be higher or lower depending on your energy needs.",
                    "Strings.not.match": "The strings do not match",

                    "fat": "Fats",
                    "carbohydrate": "Carbohydrates",
                    "protein": "Proteins",
                    "calorie": "Calories",

                    "password.notMatch": "Passwords do not match",
                    "password.lengthError": "The field must have between 6 and 100 characters",
                    "username.notAvailable": "The username is not available",
                    "username.lengthError": "The field must have between 1 and 40 characters",
                    "email.notAvailable": "The email is not available",
                    "email.lengthError": "The field must have between 6 and 100 characters",
                    "name.lengthError": "The field must have between 2 and 100 characters",
                    "cantUndone": "This cannot be undone!"
                }
            },
            es: {
                translations: {
                    "TODO": "TODO: TRADUCIR",
                    "User.name": "Nombre",
                    "User.surname": "Apellido",
                    "User.password": "Contraseña",
                    "User.repeatPassword": "Repetir contraseña",
                    "User.email": "E-mail",
                    "User.username": "Nombre de usuario",
                    "user.ban": "Deshabilitar usuario",
                    "user.banWarning": "¿Está seguro que quiere deshabilitar a {{{0}}}? ",
                    "logOut": "Cerrar sesión",
                    "logIn": "Iniciar sesión",


                    "forgotPassword": "Recuperar contraseña",
                    "signIn": "Iniciar sesión",
                    "signInError": "Nombre de usuario o contraseña inválidos",
                    "register": "Regístrate",
                    "alreadyMember": "¿Ya tienes cuenta?",
                    "notAmember": "¿No sos miembro?",
                    "rememberMe": "Recordarme",
                    "admin.Remove": "Remover permisos administrativos",
                    "admin.Grant": "Brindar permisos administrativos",

                    "Register.signUp": "Registrarse",

                    "goToSeeRecipes": "¡Ve a ver recetas!",
                    "emptyMyCooklist": "Tu lista de recetas está vacia, explorá recetas en el Inicio para agregarlas aquí",
                    "emptyCooklist": "Esta lista de recetas está vacía",
                    "emptyRecipes": "¡{{{0}}} no subió ninguna receta todavía!",
                    "emptyMyRecipes": "No tiene ninguna receta, ¡aprete el botón + para agregar su primer receta y verla aquí!",
                    "recipe.title": "Recetas de {{{0}}}",
                    "addNewRecipe": "Agregar nueva receta",
                    "Recipe.name": "Nombre de la Receta",
                    "recipeName.title": "Sea descriptivo - pero de forma sucinta. Títulos cortos con adjetivos y los ingredientes más importantes llamará nuestra atención.",
                    "recipeName.placeholder": "¿Cuál es el nombre de tu receta?",
                    "Recipe.description": "Descripción de la receta",
                    "description.title": "¡Esta es la descripción de tu receta! Describí en pocas palabras todo lo que quieras acerca de la misma.",
                    "description.placeholder": "Describi tu receta",
                    "Recipe.instructions": "Instrucciones de la receta",
                    "instructions": "Instrucciones",
                    "instructions.title": "¡Estas son las instrucciones a tu receta! Amamos una historia por detrás de un plato, junto con consejos y variaciones.\nSi le adaptaste esta receta a alguien, es la hora de darle crédito y decir como la perfeccionaste.",
                    "instructions.placeholder": "Contanos de tu receta.",
                    "Recipe.addIngredient": "Agregar ingrediente",
                    "Recipe.DeleteIngredient": "Eliminar ingrediente",
                    "Recipe.addImage": "Agregar imagen",
                    "Recipe.selectedFile": "Archivo seleccionado:",
                    "Recipe.image": "Puedes elegir una foto para tu receta",
                    "recipe.deleteWarning": "¿Está seguro que desea eliminar esta receta?",
                    "userNotExist": "El usuario que creó esta receta no existe actualmente",

                    "goMainPage": "Retorna a la página principal",
                    "pageNotExists": "Oops, parece que la página a la que está intentando acceder no existe.",
                    "close": "Cerrar",
                    "saveChangesButton": "Guardar cambios",
                    "confirm": "Confirmar",

                    "recentlyCooked.title": "Recetas recientemente cocinadas",
                    "recentlyCookedUser.title": "Recetas recientemente cocinadas por {{{0}}}",

                    "recentlyCooked.empty": "¡{{{0}}} no cocinó ninguna receta todavía!",
                    "myRecentlyCooked.empty": "¡No cocinaste ninguna receta todavía!",

                    "NoSuchUser": "Este usuario no existe",
                    "Home": "Inicio",
                    "Users": "Usuarios",
                    "sortBy": "Ordenar por",
                    "otherUserAccount": "Cuenta de {{{0}}}",
                    "myAccount": "Mi cuenta",
                    "recipes": "Recetas",
                    "myRecipes": "Recetas",
                    "myIngredients": "Ingredientes",
                    "lists": "Listas de cocina",
                    "Filters": "Filtros",
                    "searchFilters": "Aplicar filtros",
                    "favouriteRecipes": "Recetas favoritas",
                    "recipesExplanation": "Visualice las recetas creadas por {{{0}}}",
                    "myRecipesExplanation": "Visualice las recetas creadas por usted mismo",
                    "myListsExplanation": "Aqui se encuentran las listas creadas con sus recetas y recetas de terceros",
                    "listsExplanation": "Aca estan las listas creadas por {{{0}}}",
                    "myIngredientsExplanation": "Visualice y modifique sus ingredientes",
                    "myFavouriteRecipesExplanation": "Aqui se muestran las recetas que calificó con una calificación mayor o igual a 4 estrellas",
                    "noIngredients": "No tiene ningún ingrediente, ¡aprete el botón + para agregar su primer ingrediente y verlo aquí!",
                    "recentlyCooked": "Cocinadas recientemente",
                    "tags.select": "Elige los tags de tu receta",

                    "yourFavourites": "Recetas favoritas",
                    "favourites.title": "Recetas favoritas de {{{0}}}",
                    "emptyMyfavourites": "No tiene ninguna receta favorita todavía, cuando califique recetas con más de 4 estrellas, aparecerán aqui. ¡Vaya a la página principal a calificar recetas!",
                    "emptyFavourites": "{{{0}}} no tiene ninguna receta favorita todavía",

                    "NoRecipesYet": "No hay recetas todavía, ¡Se el primero en en agregar una!",
                    "NoUsersYet": "No hay usuarios todavía",
                    "NoUsersMatchingFilter": "No se encontraron usuarios que cumplan con los filtros seleccionados",
                    "noCookLists": "{{{0}}} no tiene ninguna lista de cocina",
                    "noCookListsMy": "No tienes ninguna lista de cocina",
                    "cooklist.editTitle": "Editar el nombre de su cooklist",
                    "cooklist.deleteWarning": "¿Está seguro que desea eliminar esta lista de cocina?",
                    "cooklist.addRecipeTitle": "Agrega esta receta a tus listas de cocina",
                    "cooklist.select": "Selecciona tu lista de cocina",
                    "cooklist.title": "Listas de cocina de {{{0}}}",
                    "cooklist.allHaveRecipe": "Todas tus listas ya poseen esta receta, puedes crear una nueva y se agregará la receta automáticamete!",
                    "cooklist.addNew": "No tiene listas donde agregar esta receta. ¡Cree una nueva y se agregará automáticamente!",
                    "cooklist.addTitle": "Agregar nueva lista de cocina",
                    "cooklist.name": "Inserta el nombre de tu lista de cocina",
                    "myCooklists": "Tus listas de cocina",
                    "cooklist.add": "Agregar a lista de cocina",
                    "cooklist.None": "No tenes cooklists todavia, agrega una para poder agregar allí tus recetas favoritas!",
                    "ingredientsFilter": "Ingredientes",
                    "withMyIngredients": "Solo mostrar recetas que pueda cocinar con mis ingredientes",

                    "comment.Add": "Comentar",
                    "comment.Size": "Entre 4 y 500 caracteres",
                    "comment.Send": "Enviar",
                    "comment.login": "Debes estar registrado para agregar un comentario!",
                    "comment.delete": "Borrar comentario",
                    "comment.deleteWarning": "Estas seguro que quieres borrar este comentario?",

                    "rating.general": "Calificación general",
                    "rating.user": "Tu calificación",

                    "NoRecipesMatchingFilter": "No se encontraron recetas que cumplan con los filtros seleccionados",
                    "Recipe.amount": "Número de recetas subidas: {{{0}}}",
                    "cookButton": "¡Cocinar!",

                    "MyrecentlyCookedExplanation": "Recetas cocinadas recientemente por vos",
                    "recentlyCookedExplanation": "Recetas cocinadas recientemente por {{{0}}}",
                    "FavouriteRecipesExplanation": "Recetas en que {{{0}}} dió al menos 4 estrellas",
                    "getStatistics": "¡Obtener Estadísticas!",
                    "search": "Búsqueda",

                    "AverageRate": "Calificación promedio: {{{0}}}",

                    "ingredient.deleteWarning": "Estas seguro que quieres eliminar {{{0}}}?",
                    "ingredient.minimum.amount": "La cantidad debe ser mayor a 0",
                    "ingredient.maximum.amount": "La cantidad no puede ser mayor a 1,000,000,000",
                    "ingredient.select": "Seleccionar ingrediente",
                    "ingredient.selecMulti": "Seleccionar ingredientes",
                    "ingredient.editAmount": "Editar la cantidad",
                    "ingredient.delete": "Eliminar ingrediente",

                    "expiration.error": "El mail de confirmacion ha expirado",

                    "editIngredient": "Editar {{{0}}}",

                    "addIngredient": "Agregar",
                    "addIngredient.title": "Agregar ingredientes",
                    "addIngredient.select": "Ingrediente",
                    "addIngredient.amount": "Cantidad",
                    "addIngredient.type": "Unidad",
                    "addIngredient.add": "Agregar ingrediente",
                    "delete": "Eliminar",
                    "ingredients": "Ingredientes",
                    "categories": "Categorías",

                    "Error.Ingredient.Repeated": "No puede agregar el mismo ingrediente dos veces",
                    "Error.Ingredient.Invalid": "Cantidad invalida o ingrediente agregado mas de una vez",
                    "Email": "El email no es válido",
                    "Size": "El campo debe tener entre {{{2}}} y {{{1}}} caractéres",
                    "ImageSize": "El tamaño de la imagen supera el límite (1MB)",
                    "ImageFormat": "El archivo seleccionado no es una imagen",
                    "PasswordMatch": "Las contraseñas no coinciden",
                    "AvailableUsername": "El nombre de usuario no está disponible",
                    "AvailableEmail": "El email no está disponible",

                    "ingredients.Filter.Group": "Filtrar por un grupo de ingredientes",

                    "cuisineType": "Tipo de Cocina",
                    "status": "Estado",

                    "American": "Americana",
                    "Arab": "Arabe",
                    "Argentinean": "Argentina",
                    "Brazilian": "Brasilera",
                    "CentralAmerican": "America Central",
                    "Chinese": "China",
                    "French": "Francesa",
                    "German": "Alemana",
                    "Indian": "Hindu",
                    "Italian": "Italiana",
                    "Japanese": "Japonesa",
                    "Mexican": "Mexicana",
                    "Vegan": "Vegana",
                    "Vegetarian": "Vegetariana",

                    "Units": "Unidades",
                    "Unit": "Unidades",
                    "Grams": "Gramos",
                    "Kilograms": "Kilogramos",
                    "Liters": "Litros",
                    "Milliliters": "Mililitros",
                    "Cup": "Copa",
                    "Teaspoon": "Cucharilla",
                    "Ounces": "Onzas",

                    "date.from": "Desde",
                    "date.to": "Hasta",
                    "date.range": "Seleccione un rango de fechas",

                    "tagChart": "Gráfico de tags",
                    "nutritionalChart": "Gráficos nutricionales",

                    "apology": "Lo sentimos.",
                    "forbidden": "No tiene permiso para acceder a esta página.",
                    "not_found": "No se encontró lo que está buscando.",
                    "badRequest": "La solicitud fue inválida",
                    "error": "Error interno",
                    "error_explanation": "Hemos tenido un error interno.",
                    "details_error": "Detalles técnicos:",

                    "nutritionalValueAprox": "Valor nutricional aproximado",

                    "successFullyCooked": "¡Cocinado exitosamente!",
                    "cantCooked": "No tiene los ingredientes necesarios para cocinar esta receta",

                    "editRecipe": "Editar Receta",
                    "deleteRecipe": "Borrar Receta",

                    "Rising": "Tendencias",
                    "TopRated": "Mayor Valoración",
                    "New": "Nuevo",
                    "Old": "Viejo",
                    "Any": "Nombre de Usuario",
                    "Asc": "Ascendiente",
                    "Desc": "Descendiente",
                    "None": "Ninguna",

                    "REGULAR": "Activo",
                    "DELETED": "Deshabilitado",

                    "mail.Sent": "Revisa tu correo antes de loguearte para confirmar tu cuenta",
                    "mailConfirmation.Subject": "Confirmación de mail",
                    "mailConfirmation.Body": "Apriete en el link para confirmar el mail: \n{{{0}}}",
                    "confirmationError": "Debe confirmar su cuenta de e-mail para continuar",
                    "resetPassword.Subject": "Restablecimiento de contraseña",
                    "resetPassword.Body": "Apriete en el link para cambiar la contraseña: \n{{{0}}}",
                    "resendEmail.header": "El token de verificación expiró",
                    "resendEmail.resend": "Reenviar mail",

                    "Salmon": "Salmon",
                    "ChickenBreast": "Pechuga de Pollo",
                    "Tuna": "Atún",
                    "Beef": "Bife",
                    "GroundBeef": "Carne Picada",
                    "Almond": "Almendra",
                    "Tomato": "Tomate",
                    "RedBellPepper": "Morrón Rojo",
                    "GreenBellPepper": "Morrón Verde",
                    "Onion": "Cebolla",
                    "Pumpkin": "Calabaza",
                    "WhiteRice": "Arroz Blanco",
                    "BlackBeans": "Porotos Negros",
                    "Carrot": "Zanahoria",
                    "Cucumber": "Pepino",
                    "Spinach": "Espinaca",
                    "Lettuce": "Lechuga",
                    "Egg": "Huevo",
                    "Banana": "Banana",
                    "Apple": "Manzana",
                    "Peach": "Durazno",
                    "Grapes": "Uvas",
                    "Pear": "Pera",
                    "Milk": "Leche",
                    "Chocolate": "Chocolate",

                    "Followers": "Seguidores: {{{0}}}",
                    "Following": "Siguiendo: {{{0}}}",
                    "allUsers": "Todos los usuarios",
                    "follow": "Seguir",
                    "unfollow": "Dejar de seguir",
                    "following": "Siguiendo",
                    "followers": "Seguidores",

                    "statistics.general": "Estadísticas generales",
                    "statistics.my": "Mis estadísticas",
                    "myStatistics": "Estadísticas",
                    "myStatisticsExplanation": "Visualice las estadísticas de lo que cocinó",
                    "charts.bar.title": "Ingredientes más usados",
                    "charts.bar.description": "Este gráfico muestra la cantidad de veces que un ingrediente fue usado al cocinar recetas",
                    "charts.tags.title": "Tags distribution",
                    "charts.tags.description": "El gráfico contiene la distribución de tags en base a las recetas cocinadas",
                    "Chart.NoData": "Este gráfico no contiene datos para el período seleccionado",
                    "dateError": "Por favor, seleccione un período de fechas válido",
                    "consumed.fem": "consumidas",
                    "consumed.mas": "consumidos",
                    "and": "y",
                    "percentagesCalculation": "Porcentajes calculados según valores diarios con base a una dieta de",
                    "percentagesVariation": "Sus valores diarios pueden ser mayores o menores dependiendo de sus necesidades energéticas.",

                    "Strings.not.match": "Las cadenas de caracteres no coinciden",

                    "fat": "Grasas",
                    "carbohydrate": "Carbohidratos",
                    "protein": "Proteínas",
                    "calorie": "Calorías",

                    "password.notMatch": "Las contraseñas no coinciden",
                    "password.lengthError": "El campo debe tener entre 6 y 100 caracteres",
                    "username.notAvailable": "El usuario no esta disponible",
                    "username.lengthError": "El campo debe tener entre 1 y 40 caracteres",
                    "email.notAvailable": "El email no esta disponible",
                    "email.lengthError": "El campo debe tener entre 6 y 100 caracteres",
                    "name.lengthError": "El campo debe tener entre 2 y 100 caracteres",
                    "cantUndone": "Esta acción no puede deshacerse"
                }
            }
        },
        fallbackLng: ['en','es'],
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
