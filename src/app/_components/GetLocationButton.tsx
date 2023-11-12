"use client";
import { useState, useCallback, useReducer } from "react";
import { trpc } from "@trpcProviders/client";
import { useSession } from "next-auth/react";
import NoPremmisionsDialog from "./NoPremmisionsDialog";

export default function GetLocationButton() {
  const addRescue = trpc.addRescue.useMutation();
  const me = trpc.getMe.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [prmessions, setPrmessions] = useState(true);
  function rescueRequest  ()  {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (me.data)
          addRescue.mutate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userId: me.data.id,
            status:'pending',
            timeStamp: new Date()
          });
        if (!prmessions) {
          setPrmessions(true);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setPrmessions(false);
        }
      }
    );
  };
  
  if (!prmessions) {
    return (
      <>
        <NoPremmisionsDialog />
        <button
          onClick={() => {
            rescueRequest();
            //@ts-ignore
            document.getElementById("my_modal_1").showModal();
          }}
          className="btn w-52 h-52 rounded-full"
        >
          חשמל אותי
        </button>
        ;
      </>
    );
  }

  return (
    <button onClick={rescueRequest} className="btn w-52 h-52 rounded-full">
      חשמל אותי
    </button>
  );
}
