export const formatNumber = (value, decimals = 0) => {
    return value.toFixed(decimals);
};

export function handleInputChange(event, validate = null) {
    let name = event.target.name;
    let value = event.target.value;

    console.log(name);
    this.setState({[name]: value}, () => {
        if(validate !== null)
            validate(name, value)
    });
}

export function onChange(change) {
    this.setState(change);
}

export function getCurrentUserId(){
    return 0;
}


export function isMyUser(id){
    return id == getCurrentUserId();
}