export function validateRegisterFields (values) {
    const errors = {};

    // case 'firstName'
    if (values.firstName.length < 2 || values.firstName.length > 100)
        errors.firstName = 'name.lengthError';
    else
        errors.firstName = '';
    // case 'lastName'
    if (values.lastName.length < 2 || values.lastName.length > 100)
        errors.lastName = 'name.lengthError';
    else
        errors.lastName = '';
    // case 'email'
    if (values.email.length < 6 || values.email.length > 100)
        errors.email = 'email.lengthError';

    // preguntar a la api si esta disponible
    else if (false)
        errors.email = 'email.notAvailable';

    else
        errors.email = '';
    // case 'username'
    if (values.username.length < 1 || values.username.length > 40)
        errors.username = 'username.lengthError';

    // preguntar a la api si esta disponible
    else if (false)
        errors.username = 'username.notAvailable';

    else
        errors.username = '';
    // case 'password'
    let error = false;
    if (values.password.length < 6 || values.password.length > 100) {
        errors.password = 'password.lengthError';
        error = true;
    }
    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'password.notMatch';
        error = true;
    } else {
        errors.repeatPassword = '';
    }

    if (!error)
        errors.password = '';
    // 'repeatPassword'
    if (values.repeatPassword !== values.password)
        errors.repeatPassword = 'password.notMatch';
    else if(values.repeatPassword.length < 1)
        errors.repeatPassword = 'password.lengthError';
    else
        errors.repeatPassword = '';

    return errors;
}

export function validateRecipe(values){
    let errors = {};
    if(values.name !== undefined)
        errors.name = (values.name.length < 5 || values.name.length > 100) ? "TODO" : '';
    if(values.description !== undefined)
        errors.description = (values.description.length < 10 || values.description.length > 100) ? "TODO" : '';
    if(values.instructions !== undefined)
        errors.instructions = (values.instructions.length < 20 || values.instructions.length > 4000) ? "TODO" : '';
    if(values.ingredients !== undefined)
        errors.ingredients = validateIngredients(values).ingredients;
    return errors;
}

export function validateIngredients(values){
    let errors = {};
    console.log(values);
    errors.ingredients = [];
    values.ingredients.forEach(function (ingredient, index) {
        if(ingredient !== undefined) {
            if(ingredient.amount <= 0)
                errors.ingredients[index] = "ingredient.minimum.amount";
        }
    });
    return errors;
}

export function validateIngredientAmount(values){
    let errors = {};
    if(values.amount <= 0)
        errors.amount = 'ingredient.minimum.amount';
    return errors;
}