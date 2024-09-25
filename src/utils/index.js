export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  if (setLoading) setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

export const isBrowser = typeof window !== "undefined";

export const getChatObjectMetadata = (chat, loggedInUser) => {
  const lastMessage = chat.lastMessage?.content
    ? chat.lastMessage?.content
    : "No messages yet";

  if (chat.isGroupChat) {
    return {
      avatar: "https://via.placeholder.com/100x100.png",
      title: chat.name,
      description: `${chat.participants.length} members in the chat`,
      lastMessage: chat.lastMessage
        ? chat.lastMessage?.sender?.username + ": " + lastMessage
        : lastMessage,
    };
  } else {
    const participant = chat.participants.find(
      (p) => p._id !== loggedInUser?._id
    );
    return {
      avatar: participant?.avatar.url,
      title: participant?.username,
      description: participant?.email,
      lastMessage,
    };
  }
};

export class LocalStorage {
  static isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    );
  }

  static get(key) {
    if (!this.isBrowser()) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key, value) {
    if (!this.isBrowser()) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    if (!this.isBrowser()) return;
    localStorage.removeItem(key);
  }

  static clear() {
    if (!this.isBrowser()) return;
    localStorage.clear();
  }
}
