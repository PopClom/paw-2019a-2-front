import {getUser, isLoggedIn} from "./auth";

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
    const user = getUser();
    if (user)
        return user.id;
    return null;
}

export function isMyUser(id){
    return id != null && parseInt(id) === getCurrentUserId();
}

export function userIsAdmin() {
    return isLoggedIn() && getUser().admin;
}

export function isUserBanned(user) {
    return user.status !== "REGULAR";
}

export function followUser(user) {
    const myUser = getUser();
    if (!myUser.following.users.find(x => x.id === user.id)) {
        myUser.following.users.push(user);
        myUser.followingAmount = myUser.following.users.length;
    }
    localStorage.setItem("user", JSON.stringify(myUser));
}

export function unfollowUser(user) {
    const myUser = getUser();
    myUser.following.users = myUser.following.users.filter(x => x.id !== user.id);
    myUser.followingAmount = myUser.following.users.length;
    localStorage.setItem("user", JSON.stringify(myUser));
}