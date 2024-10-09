import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Aos from "aos";
import Course from "../components/common/Course";

const home = () => {
  const [courseData, setCourseData] = useState([]);
  console.log(courseData);

  const getCourses = async () => {
    const response = await axios.get("http://localhost:8000/api/course/v1");
    setCourseData(response.data);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getCourses();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <Typography variant="h2" className="mb-4">
          Welcome to Edu Grade Platform
        </Typography>
        <Typography variant="lead" className="mb-8 text-gray-600">
          Unlock your learning potential with our wide range of courses.
        </Typography>
        <Link to="/view-course">
          <Button className="bg-blue-800">Browse Courses</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8 mb-24">
        {courseData &&
          courseData
            .slice(0, 3)
            .map((element, index) => (
              <Course
                key={index}
                id={element._id}
                topic={element.courseName}
                description={element.courseDescription}
                price={element.price}
              />
            ))}
      </div>
    </div>
  );
};

export default home;
