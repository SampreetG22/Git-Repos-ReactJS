import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
].map(each => ({...each, isActive: false}))
languageFiltersData[0].isActive = true

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    tabsList: languageFiltersData,
    isLoading: true,
    currentTab: 'ALL',
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    const {currentTab} = this.state
    this.setState({isLoading: true, repoList: []})
    const url = `https://apis.ccbp.in/popular-repos?language=${currentTab}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      issuesCount: eachData.issues_count,
      forksCount: eachData.forks_count,
      starsCount: eachData.stars_count,
      avatarUrl: eachData.avatar_url,
    }))
    this.setState({repoList: updatedData, isLoading: false})
  }

  toggleClass = ID => {
    const {tabsList} = this.state
    const filteredElement = tabsList.filter(each => each.id === ID)
    this.setState(
      prevstate => ({
        tabsList: prevstate.tabsList.map(eachTab => {
          if (eachTab.id === ID) {
            return {...eachTab, isActive: true}
          }
          return {...eachTab, isActive: false}
        }),
        currentTab: filteredElement[0].id,
      }),
      this.getReposList,
    )
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failureImage"
    />
  )

  render() {
    const {repoList, isLoading, tabsList, currentTab} = this.state
    return (
      <div className="mainContainer">
        <h1 className="title">Popular</h1>
        <ul className="languagesList">
          {tabsList.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              toggleClass={this.toggleClass}
              details={eachLang}
              currentTab={currentTab}
            />
          ))}
        </ul>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )}
        {repoList.length === 0 ? (
          this.renderFailureView
        ) : (
          <ul className="repoListContainer">
            {repoList.map(eachRepo => (
              <RepositoryItem key={eachRepo.id} details={eachRepo} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
