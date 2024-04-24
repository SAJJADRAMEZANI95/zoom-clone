import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  if (!isMetingOwner) return null;
  return (
    <Button
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
      className="bg-red-500 hover:bg-red-600"
    >
      End Call for everyone
    </Button>
  );
};

export default EndCallButton;
