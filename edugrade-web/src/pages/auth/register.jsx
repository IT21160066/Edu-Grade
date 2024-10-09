import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";
import Loading from "../../components/common/loading";
import { useForm } from "react-hook-form";
import FormItem from "../../components/common/formItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import regImage from "../../assets/register.png"

const Register = () => {
  const [role, setRole] = useState("student");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleUserRegistration = async (formData) => {
    setIsLoading(true);
    try {
      await axios

        .post(`http://localhost:8000/api/user/register`,  {
          ...formData,
          role: role,
        })
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "You are successfully registered!",
              icon: "success",
            });
            navigate('/login')
          }

          reset();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          console.log(error);
        });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
       <img src={regImage} alt="register" className="w-1/4 h-4/5 absolute" style={{marginRight:'900px'}}/>
      <Card color="transparent" shadow={true} className="p-6">
        <div>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(handleUserRegistration)}
          className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <FormItem name="name" errors={errors}>
              <Input
                name="name"
                {...register("name", {
                  required: "Name is required!",
                })}
                placeholder="Anoj Peiris"
                labelProps={{
                  className: "before:!mr-0 after:!ml-0",
                }}
                error={Boolean(errors.name)}
              />
            </FormItem>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <FormItem name="email" errors={errors}>
              <Input
                name="email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email.",
                  },
                })}
                placeholder="example@gmail.com"
                labelProps={{
                  className: "before:!mr-0 after:!ml-0",
                }}
                error={Boolean(errors.email)}
              />
            </FormItem>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Mobile Number
            </Typography>
            <FormItem name="mobile" errors={errors}>
              <Input
                name="mobile"
                {...register("mobile", {
                  required: "Mobile is required!",
                  pattern: {
                    value: /^(?:7|0|(?:\+94))[0-9]{9,10}$/,
                    message: "Invalid mobile number.",
                  },
                })}
                placeholder="0712345678"
                labelProps={{
                  className: "before:!mr-0 after:!ml-0",
                }}
                error={Boolean(errors.mobile)}
              />
            </FormItem>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Role
            </Typography>
            <FormItem name="role" errors={errors}>
              <Select
                value={role}
                onChange={(val) => setRole(val)}
                labelProps={{
                  className: "before:!mr-0 after:!ml-0",
                }}
              >
                <Option value="admin">Admin</Option>
                <Option value="student">Learner</Option>
                <Option value="instructor">Instructor</Option>
              </Select>
            </FormItem>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>

            <FormItem name="password" errors={errors}>
              <Input
                name="password"
                type="password"
                size="lg"
                placeholder="*******"
                {...register("password", {
                  required: "Password is required!",
                })}
                labelProps={{
                  className: "before:!mr-0 after:!ml-0",
                }}
                error={Boolean(errors.password)}
              />
            </FormItem>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6"
            fullWidth
            type="submit"
            style={{ backgroundColor: "rgb(0, 86, 210)", color: "#fff" }}
          >
            {isLoading ? <Loading /> : "Sign Up"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-800">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
