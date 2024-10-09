import React, { useEffect, useState } from "react";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import Course from "../components/common/Course";
import { Button, Input } from "@material-tailwind/react";
import Container from "../components/common/container";

const ViewCourses = () => {
  const [courseData, setCourseData] = useState([]);

  const getCourses = async () => {
    const response = await axios.get("http://localhost:8000/api/course/v1");
    setCourseData(response.data);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getCourses();
  }, []);

  return (
    <>
      <div className="bg-black text-white">
        <Container className="pt-4 pb-2">
          <h1 className="text-3xl">All Courses</h1>
          <h2 className="mt-5">Browse courses</h2>
        </Container>
      </div>

      <Container>
        <div className=" flex justify-end mt-10 mb-8">
          <div>
            <Input
              name="courseName"
              className="w-[300px]"
              labelProps={{
                className: "before:!mr-0 after:!ml-0",
              }}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-4">
          {courseData &&
            courseData.map((element, index) => (
              <Course
                key={index}
                topic={element.courseName}
                description={element.courseDescription}
                id={element._id}
                price={element.price}
              />
            ))}
        </div>
      </Container>
    </>
  );
};

export default ViewCourses;
