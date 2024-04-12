import './index.css'

import {Link} from 'react-router-dom'

const CourseItem = props => {
  const {courseItem} = props
  const {id, name, logoUrl} = courseItem
  return (
    <Link className="link" to={`/courses/${id}`}>
      <li className="course-item">
        <img src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
