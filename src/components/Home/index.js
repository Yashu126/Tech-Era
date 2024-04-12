import './index.css'
import Loader from 'react-loader-spinner'

import {Component} from 'react'

import CourseItem from '../CourseItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesList: []}

  componentDidMount() {
    this.getCoursesData()
  }

  retryAgain = () => {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')

    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesList: modifiedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#4656a1" />
    </div>
  )

  renderFailure = () => (
    <div className="loader-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" onClick={this.retryAgain} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {coursesList} = this.state
    return (
      <div className="success-con">
        <h1 className="course-head">Courses</h1>
        <ul className="course-con">
          {coursesList.map(each => (
            <CourseItem key={each.id} courseItem={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderSuccess()
      default:
        return null
    }
  }
}

export default Home
