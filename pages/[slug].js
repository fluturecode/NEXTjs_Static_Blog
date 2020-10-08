import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";

const Post = ({ contents, data }) => {
	return (
		<>
			<Head>
				<title>{data.title}</title>
			</Head>
			<div>
				<div>Contents below</div>
				<pre>{contents}</pre>
			</div>
		</>
	);
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
export const getStaticProps = async ({ params: { slug } }) => {
	const markdownWithMetadata = fs
		.readFileSync(path.join("posts", slug + ".md"))
		.toString();

	const parsedMarkdown = matter(markdownWithMetadata);

	return {
		props: {
			contents: parsedMarkdown.content,
			data: parsedMarkdown.data,
		},
	};
};

export default Post;
