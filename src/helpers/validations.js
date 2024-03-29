export function validateRegisterFields (values) {
    let errors = {};

    // case 'firstName'
    if (values.firstName.length < 2 || values.firstName.length > 100)
        errors.firstName = 'name.lengthError';
    // case 'lastName'
    if (values.lastName.length < 2 || values.lastName.length > 100)
        errors.lastName = 'name.lengthError';
    // case 'email'
    if (values.email.length < 6 || values.email.length > 100)
        errors.email = 'email.lengthError';

    if(!/\S+@\S+\.\S+/.test(values.email))
        errors.email = 'email.notValid';

    // preguntar a la api si esta disponible
    else if (false)
        errors.email = 'email.notAvailable';
    // case 'username'
    if (values.username.length < 1 || values.username.length > 40)
        errors.username = 'username.lengthError';
    // preguntar a la api si esta disponible
    else if (false)
        errors.username = 'username.notAvailable';
    // case 'repeatPassword'
    if (values.repeatPassword !== values.password)
        errors.repeatPassword = 'password.notMatch';

    else if(values.password.length < 6 || values.password.length > 100)
        errors.repeatPassword = 'password.lengthError';

    return errors;
}

export function validateRecipe(values){
    let errors = {};
    if(values.name.length < 5 || values.name.length > 100)
        errors.name = "Size";
    if(values.description.length < 10 || values.description.length > 100)
        errors.description = "Size";
    if(values.ingredients !== undefined) {
        let ingredientsError = validateIngredients(values.ingredients);
        if(ingredientsError.length > 0)
            errors.ingredients = ingredientsError;
    }
    if(values.steps !== undefined) {
        let stepsError = validateSteps(values.steps);
        if(stepsError.length > 0)
            errors.steps = stepsError;
    }
    if(values.file && values.file.size > 1024 * 1024)
        errors.file = 'ImageSize';
    if(values.file && values.file.type.split('/')[0] !== 'image')
        errors.file = 'ImageFormat';

    return errors;
}

export function validateComment(values){
    let errors = {};
    if(values.message.length < 4 || values.message.length > 500)
        errors.message = 'Size';

    return errors;
}

export function validateIngredients(value){
    let error = [];

    value.forEach(function (ingredient, index) {
        if(ingredient !== undefined) {
            if(ingredient.amount <= 0)
                error[index] = "ingredient.minimum.amount";
        }
    });
    return error;
}

export function validateIngredientsAdd(values){
    let errors = {};
    let ingredientsError = validateIngredients(values.ingredients);
    if(ingredientsError.length > 0)
        errors.ingredients = ingredientsError;
    return errors;
}

export function validateSteps(value){
    let error = [];
    value.forEach(function (step, index) {
        if(step !== undefined) {
            if(step.description === undefined || step.description.length < 10 || step.description.length > 1000)
                error[index] = "Size";
        }
    });
    return error;
}

export function validateIngredientAmount(values){
    let errors = {};
    if(values.amount <= 0)
        errors.amount = 'ingredient.minimum.amount';
    return errors;
}

export function validateCooklistName(values) {
    let errors = {};
    if(values.name === undefined || (values.name.length < 3 || values.name.length > 100))
        errors.name = "Size";
    return errors;
}

export function validateRecipeToCooklist(values, createNewCooklist){
    let errors = {};
    if(createNewCooklist)
        return validateCooklistName(values);

    if(values.selectedCooklist === '')
        errors.selectedCooklist = "cooklist.selectedCooklistError";

    return errors;
}