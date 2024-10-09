import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log(pathname);

  console.log(data);
  const { image, courseName, author, progress, courseId } = data;
  return (
    <Card
      className="w-full overflow-hidden rounded-none shadow-none hover:shadow-lg"
      onClick={() => navigate(`${pathname}/${courseId}`)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none w-full"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody className="w-full p-3">
        <Typography variant="h6" color="blue-gray" className="p-0 m-0">
          {courseName}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className=" font-normal text-sm capitalize"
        >
          {author}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col justify-between w-full px-3 pt-0 pb-3">
        <Progress value={25} size="sm" />
        <div className="flex items-start -space-x-3 mt-1">
          <Typography variant="small" className="font-normal ">
            30%
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
