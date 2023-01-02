import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [githubRepos, setGithubRepos] = useState(mockRepos);
	const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
	// request loading
	const [requests, setRequests] = useState(0);
	const [loading, setLoading] = useState(false);
	// error
	const [error, setError] = useState({ show: false, msg: "" });

	async function searchGithubUser(user) {
		toggleError();
		setLoading(true);

		const resp = await axios(`${rootUrl}/users/${user}`).catch((error) =>
			console.log(error)
		);

		if (resp) {
			setGithubUser(resp.data);
			const { login, followers_url } = resp.data;

			// Using allSettled, it doesn't throw error, because status will reveal everything.
			// And the page will start render everything only after all data arrive.
			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			]).then((results) => {
				const [repos, followers] = results;
				if (repos.status === "fulfilled") {
					setGithubRepos(repos.value.data);
				}
				if (followers.status === "fulfilled") {
					setGithubFollowers(followers.value.data);
				}
			});
		} else {
			toggleError(true, "No user matches your typing!");
		}

		checkRequests();
		setLoading(false);
	}

	// check rate
	function checkRequests() {
		axios(`${rootUrl}/rate_limit`)
			.then((res) => {
				let { remaining } = res.data.rate;
				setRequests(remaining);
				if (remaining === 0) {
					// throw an error
					toggleError(
						true,
						"Sorry, you have exceeded your hourly rate limit!"
					);
				}
			})
			.catch((error) => console.log(error));
	}

	function toggleError(show = false, msg = "") {
		setError({ show, msg });
	}

	useEffect(checkRequests, []);

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				githubRepos,
				githubFollowers,
				requests,
				error,
				searchGithubUser,
				loading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

const useGlobalContext = () => {
	return React.useContext(GithubContext);
};

export { GithubProvider, useGlobalContext };
