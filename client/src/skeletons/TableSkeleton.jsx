import Skeleton from "react-loading-skeleton";

// eslint-disable-next-line react/prop-types
const TableSkeleton = ({colSpan}) => {
    return (

        <tr>
          <td colSpan = {colSpan}><Skeleton count={5} /></td>
            
        </tr>
    );
};

export default TableSkeleton;