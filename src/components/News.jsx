import React, { Component } from "react"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"

export class News extends Component {

	constructor() {
		super()
		// console.log("Hi from constructor");
		this.state = {
			articles: [],
			page: 1,
			loading: false,
		}
	}

	async componentDidMount() {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page}&pageSize=${this.props.pageSize}`
		this.setState({loading: true});
		let data = await fetch(url)
		let parsedData = await data.json()
		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })
	}

	previousClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
		this.setState({ loading: true })
		let data = await fetch(url)
		let parsedData = await data.json()
		this.setState({
			page: this.state.page - 1,
			articles: parsedData.articles,
			loading: false,
		})
	}

	nextClick = async () => {
		if (this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)){
			
		}
		else {

			let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
			this.setState({ loading: true })
			let data = await fetch(url)
			let parsedData = await data.json()
			this.setState({
				page: this.state.page + 1,
				articles: parsedData.articles,
				loading: false,
			})
		}
	}

	render() {
		return (
			<div className="container my-3">
				<h1 className="text-center">NewsMonkey - Top Headlines</h1>
				<div className="row d-flex justify-content-center">
					{this.state.loading && <Spinner/>}
					{!this.state.loading && this.state.articles.map((article) => {
						return (
							<div className="col-md-4 d-flex justify-content-center" key={article.url}>
								<NewsItem
									title={article.title ? article.title.slice(0, 45) : ""}
									description={article.description ? article.description.slice(0, 88) : ""}
									imageUrl={article.urlToImage}
									newsUrl={article.url}
								/>
							</div>
						)
					})}
				</div>
				<div className="container d-flex justify-content-between">
					<button className="btn btn-primary" disabled={this.state.page <= 1 ? true : false} onClick={this.previousClick}>
						&larr; Previous
					</button>
					<button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)?true: false} onClick={this.nextClick}>Next &rarr;</button>
				</div>
			</div>
		)
	}
}

export default News
