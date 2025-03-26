const MemberListService= async (req, DataModel, SearchArray) => {
    try{
        const pageNo = Number(req.params.pageNo);
        const perPage = Number(req.params.perPage);
        const searchValue = req.params.searchKeyword;
        const skipRow = (pageNo - 1) * perPage;

        
        let data;
        if (searchValue!=="0") {

            
            data = await DataModel.aggregate([
                {$match: {$or: SearchArray}},
                {$lookup: {from: "users", localField: "userID", foreignField: "_id", as: "profile"} },
               
                {
                    $facet:{
                        total:[{$count: "count"}],
                        rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])

        }
        else {

            data = await DataModel.aggregate([
                {$lookup: {from: "users", localField: "userID", foreignField: "_id", as: "profile"} },
                { $unwind : "$profile" },
                
                {$project: { services: 0, updatedAt: 0, packageID: 0, createdAt: 0, "profile._id": 0, 
                                 "profile.password": 0,  "profile.loginStatus": 0,  "profile.updatedAt": 0, "profile.createdAt": 0,}},



                
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



module.exports=MemberListService