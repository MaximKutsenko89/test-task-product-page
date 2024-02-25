import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonLoader.scss";
export const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="#333" highlightColor="#666">
      <div className="loader">
        <Skeleton width={300} />
        <Skeleton width={300} />
        <Skeleton width={100} height={100} />
        <Skeleton width={50} />
      </div>
    </SkeletonTheme>
  );
};
