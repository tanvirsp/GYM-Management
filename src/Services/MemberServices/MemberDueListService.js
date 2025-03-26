const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;


const MemberDueListService= async (req, DataModel) => {
    try{
        const pageNo = Number(req.params.pageNo);
        const perPage = Number(req.params.perPage);
        const id = new ObjectID(req.params.id);
        const skipRow = (pageNo - 1) * perPage;

      

            
        const data = await DataModel.aggregate([
            {$match: {userID: id }},
            {$sort: {createdAt: -1}},
            
            {
                $facet:{
                    total:[{$count: "count"}],
                    rows:[{$skip: skipRow}, {$limit: perPage}],
                    due: [
                        {$match: {status: "due" }},
                        {
                            $group: {
                                 _id: null,
                                 totalDue: {$sum: "$amount"}

                            }
                        }
                    ]
                }
            }
        ])

       
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}



module.exports=MemberDueListService