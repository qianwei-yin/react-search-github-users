import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { useGlobalContext } from "../context/context";

const Dashboard = () => {
	const { loading } = useGlobalContext();

	return (
		<main>
			<Navbar />
			<Search />
			{loading ? (
				<img src={loadingImage} className="loading-img" alt="loading" />
			) : (
				<>
					<Info />
					<User />
					<Repos />
				</>
			)}
		</main>
	);
};

export default Dashboard;
