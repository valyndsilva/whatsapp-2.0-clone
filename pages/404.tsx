// pages/404.js
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[80vw] my-10 mx-auto">
        <h2 className="text-4xl my-4">Chat Not Found</h2>
        <p className="text-lg">Oops... There is nothing to see here!</p>
        <img
          src="/assets/whatsapp-home.png"
          alt="Whatsapp Logo"
          height={250}
          width={250}
          className="object-contain"
        />
        <p className="text-md text-gray-500">
          Use the search box in the sidebar to search through your existing
          chats.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
