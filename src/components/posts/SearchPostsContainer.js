
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
// import { Form, FormControl, Button } from 'react-bootstrap';
// import { Container } from 'react-bootstrap';

class SearchPostsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {searchResult: [], showSearchResult: false}
    this.searchInput
  }
  sendPostSearchQuery(e){
    this.setState({
      searchResult: this.props.posts.filter(post => 
        post.title.search(e.target.value) > -1 ),
      showSearchResult: true
    })
  }
  hideSearchResultBlock(){
    if(this.state.searchResult.length == 0){
      this.setState({showSearchResult: false})
      this.searchInput.value = ''
    }
  }
  render(){
    // console.log('SearchPostsContainer render');
    
    return (
      <section className="search">
          <input type="text" placeholder="Поиск по сайту" className="mr-sm-2" 
            ref={node => this.searchInput = node} 
            onChange={(e) => this.sendPostSearchQuery(e)}
            onBlur={()=> this.hideSearchResultBlock()}
          />

        {this.state.showSearchResult && this.state.searchResult.length > 0 && 
          <>
            <h3>Результат поиска - {this.state.searchResult.length}</h3>
            {this.state.searchResult.map((post, i) => {
              return (
                <div key={i}>
                  {post.title} <Link to={'/post/'+post.id} > Читать далее...</Link>
                  <hr/>
                </div>
              )
            })}
          </>
        }
        {this.state.showSearchResult && this.state.searchResult.length === 0 && 
          <h3>Поиск не дал результата </h3>
        }
      </section>
    )
  }
}
    
const mapStateToProps = state => ({
  posts: state.posts,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPostsContainer)

SearchPostsContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired).isRequired,
}