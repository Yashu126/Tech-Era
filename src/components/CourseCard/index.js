import './index.css'

const CourseCard = props => {
  const {courseDetails} = props
  const {name, imageUrl, description} = courseDetails
  return (
    <div className="card-con">
      <img className="card-img" src={imageUrl} alt={name} />
      <div>
        <h1 className="course-head">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </div>
  )
}

export default CourseCard
