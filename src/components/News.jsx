import React, { useState, useEffect } from "react"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {

	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const titleCapitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	document.title = `${titleCapitalize(props.category)} - NewsMonkey`;

	const updateNews = async () => {
		props.setProgress(0);
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
		props.setProgress(10);
		let data = await fetch(url)
		props.setProgress(30);
		let parsedData = await data.json()
		props.setProgress(70);
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		console.log(parsedData);
		props.setProgress(100);
	}

	useEffect(() => {
		updateNews();
	}, []);


	const previousClick = async () => {
		await setPage(page - 1);
		updateNews();
	}

	const nextClick = async () => {
		await setPage(page + 1);
		updateNews();
	}

	const fetchMoreData = async () => {
		props.setProgress(0);
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
		props.setProgress(10);
		let data = await fetch(url)
		props.setProgress(30);
		let parsedData = await data.json()
		props.setProgress(70);
		console.log(parsedData)
		setArticles(articles.concat(parsedData.articles));
		setPage(page + 1);
		props.setProgress(100);
	}


	return (
		<>
			<h1 className="text-center my-5">NewsMonkey - Top Headlines on {titleCapitalize(props.category)}</h1>
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length < totalResults}
				loader={<Spinner />}
				endMessage={
					articles.length ? <p style={{ textAlign: 'center' }}>
						<b>Congratulations! You have reached the end of internet</b>
					</p> : "" 
				}
			>
				<div className="container">

					<div className="row mb-5 d-flex justify-content-center">
						{
							articles.map((article) => {
								return (
									<div className="col-md-4" key={article.url}>
										<NewsItem
											title={article.title ? article.title.slice(0, 45) : ""}
											description={article.description ? article.description.slice(0, 88) : ""}
											imageUrl={article.urlToImage}
											newsUrl={article.url}
											author={article.author ? article.author : "Unknown"}
											date={article.publishedAt}
											source={article.source.name}
										/>
									</div>
								)
							})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	)
}

News.defaultProps = {
	country: "in",
	pageSize: 6,
	category: "general",
}

News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
}


export default News
