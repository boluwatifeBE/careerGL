import React from "react";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import config from "config";
import Card from "@/components/Card";
import Link from "@/components/Link";
import Slider from "@/components/Slider";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";

const MAX_DISPLAY = 1;

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ScrollTopAndComment hide={false} />

      <section className="relative flex  w-full flex-col  py-10 lg:flex-row lg:space-x-0">
        <img
          src={"/static/banner.png"}
          className="rounded-2xl object-cover shadow-[-13px_13px_0_rgba(28,28,28)] dark:shadow-[-13px_13px_0_rgba(246,246,246)] lg:w-2/4"
          alt="banner"
        />

        <div className="absolute left-1/4 right-0 top-0 -z-10 h-full opacity-40 ">
          <svg width="100%" height="100%">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle
                id="pattern-circle"
                cx="10"
                cy="10"
                r="1.6257413380501518"
                className="fill-slate-700 dark:fill-slate-500"
              ></circle>
            </pattern>

            <rect
              id="rect"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            ></rect>
          </svg>
        </div>

        <div className="mt-20 flex w-full flex-col pt-5 lg:mt-0 lg:w-2/4 lg:px-16 xl:px-12  2xl:px-20">
          <div className="mb-28">
            <p className="text-2xl font-bold md:text-4xl xl:text-5xl">
              They never see me coming
            </p>
            <p className="mt-6 text-lg">My favor is coming...</p>
          </div>

          <div className=" mb-10 grid grid-cols-1 gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {!config.careers.length && "No careers found."}
            {config.careers
              .slice(0, MAX_DISPLAY)
              .map(({ slug, title, description }) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  href={`/careers/${slug}`}
                />
              ))}
          </div>
          <div>
            <Link
              href="/careers"
              className=" float-right rounded-md p-2 text-[14px] font-semibold leading-6 text-useGL-main hover:bg-useGL-secondary/20 dark:text-useGL-darkMain dark:hover:bg-useGL-darkSecondary/20"
              aria-label="all careers"
            >
              Browse all careers &rarr;
            </Link>
          </div>
          <div className="flex w-full flex-col">
            <Slider slides={config.careers} />
          </div>
        </div>
      </section>

      <section className="mt-36 flex w-full">
        <div className="h-[500px] bg-useGL-main lg:w-3/4"></div>
        <div className="bg-useGL-secondary lg:w-1/4"></div>
      </section>
    </>
  );
}
