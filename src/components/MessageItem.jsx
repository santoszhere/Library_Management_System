import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassPlusIcon,
  PaperClipIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import { useState } from "react";
import { classNames } from "../utils";

const MessageItem = ({
  message,
  isOwnMessage,
  isGroupChatMessage,
  deleteChatMessage,
}) => {
  const [resizedImage, setResizedImage] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <>

      <div
        className={classNames(
          "flex justify-start items-end  gap-3 max-w-lg",
          isOwnMessage ? "ml-auto" : ""
        )}
      >
        <img
          src={message.sender?.avatar}
          className={classNames(
            "h-7 w-7 object-cover rounded-full flex flex-shrink-0",
            isOwnMessage ? "order-2" : "order-1"
          )}
        />
        <div
          onMouseLeave={() => setOpenOptions(false)}
          className={classNames(
            "p-4 rounded-3xl flex flex-col cursor-pointer group hover:bg-secondary",
            isOwnMessage
              ? "order-1 rounded-br-none bg-primary"
              : "order-2 rounded-bl-none bg-secondary"
          )}
        >
          {isGroupChatMessage && !isOwnMessage && (
            <p
              className={classNames(
                "text-xs font-semibold mb-2",
                ["text-success", "text-danger"][
                message.sender.username.length % 2
                ]
              )}
            >
              {message.sender?.username}
            </p>
          )}
          {message?.length > 0 && (
            <div>
              {isOwnMessage && (
                <button
                  className="self-center p-1 relative options-button"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  <EllipsisVerticalIcon className="group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-zinc-300" />
                  <div
                    className={classNames(
                      "z-30 text-left absolute bottom-0 translate-y-1 text-[10px] w-auto bg-dark rounded-2xl p-2 shadow-md border-[1px] border-secondary",
                      openOptions ? "block" : "hidden"
                    )}
                  >
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        const ok = confirm(
                          "Are you sure you want to delete this message"
                        );
                        if (ok) {
                          deleteChatMessage(message);
                        }
                      }}
                      role="button"
                      className="border border-red-500 p-4 text-danger rounded-lg w-auto inline-flex items-center hover:bg-secondary"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete Message
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}
          {message.content && (
            <div className="relative flex justify-between">
              {isOwnMessage && (
                <button
                  className="self-center relative options-button"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  <EllipsisVerticalIcon className="group-hover:w-4 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-zinc-300" />
                  <div
                    className={classNames(
                      "delete-menu z-20 text-left -translate-x-24 -translate-y-4 absolute -bottom-3 left-2 text-[10px] w-auto bg-dark rounded-2xl shadow-md border-[1px] border-secondary",
                      openOptions ? "block" : "hidden"
                    )}
                  >
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        const ok = confirm(
                          "Are you sure you want to delete this message"
                        );
                        if (ok) {
                          deleteChatMessage(message);
                        }
                      }}
                      role="button"
                      className="p-2  text-danger rounded-lg w-auto inline-flex items-center hover:bg-secondary"
                    >
                      <TrashIcon className="h-4 w-auto mr-1" />
                      Delete Message
                    </p>
                  </div>
                </button>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          )}
          <p
            className={classNames(
              "mt-1.5 self-end text-[10px] inline-flex items-center",
              isOwnMessage ? "text-zinc-50" : "text-zinc-400"
            )}
          >
            {message.attachments?.length > 0 && (
              <PaperClipIcon className="h-4 w-4 mr-2 " />
            )}
            {moment(message.updatedAt).fromNow(true)} ago
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageItem;
