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
                {$lookup: {from: "packages", localField: "packageID", foreignField: "_id", as: "package"} },
                { $unwind: "$package" },
               

                
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])

        }
        else {

            data = await DataModel.aggregate([
                {$lookup: {from: "packages", localField: "packageID", foreignField: "_id", as: "package"} },
                { $unwind: "$package" },

                {$lookup: {from: "services", localField: "services.serviceID", foreignField: "_id", as: "serviceDetails" } },
                
                {$project: {services: 0, "serviceDetails.createdAt": 0, "serviceDetails.updatedAt": 0 , updatedAt: 0,  "package.createdAt": 0, "package.updatedAt": 0,}},



                
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
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