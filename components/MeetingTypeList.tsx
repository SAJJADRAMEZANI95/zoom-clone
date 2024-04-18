"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<"isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>();
  const [values, setValues] = useState({
    dateTime: Date.now(),
    description: "",
    link: "",
  });
  const [callDetails , setCallDetails]= useState<Call>()
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
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
      setCallDetails(call)
      if(!values.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <MeetingModal
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
