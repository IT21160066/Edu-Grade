import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CourseProgress = () => {
  const [course, setCourse] = useState({});
  const [progress, setProgress] = useState(0);

  const { user } = useContext(AuthContext);

  const fetchCourseData = async () => {
    const course = await axios.get(
      "http://localhost:8000/api/course/v1/6637cf2cee561d1183ae3008",
      {
        userId: user._id,
        courseId: "6637c95ecf0c4041ad784ffd",
      }
    );

    setCourse(course.data.data);

    const data = await axios.post(
      "http://localhost:8000/api/learner-service/complete/contents",
      {
        userId: user._id,
        courseId: "6637c95ecf0c4041ad784ffd",
      }
    );

    // console.log("len", course.data.contents.length);
    setProgress(
      Math.round((data.data.metaData / course.data.contents.length) * 100)
    );
  };

  console.log(progress);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const onChangeProgress = () => {
    setProgress((prev) => prev + 20);
  };

  return <div>{/* <Progress value={progress} label="Completed" /> */}</div>;
};

export default CourseProgress;
