import './index.css'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import CourseCard from '../CourseCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Course extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesDetails()
  }

  retryAgain = () => {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    console.log(response)
    if (response.ok) {
      const details = await response.json()
      const data = details.course_details
      const modifiedDetails = {
        id: data.id,
        name: data.name,
        imageUrl: data.image_url,
        description: data.description,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseDetails: modifiedDetails,
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
    const {courseDetails} = this.state
    return (
      <div className="success-con">
        <CourseCard key={courseDetails.id} courseDetails={courseDetails} />
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

export default Course
