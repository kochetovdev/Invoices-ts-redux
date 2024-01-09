import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  create?: boolean;
}

const SkeletonInvoicesDetails = ({ create }: Props) => {
  return (
    <article className="flex flex-col bg-gray-100 rounded-md shadow-xl">
      <SkeletonTheme baseColor="#d6d6d6">
        <div className="flex justify-center pt-6 mb-5">
          <Skeleton width="140px" height="2rem" />
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="text-lg mb-5 gap-4 flex items-center justify-center md:flex-row">
            <Skeleton width="160px" height="1rem" />
            <Skeleton className="mb-2" width="120px" height="1.5rem" />
          </div>
          <div className="flex flex-col items-center mb-5">
            <Skeleton count={2} width="150px" height="12px" />
          </div>
        </div>
        <div className="mb-5 flex flex-col xl:flex-row justify-around items-center">
          <div className="flex justify-center items-center mb-6 xl:mb-0">
            <Skeleton
              className="mx-auto w-[300px] sm:w-[500px] lg:w-[800px] md:mx-4 xl:mb-0"
              height="70px"
            />
          </div>
          <div className="flex items-center justify-center">
            {!create && (
              <>
                <Skeleton className="mr-8 mt-4" width="100px" height="40px" />
                <Skeleton className="mt-4" width="100px" height="40px" />
              </>
            )}
            {create && (
              <div className="mt-5 xl:mt-0">
                <Skeleton width="130px" height="40px" />
              </div>
            )}
          </div>
        </div>
      </SkeletonTheme>
    </article>
  );
};

export default SkeletonInvoicesDetails;
