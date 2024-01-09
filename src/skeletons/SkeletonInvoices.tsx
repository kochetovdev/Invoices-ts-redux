import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonInvoices = () => {
  return (
    <article className="relative w-[400px] md:w-[350px] lg:w-[300px] h-[350px] rounded-md border-2 bg-zinc-100">
      <SkeletonTheme baseColor="#d6d6d6">
        <div className="flex justify-center mt-6 mb-6">
          <Skeleton height="20px" width="130px" />
        </div>
        <div className="flex justify-center mb-6">
          <Skeleton height="15px" width="200px" />
        </div>
        <div className="flex flex-col items-center justify-center mb-6">
          <Skeleton height="12px" width="110px" />
          <Skeleton height="12px" width="110px" />
        </div>
        <div className="mx-4 mb-6">
          <Skeleton count={3} height="12px" />
        </div>
        <div className="flex justify-center space-x-5">
          <Skeleton width='100px' height="30px" />
          <Skeleton width='100px' height="30px" />
        </div>
      </SkeletonTheme>
    </article>
  );
};

export default SkeletonInvoices;
