import React, { Component } from "react";
import { getNews } from "../services/hackerNews";
import { paginate } from "../utils/paginate";

class HackerNews extends Component {
  state = {
    news: null,
    searchQuery: null,
    searchType: "all",
    searchBy: "popularity",
    searchFor: "all",
    currentPage: 1,
    pageSize: 3
  };

  componentDidMount() {
    let { data: news } = getNews();
    this.setState({ news });
  }

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  handleSearchType = e => {
    debugger;
    this.setState({ searchType: e.currentTarget.value });
  };

  handleSearchBy = e => {
    debugger;
    this.setState({ searchBy: e.currentTarget.value });
  };
  handleSearchFor = e => {
    debugger;
    this.setState({ searchFor: e.currentTarget.value });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getTime(time) {
    let pdate = new Date();
    pdate.setTime(time * 1000);

    let cdate = new Date();
    if (cdate.getFullYear() - pdate.getFullYear() > 0) {
      return cdate.getFullYear() - pdate.getFullYear() + " years ago";
    }

    if (cdate.getMonth() - pdate.getMonth() > 0) {
      return cdate.getMonth() - pdate.getMonth() + " months ago";
    }

    if (cdate.getDate() - pdate.getDate() > 0) {
      return cdate.getDate() - pdate.getDate() + " days ago";
    }

    if (cdate.getHours() - pdate.getHours() > 0) {
      return cdate.getHours() - pdate.getHours() + " hours ago";
    }

    if (cdate.getMinutes() - pdate.getMinutes() > 0) {
      return cdate.getMinutes() - pdate.getMinutes() + " minutes ago";
    }

    if (cdate.getSeconds() - pdate.getSeconds() > 0) {
      return cdate.getSeconds() - pdate.getSeconds() + " seconds ago";
    }
  }
  filterFor = (searchFor, news) => {
    debugger;
    let filteredNews = news;
    if (searchFor === "all") {
      return filteredNews;
    }

    let cdate = new Date();
    if (searchFor === "24h") {
      filteredNews = filteredNews.filter(item => {
        debugger;
        return cdate.getTime() - item.time * 1000 <= 24 * 60 * 60 * 1000;
      });
    } else if (searchFor === "1w") {
      filteredNews = filteredNews.filter(item => {
        debugger;
        return cdate.getTime() - item.time * 1000 <= 7 * 24 * 60 * 60 * 1000;
      });
    } else if (searchFor === "1m") {
      filteredNews = filteredNews.filter(item => {
        let pdate = new Date();
        pdate.setTime(item.time * 1000);
        return cdate.getMonth() - pdate.getMonth() < 1;
      });
    } else if (searchFor === "1y") {
      filteredNews = filteredNews.filter(item => {
        let pdate = new Date();
        pdate.setTime(item.time * 1000);
        return cdate.getFullYear - pdate.getFullYear() < 1;
      });
    }
    return filteredNews;
  };

  render() {
    let {
      news,
      searchQuery,
      searchType,
      searchBy,
      searchFor,
      currentPage,
      pageSize
    } = this.state;

    debugger;
    let filteredNews = news;
    let pages = [];
    if (searchQuery) {
      filteredNews = filteredNews.filter(
        item => item.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
      );
    }

    if (filteredNews) {
      filteredNews =
        searchType === "all"
          ? filteredNews
          : filteredNews.filter(item => item.type === searchType);

      filteredNews =
        searchBy === "popularity"
          ? filteredNews.sort((a, b) => b.score - a.score)
          : filteredNews.sort((a, b) => b.time - a.time);

      filteredNews = this.filterFor(searchFor, filteredNews);
      const noOfPages =
        filteredNews.length < pageSize
          ? 1
          : filteredNews.length % pageSize === 0
          ? filteredNews.length / pageSize
          : filteredNews.length / pageSize + 1;

      for (let i = 1; i <= noOfPages; i++) {
        pages[i] = i;
      }

      filteredNews = paginate(filteredNews, currentPage, pageSize);
    }

    return (
      <div className="news-parent-container">
        <div className="news-header-search-container">
          <span className="news-header-text">Search Hacker News</span>
          <input
            style={{ width: "82%", height: "42px", margin: "1%" }}
            type="text"
            autoFocus
            name="search"
            onChange={e => this.handleSearchQuery(e)}
          />
        </div>
        <div className="news-filter-search-container">
          <span className="news-filter-item">Search</span>
          <select name="items" onChange={this.handleSearchType}>
            <option value="all">All</option>
            <option value="story">Stories</option>
            <option value="comment">Comments</option>
          </select>
          <span className="news-filter-item">by</span>
          <select name="by" onChange={e => this.handleSearchBy(e)}>
            <option value="popularity">Popularity</option>
            <option value="date">Date</option>
          </select>
          <span className="news-filter-item">for</span>
          <select name="for" onChange={e => this.handleSearchFor(e)}>
            <option value="all">All Time</option>
            <option value="24h">Last 24h</option>
            <option value="1w">Past Week</option>
            <option value="1m">Past Month</option>
            <option value="1y">Past Year</option>
          </select>
        </div>
        {filteredNews &&
          filteredNews.map(item => (
            <div key={item.id} className="news-item">
              <p className="news-item-text">
                {item.title}(<a href={item.url}>{item.url}</a>)
              </p>
              <p className="news-item-text news-item-comments-text">
                {item.score} points | {item.by} | {this.getTime(item.time)} |
                {item.kids.length} comments
              </p>
            </div>
          ))}

        <div class="pagination">
          {pages.map(page => (
            <a
              href="#"
              style={{ margin: "5px" }}
              onClick={() => this.handlePageChange(page)}
            >
              {page}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default HackerNews;
