import decode from "jwt-decode";

class AuthService {
	getProfile() {
		return decode(this.getToken());
	}

	loggedIn() {
		const token = this.getToken();
		console.log(token)
		return token && !this.isTokenExpired(token) ? true : false;
	}

	isTokenExpired(token) {
		const decoded = decode(token);
		if (decoded.exp < Date.now() / 1000) {
			localStorage.removeItem("id_token");
			return true;
		}
		return false;
	}

	getToken() {
		return localStorage.getItem("id_token");
	}

	login(idToken) {
		localStorage.setItem("id_token", idToken);
		const decoded = decode(idToken, { header: true })
		const { _id } = decoded?.data
		window.location.assign(`/MyListings/${_id}`);
	}

	logout() {
		localStorage.removeItem("id_token");
		window.location.reload();
	}
}

export default new AuthService();
