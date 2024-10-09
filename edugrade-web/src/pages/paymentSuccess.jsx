import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/container";
import { AuthContext } from "../context/authContext";

const Success = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const course = JSON.parse(localStorage.getItem("rest"));
  const [isLoading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  const enroll = async () => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8000/api/learner-service/enrollment/enroll`,
        {
          user,
          course,
        }
      );

      const payment = {
        courseId: course._id,
        courseName: course.courseName,
        author: course.author,
        userId: user._id,
        name: user.name,
        email: user.email,
        amount: course.price,
      };

      await axios.post(
        `http://localhost:8000/api/payment-service/checkout/save`,
        payment
      );

      setEnrolled(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    enroll();
  }, []);

  const handleClick = () => {
    localStorage.removeItem("rest");
    localStorage.removeItem("sessionId");
    navigate("/my-courses");
  };

  return (
    <>
      <Alert
        color="green"
        className="rounded-none"
        open={enrolled}
        onClose={() => setEnrolled(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {enrolled && "You are successfully enrolled!"}
      </Alert>
      <div className="bg-black h-24 flex items-center">
        <Container>
          <h3 className="text-white text-4xl">
            {isLoading ? "Enrolling..." : "Thank you for your purchase."}
          </h3>
        </Container>
      </div>

      <Container className="py-4">
        <Button size="sm" className="flex items-center" onClick={handleClick}>
          <span className="mt-[2px]"> Continue</span>
          <ChevronRight height={20} />
        </Button>
      </Container>
    </>
  );
};

export default Success;
