import React, { Component } from "react"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 6,
		category: "general",
	}

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
	}

	titleCapitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	constructor(props) {
		super(props)
		// console.log("Hi from constructor");
		this.state = {
			articles: [],
			page: 1,
			loading: false,
			totalResults: 0,
		}
		document.title = `${this.titleCapitalize(this.props.category)} - NewsMonkey`;
	}

	async updateNews() {
		this.props.setProgress(0);
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b8b300bc7b144871a40219580433c0b4&page=${this.state.page}&pageSize=${this.props.pageSize}`
		this.props.setProgress(10);
		this.setState({ loading: true })
		let data = await fetch(url)
		this.props.setProgress(30);
		let parsedData = await data.json()
		this.props.setProgress(70);
		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
		console.log(parsedData);
		this.props.setProgress(100);
		// fetch(url).then((data) => data.json()).then((parsedData) => {
		// 		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
		// 		console.log(parsedData)
		// 	})
	}

	async componentDidMount() {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page}&pageSize=${this.props.pageSize}`
		// this.setState({ loading: true })
		// let data = await fetch(url)
		// let parsedData = await data.json()
		// this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
		this.updateNews();
	}

	previousClick = async () => {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page - 1}&pageSize=${
		// 	this.props.pageSize
		// }`
		// this.setState({ loading: true })
		// let data = await fetch(url)
		// let parsedData = await data.json()
		// this.setState({
		// 	page: this.state.page - 1,
		// 	articles: parsedData.articles,
		// 	loading: false,
		// })
		await this.setState({ page: this.state.page - 1 })
		this.updateNews();
	}

	nextClick = async () => {
		// if (this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)) {
		// } else {
		// 	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${
		// 		this.state.page + 1
		// 	}&pageSize=${this.props.pageSize}`
		// 	this.setState({ loading: true })
		// 	let data = await fetch(url)
		// 	let parsedData = await data.json()
		// 	this.setState({
		// 		page: this.state.page + 1,
		// 		articles: parsedData.articles,
		// 		loading: false,
		// 	})
		// }
		await this.setState({ page: this.state.page + 1 })
		this.updateNews();
	}

	fetchMoreData = async () => {
		this.props.setProgress(0);
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b8b300bc7b144871a40219580433c0b4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
		this.props.setProgress(10);
		this.setState({ loading: true })
		let data = await fetch(url)
		this.props.setProgress(30);
		let parsedData = await data.json()
		this.props.setProgress(70);
		console.log(parsedData)
		this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, page: this.state.page + 1 })
		this.props.setProgress(100);
	}

	render() {
		return (
			<>
				<h1 className="text-center my-5">NewsMonkey - Top Headlines on {this.titleCapitalize(this.props.category)}</h1>
				{/* {this.state.loading && <Spinner />} */}
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length < this.state.totalResults}
					loader={<Spinner />}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Congratulations! You have reached the end of internet</b>
						</p>
					}
				>
					<div className="container">

						<div className="row mb-5 d-flex justify-content-center">
							{
								this.state.articles.map((article) => {
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
				{/* <div className="container d-flex justify-content-between">
					<button className="btn btn-primary" disabled={this.state.page <= 1 ? true : false} onClick={this.previousClick}>
						&larr; Previous
					</button>
					<button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? true : false} onClick={this.nextClick}>
						Next &rarr;
					</button>
				</div> */}
			</>
		)
	}
}

export default News
