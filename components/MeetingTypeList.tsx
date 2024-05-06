"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
          variant: "destructive",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startAt = new Date(values.dateTime).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
        variant: "destructive",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <HomeCard
        image="/icons/add-meeting.svg"
        title="New Meeting"
        discription="Start an instant meeting"
        bgColor="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        image="/icons/schedule.svg"
        title="Schedule Meeting"
        discription="Plan your meeting"
        bgColor="bg-blue-1"
        handleClick={() => setMeetingState("isScheduledMeeting")}
      />
      <HomeCard
        image="/icons/recordings.svg"
        title="View Recordings"
        discription="Check out your recordings"
        bgColor="bg-purple-1"
        handleClick={() => router.push("/recordings")}
      />
      <HomeCard
        image="/icons/join-meeting.svg"
        title="Join Meeting"
        discription="via invitation link"
        bgColor="bg-yellow-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={MeetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) =>
                  setValues({ ...values, dateTime: date as Date })
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </label>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={MeetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied to Clipboard" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={MeetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the Link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
