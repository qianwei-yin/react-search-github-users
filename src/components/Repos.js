import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { Pie3D, Column2D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
	const { githubRepos } = useGlobalContext();
	console.log(githubRepos);

	const languages = githubRepos.reduce((total, item) => {
		const { language, stargazers_count: star } = item;
		if (!language) return total;
		if (!total[language])
			total[language] = { label: language, value: 0, stars: 0 };
		total[language].value = total[language].value + 1;
		total[language].stars = total[language].stars + star;
		return total;
	}, {});

	const mostUsed = Object.values(languages)
		.sort((a, b) => {
			return b.value - a.value;
		})
		.slice(0, 5);

	const mostPopular = Object.values(languages)
		.sort((a, b) => {
			return b.stars - a.stars;
		})
		.map((item) => {
			return { label: item.label, value: item.stars };
		})
		.slice(0, 5);

	const repos = githubRepos.reduce((total, item) => {
		const { name, stargazers_count: star, forks_count: fork } = item;
		if (!total[name]) total[name] = { label: name, stars: 0, forks: 0 };
		total[name].stars = star;
		total[name].forks = fork;
		return total;
	}, {});

	const mostPopularRepo = Object.values(repos)
		.sort((a, b) => {
			return b.stars - a.stars;
		})
		.map((item) => {
			return { label: item.label, value: item.stars };
		})
		.slice(0, 5);

	const mostForkedRepo = Object.values(repos)
		.sort((a, b) => {
			return b.forks - a.forks;
		})
		.map((item) => {
			return { label: item.label, value: item.forks };
		})
		.slice(0, 5);

	return (
		<section className="section">
			<Wrapper className="section-center">
				<Pie3D data={mostUsed} />
				<Column2D data={mostPopularRepo} />
				<Doughnut2D data={mostPopular} />
				<Bar3D data={mostForkedRepo} />
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
