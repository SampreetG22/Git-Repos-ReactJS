import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = details
  return (
    <li className="repoListElement">
      <img src={avatarUrl} className="listElImage" alt={name} />
      <h1 className="repoTitle">{name}</h1>
      <div className="detailsContainer">
        <div className="imageAndTextContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="starsAndEtc"
            alt="stars"
          />
          <p className="starsAndEtcText">{starsCount} stars</p>
        </div>
        <div className="imageAndTextContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="starsAndEtc"
            alt="forks"
          />
          <p className="starsAndEtcText">{forksCount} forks</p>
        </div>
        <div className="imageAndTextContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="starsAndEtc"
            alt="open issues"
          />
          <p className="starsAndEtcText">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
