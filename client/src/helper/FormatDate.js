import moment from "moment";

const FormatDate = function(isoString){
    return moment(isoString).format("DD MMMM YYYY")
}

export default FormatDate