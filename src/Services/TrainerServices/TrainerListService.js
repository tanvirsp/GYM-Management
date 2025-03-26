const UserModel = require("../../Models/UserModel");

const TrainerListService= async (req) => {
    try{


        const SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
        const SearchArray=[{name: SearchRgx}, {phone: SearchRgx}, {memberID: SearchRgx},  ]


        const pageNo = Number(req.params.pageNo);
        const perPage = Number(req.params.perPage);
        const searchValue = req.params.searchKeyword;

        const skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue!=="0") {
            let SearchQuery = {$or:SearchArray}
            data = await UserModel.aggregate([
                    {$match: {role: "trainer"}},
                    {$match: SearchQuery},
                    {$lookup: {from: "salaries", localField: "_id", foreignField: "userID", as: "salary"} },
                    {$unwind : "$salary" },
                    {$sort: {createdAt: -1}},

                    
                    {
                    $facet:{
                        total:[{$count: "count"}],
                        rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])
            
        }
        else {
            data = await UserModel.aggregate([
                {$match: {role: "trainer"}},
                {$lookup: {from: "salaries", localField: "_id", foreignField: "userID", as: "salary"} },
                {$unwind : "$salary" },
                {$project: { "salary._id": 0,  "salary.createdAt": 0,  "salary.updatedAt": 0, "salary.userID": 0, password: 0, createdAt: 0, updatedAt: 0}},


                {$sort: {createdAt: -1}},
                {
                    $facet:{
                        total:[{$count: "count"}],
                        rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])

        }

      
        
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=TrainerListService