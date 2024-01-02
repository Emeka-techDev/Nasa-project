const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

const getPagination = async (query) => {
    let page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;
    console.log(`from pagination skip is ${skip} \n limit is ${limit}`)
    
    return {
        skip,
        limit
    };

}

export default getPagination;