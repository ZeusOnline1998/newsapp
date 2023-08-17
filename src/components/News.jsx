import React, { Component } from "react"
import NewsItem from "./NewsItem"

export class News extends Component {
	articles = [
		{
			source: { id: "bbc-sport", name: "BBC Sport" },
			author: null,
			title: "Stokes in World Cup squad after ending retirement",
			description:
				"Ben Stokes will be part of England's World Cup squad after reversing his decision to retire from one-day international cricket.",
			url: "http://www.bbc.co.uk/sport/cricket/66512824",
			urlToImage:
				"https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11787/production/_124395517_bbcbreakingnewsgraphic.jpg",
			publishedAt: "2023-08-16T09:07:28.900431Z",
			content:
				"Ben Stokes will be part of England's World Cup squad after reversing his decision to retire from one-day international cricket.\r\nStokes is included in the 15-man squad for the series against New Zeal… [+4442 chars]",
		},
		{
			source: { id: "cnn-es", name: "CNN Spanish" },
			author: "Melissa Velásquez Loaiza",
			title: 'Australia se atreve a soñar con ganar la Copa del Mundo mientras la "matildasmanía" arrasa el país',
			description:
				"La manía del fútbol se ha extendido por el país en una cultura donde el rugby, el cricket y el fútbol local de “reglas australianas” suelen dominar. Y mientras el país descansó de los nervios tras una larga tanda de penales contra Francia, los ojos ahora está…",
			url: "https://cnnespanol.cnn.com/2023/08/16/australia-copa-mundial-femenina-matildasmania-arrasa-australia-futbol-trax/",
			urlToImage:
				"https://cnnespanol.cnn.com/wp-content/uploads/2023/08/australia-matildas-mania.jpeg?quality=100&strip=info",
			publishedAt: "2023-08-16T09:00:19Z",
			content:
				"Una koala predice el resultado de Inglaterra-Australia 1:02\r\n(CNN) -- Dos partidos separan a Australia de una victoria histórica en el Mundial Femenino de Fútbol, y la nación, quizás prematuramente, … [+7571 chars]",
		},
		{
			source: { id: "espn-cric-info", name: "ESPN Cric Info" },
			author: null,
			title: "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
			description: "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
			url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
			urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
			publishedAt: "2020-04-27T11:41:47Z",
			content:
				"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
		},
		{
			source: { id: "espn-cric-info", name: "ESPN Cric Info" },
			author: null,
			title: "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
			description:
				"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
			url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
			urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
			publishedAt: "2020-03-30T15:26:05Z",
			content:
				"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
		},
	]

	constructor() {
		super()
		// console.log("Hi from constructor");
		this.state = {
			articles: this.articles,
			page: 1,
		}
	}

	async componentDidMount() {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page}`
		let data = await fetch(url)
		let parsedData = await data.json()
		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
	}

	previousClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page - 1}`
		let data = await fetch(url)
		let parsedData = await data.json()
		this.setState({
			page: this.state.page - 1,
			articles: parsedData.articles,
		})
	}

	nextClick = async () => {
		if (this.state.page > Math.ceil(this.state.totalResults/20)){
			
		}
		else {

			let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=598e991dc5af41be8b36f9d9de1c7a0d&page=${this.state.page + 1}`
			let data = await fetch(url)
			let parsedData = await data.json()
			this.setState({
				page: this.state.page + 1,
				articles: parsedData.articles,
			})
		}
	}

	render() {
		return (
			<div className="container my-3">
				<h1 className="text-center">NewsMonkey - Top Headlines</h1>
				<div className="row">
					{this.state.articles.map((article) => {
						return (
							<div className="col-md-4" key={article.url}>
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
					<button className="btn btn-primary" onClick={this.nextClick}>Next &rarr;</button>
				</div>
			</div>
		)
	}
}

export default News
