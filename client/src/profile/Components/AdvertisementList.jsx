import AdvertisementItem from "./AdvertisementItem.jsx";
import {useGetJobsQuery} from "../../state/jobApiSlice.js";
import InfinitLoading from "../../Components/InfinitLoading.jsx";

export default function AdvertisementList({setSelectedJob}) {
  const {data, isSuccess} = useGetJobsQuery();

  return (
    <>
      {!isSuccess ? (
        <InfinitLoading />
      ) : (
        <div className="container ">
          <div className="divider divider-primary divider-start">Jobs</div>
          <ul>
            {data.map(job => (
              <AdvertisementItem key={job.id} job={job} setSelectedJob={setSelectedJob} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
