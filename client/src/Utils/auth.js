

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
        this.authenticated = true;
        document.querySelector('.Journey').classList.remove('JourneyBlurred');
        document.querySelector('.Explore').classList.remove('ExploreBlurred');
    }

    logout() {
        this.authenticated = false;
        localStorage.removeItem('accessToken');
        window.location.reload(); //Work around so I dont have to set everything to default
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();  