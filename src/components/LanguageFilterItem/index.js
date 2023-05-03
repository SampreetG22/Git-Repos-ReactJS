import './index.css'

const LanguageFilterItem = props => {
  const {details, toggleClass, currentTab} = props
  const {id, language, isActive} = details
  const BtnClicked = () => {
    toggleClass(id)
  }
  let classToggle
  if (currentTab === id && isActive) {
    classToggle = 'highlighted'
  } else {
    classToggle = 'normal'
  }

  return (
    <li className="listEl">
      <button className={classToggle} type="button" onClick={BtnClicked}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
