import { useState } from "react";
import { Drawer } from "@/components/Drawer";
import { AuthorFrontMatter } from "types/AuthorFrontMatter";
import { Header } from "@/components/Form";
import Image from "next/image";

type AuthorDetailsCardProps = {
  data: AuthorFrontMatter;
};

export default function AuthorDetailsCard(props: AuthorDetailsCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = props;

  return (
    <>
      <div
        aria-hidden
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className=" flex w-full cursor-pointer items-center justify-between"
      >
        {data.name}
      </div>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        removeWhenClosed={true}
      >
        <div className="fade-in divide-y-2 divide-gray-100 dark:divide-gray-800">
          <Header title="About" />
          <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div className="flex flex-col items-center space-x-2 pt-8">
              <Image
                src={data.avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="h-48 w-48 rounded-full"
              />
              <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
                {data.name}
              </h3>
              <div className="font-medium text-gray-500 dark:text-gray-400">
                {data.occupation}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
