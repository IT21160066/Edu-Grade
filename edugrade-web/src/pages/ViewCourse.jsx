import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import Container from "../components/common/container";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Arrow from "../assets/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { checkout } from "../util/checkout";
import { ChevronLeft } from "lucide-react";

const ViewCourse = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [enroll, setEnroll] = useState({
    userId: user._id,
    userEmail: user.email,
    userMobile: user.mobile,
  });

  const getCourse = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/course/v1/${id}`)
        .then((res) => {
          setCourse(res.data);
        });
    } catch (err) {
      console.log("error fetching the course", err);
    }
  };

  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  };

  const back = () => {
    navigate("/view-course");
  };

  useEffect(() => {
    getCourse();
  }, []);

  const enrollToCourse = async () => {
    const { contents, createdAt, updatedAt, ratings, ...rest } = course;

    localStorage.setItem("rest", JSON.stringify(rest));

    const products = [
      {
        id: course.stripeId,
        title: course.courseName,
        price: course.price,
        quantity: 1,
      },
    ];
    checkout({ products });
  };

  return (
    <>
      <Button
        onClick={back}
        className=" flex items-center relative top-4 ml-7 w-fit"
        size="sm"
      >
        <ChevronLeft width={20} /> Back
      </Button>
      <Container>
        <Card className="w-full md:flex-row flex-col mt-16 shadow-none ">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 md:w-2/5 shrink-0 rounded-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="md:pl-6 px-0 md:py-0">
            <Typography color="blue-gray" className="mb-4 text-3xl md:text-4xl">
              {course.courseName}
            </Typography>
            <Typography color="gray" className="mb-2 font-normal">
              {course.courseDescription}
            </Typography>
            <div className="flex flex-col">
              <span className="items-center capitalize">
                Author :{course?.author}
              </span>
              <span className="flex items-center">
                Ratings:
                <Rating value={4} readonly className="ml-1" />
              </span>
              <Button
                className=" w-fit mt-4"
                loading={loading}
                onClick={enrollToCourse}
              >
                Enroll
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className="w-full">
          <Typography variant="h3" className="mt-12 mb-5" color="blue-gray">
            Course Content
          </Typography>
          <div className="grid place-items-center">
            {course.contents &&
              course.contents.map((element, index) => (
                // <Content
                //   index={element._id}
                //   topic={element.topic}
                //   contentDescription={element.contentDescription}
                //   sourceVideo={element.source}
                // />
                <Accordion
                  open={open === index + 1}
                  icon={<Arrow id={index + 1} open={open} />}
                >
                  <AccordionHeader onClick={() => handleOpen(index + 1)}>
                    <h1 className="capitalize">{element.topic}</h1>
                  </AccordionHeader>
                  <AccordionBody>{element.contentDescription}</AccordionBody>
                </Accordion>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ViewCourse;
