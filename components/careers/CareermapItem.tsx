import Link from "next/link";

type RoadmapGridItemProps = {
  title: string;
  subtitle: string;
  isCommunity?: boolean;
  isUpcoming?: boolean;
  colorIndex?: number;
  url: string;
};

export function CareermapItem(props: RoadmapGridItemProps) {
  const {
    title,
    subtitle,
    isCommunity,
    colorIndex = 0,
    url,
    isUpcoming,
  } = props;

  return (
    <div>
      {isCommunity && (<div>Community contribution</div>)}

      <div>{title}</div>

      <div>{subtitle}</div>

      {isUpcoming && (<div>Upcoming</div>)}
    </div>
  );
}
