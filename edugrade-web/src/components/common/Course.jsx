import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Course = ({ topic, description, id, price }) => {
  return (
    <Card className="w-full overflow-hidden rounded-none shadow-none hover:shadow-lg transition-shadow border">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
          className="object-cover"
        />
      </CardHeader>
      <CardBody className="w-full p-3">
        <Typography
          variant="h6"
          color="blue-gray"
          className="p-0 m-0 capitalize"
        >
          {topic}
        </Typography>
        <Typography className="font-normal text-sm">
          {description && description.slice(0, 75)}
          {description && description.length > 10 && "...."}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between w-full px-3 pt-0 pb-3">
        <NavLink to={`/view/${id}`}>
          <Button size="sm">View Course</Button>
        </NavLink>
        <Typography color="blue-gray" className="text-lg flex justify-end mt-1">
          {price}$
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Course;
