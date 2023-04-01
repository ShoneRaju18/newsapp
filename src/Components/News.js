import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
    
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=06e05f0eef954a9e95be39e5b7ef7bba&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=06e05f0eef954a9e95be39e5b7ef7bba&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles})

        this.setState (
            {
                page: this.state.page - 1,
                articles: parsedData.articles
            }
        )
    }

    handleNextClick = async () => {

        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20))
        {

        }
        else
        {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=06e05f0eef954a9e95be39e5b7ef7bba&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({articles: parsedData.articles})

            this.setState (
                {
                    page: this.state.page + 1,
                    articles: parsedData.articles
                }
            )
        }

    }

  render() {
    return (
      <div className= "container my-3">
        <h1 className="text-center">India - Top Headlines </h1>
        <div className="row">
            {this.state.articles.map((element) =>  {
                return <div className="col-md-3" key = {element.url}>
                <NewsItem  title =  {element.title} description = {element.description} imageUrl = {element.urlToImage} 
                newsUrl = {element.url} / >
            </div>         
            })}
            <div className="d-flex justify-content-between">
            <button disabled = {this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous </button>
            <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>    
        </div>       
      </div>
    )
  }
}

export default News
