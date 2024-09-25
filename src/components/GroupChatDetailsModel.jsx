import { Dialog, Transition } from "@headlessui/react";
import {
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import {
  addParticipantToGroup,
  deleteGroup,
  getAvailableUsers,
  getGroupInfo,
  removeParticipantFromGroup,
  updateGroupName,
} from "../config/AxiosInstance";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import { useSelector } from "react-redux";
import { requestHandler } from "../utils";
import toast from "react-hot-toast";

const GroupChatDetailsModal = ({ open, onClose, chatId, onGroupDelete }) => {
  const { userData: user } = useSelector((state) => state.user);
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [renamingGroup, setRenamingGroup] = useState(false);
  const [participantToBeAdded, setParticipantToBeAdded] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [groupDetails, setGroupDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const handleGroupNameUpdate = async () => {
    if (!newGroupName) return alert("Group name is required");
    requestHandler(
      async () => await updateGroupName(chatId, newGroupName),
      null,
      (res) => {
        const { data } = res;
        setGroupDetails(data);
        setNewGroupName(data.name);
        setRenamingGroup(false);
        toast.success(`Group name updated to  ${data.name}`)
      },
      alert
    );
  };

  const getUsers = async () => {
    requestHandler(
      async () => await getAvailableUsers(),
      null,
      (res) => {
        const { data } = res;
        setUsers(data || []);
      },
      alert
    );
  };

  const deleteGroupChat = async () => {
    if (groupDetails?.admin !== user?._id) {
      return toast.error("You are not the admin of the group");
    }
    const confirmDeleteGroup = confirm("Are you sure you want to delete this group .? ")
    if (!confirmDeleteGroup) return
    requestHandler(
      async () => await deleteGroup(chatId),
      null,
      () => {
        onGroupDelete(chatId);
        handleClose();
      },
      alert
    );
  };

  const removeParticipant = async (participantId) => {
    const confirmss = confirm("Are you sure you want to remove this participant.?")
    if (!confirmss) return
    requestHandler(
      async () => await removeParticipantFromGroup(chatId, participantId),
      null,
      () => {
        const updatedGroupDetails = {
          ...groupDetails,
          participants:
            groupDetails?.participants?.filter(
              (p) => p._id !== participantId
            ) || [],
        };
        setGroupDetails(updatedGroupDetails);
        toast.success("Participant removed");
      },
      alert
    );
  };

  const addParticipant = async () => {
    if (!participantToBeAdded)
      return toast.error("Please select a participant to add.");
    requestHandler(
      async () => await addParticipantToGroup(chatId, participantToBeAdded.value),
      null,
      (res) => {
        const { data } = res;
        const updatedGroupDetails = {
          ...groupDetails,
          participants: data?.participants || [],
        };
        setGroupDetails(updatedGroupDetails);
        toast.success("Participant added");
      },
      alert
    );
  };

  const fetchGroupInformation = async () => {
    requestHandler(
      async () => await getGroupInfo(chatId),
      null,
      (res) => {
        const { data } = res;
        setGroupDetails(data);
        setNewGroupName(data?.name || "");
      },
      alert
    );
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    fetchGroupInformation();
    getUsers();
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-secondary py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-secondary text-zinc-400 hover:text-zinc-500 focus:outline-none"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex pl-16 justify-center items-center relative w-full h-max gap-3">
                          {groupDetails?.participants.slice(0, 3).map((p) => (
                            <img
                              className="w-24 h-24 -ml-16 rounded-full outline outline-4 outline-secondary"
                              key={p._id}
                              src={p.avatar}
                              alt="avatar"
                            />
                          ))}
                          {groupDetails?.participants &&
                            groupDetails?.participants.length > 3 ? (
                            <p>+{groupDetails?.participants.length - 3}</p>
                          ) : null}
                        </div>
                        <div className="w-full flex flex-col justify-center items-center text-center">
                          {renamingGroup ? (
                            <div className="w-full flex justify-center items-center mt-5 gap-2">
                              <Input
                                placeholder="Enter new group name..."
                                value={newGroupName}
                                onChange={(e) =>
                                  setNewGroupName(e.target.value)
                                }
                              />
                              <Button
                                severity="primary"
                                onClick={handleGroupNameUpdate}
                              >
                                Save
                              </Button>
                              <Button
                                severity="secondary"
                                onClick={() => setRenamingGroup(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div className="w-full inline-flex justify-center items-center text-center mt-5">
                              <h1 className="text-2xl font-semibold truncate-1">
                                {groupDetails?.name}
                              </h1>
                              {groupDetails?.admin === user?._id && (
                                <button onClick={() => setRenamingGroup(true)}>
                                  <PencilIcon className="w-5 h-5 ml-4" />
                                </button>
                              )}
                            </div>
                          )}
                          <p className="mt-2 text-zinc-400 text-sm">
                            Group · {groupDetails?.participants.length}{" "}
                            participants
                          </p>
                        </div>
                        <hr className="border-[0.1px] border-zinc-600 my-5 w-full" />
                        <div className="w-full">
                          <p className="inline-flex items-center">
                            <UserGroupIcon className="h-6 w-6 mr-2" />
                            {groupDetails?.participants.length} Participants
                          </p>
                          <div className="w-full">
                            {groupDetails?.participants?.map((part) => (
                              <React.Fragment key={part._id}>
                                <div className="flex justify-between items-center w-full py-4">
                                  <div className="flex justify-start items-start gap-3 w-full">
                                    <img
                                      className="w-10 h-10 rounded-full"
                                      src={part.avatar}
                                      alt="avatar"
                                    />
                                    <p className="text-lg">{part.username}</p>
                                  </div>
                                  {groupDetails?.admin === user?._id && (
                                    <button
                                      onClick={() =>
                                        removeParticipant(part._id)
                                      }
                                    >
                                      <TrashIcon className="w-6 h-6 text-red-500" />
                                    </button>
                                  )}
                                </div>
                                <hr className="border-[0.1px] border-zinc-600" />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {groupDetails?.admin === user?._id && (
                      <div className="w-full px-4 sm:px-6 mt-4">
                        {addingParticipant ? (
                          <div className="flex justify-center items-center gap-2">
                            <Select
                              placeholder="Select participant"
                              options={users.map((u) => ({
                                value: u._id,
                                label: u.username,
                              }))}
                              onChange={(value) =>
                                setParticipantToBeAdded(value)
                              }
                            />
                            <Button onClick={addParticipant}>Add</Button>
                            <Button
                              severity="secondary"
                              onClick={() => setAddingParticipant(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => setAddingParticipant(true)}
                          >
                            <UserPlusIcon className="w-5 h-5 mr-2" />
                            Add Participant
                          </Button>
                        )}
                      </div>
                    )}
                    <div className="px-4 sm:px-6 mt-6 mb-6">
                      {groupDetails?.admin === user?._id && (
                        <Button
                          className="w-full"
                          severity="danger"
                          onClick={deleteGroupChat}
                        >
                          Delete Group
                        </Button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default GroupChatDetailsModal;
