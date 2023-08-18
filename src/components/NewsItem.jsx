import React from 'react'

const NewsItem = (props) => {
	let { title, description, imageUrl, newsUrl, author, date, source } = props;
	return (
		<div className="my-3">
			<div className="card">
				<img src={imageUrl} className="card-img-top" alt="..." />
				<div className="position-absolute top-0 end-0">
					<div className="bg-danger text-bg-danger p-1 rounded-1">
						{source}
					</div>
				</div>
				<div className="card-body">
					<h5 className="card-title text-truncate">{title}</h5>
					<p className="card-text text-truncate">{description}</p>
					<p className="card-text">
						<small className="text-muted">
							By {author} on {new Date(date).toLocaleString()}
						</small>
					</p>
					<a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
						Read more
					</a>
				</div>
			</div>
		</div>
	)
}

export default NewsItem
