import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../api/api.js";
import login from "../../assets/login.png";
import FormItem from "../../components/common/formItem";
import Loading from "../../components/common/loading";
import { AuthContext } from "../../context/authContext";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, error, dispatch } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async (formData) => {
    setIsLoading(true);
    dispatch({ type: "LOGIN_START" });

    const response = await axios.post(`user/auth`, formData);

    if (response.status == 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      Cookies.set("jwt", response.data.token, {
        expires: 30,
      });
      reset();
      Swal.fire({
        title: "Success!",
        text: "Login Success!",
        icon: "success",
      });

      if (response.data.user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }

    if (response.status == 401) {
      dispatch({ type: "LOGIN_FAILURE" });
      Swal.fire({
        title: "Error!",
        text: "Login failed!",
        icon: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-1 ">
      <Card
        color="transparent"
        shadow={true}
        className="p-6 flex flex-col md:flex-row"
      >
        <div className="p-16 md:flex items-center justify-center hidden ">
          <img
            src={login}
            alt="login"
            height={200}
            width={200}
            className="object-contain "
          />
        </div>
        <div className="pl-6 border-l">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form
            onSubmit={handleSubmit(handleUserLogin)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 ">
                Enter email and password
              </Typography>
              <FormItem name={"email"} errors={errors}>
                <Input
                  name="email"
                  {...register("email", {
                    required: "Email is required!",
                  })}
                  placeholder="example@gmail.com"
                  labelProps={{
                    className: "before:!mr-0 after:!ml-0",
                  }}
                  error={Boolean(errors.email)}
                />
              </FormItem>

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <FormItem name={"password"} errors={errors}>
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
              <Button
                type="submit"
                className="mt-6"
                fullWidth
                style={{ backgroundColor: "rgb(0, 86, 210)", color: "#fff" }}
              >
                {isLoading ? <Loading /> : "Log In"}
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Do not have an account?{" "}
                <Link to="/register" className="font-medium text-blue-800">
                  Sign Up
                </Link>
              </Typography>
              <Typography
                color="gray"
                className="mt-4 text-center font-normal flex justify-center "
              >
                <Link to="/" className="font-medium flex items-center gap-2">
                  <ChevronLeft width={20} /> Back to home
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
