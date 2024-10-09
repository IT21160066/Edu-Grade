import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";


const Content = ({ topic,contentDescription,sourceVideo }) => {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    
    return (
        <div className="w-2/3 mt-7">
            <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""}`}>
                    {topic}
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                    {contentDescription}
                    <video class="h-full w-4/5 rounded-lg ml-28" >
                        <source
                            src={sourceVideo}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </AccordionBody>
            </Accordion>
        </div>
    );
}

export default Content
