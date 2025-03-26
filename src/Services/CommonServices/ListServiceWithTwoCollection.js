const ListServiceWithTwoCollection= async (req, DataModel, SearchArray, JoiningStage, Projection) => {
    try{

        const pageNo = Number(req.params.pageNo);
        const perPage = Number(req.params.perPage);
        const searchValue = req.params.searchKeyword;
        const UserEmail=req.headers['email'];

        const skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue!=="0") {
            let SearchQuery = {$or:SearchArray}
            data = await DataModel.aggregate([
                    
                    {$match: SearchQuery},
                    {$lookup: JoiningStage},
                    {$unwind : "$type"},
                    {$project: Projection},
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
            data = await DataModel.aggregate([
                {$lookup: JoiningStage},
                {$unwind : "$type"},
                {$project: Projection},
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
module.exports=ListServiceWithTwoCollection