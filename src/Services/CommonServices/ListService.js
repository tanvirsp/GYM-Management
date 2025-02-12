const ListService= async (req, DataModel, SearchArray) => {
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
module.exports=ListService