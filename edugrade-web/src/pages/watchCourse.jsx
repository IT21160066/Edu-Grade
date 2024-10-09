import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import Container from "../components/common/container";
import Loading from "../components/common/loading";

const WatchCourse = () => {
  let completeContentIds = [];
  const [course, setCourse] = useState();
  const [isLoading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [completeContents, setCompleteContents] = useState([]);

  const [progress, setProgress] = useState(0);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const videoRef = useRef(null);

  const getCompleteCourses = async () => {
    setLoading(true);
    const response = await axios.post(
      `http://localhost:8000/api/learner-service/complete/contents`,
      { userId: user._id, courseId: course._id }
    );

    if (response.data) {
      response.data.data.map((content) => {
        completeContentIds.push(content.contentID);
      });
    }
    setCompleteContents(response.data.data);

    setLoading(false);
  };

  useEffect(() => {
    const prog = Math.round((completeContents.length / contents.length) * 100);
    setProgress(prog);
  }, [completeContents, contents]);

  useEffect(() => {
    getCompleteCourses();
  }, []);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/course/v1/${id}`
        );

        setCourse(response.data);
        setContents(response.data.contents);
      } catch (err) {
        console.log("error fetching the course", err);
      }
    };
    getCourse();
  }, []);

  console.log(contents);

  useEffect(() => {
    // selectVideo();
    const video = videoRef.current;
    // Change the video source
    if (video) {
      video.load();
    }
  }, [contentIndex]);

  const handleClick = () => {
    setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  const completeContent = async () => {
    const completeObject = {
      userId: user._id,
      courseId: course._id,
      contentID: contents[contentIndex]._id,
    };

    setLoading(true);
    const response = await axios.post(
      `http://localhost:8000/api/learner-service/complete`,
      completeObject
    );
    getCompleteCourses();

    setLoading(false);
  };

  return (
    <div className="">
      {course && (
        <div className="bg-black text-white">
          <Container className="flex items-center h-20">
            <h1 className="text-3xl">{course.courseName}</h1>
          </Container>
        </div>
      )}
      <Container className="grid grid-cols-4 p-4 h-full border-l border-r pt-10">
        <div className="col-span-3">
          <div className="max-h-[560px] border-r">
            {course && (
              <video
                className="h-full w-full "
                id="source_video"
                controls
                ref={videoRef}
              >
                <source src={contents[contentIndex].source} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="bg-black h-20 w-full flex justify-between p-4 items-center">
            {/* <Button type="button" onClick={handleClick}>
            next {contentIndex}
          </Button> */}
            {progress ? (
              <div className="h-full aspect-square">
                <CircularProgressbar value={progress} text={`${progress}%`} />
              </div>
            ) : (
              <div>
                <Loading />
              </div>
            )}

            <Button type="button" onClick={completeContent}>
              Complete
            </Button>
          </div>
          {course ? (
            <Container className="p-0 mt-8">
              <Typography variant="h2" className=" mb-4">
                {contents[contentIndex].topic}
              </Typography>
              <Typography variant="paragraph" className=" text-justify">
                {contents[contentIndex].contentDescription}
              </Typography>
            </Container>
          ) : (
            <Loading />
          )}
        </div>

        <div className="col-span-1 h-full overflow-auto pl-2">
          <div className=" flex items-center justify-center h-10 border mb-4">
            <Typography variant="small">All Videos</Typography>
          </div>
          {course &&
            contents.map((content, index) => {
              const { source, topic } = content;

              const url = source.replace(".mp4", ".png");
              return (
                <div
                  key={source}
                  className="w-full h-[180px] mb-2 border relative overflow-hidden cursor-pointer group transition-all"
                  onClick={() => setContentIndex(index)}
                >
                  <img
                    src={url}
                    alt="ui/ux review check"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute flex items-end bottom-0 bg-gradient-to-t from-slate-900 transition-all group-hover:from-slate-600 left-0 w-full h-2/5">
                    <h6 className="font-medium capitalize mb-2 ml-2 text-white">
                      {topic}
                    </h6>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
};

export default WatchCourse;
