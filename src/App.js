
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API
  // apiKey = 'b8b300bc7b144871a40219580433c0b4';

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
            <Navbar />
            <LoadingBar 
              color="#f11946"
              progress={this.state.progress}

            />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" />}></Route>
            <Route path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

