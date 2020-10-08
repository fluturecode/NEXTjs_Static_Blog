import React from "react";
import fs from "fs";

const Post = ({ slug }) => {
	return <div>The sluge for this page is: {slug}</div>;
};

// create paths
export const getStaticPaths = async () => {
	// readdir does not await a promise
	const files = fs.readdirSync("posts");
	console.log("files:", files);
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(".md", ""),
		},
	}));
	console.log("paths: ", paths);

	return {
		paths,
		fallback: false,
	};
};

// fetch data (get content of posts)
export const getStaticProps = async ({ params: { slugh } }) => {
	return {
		props: {
			slug,
		},
	};
};

export default Post;
