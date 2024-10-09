import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Radio,
  Step,
  Stepper,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../components/common/container";
import FormItem from "../components/common/formItem";
import Loading from "../components/common/loading";
import DropZone from "../components/ui/dropZone";
import { useNavigate } from "react-router-dom";

const Content = ({ image }) => {
  return (
    <div className="rounded-md min-w-[200px] p-2 border h-[100px] relative flex">
      <div className="overflow-hidden rounded-sm flex bg-yellow-300">
        <img
          src={image}
          className="object-cover w-[120px] h-full bg-blue-500"
        />
      </div>
      <div className="w-full flex-1 flex justify-center">
        <span>1</span>
      </div>
    </div>
  );
};

const CreateCourse = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,reset,

    watch,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      topic: "",
      contentDescription: "",
      type: "video",
    },
  });

  const [courseObject, setCourseObject] = useState({
    courseName: "",
    courseDescription: "",
  });
  const [contentObject, setContentObject] = useState({
    topic: "",
    contentDescription: "",
    type: "video",
    body: "",
    source: "",
    courseID: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [open, handleOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [objectURL, setOBjectURL] = useState("");
  const [contentList, setContentList] = useState([]);
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    localStorage.setItem("contents", contentList);
  }, [contentList]);

  useEffect(() => {
    const activePage = localStorage.getItem("active");

    if (activePage) {
      setActiveStep(1);
    }

    setActiveStep(0);
  });

  const handleOnChange = (video) => {
    setVideo(video);
    setOBjectURL(URL.createObjectURL(video));
  };

  const removeSelected = () => {
    setVideo(null);
  };

  const handleCourseData = (e) => {
    const { name, value } = e.target;
    setCourseObject((object) => {
      return {
        ...object,
        [name]: value,
      };
    });
  };

  const handleContentData = (e) => {
    const { name, value } = e.target;
    setContentObject((object) => {
      return {
        ...object,
        [name]: value,
      };
    });
  };

  const handleNext = async (courseData) => {
    await axios
      .post("http://localhost:8000/api/course/v1", courseData)
      .then((res) => {
        !isLastStep && setActiveStep((cur) => cur + 1);
        localStorage.setItem("active", 1);
        localStorage.setItem("course", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createContent = async () => {
    const course = JSON.parse(localStorage.getItem("course"));

    const contentData = JSON.parse(localStorage.getItem("content"));
    const url = localStorage.getItem("url");

    const content = {
      topic: contentData.topic,
      contentDescription: contentData.contentDescription,
      type: contentData.type,
      source: url,
      courseID: course._id,
    };

    console.log("content >>", content);

    await axios
      .post("http://localhost:8000/api/course/v2", content)
      .then((res) => {
        setVideo(null);
        setContentObject({
          topic: "",
          contentDescription: "",
          type: "video",
          body: "",
          source: "",
        });
        const newUrl = url.replace(".mp4", ".png");
        setContentList([...contentList, { image: newUrl }]);
        setIsLoading(false);
        reset()
      });
  };

  const uploadVideo = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "EduGrade");

    await fetch("https://api.cloudinary.com/v1_1/ddeh0t6uq/video/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("url", data.url);
        createContent();
      });
  };

  const addContent = (contentFormData) => {
    localStorage.setItem("content", JSON.stringify(contentFormData));
    setContentObject(contentFormData);
    if (video) {
      uploadVideo();
    }
  };

  const complete = () => {
    localStorage.removeItem("content");
    localStorage.removeItem("url");
    localStorage.removeItem("course");
    localStorage.removeItem("active");

    navigate("/");
  };

  return (
    <Container>
      <div className="w-full py-4 mt-10">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>1</Step>
          <Step onClick={() => setActiveStep(1)}>2</Step>
        </Stepper>
      </div>
      {parseInt(localStorage.getItem("active")) != 1 ? (
        <Card color="transparent" shadow={false} className="mt-4 ">
          <Typography variant="h4" color="blue-gray">
            Add New Course
          </Typography>
          <form
            className="mt-8 mb-2 w-full"
            onSubmit={handleSubmit(handleNext)}
          >
            <div className="mb-1 grid md:grid-cols-2 md:gap-4">
              <div className="flex flex-col ">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Course Name
                </Typography>
                <FormItem name="courseName" className="mb-4" errors={errors}>
                  <Input
                    name="courseName"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register("courseName", {
                      required: "Course name is required.",
                    })}
                    error={Boolean(errors.courseName)}
                  />
                </FormItem>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Course Value
                </Typography>
                <FormItem name="price" className="mb-4" errors={errors}>
                  <Input
                    type="number"
                    min={0}
                    name="price"
                    icon={<h1 className="text-xs">USD</h1>}
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register("price", {
                      required: "Course price is required.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Invalid amount.",
                      },
                    })}
                    error={Boolean(errors.price)}
                  />
                </FormItem>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Course Description
                </Typography>
                <FormItem
                  name="courseDescription"
                  className="mb-4"
                  errors={errors}
                >
                  <Textarea
                    name="courseDescription"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register("courseDescription", {
                      required: "Course Description is required.",
                    })}
                    error={Boolean(errors.courseDescription)}
                  />
                </FormItem>
              </div>
              <div className="flex flex-col">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Course Author
                </Typography>
                <FormItem name="author" errors={errors} className="mb-4">
                  <Input
                    name="author"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register("author", {
                      required: "Course author is required.",
                    })}
                    error={Boolean(errors.author)}
                  />
                </FormItem>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Duration(Hours)
                </Typography>
                <FormItem name="duration" errors={errors} className="mb-4">
                  <Input
                    name="duration"
                    type="number"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register("duration")}
                    error={Boolean(errors.duration)}
                  />
                </FormItem>
              </div>
            </div>
            <div>
              <Button type="submit" disabled={isLastStep}>
                Save
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="mt-10">
          <div className="w-full border flex flex-nowrap gap-2 p-2 relative overflow-auto">
            {contentList.map((element, index) => (
              <Content image={element.image} key={index} />
            ))}
          </div>
          <Card color="transparent" shadow={false} className="mt-10 flex-3">
            <Typography variant="h4" color="blue-gray">
              Add New Content
            </Typography>

            <form className="mt-8 mb-2" onSubmit={handleSubmit2(addContent)}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Topic
                </Typography>
                <FormItem name="topic" errors={errors2}>
                  <Input
                    name="topic"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register2("topic", {
                      required: "Topic is required.",
                    })}
                    error={Boolean(errors2.topic)}
                  />
                </FormItem>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <FormItem name="contentDescription" errors={errors2}>
                  <Textarea
                    name="contentDescription"
                    labelProps={{
                      className: "before:!mr-0 after:!ml-0",
                    }}
                    {...register2("contentDescription", {
                      required: "Content Description is required.",
                    })}
                    error={Boolean(errors2.contentDescription)}
                  />
                </FormItem>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Select Content Type
                </Typography>
                <div className="flex gap-10">
                  <Radio
                    name="type"
                    {...register2("type")}
                    label="Video"
                    value="video"
                    defaultChecked
                  />
                  <Radio
                    name="type"
                    {...register2("type")}
                    label="Reading"
                    value="reading"
                  />
                </div>
                {watch("type") == "video" ? (
                  <div>
                    <Typography variant="h6" className="text-gray-900">
                      Video material
                    </Typography>
                    <div className="relative mt-3">
                      <DropZone
                        onChange={handleOnChange}
                        clear={removeSelected}
                        value={video}
                      />
                      {video && (
                        <View
                          className="absolute right-[34px] top-[10px] cursor-pointer text-blue-500"
                          onClick={() => handleOpen(true)}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography variant="h6" className="text-gray-900">
                      Reading material
                    </Typography>
                    <div className="mt-3">
                      <Textarea
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="body"
                        onChange={(e) => handleContentData(e)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="mt-4">
                  {isLoading ? <Loading /> : "Add"}
                </Button>
                <Button type="submit" className="mt-4" onClick={complete}>
                  complete
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          <video
            controls
            className="w-full aspect-video"
            controlsList="fullscreen"
            // poster=""//A URL for an image to be shown while the video is downloading
            // ended
            // onTimeUpdate={(e) => console.log(Math.floor(e.target.currentTime))}
          >
            <source src={objectURL} type="video/mp4" />
          </video>
        </DialogBody>
      </Dialog>
    </Container>
  );
};

export default CreateCourse;
